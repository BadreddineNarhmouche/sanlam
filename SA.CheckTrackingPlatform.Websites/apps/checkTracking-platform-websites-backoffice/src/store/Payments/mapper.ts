import { Payment, QuittanceLine } from "@checkTracking/helpers";

export const mapPaymentList = (items: any): Payment[] => {
  return items
    ? items?.map((item: any) => ({
        id: item.accountingResponse.id,
        paymentId: item.accountingResponse.paymentId,
        reference: item.accountingResponse.reference,
        count: item.accountingResponse?.items.length,
        publicDeliverySlipStatusCode:
          item.accountingResponse.publicDeliverySlipStatusCode,
        publicDeliverySlipStatusLabel:
          item.accountingResponse.publicDeliverySlipStatusLabel,
        totalAmount: item.accountingResponse?.totalAmount,
        sla: item.accountingResponse?.sla,
        details: mapAccountingQuittancesList(item.accountingResponse?.items),
      }))
    : [];
};

export const mapAccountingQuittancesList = (
  quittanceLines: any
): QuittanceLine[] => {
  return quittanceLines
    ? quittanceLines?.map((quittanceLine: any) => ({
        id: quittanceLine.id,        
        quittanceReference: quittanceLine.quittanceReference,
        policyReference: quittanceLine.policyReference,
        policyLabel: quittanceLine.policyLabel,
        guaranteeType: quittanceLine.guaranteeType,
        reinsurerLabel: quittanceLine.reinsurerLabel,
        beneficiaryLabel: quittanceLine.beneficiaryLabel,
        cessionRate: quittanceLine.cessionRate + "%",
        quittanceId: quittanceLine.quittanceId,
      }))
    : [];
};
