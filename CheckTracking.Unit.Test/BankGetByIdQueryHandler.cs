using System.Reflection;
using System.Threading;
using AutoMapper;
using FluentAssertions;
using Moq;
using Pose;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.BanksFolder;
using SA.CheckTrackingPlatform.ServiceEngines.Management.BanksFolder.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using Xunit;

namespace CheckTracking.Unit.Test.Application.Handlers
{
    public class BankGetByIdQueryHandlerPoseTests
    {
        private readonly Mock<IBanksQueryRepository> _repoMock = new();

        private IMapper CreateTestMapper()
        {
            var cfg = new MapperConfiguration(c => c.AddProfile<BanksProfile>());
            cfg.AssertConfigurationIsValid();
            return cfg.CreateMapper();
        }

        [Fact]
        public void Handle_BankExists_WithPoseShim_ShouldReturnMappedResponse()
        {
            // 1) Préparez le mapper de test
            var testMapper = CreateTestMapper();

            // 2) Shimmez la propriété statique MappingConfiguration.Mapper
            var shim = Shim.Replace(() => MappingConfiguration.Mapper)
                          .With(() => testMapper);

            // 3) Exécutez votre code sous l'effet du shim
            PoseContext.Isolate(() =>
            {
                // Arrange : entité avec Id “protégé”
                var bank = new Bank { Label = "Ma Banque" };
                var pi = typeof(Bank)
                    .GetProperty("Id", BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public)!;
                pi.SetValue(bank, 7);

                _repoMock.Setup(r => r.GetByIdAsync(7))
                         .ReturnsAsync(bank);

                var handler = new GetByIdQueryHandler(_repoMock.Object);

                // Act
                var response = handler
                    .Handle(new GetBankByIdQuery { Id = 7 }, CancellationToken.None)
                    .Result;

                // Assert : on ne teste que Id et Label
                response.Id.Should().Be(7);
                response.Label.Should().Be("Ma Banque");

                _repoMock.Verify(r => r.GetByIdAsync(7), Times.Once);
            }, shim);
        }
    }
}
