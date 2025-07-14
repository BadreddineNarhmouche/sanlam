namespace SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.Responses
{
    public class FileExcelResponse : BaseResponse<FileExcelResponse>
    {
        #region Properties 

        public string Name { get; set; }

        public string ContentType { get; set; }

        public byte[] Content { get; set; }

        #endregion Properties
    }
}
