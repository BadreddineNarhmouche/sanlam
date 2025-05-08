import { filterData } from "@checkTracking/helpers";

// *******************************************
// FormSearch fields
// *******************************************

const FIELD_PRIME_MIN = {
  fieldId: "primeNetMin",
  type: "intervalMin",
  label: "quittance.search.primemin",
  gridOccupancy: 2,
};

const FIELD_PRIME_MAX = {
  fieldId: "primeNetMax",
  type: "intervalMax",
  label: "quittance.search.prime",
  gridOccupancy: 2,
};

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

const FIELD_CLIENT = {
  fieldId: "externalClientName",
  type: "text",
  label: "quittance.search.client",
  gridOccupancy: 2,
};

const FIELD_DATETIME = {
  fieldId: "dateCreation",
  type: "datetime",
  label: "quittance.search.datemission",
  gridOccupancy: 2,
};

// const FIELD_REINSURER_SELECT = (statuses: any) => ({
//   fieldId: "externalcheckTrackingReference",
//   type: "select",
//   label: "quittance.search.status",
//   options: filterData(statuses),
//   gridOccupancy: 2,
// });

const FIELD_CHECKS_STATUS = (statuses: any) => ({
  fieldId: "quittanceStatusId",
  type: "select",
  label: "quittance.search.status",
  options: filterData(statuses),
  gridOccupancy: 2,
});

// *******************************************
// FIRST_PAGE
// *******************************************

export const FIRST_PAGE_QUITTANCE_FORM_SEARCH_FIELDS = (option: any) => {
  return [
    { ...FIELD_POLICY_REFERENCE, gridOccupancy: 3, isHeader: true },
    { ...FIELD_CODE, gridOccupancy: 2, isHeader: true },
    { ...FIELD_CHECKS_STATUS(option), gridOccupancy: 3, isHeader: true },
    { ...FIELD_PRIME_MIN, gridOccupancy: 2, isHeader: true },
    { ...FIELD_PRIME_MAX, gridOccupancy: 2, isHeader: true },
  ];
};

export const FIRST_PAGE_QUITTANCE_TABLE_COLUMNS_DEFAULT = [
  { title: "N° chéques" },
  { title: "BankId" },
  { title: "Type de garantie" },
  { title: "N° de police" },
  { title: "Code partenaire" },
  { title: "Nom du client" },



  // { title: "Branche" },
];

export const FIRST_PAGE_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT = [
  "id",
  // "publicQuittanceStatusCode",
  // "publicQuittanceStatusLabel",
  // "details",
  // "reference",
  // "isLoaded",
];
