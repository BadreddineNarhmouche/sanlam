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
      }))
    : [];
};
