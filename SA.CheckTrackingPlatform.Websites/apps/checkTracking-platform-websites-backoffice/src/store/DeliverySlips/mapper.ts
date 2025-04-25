import {  TreatReinsuranceDeliverySlipItem, TreatAccountingDeliverySlipItem, QuittanceLine } from '@checkTracking/helpers';


export const mapReinsuranceDeliverySlipsList = (items: any): GetAllDeliverySlipsByCriteriaItem[] => {
    return items
        ? items?.map((item: any) => ({
            id: item.reinsuranceResponse?.id,
            reference: item.reinsuranceResponse?.reference,
            count: item.reinsuranceResponse?.items.length,
            settlementDate: item.reinsuranceResponse?.settlementDate,
            totalAmount: item.reinsuranceResponse?.totalAmount,
            sla: item.reinsuranceResponse?.sla,
            publicDeliverySlipStatusCode: item.reinsuranceResponse?.publicDeliverySlipStatusCode,
            publicDeliverySlipStatusLabel: item.reinsuranceResponse?.publicDeliverySlipStatusLabel,
            status: '',
            details: mapReinsuranceQuittancesList(item.reinsuranceResponse?.items)
        }))
        : [];
};

export const mapReinsuranceQuittancesList = (quittanceLines: any): QuittanceLine[] => {
    return quittanceLines
        ? quittanceLines?.map((quittanceLine: any) => ({
            id: quittanceLine.id,
            quittanceReference: quittanceLine.quittanceReference,
            policyReference: quittanceLine.policyReference,
            policyLabel: quittanceLine.policyLabel,
            guaranteeType: quittanceLine.guaranteeType,
            reinsurerLabel: quittanceLine.reinsurerLabel,
            beneficiaryLabel: quittanceLine.beneficiaryLabel,
            cessionRate: quittanceLine.cessionRate + '%',
        }))
        : [];
};

export const mapReinsuranceDeliverySlipToTreatStep = (payload: TreatReinsuranceDeliverySlipItem) => {
    return {
        deliverySlipId: payload.deliverySlipId,
        externalTimelineHistoryId: payload.externalTimelineHistoryId,
        externalNextTransitionId: payload.externalNextTransitionId,
        comment: payload.comment || '',
        documents: payload.documents || '',
    };
};


export const mapAccountingDeliverySlipsList = (items: any): GetAllDeliverySlipsByCriteriaItem[] => {
    return items
        ? items?.map((item: any) => ({
            id: item.accountingResponse?.id,
            virement: "8",
            reference: item.accountingResponse?.reference,
            count: item.accountingResponse?.items.length,
            totalAmount: item.accountingResponse?.totalAmount,
            sla: item.accountingResponse?.sla,
            publicDeliverySlipStatusCode: item.accountingResponse?.publicDeliverySlipStatusCode,
            publicDeliverySlipStatusLabel: item.accountingResponse?.publicDeliverySlipStatusLabel,
            status: '',
            details: mapAccountingQuittancesList(item.accountingResponse?.items)
        }))
        : [];
};

export const mapAccountingQuittancesList = (quittanceLines: any): QuittanceLine[] => {
    return quittanceLines
        ? quittanceLines?.map((quittanceLine: any) => ({
            id: quittanceLine.id,
            quittanceReference: quittanceLine.quittanceReference,
            policyReference: quittanceLine.policyReference,
            policyLabel: quittanceLine.policyLabel,
            guaranteeType: quittanceLine.guaranteeType,
            reinsurerLabel: quittanceLine.reinsurerLabel,
            beneficiaryLabel: quittanceLine.beneficiaryLabel,
            cessionRate: quittanceLine.cessionRate + '%',
        }))
        : [];
};

export const mapAccountingDeliverySlipToTreatStep = (payload: TreatAccountingDeliverySlipItem) => {
    return {
        deliverySlipId: payload.deliverySlipId,
        externalTimelineHistoryId: payload.externalTimelineHistoryId,
        externalNextTransitionId: payload.externalNextTransitionId,
        comment: payload.comment || '',
        documents: payload.documents || '',
    };
};