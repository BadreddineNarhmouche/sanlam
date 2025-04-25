import { filterData } from "@checkTracking/helpers";

// *******************************************
// FormSearch fields
// *******************************************

const FIELD_CODE = {
  fieldId: "externalPartnerUserCode",
  type: "text",
  label: "quittance.search.partnerUserCode",
  gridOccupancy: 2,
};

const FIELD_POLICY_REFERENCE = {
  fieldId: "policyReference",
  type: "text",
  label: "quittance.search.policyReference",
  gridOccupancy: 2,
};

const FIELD_REINSURER_SELECT = (statuses: any) => ({
  fieldId: "externalReinsuranceReference",
  type: "select",
  label: "quittance.search.reinsurer",
  options: filterData(statuses),
  gridOccupancy: 2,
});

const FIELD_QUITTANCE_STATUS = (statuses: any) => ({
  fieldId: "quittanceStatusId",
  type: "select",
  label: "quittance.search.status",
  options: filterData(statuses),
  gridOccupancy: 2,
});

// *******************************************
// SUBSCRIPTION
// *******************************************

export const SUBSCRIPTION_QUITTANCE_FORM_SEARCH_FIELDS = (
  option: any,
  optionStatus: any
) => {
  return [
    { ...FIELD_POLICY_REFERENCE, gridOccupancy: 3, isHeader: true },
    { ...FIELD_CODE, gridOccupancy: 3, isHeader: true },
    { ...FIELD_REINSURER_SELECT(option), gridOccupancy: 3, isHeader: true },
    {
      ...FIELD_QUITTANCE_STATUS(optionStatus),
      gridOccupancy: 3,
      isHeader: true,
    },
  ];
};

export const SUBSCRIPTION_QUITTANCE_TABLE_COLUMNS_DEFAULT = [
  { title: "N° Police" },
  { title: "Assuré" },
  { title: "Type de garantie" },
  { title: "Branche" },
  { title: "Date Effet" },
  { title: "Date Expiration" },
];

export const SUBSCRIPTION_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT = [
  "id",
  "publicQuittanceStatusCode",
  "publicQuittanceStatusLabel",
  "details",
  "reference",
  "isLoaded",
];

export const SUBSCRIPTION_QUITTANCE_TABLE_DETAILS_COLUMNS_DEFAULT = [
  { title: "" },
  { title: "N° Avenant" },
  { title: "Réassureur" },
  { title: "Bénéficiaire du règlement" },
  { title: "Intermédiaire" },
  { title: "Date Effet" },
  { title: "Date Expiration" },
  { title: "SLA" },
  { title: "Prime annuel" },
  { title: "" },
];
