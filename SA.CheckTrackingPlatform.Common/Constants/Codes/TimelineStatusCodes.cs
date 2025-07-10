
namespace System
{
    public static partial class Constants
    {
        public static class TimelineStatusCodes
        {
            #region Fields 

            public static readonly string ReceivedTrade = "Reçu métier".Trim().ToLowerInvariant();

            public static readonly string SendOffice = "Envoi BO".Trim().ToLowerInvariant();

            public static readonly string ReceivedOffice = "Reçu BO".Trim().ToLowerInvariant();

            public static readonly string SendClient = "Envoie client".Trim().ToLowerInvariant();

            public static readonly string ReturnClient = "Retour Client".Trim().ToLowerInvariant();

            public static readonly string EditedCheck = "Edité".Trim().ToLowerInvariant();

            public static readonly string ReceiptReturnCheck = "Réception chèque retourné".Trim().ToLowerInvariant();

            #endregion Fields
        }
    }
}
