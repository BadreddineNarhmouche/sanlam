using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Commands;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Commands;
using SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Queries;
using SA.CheckTrackingPlatform.Services.Common.Middlewares;
using System.Globalization;
using System.Net;
using System.Reflection;
using System.Text.Json.Serialization;
using Wkhtmltopdf.NetCore;
using static System.CoreConstants;

WebApplicationBuilder webApplicationBuilder = WebApplication.CreateBuilder(args);

webApplicationBuilder.Services.AddRequestLocalization(rl =>
{
    CultureInfo[] cultureInfos = new[]
    {
        new CultureInfo(LanguageCodes.Arabic),
        new CultureInfo(LanguageCodes.French),
        new CultureInfo(LanguageCodes.English)
    };

    rl.DefaultRequestCulture = new RequestCulture(cultureInfos[0], cultureInfos[0]);
    rl.SupportedCultures = cultureInfos;
    rl.SupportedUICultures = cultureInfos;

    rl.AddInitialRequestCultureProvider(new CustomRequestCultureProvider(async context =>
    {
        string languageCode = context.Request.Headers["LanguageCode"].ToString();

        if (languageCode.IsNullOrWhiteSpace()
        || (languageCode != LanguageCodes.Arabic
        && languageCode != LanguageCodes.French
        && languageCode != LanguageCodes.English))
        {
            return new ProviderCultureResult(webApplicationBuilder.Configuration["DefaultLanguageCode"]);
        }

        return new ProviderCultureResult(languageCode);
    }));
});

webApplicationBuilder.WebHost.ConfigureKestrel(k =>
{
    k.AddServerHeader = false;
    k.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(5);
    k.Limits.RequestHeadersTimeout = TimeSpan.FromMinutes(5);
    k.Limits.MaxConcurrentConnections = 100;
    k.Limits.MaxConcurrentUpgradedConnections = 100;
});

webApplicationBuilder.Services.AddControllers(c =>
{
    c.CacheProfiles.Add(Generals.DefaultCacheProfile, new CacheProfile()
    {
        Duration = 14400,
        Location = ResponseCacheLocation.Any,
        NoStore = false
    });
}).AddJsonOptions(jo =>
{
    jo.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    jo.JsonSerializerOptions.IgnoreReadOnlyFields = true;
    jo.JsonSerializerOptions.IgnoreReadOnlyProperties = true;
    jo.JsonSerializerOptions.IncludeFields = false;
    jo.JsonSerializerOptions.NumberHandling = JsonNumberHandling.Strict;
    jo.JsonSerializerOptions.UnknownTypeHandling = JsonUnknownTypeHandling.JsonNode;
    jo.JsonSerializerOptions.WriteIndented = false;
});

webApplicationBuilder.Services.AddDbContext<ApplicationContext>();

//webApplicationBuilder.Services.AddDbContext<ApplicationContext>(options =>
//    options.UseOracle(webApplicationBuilder.Configuration.GetConnectionString("OracleDatabase")));

webApplicationBuilder.Services.AddResponseCaching(rc =>
{
    rc.SizeLimit = 1073741824;
    rc.MaximumBodySize = 1073741824;
    rc.UseCaseSensitivePaths = true;
});

if (bool.Parse(webApplicationBuilder.Configuration["KeycloakAuthentication:IsEnabled"]))
{
    webApplicationBuilder.Services.AddAuthentication(a =>
    {
        a.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        a.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        a.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(jb =>
    {
        jb.RequireHttpsMetadata = bool.Parse(webApplicationBuilder.Configuration["KeycloakAuthentication:RequireHttpsMetadata"]);
        jb.MetadataAddress = webApplicationBuilder.Configuration["KeycloakAuthentication:MetadataAddress"];
        jb.Authority = webApplicationBuilder.Configuration["KeycloakAuthentication:Authority"];
        jb.Audience = webApplicationBuilder.Configuration["KeycloakAuthentication:Audience"];
        jb.Events = new JwtBearerEvents()
        {
            OnAuthenticationFailed = authenticationFailedContext =>
            {
                authenticationFailedContext.NoResult();

                authenticationFailedContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                authenticationFailedContext.Response.Headers.WWWAuthenticate = JwtBearerDefaults.AuthenticationScheme;
                authenticationFailedContext.Response.ContentType = "text/plain";

                return authenticationFailedContext.Response.WriteAsync("Server refuses to process the authentication request.");
            },
            OnForbidden = forbiddenContext =>
            {
                forbiddenContext.NoResult();

                forbiddenContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                forbiddenContext.Response.Headers.WWWAuthenticate = JwtBearerDefaults.AuthenticationScheme;
                forbiddenContext.Response.ContentType = "text/plain";

                return forbiddenContext.Response.WriteAsync("Server refuses to fulfill the authentication request.");
            },
            OnTokenValidated = onTokenValidatedContext =>
            {
                return Task.CompletedTask;
            }
        };
        jb.TokenValidationParameters = new TokenValidationParameters()
        {
            ClockSkew = TimeSpan.FromMinutes(double.Parse(webApplicationBuilder.Configuration["KeycloakAuthentication:ClockSkewInMinutes"])),
            ValidateIssuerSigningKey = bool.Parse(webApplicationBuilder.Configuration["KeycloakAuthentication:ValidateIssuerSigningKey"]),
            ValidAudience = webApplicationBuilder.Configuration["KeycloakAuthentication:ValidAudience"],
            ValidIssuer = webApplicationBuilder.Configuration["KeycloakAuthentication:ValidIssuer"]
        };
        jb.SaveToken = bool.Parse(webApplicationBuilder.Configuration["KeycloakAuthentication:SaveToken"]);
        jb.IncludeErrorDetails = bool.Parse(webApplicationBuilder.Configuration["KeycloakAuthentication:IncludeErrorDetails"]);
    });

    webApplicationBuilder.Services.AddAuthorization(a =>
    {
        a.AddPolicy("AuthenticatedAndAuthorizedPolicy", policy =>
        {
            policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
            .RequireAssertion(authorizationHandlerContext =>
            {
                if (authorizationHandlerContext.IsNotNull()
                && authorizationHandlerContext.User.IsNotNull()
                && authorizationHandlerContext.User.Identity.IsNotNull()
                && authorizationHandlerContext.User.Identity.IsAuthenticated
                && authorizationHandlerContext.User.HasClaim(c => c.Type == KeycloakAttributes.InternalUserElectronicAddress))
                {
                    return authorizationHandlerContext.User.FindFirst(KeycloakAttributes.InternalUserElectronicAddress).Value.IsElectronicAddress();
                }

                return false;
            });
        });
    });
}

webApplicationBuilder.Services.AddEndpointsApiExplorer();

if (bool.Parse(webApplicationBuilder.Configuration["Swagger:IsEnabled"]))
{
    webApplicationBuilder.Services.AddSwaggerGen(sg =>
    {
        sg.SwaggerDoc("v1", new OpenApiInfo() { Title = "SA.CheckTrackingPlatform.Services.LateralService", Version = "v1" });
        sg.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
        {
            Name = "Authorization",
            Description = "Token based authentication",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http,
            Scheme = JwtBearerDefaults.AuthenticationScheme,
            BearerFormat = "JWT"
        });
        sg.AddSecurityRequirement(new OpenApiSecurityRequirement()
        {
            {
                new OpenApiSecurityScheme()
                {
                    Reference = new OpenApiReference()
                    {
                        Id = "Bearer",
                        Type = ReferenceType.SecurityScheme
                    }
                },
                new string[] {}
            }
        });
        sg.IgnoreObsoleteActions();
        sg.IgnoreObsoleteProperties();
    });
}

webApplicationBuilder.Services.AddTransient<System.ILogger, Log4NetLogger>();

Generals.MinimumFileLengthInBytes = long.Parse(webApplicationBuilder.Configuration["Storage:MinimumFileLengthInBytes"]);
Generals.MaximumFileLengthInBytes = long.Parse(webApplicationBuilder.Configuration["Storage:MaximumFileLengthInBytes"]);
Generals.MaximumFileCount = short.Parse(webApplicationBuilder.Configuration["Storage:MaximumFileCount"]);

switch (webApplicationBuilder.Configuration["Storage:TargetedImplementation"])
{
    case Generals.LocalStorage:
        webApplicationBuilder.Services.AddTransient<System.IStorage, LocalStorage>();

        break;

    case Generals.NetworkStorage:
        webApplicationBuilder.Services.AddTransient<System.IStorage, NetworkStorage>();

        break;

    default:
        webApplicationBuilder.Services.AddTransient<System.IStorage, LocalStorage>();

        break;
}

webApplicationBuilder.Services.AddWkhtmltopdf();
webApplicationBuilder.Services.AddTransient<IDocumentGenerator>(isc => new DocumentGenerator(isc.GetRequiredService<IGeneratePdf>(), webApplicationBuilder.Configuration["DocumentGenerator:TemplatesBasePath"]));
webApplicationBuilder.Services.AddTransient<IDocumentReader, DocumentReader>();
webApplicationBuilder.Services.AddTransient<IElectronicMailSender, ElectronicMailSender>();

LoggerHelper.Initialization(new Log4NetLogger());

webApplicationBuilder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

webApplicationBuilder.Services.AddMediatR(config => config.RegisterServicesFromAssembly(typeof(GetAllNotificationsByCriteriaQueryHandler).GetTypeInfo().Assembly));

webApplicationBuilder.Services.AddHttpContextAccessor();

webApplicationBuilder.Services.AddTransient<SendAccessTokenHandler>();

webApplicationBuilder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});

#region Repositories injection
webApplicationBuilder.Services.AddTransient<IInternalRoleCommandRepository, InternalRoleCommandRepository>();
webApplicationBuilder.Services.AddTransient<IInternalUserCommandRepository, InternalUserCommandRepository>();
webApplicationBuilder.Services.AddTransient<INotificationCommandRepository, NotificationCommandRepository>();
webApplicationBuilder.Services.AddTransient<INotificationTypeCommandRepository, NotificationTypeCommandRepository>();

webApplicationBuilder.Services.AddTransient<IInternalRoleQueryRepository, InternalRoleQueryRepository>();
webApplicationBuilder.Services.AddTransient<IInternalUserQueryRepository, InternalUserQueryRepository>();
webApplicationBuilder.Services.AddTransient<IChecksQueryRepository, ChecksQueryRepository>();
webApplicationBuilder.Services.AddTransient<ITimelinesQueryRepository, TimelineQueryRepository>();
webApplicationBuilder.Services.AddTransient<IBanksQueryRepository, BanksQueryRepository>();
webApplicationBuilder.Services.AddTransient<IBranchsQueryRepository, BranchsQueryRepository>();
webApplicationBuilder.Services.AddTransient<IStatusQueryRepository, StatusQueryRepository>();


webApplicationBuilder.Services.AddTransient<IInternalUserInternalRoleQueryRepository, InternalUserInternalRoleQueryRepository>();
webApplicationBuilder.Services.AddTransient<INotificationQueryRepository, NotificationQueryRepository>();
webApplicationBuilder.Services.AddTransient<INotificationTypeQueryRepository, NotificationTypeQueryRepository>();

#endregion Repositories injection

WebApplication webApplication = webApplicationBuilder.Build();

webApplication.UseRequestLocalization();

if (bool.Parse(webApplicationBuilder.Configuration["Swagger:IsEnabled"]))
{
    webApplication.UseSwagger();
    webApplication.UseSwaggerUI();
}

webApplication.UseCustomException();

webApplication.UseCors(c =>
{
    c.WithOrigins(webApplicationBuilder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>());
    c.AllowAnyHeader();
    c.AllowAnyMethod();
    c.AllowCredentials();
});

webApplication.UseResponseCaching();

if (bool.Parse(webApplicationBuilder.Configuration["KeycloakAuthentication:IsEnabled"]))
{
    webApplication.UseAuthentication();
    webApplication.UseAuthorization();

    webApplication.MapControllers().RequireAuthorization("AuthenticatedAndAuthorizedPolicy");
}
else
{
    webApplication.MapControllers();
}

webApplication.Run();