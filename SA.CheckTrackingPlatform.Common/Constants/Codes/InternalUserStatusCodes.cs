using SA.CheckTrackingPlatform.Common.Resources;

namespace System
{
    public static partial class Constants
    {
        public static class InternalUserStatusCodes
        {
            #region Fields

            public const string Activated = "Activated";

            public const string Deactivated = "Deactivated";

            public const string NotDefined = "NotDefined";

            #endregion Fields
        }
    }

    public static class InternalUserStatusCodes
    {
        #region Methods

        public static string ToInternalUserStatusLabel(this string InternalUserStatusCode)
        {
            switch (InternalUserStatusCode)
            {
                case Constants.InternalUserStatusCodes.Activated:
                    return InternalUserStatusCodeLabels.Activated;

                case Constants.InternalUserStatusCodes.Deactivated:
                    return InternalUserStatusCodeLabels.Deactivated;

                default: return InternalUserStatusCodeLabels.NotDefined;
            }
        }

        public static string FromInternalUserStatusCode(this bool InternalUserIsDeactivated)
        {
            switch (InternalUserIsDeactivated)
            {
                case false:
                    return Constants.InternalUserStatusCodes.Activated;

                case true:
                    return Constants.InternalUserStatusCodes.Deactivated;
            }
        }

        #endregion Methods
    }
}