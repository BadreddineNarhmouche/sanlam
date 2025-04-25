import { type FilterCriteriaQuittances, type TreatSubscriptionQuittanceItem, type ValidateSubscriptionQuittanceItem, type FilterCriteriaNotifications, type Notification, type FilterCriteriaPayments, TreatRecoveryQuittanceItem, ValidateRecoveryQuittanceItem, TreatReinsuranceDeliverySlipItem, ValidateReinsuranceDeliverySlipItem, TreatAccountingDeliverySlipItem, ValidateAccountingDeliverySlipItem, CreateDeliverySlipItem, CreatePayment, ValidatePaymentItem } from "./domain";
export interface IQuittanceService {
    getAllSubscriptionQuittancesByCriteria: (criteria: FilterCriteriaQuittances) => void;
    getAllRecoveryQuittancesByCriteria?: (criteria: FilterCriteriaQuittances) => void;
    getAllReinsuranceQuittancesByCriteria?: (criteria: FilterCriteriaQuittances) => void;
    getAllAccountingQuittancesByCriteria?: (criteria: FilterCriteriaQuittances) => void;
    getAllOtherQuittancesByCriteria?: (criteria: FilterCriteriaQuittances) => void;
    clearGetQuittanceById?: () => void;
    clearGetAllReinsuranceQuittancesByCriteria?: () => void;
    quittanceAnnotationByAll?: () => void;
    quittanceAnnotationCreate?: (payload: any) => void;
    reinsurerByAll: () => void;
    getStatusCIOL?: () => void;
    getQuittanceById?: (id: string) => void;
    ExportAllQuittance?: (payload: any) => void;
    getQuittanceStatus: (payload: any) => void;
}
export interface IQuittanceDetailsService {
    getQuittanceById: (id: string) => void;
    treatSubscriptionQuittance?: (payload: TreatSubscriptionQuittanceItem) => void;
    validateSubscriptionQuittance?: (payload: ValidateSubscriptionQuittanceItem) => void;
    treatRecoveryQuittance?: (payload: TreatRecoveryQuittanceItem) => void;
    validateRecoveryQuittance?: (payload: ValidateRecoveryQuittanceItem) => void;
    downloadQuittanceDocumentById?: (payload: {
        id: string;
    }) => void;
    getQuittanceDocumentById?: (payload: {
        id: string;
    }) => void;
    clearGetQuittanceDocumentById?: () => void;
    downloadQuittanceDocumentByCriteria?: (payload: {
        quittanceId: string;
        documentTypeCode: string;
    }) => void;
    getQuittanceDocumentByCriteria?: (payload: {
        quittanceId: string;
        documentTypeCode: string;
    }) => void;
    clearGetQuittanceDocumentByCriteria?: () => void;
    getAllQuittanceDocumentsByCriteria?: (payload: {
        quittanceId: any;
    }) => void;
    submitDocumentsQuittance?: (payload: {
        quittanceId: string;
        documents: any;
    }) => void;
    clearSubmitDocumentsQuittance?: () => void;
    clearTreatRecoveryQuittance?: () => void;
    getQuittancePaymentByQuittanceId?: (quittanceId: string) => void;
    PutWorkFlowRollBack?: (payload: any) => void;
    clearPUTWorkflowRollBack?: () => void;
}
export interface IDeliverySlipService {
    getAllReinsuranceDeliverySlipsByCriteria: (criteria: FilterCriteriaQuittances) => void;
    getAllAccountingDeliverySlipsByCriteria: (criteria: FilterCriteriaQuittances) => void;
    clearGetDeliverySlipById?: () => void;
    createDeliverySlip?: (payload: CreateDeliverySlipItem) => void;
    PutWorkFlowRollBack?: (payload: any) => void;
    clearPUTWorkflowRollBack?: () => void;
}
export interface IDeliverySlipDetailsService {
    treatReinsuranceDeliverySlip?: (payload: TreatReinsuranceDeliverySlipItem) => void;
    validateReinsuranceDeliverySlip?: (payload: ValidateReinsuranceDeliverySlipItem) => void;
    treatAccountingDeliverySlip?: (payload: TreatAccountingDeliverySlipItem) => void;
    validateAccountingDeliverySlip?: (payload: ValidateAccountingDeliverySlipItem) => void;
    getDeliverySlipById: (id: string) => void;
    downloadDeliverySlipDocumentById?: (payload: {
        id: string;
    }) => void;
    getDeliverySlipDocumentById?: (payload: {
        id: string;
    }) => void;
    clearGetDeliverySlipDocumentById?: () => void;
    downloadDeliverySlipDocumentByCriteria?: (payload: {
        deliverySlipId: string;
        documentTypeCode: string;
        bankAccountId?: string;
        equivalent?: boolean;
        refReinsurer?: string;
        currencyId?: string;
    }) => void;
    getDeliverySlipDocumentByCriteria?: (payload: {
        deliverySlipId: string;
        documentTypeCode: string;
        bankAccountId?: string;
        equivalent?: boolean;
        refReinsurer?: string;
        currencyId?: string;
    }) => void;
    clearGetDeliverySlipDocumentByCriteria?: () => void;
    getAllDeliverySlipDocumentsByCriteria?: (payload: {
        deliverySlipId: string;
    }) => void;
    submitDocumentsDeliverySlip?: (payload: {
        deliverySlipId: string;
        documents: any;
    }) => void;
    clearSubmitDocumentsDeliverySlip?: () => void;
    PutWorkFlowRollBack?: (payload: any) => void;
    clearPUTWorkflowRollBack?: () => void;
}
export interface INotificationService {
    getAllNotificationsByCriteria?: (criteria: FilterCriteriaNotifications) => void;
    countAllNotificationsByCriteria?: (criteria: FilterCriteriaNotifications) => void;
    updateNotification?: (notification: Notification) => void;
}
export interface IPaymentService {
    getPaymentByCriteria: (criteria: FilterCriteriaPayments) => void;
    getPaymentById?: (id: string) => void;
    CreatePayment?: (payload: CreatePayment) => void;
    ValidatePayment: (payload: ValidatePaymentItem) => void;
    clearPaymentValidate?: () => void;
    downloadPaymentDocumentById?: (payload: {
        id: string;
    }) => void;
    getPaymentDocumentById?: (payload: {
        id: string;
    }) => void;
    clearGetPaymentDocumentById?: () => void;
    downloadPaymentDocumentByCriteria?: (payload: {
        paymentId: string;
        documentTypeCode: string;
    }) => void;
    getPaymentDocumentByCriteria?: (payload: {
        paymentId: string;
        documentTypeCode: string;
    }) => void;
    clearGetPaymentDocumentByCriteria?: () => void;
    getAllPaymentDocumentsByCriteria?: (payload: {
        paymentId: any;
    }) => void;
}
export interface IBankService {
    getBankByAll: () => void;
    GetAllCurrencies: () => void;
}
export interface IKPIsService {
    GetCountRecoveries: () => void;
    GetCountReinsurances: () => void;
    ExportFileExcelRenovel: () => void;
}
