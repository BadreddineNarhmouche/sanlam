import { filterData } from "@checkTracking/helpers";

// *******************************************
// FormSearch fields
// *******************************************

const FIELD_CODE_LOT = {
  fieldId: "lot",
  type: "text",
  label: "check.search.lot",
  gridOccupancy: 2,
};

const FIELD_CODE_SIN = {
  fieldId: "sin",
  type: "text",
  label: "check.search.sin",
  gridOccupancy: 2,
};

const FIELD_POLICY_REFERENCE = {
  fieldId: "reference",
  type: "text",
  label: "check.search.checkNumber",
  gridOccupancy: 2,
};

// *******************************************
// FIRST_PAGE
// *******************************************

export const FIRST_PAGE_CHECK_FORM_SEARCH_FIELDS = (option: any) => {
  return [
    { ...FIELD_POLICY_REFERENCE, gridOccupancy: 4, isHeader: true },
    { ...FIELD_CODE_LOT, gridOccupancy: 4, isHeader: true },
    { ...FIELD_CODE_SIN, gridOccupancy: 4, isHeader: true },
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
