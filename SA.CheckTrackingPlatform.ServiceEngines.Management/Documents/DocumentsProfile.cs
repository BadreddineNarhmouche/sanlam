using AutoMapper;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Documents.Queries;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Documents
{
    public class DocumentsProfile : Profile
    {
        #region Constructors 

        public DocumentsProfile()
        {
            CreateMap<Checks, GenerateDocumentsQuery>().ReverseMap();
        }

        #endregion Constructors
    }
}
