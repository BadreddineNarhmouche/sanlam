import { Check } from "@checkTracking/helpers";

export const mapChecksList = (checks: any): Check[] => {
  return checks
    ? checks?.map((check: any) => ({
        id: check.id,
        beneficiaryName: check.beneficiaryName,
        checkNumber: check.checkNumber,
        amount: check.amount,
        serviceName: check.serviceName,
        lotNumber: check.lotNumber,
        sinisterNumber: check.sinisterNumber,
      }))
    : [];
};

export const mapAllChecksList = (checks: any): Check[] => {
  return checks
    ? checks?.map((check: any) => ({
        id: check.id,
        beneficiaryName: check.beneficiaryName,
        checkNumber: check.checkNumber,
        amount: check.amount,
        sinisterNumber: check.sinisterNumber,
        lotNumber: check.lotNumber,
      }))
    : [];
};
