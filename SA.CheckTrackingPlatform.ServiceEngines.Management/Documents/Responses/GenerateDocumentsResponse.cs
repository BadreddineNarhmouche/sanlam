
namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Documents.Responses
{
    public class GenerateDocumentsResponse : BaseResponse<GenerateDocumentsResponse>
    {
        #region Properties 

        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }

        #endregion
    }
}
