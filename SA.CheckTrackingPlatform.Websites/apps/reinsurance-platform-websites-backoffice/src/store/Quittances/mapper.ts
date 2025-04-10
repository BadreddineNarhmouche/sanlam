import {
  GetAllQuittancesByCriteriaItem,
  Quittance,
  QuittanceLine,
  TreatSubscriptionQuittanceItem,
  TreatRecoveryQuittanceItem,
  Reinsurer,
} from "@reinsurance/helpers";

export const mapSubscriptionPoliciesList = (
  items: any
): GetAllQuittancesByCriteriaItem[] => {
  return items
    ? items?.map((item: any) => ({
        policyReference: item.subscriptionResponse?.policyReference,
        reinsurerLabel: item.subscriptionResponse?.policySubscriberLabel,
        guaranteeTypes: item.subscriptionResponse.guaranteeTypes,
        branch: item.subscriptionResponse?.branchLabel,
        startDate: item.subscriptionResponse?.policyEffectiveDate,
        expirationDate: item.subscriptionResponse?.policyExprirationDate,
        details: mapSubscriptionQuittancesList(
          item.subscriptionResponse?.items
        ),
      }))
    : [];
};

export const mapSubscriptionQuittancesList = (quittances: any): Quittance[] => {
  return quittances
    ? quittances?.map((quittance: any) => ({
        id: quittance.id,
        reference: quittance.reference,
        publicQuittanceStatusCode: quittance.publicQuittanceStatusCode,
        publicQuittanceStatusLabel: quittance.publicQuittanceStatusLabel,
        policyReference: quittance.reference,
        reinsurance: quittance.reinsurance,
        beneficiaryLabel: quittance.beneficiaryLabel,
        intermediary: quittance.partnerUserCode,
        quittanceEffectiveDate: quittance.quittanceEffectiveDate,
        quittanceExprirationDate: quittance.quittanceExprirationDate,
        sla: quittance.sla,
        annualPremium: quittance.annualPremium,
        status: "",
      }))
    : [];
};

export const mapRecoveryQuittancesList = (
  items: any
): GetAllQuittancesByCriteriaItem[] => {
  return items
    ? items?.map((item: any) => ({
        id: item.recoveryResponse?.id,
        policyReference: item.recoveryResponse?.policyReference,
        reference: item.recoveryResponse?.reference,
        policySubscriberLabel: item.recoveryResponse?.policySubscriberLabel,
        partnerUserCode: item.recoveryResponse?.partnerUserCode,
        quittanceEffectiveDate: item.recoveryResponse?.quittanceEffectiveDate,
        quittanceNetPremiumAmount:
          item.recoveryResponse?.quittanceNetPremiumAmount,
        remainingNetPayable: item.recoveryResponse?.remainingNetPayable,
        reinsurerLabel: item.recoveryResponse.reinsurerLabel,
        beneficiaryLabel: item.recoveryResponse.beneficiaryLabel,
        paymentDeadline: item.recoveryResponse.paymentDeadline,
        sla: item.recoveryResponse?.sla,
        publicQuittanceStatusCode:
          item.recoveryResponse?.publicQuittanceStatusCode,
        publicQuittanceStatusLabel:
          item.recoveryResponse?.publicQuittanceStatusLabel,
        policyPaymentStatusCode: item.recoveryResponse?.policyPaymentStatusCode,
        policyPaymentStatusLabel:
          item.recoveryResponse?.policyPaymentStatusLabel,
        quittanceAnnotationHistoryData:
          item.recoveryResponse?.quittanceAnnotationHistories,
      }))
    : [];
};

export const mapReinsurancePoliciesList = (
  items: any
): GetAllQuittancesByCriteriaItem[] => {
  return items
    ? items?.map((item: any) => ({
        policyReference: item.reinsuranceResponse?.policyReference,
        reinsurerLabel: item.reinsuranceResponse?.policySubscriberLabel,
        count: item.reinsuranceResponse?.items.length,
        expirationDate: item.reinsuranceResponse?.policyExpirationDate,
        details: mapReinsuranceQuittancesList(item.reinsuranceResponse?.items),
      }))
    : [];
};

export const mapReinsuranceQuittancesList = (quittances: any): Quittance[] => {
  return quittances
    ? quittances?.map((quittance: any) => ({
        id: quittance.id,
        reference: quittance.reference,
        brutPremiumAmount: quittance.quittanceGrossPremiumAmount,
        netPremiumAmount: quittance.quittanceNetPremiumAmount,
        quittanceEffectiveDate: quittance.quittanceEffectiveDate,
        quittanceExprirationDate: quittance.quittanceExprirationDate,
        publicQuittanceStatusCode: quittance.publicQuittanceStatusCode,
        publicQuittanceStatusLabel: quittance.publicQuittanceStatusLabel,
        status: "",
        details: mapReinsuranceQuittanceLinesList(quittance.items),
      }))
    : [];
};

export const mapReinsuranceQuittanceLinesList = (
  quittanceLines: any
): QuittanceLine[] => {
  return quittanceLines
    ? quittanceLines?.map((quittanceLine: any) => ({
        quittanceReference: quittanceLine.quittanceReference,
        quittanceLinePolicyReference: quittanceLine.policyReference,
        id: quittanceLine.id,
        guaranteeTypeLabel: quittanceLine.guaranteeTypeLabel,
        reinsurerLabel: quittanceLine.reinsurerLabel,
        beneficiaryLabel: quittanceLine.beneficiaryLabel,
        quittanceCededPremium: quittanceLine.quittanceCededPremium,
        quittanceCededPremiumCIE: quittanceLine.quittanceCededPremiumCIE,
        commisionRate: quittanceLine.commissionRate,
        partnerCommissionRate: quittanceLine.partnerCommissionRate,
        cessionRate: quittanceLine.cessionRate,
        currency: quittanceLine.currency,
        isSelected: false,
      }))
    : [];
};

export const mapAccountingPoliciesList = (
  items: any
): GetAllQuittancesByCriteriaItem[] => {
  return items
    ? items?.map((item: any) => ({
        policyReference: item.accountingResponse?.policyReference,
        reinsurerLabel: item.accountingResponse?.policySubscriberLabel,
        branch: item.accountingResponse?.branchLabel,
        intermediary: item.accountingResponse?.partnerUserLabel,
        startDate: item.accountingResponse?.policyEffectiveDate,
        expirationDate: item.accountingResponse?.policyExprirationDate,
        details: mapAccountingQuittancesList(item.accountingResponse?.items),
      }))
    : [];
};

export const mapAccountingQuittancesList = (quittances: any): Quittance[] => {
  return quittances
    ? quittances?.map((quittance: any) => ({
        id: quittance.id,
        reference: quittance.reference,
        publicQuittanceStatusCode: quittance.publicQuittanceStatusCode,
        publicQuittanceStatusLabel: quittance.publicQuittanceStatusLabel,
        policyReference: quittance.policyReference,
        reinsurerLabel: quittance.reinsurerLabel,
        guaranteeTypes: quittance.guaranteeTypes,
        branchId: quittance.branchLabel,
        intermediary: quittance.partnerUserCode,
        quittanceEffectiveDate: quittance.quittanceEffectiveDate,
        quittanceExprirationDate: quittance.quittanceExprirationDate,
        sla: quittance.sla,
        status: "",
      }))
    : [];
};

export const mapSubscriptionQuittanceToTreatStep = (
  payload: TreatSubscriptionQuittanceItem
) => {
  return {
    quittanceId: payload.quittanceId,
    externalTimelineHistoryId: payload.externalTimelineHistoryId,
    externalNextTransitionId: payload.externalNextTransitionId,
    comment: payload.comment || "",
    honorDeclarationDocument: payload.honorDeclarationDocument,
    coverNoteDocument: payload.coverNoteDocument,
    documents: payload.documents || "",
  };
};

export const mapRecoveryQuittanceToTreatStep = (
  payload: TreatRecoveryQuittanceItem
) => {
  return {
    quittanceId: payload.quittanceId,
    externalTimelineHistoryId: payload.externalTimelineHistoryId,
    externalNextTransitionId: payload.externalNextTransitionId,
    comment: payload.comment || "",
    documents: payload.documents || "",
  };
};

export const mapReinsurerList = (items: any): Reinsurer[] => {
  return items
    ? items?.map((item: any) => ({
        code: item.code,
        label: item.label,
      }))
    : [];
};
