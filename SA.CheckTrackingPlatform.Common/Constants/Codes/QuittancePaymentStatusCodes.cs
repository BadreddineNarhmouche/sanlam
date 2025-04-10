using SA.CheckTrackingPlatform.Common.Resources;

namespace System
{
    public static partial class Constants
    {
        public static class QuittancePaymentStatusCodes
        {
            #region Fields

            public const string Unpaid = "Unpaid";

            public const string Paid = "Paid";

            public const string PartiallyPaid = "PartiallyPaid";

            public const string NotDefined = "NotDefined";

            #endregion Fields
        }
    }

    public static class QuittancePaymentStatusCodes
    {
        #region Methods

        public static string ToQuittancePaymentStatusLabel(this string quittancePaymentStatusCode)
        {
            switch (quittancePaymentStatusCode)
            {
                case Constants.QuittancePaymentStatusCodes.Unpaid:
                    return QuittancePaymentStatusCodeLabels.Unpaid;

                case Constants.QuittancePaymentStatusCodes.Paid:
                    return QuittancePaymentStatusCodeLabels.Paid;

                case Constants.QuittancePaymentStatusCodes.PartiallyPaid:
                    return QuittancePaymentStatusCodeLabels.PartiallyPaid;

                default: return QuittancePaymentStatusCodeLabels.NotDefined;
            }
        }

        #endregion Methods
    }
}