import { SubscriptionProcessing } from './SubscriptionProcessing';
import { SubscriptionValidation } from './SubscriptionValidation';
import { RecoveryProcessing } from './RecoveryProcessing';
import { RecoveryValidation } from './RecoveryValidation';
import { ReinsuranceProcessing } from './ReinsuranceProcessing';
import { ReinsuranceValidation } from './ReinsuranceValidation';
import { AccountingProcessing } from './AccountingProcessing';
import { AccountingValidation } from './AccountingValidation';

import { WORKFLOW_COMPONENTS } from './constants';

const components = {
  [WORKFLOW_COMPONENTS.SUBSCRIPTION_PROCESSING]: SubscriptionProcessing,
  [WORKFLOW_COMPONENTS.SUBSCRIPTION_VALIDATION]: SubscriptionValidation,
    [WORKFLOW_COMPONENTS.RECOVERY_PROCESSING]: RecoveryProcessing,
    [WORKFLOW_COMPONENTS.RECOVERY_VALIDATION]: RecoveryValidation,  
    [WORKFLOW_COMPONENTS.REINSURANCE_PROCESSING]: ReinsuranceProcessing,
    [WORKFLOW_COMPONENTS.REINSURANCE_VALIDATION]: ReinsuranceValidation,
    [WORKFLOW_COMPONENTS.ACCOUNTING_PROCESSING]: AccountingProcessing,
    [WORKFLOW_COMPONENTS.ACCOUNTING_VALIDATION]: AccountingValidation,
};

export default components;
