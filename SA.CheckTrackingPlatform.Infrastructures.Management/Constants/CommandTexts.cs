using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Constants
{
    public static class CommandTexts
    {
        #region Checks

        public const string GetAllChecksByCriteria = @"SELECT * FROM CHECKS";

        #endregion Cheks
    }
}
