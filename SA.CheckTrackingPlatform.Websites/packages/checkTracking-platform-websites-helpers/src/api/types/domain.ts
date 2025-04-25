/* eslint-disable */
export interface DataSliceState<T> {
  responseData: T[] | T;
  meta?: {
    itemsCount: number;
    pageCount: number;
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    unseenCount?: number;
  };
  isLoading: boolean;
  error: string | null;
}

export interface CommonProps {
  isDeactivated: boolean;
  isDeleted: boolean;
}

export interface ReferentialDataItem {
  code: string;
  label: string;
}

export interface City extends ReferentialDataItem {
  countryId: string;
}

export interface PostalCode extends ReferentialDataItem {
  cityId: string;
}

export interface ReferentialData {
  activities: ReferentialDataItem[];
  countries: ReferentialDataItem[];
  cities: City[];
  postalCodes: PostalCode[];
  identifierTypes: ReferentialDataItem[];
  prospectCategories: ReferentialDataItem[];
  civilities: ReferentialDataItem[];
  addressTypes: ReferentialDataItem[];
  nationalities: ReferentialDataItem[];
  moralPersonTypes: ReferentialDataItem[];
  professionalPersonTypes: ReferentialDataItem[];
}

export interface Quittance {
  id: number;
  reference: string;
  branchId: string;
  policyReference: string;
  policySourceSystemId: string;
  partnerUserCode: string;
  reinsurerLabel: string;
  policySubscriberLabel: string;
  ciolStatusCode: string;
  transferRate: number;
  commissionRate: number;
  brutPremiumAmount: number;
  netPremiumAmount: number;
  effectiveDate: string;
  exprirationDate: string;
  checkTracking: string;
  paymentDeadline: string;
  quittanceEffectiveDate: string;
  quittanceExprirationDate: string;
  guaranteeTypes: string;
  publicQuittanceStatusCode: string;
  publicQuittanceStatusLabel: string;
}

export interface QuittancePayment {
  quittanceReference: string;
  policyReference: string;
  premiumAmount: number;
  collectionDate: string;
  totalAmount: number;
  accessoryAmount: number;
  commissionAmount: number;
  amountToPay: number;
  differenceNetAmountToPay: number;
  statusCode: string;
  statusLabel: string;
  dateReceiptValue:string;
}

export interface QuittanceLine {
  id: number;
  reinsurerLabel: string;
  cessionRate: number;
}

export interface DeliverySlip {
  id: number;
  reference: string;
  settlementDate: string;
  creationDate: string;
  annuelPremiumTotal: string;
}

export interface GetAllQuittancesByCriteriaItem {
  subscriptionResponse: SubscriptionResponse;
}

export interface SubscriptionResponse {
  branchId: string;
  policyReference: string;
  policySubscriberLabel: string;
  partnerUserCode: string;
  commisionRate: string;
  quittanceCededPremium: string;
  items: Quittance[];
  reference: string;
}

export interface GetAllDeliverySlipsByCriteriaItem {
  reinsuranceResponse: ReinsuranceResponse;
}
export interface ReinsuranceResponse {
  reference: string;
  count: string;
  settlementDate: string;
  totalAmount: string;
  sla: string;
  publicDeliverySlipStatusCode: string;
  publicDeliverySlipStatusLabel: string;
  items: DeliverySlip[];
}

export interface FilterCriteriaQuittances {
  id?: string;
  workFlowStepCode?: string;
  policyReference?: string;
  reference?: string;
  quittanceStatusId?: string;
  externalPartnerUserCode?: string;
  externalReinsuranceReference?: string;
  primeNetMin?: string;
  primeNetMax?: string;
  dateCreation?: string;
  externalClientName?: string;
  meta?: {
    pageIndex?: number;
    pageSize?: number;
  };
}

export interface FilterCriteriaDeliverySlips {
  id?: string;
  workFlowStepCode?: string;
  policyReference?: string;
  reference?: string;
  deliverySlipStatusId?: string;
  externalReinsuranceReference?: string;
  externalClientName?: string;
  meta?: {
    pageIndex?: number;
    pageSize?: number;
  };
}

export interface TreatSubscriptionQuittanceItem {
  quittanceId: number;
  externalTimelineHistoryId: string;
  externalNextTransitionId: string;
  honorDeclarationDocument: any;
  coverNoteDocument: any;
  documents?: any;
  comment?: string;
}

export interface ValidateSubscriptionQuittanceItem {
  quittanceId: number;
  externalTimelineHistoryId: string;
  externalNextTransitionId: string;
  documents?: any;
  comment?: string;
}

export interface TreatRecoveryQuittanceItem {
  quittanceId: number;
  externalTimelineHistoryId: string;
  externalNextTransitionId: string;
  documents?: any;
  comment?: string;
}

export interface ValidateRecoveryQuittanceItem {
  quittanceId: number;
  externalTimelineHistoryId: string;
  externalNextTransitionId: string;
  documents?: any;
  comment?: string;
}

export interface TreatReinsuranceDeliverySlipItem {
  deliverySlipId: number;
  externalTimelineHistoryId: string;
  externalNextTransitionId: string;
  documents?: any;
  comment?: string;
}
export interface ValidateReinsuranceDeliverySlipItem {
  deliverySlipId: number;
  externalTimelineHistoryId: string;
  externalNextTransitionId: string;
  settlementNote?: any;
  deliverySlipDetail?: any;
  documents?: any;
  comment?: string;
}
export interface TreatAccountingDeliverySlipItem {
  deliverySlipId: number;
  externalTimelineHistoryId: string;
  externalNextTransitionId: string;
  documents?: any;
  comment?: string;
}
export interface ValidateAccountingDeliverySlipItem {
  deliverySlipId: number;
  externalTimelineHistoryId: string;
  externalNextTransitionId: string;
  documents?: any;
  comment?: string;
}
export interface CreateDeliverySlipItem {
  quittanceLineIds: number[];
}
export interface Notification {
  id: string;
  subject?: string;
  body?: string;
  isSeen?: boolean;
  creationDate?: any;
  quittanceId?: string;
  deliverySlipId?: string;
  notificationTypeCode?: string;
  internalUserId?: number;
}
export interface FilterCriteriaNotifications {
  internalUserId: number;
  notificationTypeCode?: string;
  fromCreationDate?: Date;
  toCreationDate?: Date;
  isSeen?: boolean;
  meta?: {
    pageIndex?: number;
    pageSize?: number;
  };
}

export interface InternalUser {
  id: number;
  firstName?: string;
  lastName?: string;
  electronicAddressEmail?: string;
  isSeen?: boolean;
  meta?: {
    pageIndex?: number;
    pageSize?: number;
  };
}

export interface FilterCriteriaPayments {
  id?: string;
  workFlowStepCode?: string;
  policyReference?: string;
  reference?: string;
  quittanceStatusId?: string;
  meta?: {
    pageIndex?: number;
    pageSize?: number;
  };
}

export interface Payment {
  id: string;
  reference: string;
  settlementReference: string;
  settlementDate: number;
  publicPaymentStatusCode: string;
  publicPaymentStatusLabel: string;
  creationDate: string;
  amount: number;
}

export interface CreatePayment {
  deliverySlipIds: number[];
}

export interface ValidatePaymentItem {
  paymentId: number;
  documents?: any;
  amountExecuted?: string;
}

export interface Reinsurer {
  code: string;
  label?: string;
}