using SA.CheckTrackingPlatform.Common.Resources;

namespace System
{
    public static partial class Constants
    {
        public static class DocumentTypeCodes
        {
            #region Fields
            public const string NumberOfChecksIssuedButNotAcknowledgedByTheBusinessUnit = "NumberOfChecksIssuedButNotAcknowledgedByTheBusinessUnit";
            public const string NumberOfChecksReceivedByBusinessUnitButNotByRegistryOffice = "NumberOfChecksReceivedByBusinessUnitButNotByRegistryOffice";
            public const string NumberOfChecksReceivedByRegistryOfficeButNotSentToClient = "NumberOfChecksReceivedByRegistryOfficeButNotSentToClient";
            public const string NumberOfReturnedChecksNotYetReceived = "NumberOfReturnedChecksNotYetReceived";
            #endregion Fields
        }
    }

    public static class DocumentTypeCodes
    {
        #region Methods

        public static string ToDocumentTypeLabel(this string DocumentTypeCode)
        {
            switch (DocumentTypeCode)
            {
                case Constants.DocumentTypeCodes.NumberOfChecksIssuedButNotAcknowledgedByTheBusinessUnit:
                    return DucumentTypeCodeLabels.NumberOfChecksIssuedButNotAcknowledgedByTheBusinessUnit;

                case Constants.DocumentTypeCodes.NumberOfChecksReceivedByBusinessUnitButNotByRegistryOffice:
                    return DucumentTypeCodeLabels.NumberOfChecksReceivedByBusinessUnitButNotByRegistryOffice;

                case Constants.DocumentTypeCodes.NumberOfChecksReceivedByRegistryOfficeButNotSentToClient:
                    return DucumentTypeCodeLabels.NumberOfChecksReceivedByRegistryOfficeButNotSentToClient;

                case Constants.DocumentTypeCodes.NumberOfReturnedChecksNotYetReceived:
                    return DucumentTypeCodeLabels.NumberOfReturnedChecksNotYetReceived;

                default: return DucumentTypeCodeLabels.NotDefined;
            }
        }
        #endregion Methods
    }
}