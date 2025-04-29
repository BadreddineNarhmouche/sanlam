using AutoMapper;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.ServiceEngines.Management.BanksFolder.Responses;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.BanksFolder
{
    public class BanksProfile : Profile
    {
        #region Constructors 

        public BanksProfile()
        {
            CreateMap<Bank, GetBankByIdResponse>().ReverseMap();

            CreateMap<Bank, GetBankByAllItem>().ReverseMap();
        }

        #endregion Constructors
    }
}
