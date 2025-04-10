using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUserInternalRoles.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Queries;
using static System.CoreConstants;

namespace Microsoft.AspNetCore.Authorization
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public class CustomAuthorizeAttribute : AuthorizeAttribute, IAsyncAuthorizationFilter
    {
        #region Properties

        public string[] InternalRoleCodes { get; set; }

        #endregion Properties

        #region Constructors

        public CustomAuthorizeAttribute(params string[] internalRoleCodes)
        {
            this.InternalRoleCodes = internalRoleCodes;
        }

        #endregion Constructors

        #region Methods

        public async Task OnAuthorizationAsync(AuthorizationFilterContext authorizationFilterContext)
        {
            try
            {
                bool isAuthorized = await IsAuthorizedAsync(authorizationFilterContext);

                if (!isAuthorized)
                {
                    authorizationFilterContext.Result = new ForbidResult();
                }
            }
            catch (Exception exception)
            {
                System.ILogger logger = authorizationFilterContext.HttpContext.RequestServices.GetService<System.ILogger>();

                logger.Fatal(string.Format("An exception was raised: {0}", exception));

                authorizationFilterContext.Result = new ForbidResult();
            }
        }

        private async Task<bool> IsAuthorizedAsync(AuthorizationFilterContext authorizationFilterContext)
        {
            if (authorizationFilterContext.IsNotNull()
                && authorizationFilterContext.ActionDescriptor.IsNotNull()
                && !authorizationFilterContext.ActionDescriptor.EndpointMetadata.IsNullOrEmpty()
                && authorizationFilterContext.HttpContext.IsNotNull()
                && authorizationFilterContext.HttpContext.Request.IsNotNull()
                && authorizationFilterContext.HttpContext.User.IsNotNull()
                && authorizationFilterContext.HttpContext.RequestServices.IsNotNull()
                && authorizationFilterContext.ModelState.IsNotNull()
                && authorizationFilterContext.ModelState.IsValid)
            {
                if (authorizationFilterContext.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any())
                {
                    return true;
                }

                IMediator mediator = authorizationFilterContext.HttpContext.RequestServices.GetService<IMediator>();

                var existInternalUserByElectronicAddressResponse = await mediator.Send(new ExistInternalUserByElectronicAddressQuery()
                {
                    InternalUserElectronicAddress = authorizationFilterContext.HttpContext.User.FindFirst(KeycloakAttributes.InternalUserElectronicAddress).Value
                });

                if (existInternalUserByElectronicAddressResponse.IsSuccess
                    && existInternalUserByElectronicAddressResponse.IsFound)
                {
                    bool result = false;

                    foreach (string internalRoleCode in this.InternalRoleCodes)
                    {
                        var existInternalUserInternalRoleByCriteriaQuery = await mediator.Send(new ExistInternalUserInternalRoleByCriteriaQuery()
                        {
                            InternalUserElectronicAddress = authorizationFilterContext.HttpContext.User.FindFirst(KeycloakAttributes.InternalUserElectronicAddress).Value,
                            InternalRoleCode = internalRoleCode
                        });

                        if (existInternalUserInternalRoleByCriteriaQuery.IsSuccess
                            && existInternalUserInternalRoleByCriteriaQuery.IsFound)
                        {
                            return true;
                        }
                    }

                    return result;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        #endregion Methods
    }
}