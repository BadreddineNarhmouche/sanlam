export const QUITTANCE_STATUS_CODES = {
  DRAFT: "Draft",
  TO_DO_SUBSCRIPTION: "ToDoSubscription",
  TO_DO_RECOVERY: "ToDoRecovery",
  TO_DO_checkTracking: "ToDocheckTracking",
  TO_DO_ACCOUNTING: "ToDoAccounting",
  IN_PROGRESS_SUBSCRIPTION: "InProgressSubscription",
  IN_PROGRESS_RECOVERY: "InProgressRecovery",
  IN_PROGRESS_checkTracking: "InProgresscheckTracking",
  IN_PROGRESS_ACCOUNTING: "InProgressAccounting",
  IN_PROGRESS_PAYMENT: "InProgressPayment",
  END_MISSION: "EndMission",
};

export const QUITTANCE_PAYMENT_STATUS_CODES = {
  PAID: "Paid",
  UNPAID: "Unpaid",
  PARTIALLY_PAID: "PartiallyPaid",
  NOT_DEFINED: "NotDefined",
};

export const WORKFLOW_STEP_CODES = {
  SUBSCRIPTIONS: "Subscriptions",
  RECOVERIES: "Recoveries",
  checkTrackingS: "checkTrackings",
  ACCOUNTING: "Accounting",
  OTHER: "Other",
};

export const WORKFLOW_TYPE_CODES = {
  QUITTANCE: "Quittance",
  DELIVERYSLIP: "DeliverySlip",
};

export const WORKFLOW_STATUS_CODES = {
  SUBSCRIPTION_VALIDATOR: "SubscriptionValidation",
};
