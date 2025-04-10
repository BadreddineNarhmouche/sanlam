import { combineReducers } from "@reduxjs/toolkit";

//quittances
import quittancesSubscriptionListReducer from "./Quittances/quittancesSubscriptionListSlice";
import quittancesRecoveryListReducer from "./Quittances/quittancesRecoveryListSlice";
import quittancesReinsuranceListReducer from "./Quittances/quittancesReinsuranceListSlice";
import quittancesAccountingListReducer from "./Quittances/quittancesAccountingListSlice";
import quittancesOtherListReducer from "./Quittances/quittancesOtherListSlice";
import quittanceReducer from "./Quittances/quittanceSlice";
import quittanceTreatSubscriptionReducer from "./Quittances/quittanceTreatSubscriptionSlice";
import quittanceValidateSubscriptionReducer from "./Quittances/quittanceValidateSubscriptionSlice";
import quittanceTreatRecoveryReducer from "./Quittances/quittanceTreatRecoverySlice";
import quittanceValidateRecoveryReducer from "./Quittances/quittanceValidateRecoverySlice";
import quittanceGetDocumentByIdReducer from "./Quittances/quittanceGetDocumentByIdSlice";
import quittanceDownloadDocumentByIdReducer from "./Quittances/quittanceDownloadDocumentByIdSlice";
import quittanceGetDocumentByCriteriaReducer from "./Quittances/quittanceGetDocumentByCriteriaSlice";
import quittanceDownloadDocumentByCriteriaReducer from "./Quittances/quittanceDownloadDocumentByCriteriaSlice";
import quittanceGetAllDocumentsByCriteriaReducer from "./Quittances/quittanceGetAllDocumentsByCriteriaSlice";
import quittanceSubmitDocumentsReducer from "./Quittances/quittanceSubmitDocumentsSlice";
import quittancePaymentReducer from "./Quittances/quittanceGetPaymentByIdSlice";
import quittanceAnnotationReducer from "./Quittances/quittanceAnnotationByAllSlice";
import quittanceAnnotationCreateReducer from "./Quittances/quittanceAnnotationCreateSlice";
import reinsurerReducer from "./Quittances/reinsurerSlice";
import statusCIOLReducer from "./Quittances/quittanceStatusCIOLSlice";
import exportAllQuittanceReducer from "./Quittances/exportAllQuittanceSlice";
import quittanceStatusReducer from "./Quittances/quittanceStatusByAllSlice";

//deliverySlips
import deliverySlipsReinsuranceListReducer from "./DeliverySlips/deliverySlipsReinsuranceListSlice";
import deliverySlipsAccountingListReducer from "./DeliverySlips/deliverySlipsAccountingListSlice";
import deliverySlipReducer from "./DeliverySlips/deliverySlipSlice";
import deliverySlipTreatAccountingReducer from "./DeliverySlips/deliverySlipTreatAccountingSlice";
import deliverySlipValidateAccountingReducer from "./DeliverySlips/deliverySlipValidateAccountingSlice";
import deliverySlipTreatReinsuranceReducer from "./DeliverySlips/deliverySlipTreatReinsuranceSlice";
import deliverySlipValidateReinsuranceReducer from "./DeliverySlips/deliverySlipValidateReinsuranceSlice";
import deliverySlipGetDocumentByIdReducer from "./DeliverySlips/deliverySlipGetDocumentByIdSlice";
import deliverySlipDownloadDocumentByIdReducer from "./DeliverySlips/deliverySlipDownloadDocumentByIdSlice";
import deliverySlipGetDocumentByCriteriaReducer from "./DeliverySlips/deliverySlipGetDocumentByCriteriaSlice";
import deliverySlipDownloadDocumentByCriteriaReducer from "./DeliverySlips/deliverySlipDownloadDocumentByCriteriaSlice";
import deliverySlipGetAllDocumentsByCriteriaReducer from "./DeliverySlips/deliverySlipGetAllDocumentsByCriteriaSlice";
import deliverySlipSubmitDocumentsReducer from "./DeliverySlips/deliverySlipSubmitDocumentsSlice";
import deliverySlipCreateReducer from "./DeliverySlips/deliverySlipCreateSlice";

//notifications
import notificationsListReducer from "./Notifications/notificationsListSlice";
import notificationsUpdateReducer from "./Notifications/notificationUpdateSlice";
import notificationsCreateReducer from "./Notifications/notificationCreateSlice";
import notificationsCountReducer from "./Notifications/notificationCountSlice";

//internalRoles
import internalRolesReducer from "./InternalRoles/internalRolesSlice";

// Payments
import PaymentsReducer from "./Payments/PaymentByCriteriaSlice";
import PaymentsIdReducer from "./Payments/PaymentByIdSlice";
import PaymentsCreateReducer from "./Payments/PaymentCreateSlice";
import PaymentsValidateReducer from "./Payments/PaymentValidateSlice";
import paymentGetDocumentByIdReducer from "./Payments/PaymentsGetDocumentByIdSlice";
import paymentDownloadDocumentByIdReducer from "./Payments/PaymentsDownloadDocumentByIdSlice";
import paymentGetDocumentByCriteriaReducer from "./Payments/PaymentsGetDocumentByCriteriaSlice";
import paymentDownloadDocumentByCriteriaReducer from "./Payments/PaymentsDownloadDocumentByCriteriaSlice";
import paymentGetAllDocumentsByCriteriaReducer from "./Payments/PaymentsGetAllDocumentsByCriteriaSlice";

//Bank
import BanksReducer from "./Bank/BankByAllSlice";

//Currencies
import CurrenciesReducer from "./Currencies/GetAllCurrenciesSlice";

// KPIs
import RecoveriesKPI1 from "./KPI/RecoveriesKPISlice";
import ReinsurancesKPI from "./KPI/ReinsurancesKPISlice";
import exportFileExcelRenovelReducer from "./KPI/exportFileExcelRenovelSlice";

//Workflow
import WorkflowRollBackReducer from "./Workflow/WorkflowRollBackSlice";

export const rootReducer = combineReducers({
  quittancesSubscription: quittancesSubscriptionListReducer,
  quittancesOther: quittancesOtherListReducer,
  quittancesRecovery: quittancesRecoveryListReducer,
  quittancesReinsurance: quittancesReinsuranceListReducer,
  quittancesAccounting: quittancesAccountingListReducer,
  quittance: quittanceReducer,
  quittanceTreatSubscription: quittanceTreatSubscriptionReducer,
  quittanceValidateSubscription: quittanceValidateSubscriptionReducer,
  quittanceTreatRecovery: quittanceTreatRecoveryReducer,
  quittanceValidateRecovery: quittanceValidateRecoveryReducer,
  quittanceGetDocumentById: quittanceGetDocumentByIdReducer,
  quittanceDownloadDocumentById: quittanceDownloadDocumentByIdReducer,
  quittanceGetDocumentByCriteria: quittanceGetDocumentByCriteriaReducer,
  quittanceDownloadDocumentByCriteria:
    quittanceDownloadDocumentByCriteriaReducer,
  quittanceGetAllDocumentsByCriteria: quittanceGetAllDocumentsByCriteriaReducer,
  quittanceSubmitDocuments: quittanceSubmitDocumentsReducer,
  quittancePayment: quittancePaymentReducer,
  quittanceAnnotations: quittanceAnnotationReducer,
  quittanceAnnotationHistory: quittanceAnnotationCreateReducer,
  quittanceReinsurer: reinsurerReducer,
  statusCIOL: statusCIOLReducer,
  quittanceStatus: quittanceStatusReducer,
  exportAllQuittance: exportAllQuittanceReducer,
  notifications: notificationsListReducer,
  notificationsUpdate: notificationsUpdateReducer,
  notificationsCount: notificationsCountReducer,
  notificationsCreate: notificationsCreateReducer,
  internalRoles: internalRolesReducer,
  deliverySlipsReinsurance: deliverySlipsReinsuranceListReducer,
  deliverySlipsAccounting: deliverySlipsAccountingListReducer,
  deliverySlip: deliverySlipReducer,
  deliverySlipTreatAccounting: deliverySlipTreatAccountingReducer,
  deliverySlipValidateAccounting: deliverySlipValidateAccountingReducer,
  deliverySlipTreatReinsurance: deliverySlipTreatReinsuranceReducer,
  deliverySlipValidateReinsurance: deliverySlipValidateReinsuranceReducer,
  deliverySlipGetDocumentById: deliverySlipGetDocumentByIdReducer,
  deliverySlipDownloadDocumentById: deliverySlipDownloadDocumentByIdReducer,
  deliverySlipGetDocumentByCriteria: deliverySlipGetDocumentByCriteriaReducer,
  deliverySlipDownloadDocumentByCriteria:
    deliverySlipDownloadDocumentByCriteriaReducer,
  deliverySlipGetAllDocumentsByCriteria:
    deliverySlipGetAllDocumentsByCriteriaReducer,
  deliverySlipSubmitDocuments: deliverySlipSubmitDocumentsReducer,
  deliverySlipCreate: deliverySlipCreateReducer,
  paymentsByCriteria: PaymentsReducer,
  paymentsById: PaymentsIdReducer,
  PaymentsCreate: PaymentsCreateReducer,
  PaymentsValidate: PaymentsValidateReducer,
  Banks: BanksReducer,
  GetAllCurrencies: CurrenciesReducer,
  GetCountRecoveries: RecoveriesKPI1,
  GetCountReinsurances: ReinsurancesKPI,
  exportFileExcelRenovel: exportFileExcelRenovelReducer,
  rollbackQuittance: WorkflowRollBackReducer,
  paymentGetDocumentById: paymentGetDocumentByIdReducer,
  paymentDownloadDocumentById: paymentDownloadDocumentByIdReducer,
  paymentGetDocumentByCriteria: paymentGetDocumentByCriteriaReducer,
  paymentDownloadDocumentByCriteria: paymentDownloadDocumentByCriteriaReducer,
  paymentGetAllDocumentsByCriteria: paymentGetAllDocumentsByCriteriaReducer,
});
