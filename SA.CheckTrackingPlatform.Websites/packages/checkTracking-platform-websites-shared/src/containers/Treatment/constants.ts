import { filterData } from "@checkTracking/helpers";

// *******************************************
// FormSearch fields
// *******************************************

const FIELD_CODE_LOT = {
  fieldId: "externalPartnerUserCode",
  type: "text",
  label: "check.search.lot",
  // label: "check.search.partnerUserCode",
  gridOccupancy: 2,
};

const FIELD_CODE_SIN = {
  fieldId: "externalPartnerUser",
  type: "text",
  label: "check.search.sin",
  gridOccupancy: 2,
};

const FIELD_POLICY_REFERENCE = {
  fieldId: "policyReference",
  type: "text",
  label: "check.search.checkNumber",
  gridOccupancy: 2,
};

const FIELD_CHECKS_STATUS = (statuses: any) => ({
  fieldId: "checkStatusId",
  type: "select",
  label: "check.search.status",
  options: filterData(statuses),
  gridOccupancy: 2,
});

// *******************************************
// FIRST_PAGE
// *******************************************

export const FIRST_PAGE_CHECK_FORM_SEARCH_FIELDS = (option: any) => {
  return [
    { ...FIELD_POLICY_REFERENCE, gridOccupancy: 3, isHeader: true },
    { ...FIELD_CODE_LOT, gridOccupancy: 3, isHeader: true },
    { ...FIELD_CODE_SIN, gridOccupancy: 3, isHeader: true },
    { ...FIELD_CHECKS_STATUS(option), gridOccupancy: 3, isHeader: true },
  ];
};

export const FIRST_PAGE_CHECK_TABLE_COLUMNS_DEFAULT = [
  { title: "Bénéficiaire" },
  { title: "Numéro de chèque" },
  { title: "Montant" },
  { title: "Service" },
  { title: "Numéro de lot" },
];

export const FIRST_PAGE_CHECK_TABLE_HIDDEN_COLUMNS_DEFAULT = [
  "id",
];;
