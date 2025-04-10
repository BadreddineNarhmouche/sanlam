using SA.CheckTrackingPlatform.Common.Resources;

namespace System
{
    public static partial class Constants
    {
        public static class DocumentTypeCodes
        {
            #region Fields

            public const string HonorDeclaration = "HonorDeclaration";

            public const string CoverNote = "CoverNote";

            public const string SettlementNote = "SettlementNote";

            public const string DeliverySlipDetail = "DeliverySlipDetail";

            public const string DebitNoticeReceived = "DebitNoticeReceived";

            public const string Other = "Other";

            #endregion Fields
        }
    }

    public static class DocumentTypeCodes
    {
        #region Methods

        public static string ToDocumentTypeLabel(this string quittanceDocumentTypeCode)
        {
            switch (quittanceDocumentTypeCode)
            {
                case Constants.DocumentTypeCodes.CoverNote:
                    return DucumentTypeCodeLabels.CoverNote;

                case Constants.DocumentTypeCodes.HonorDeclaration:
                    return DucumentTypeCodeLabels.HonorDeclaration;

                case Constants.DocumentTypeCodes.SettlementNote:
                    return DucumentTypeCodeLabels.SettlementNote;

                case Constants.DocumentTypeCodes.DeliverySlipDetail:
                    return DucumentTypeCodeLabels.DeliverySlipDetail;

                case Constants.DocumentTypeCodes.Other:
                    return DucumentTypeCodeLabels.Other;

                default: return DucumentTypeCodeLabels.NotDefined;
            }
        }

        #endregion Methods
    }
}