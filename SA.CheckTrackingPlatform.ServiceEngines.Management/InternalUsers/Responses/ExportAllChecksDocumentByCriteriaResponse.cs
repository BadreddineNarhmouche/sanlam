namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Responses
{
    public class ExportAllChecksDocumentByCriteriaResponse : BasePagedResponse<ExportAllChecksDocumentByCriteriaResponse>
    {
        #region Properties 

        public string Name { get; set; }
        public string ContentType { get; set; }
        public byte[] Content { get; set; }

        #endregion Properties
    }
}
