import { filterData } from "@reinsurance/helpers";

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

export const SUBSCRIPTION_QUITTANCE_FORM_SEARCH_FIELDS = (option: any) => {
  return [
    { ...FIELD_POLICY_REFERENCE, gridOccupancy: 3, isHeader: true },
    { ...FIELD_CODE, gridOccupancy: 2, isHeader: true },
    { ...FIELD_REINSURER_SELECT(option), gridOccupancy: 3, isHeader: true },
    { ...FIELD_PRIME_MIN, gridOccupancy: 2, isHeader: true },
    { ...FIELD_PRIME_MAX, gridOccupancy: 2, isHeader: true },
  ];
};

export const SUBSCRIPTION_QUITTANCE_TABLE_COLUMNS_DEFAULT = [
  { title: "N° Police" },
  { title: "Assuré" },
  { title: "Type de garantie" },
  { title: "Branche" },
  { title: "Première date d'effet de police" },
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

// *******************************************
// RECOVERY
// *******************************************

export const RECOVERY_QUITTANCE_FORM_SEARCH_FIELDS = (
  option: any,
  statusCIOL: any
) => {
  return [
    { ...FIELD_POLICY_REFERENCE, gridOccupancy: 2, isHeader: true },
    { ...FIELD_CLIENT, gridOccupancy: 2, isHeader: true },
    { ...FIELD_DATETIME, gridOccupancy: 2, isHeader: true },
    { ...FIELD_CODE, gridOccupancy: 2, isHeader: true },
    { ...FIELD_REINSURER_SELECT(option), gridOccupancy: 2, isHeader: true },
    { ...FIELD_QUITTANCE_STATUS(statusCIOL), gridOccupancy: 2, isHeader: true },
  ];
};

export const RECOVERY_QUITTANCE_TABLE_COLUMNS_DEFAULT = [
  { title: "N° Police" },
  { title: "N° Quittance" },
  { title: "Client" },
  { title: "Réassureur" },
  { title: "Bénéficiaire du règlement" },
  { title: "Code intermédiaire" },
  { title: "Date Effet" },
  { title: "Prime Net" },
  { title: "NPR" },
  { title: "Statut" },
  { title: "Date limite de règlement" },
  { title: "SLA" },
];

export const RECOVERY_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT = [
  "id",
  "publicQuittanceStatusCode",
  "publicQuittanceStatusLabel",
  "policyPaymentStatusCode",
  "policyPaymentStatusLabel",
  "quittanceAnnotationHistoryData",
];

// *******************************************
// REINSURANCE
// *******************************************

export const REINSURANCE_FORM_SEARCH_FIELDS = (option: any) => {
  return [
    { ...FIELD_POLICY_REFERENCE, gridOccupancy: 4, isHeader: true },
    { ...FIELD_CLIENT, gridOccupancy: 4, isHeader: true },
    { ...FIELD_REINSURER_SELECT(option), gridOccupancy: 4, isHeader: true },
  ];
};

export const REINSURANCE_QUITTANCE_TABLE_COLUMNS_DEFAULT = [
  { title: "N° Police" },
  { title: "Client" },
  { title: "Nb de quittances" },
  { title: "Date Limite" },
];

export const REINSURANCE_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT = [
  "id",
  "quittanceReference",
  "quittanceLinePolicyReference",
  "publicQuittanceStatusCode",
  "publicQuittanceStatusLabel",
  "details",
  "isLoaded",
  "isSelected",
];

export const REINSURANCE_DELIVERYSLIP_CREATION_TABLE_HIDDEN_COLUMNS_DEFAULT = [
  "id",
  "quittanceId",
  "quittanceReference",
  "quittanceLinePolicyReference",
  "publicQuittanceStatusCode",
  "publicQuittanceStatusLabel",
  "details",
  "isLoaded",
  "isSelected",
];

export const REINSURANCE_QUITTANCE_TABLE_DETAILS_COLUMNS_DEFAULT = [
  { title: "" },
  { title: "N° de quittance" },
  { title: "Prime brut" },
  { title: "Prime net" },
  { title: "Date Effet" },
  { title: "Date Expiration" },
  { title: "Statut" },
  { title: "" },
];

export const REINSURANCE_QUITTANCE_TABLE_DETAILS_NESTED_COLUMNS_DEFAULT = [
  { title: "" },
  { title: "Cession" },
  { title: "Réassureur" },
  { title: "Bénéficiaire du règlement" },
  { title: "Prime cédée" },
  { title: "Prime cédée Nette de Com" },
  { title: "Com CIE" },
  { title: "Com Inter" },
  { title: "Taux de cession" },
  { title: "Devise" },
];

export const REINSURANCE_QUITTANCELINE_DELIVERYSLIP_CREATION_COLUMNS_DEFAULT = [
  { title: "Cession" },
  { title: "Réassureur" },
  // { title: "Bénéficiaire du règlement" },
  { title: "Prime cédée" },
  { title: "Prime cédée Nette de Com" },
  { title: "Com CIE" },
  { title: "Com Inter" },
  { title: "Taux de cession" },
  { title: "Devise" },
];

export const REINSURANCE_DELIVERYSLIP_TABLE_COLUMNS_DEFAULT = [
  { title: "N° Bordereau" },
  { title: "Nb de quittance" },
  { title: "Somme des montants" },
  { title: "SLA" },
  { title: "Statut" },
];

export const REINSURANCE_DELIVERYSLIP_TABLE_HIDDEN_COLUMNS_DEFAULT = [
  "id",
  "virement",
  "settlementDate",
  "publicQuittanceStatusCode",
  "publicQuittanceStatusLabel",
  "publicDeliverySlipStatusCode",
  "publicDeliverySlipStatusLabel",
  "details",
  "isLoaded",
];

export const REINSURANCE_DELIVERYSLIP_TABLE_DETAILS_COLUMNS_DEFAULT = [
  { title: "" },
  { title: "N° Quittance" },
  { title: "N° Police" },
  { title: "Assuré" },
  { title: "Cession" },
  { title: "Réassureur" },
  { title: "Bénéficiaire du règlement" },
  { title: "Taux de cession" },
];

// *******************************************
// ACCOUNTING
// *******************************************

export const ACCOUNTING_FORM_SEARCH_FIELDS = (option: any) => {
  return [
    { ...FIELD_POLICY_REFERENCE, gridOccupancy: 4, isHeader: true },
    { ...FIELD_CLIENT, gridOccupancy: 4, isHeader: true },
    { ...FIELD_REINSURER_SELECT(option), gridOccupancy: 4, isHeader: true },
    // { ...FIELD_QUITTANCE_STATUS([]), gridOccupancy: 3, isHeader: true },
  ];
};

export const ACCOUNTING_QUITTANCE_TABLE_COLUMNS_DEFAULT = [
  { title: "N° Virement" },
  { title: "N° de virement" },
  { title: "Date de virement" },
];

export const ACCOUNTING_QUITTANCELINE_DELIVERYSLIP_CREATION_COLUMNS_DEFAULT = [
  { title: "N° Bordereau" },
  { title: "Nb de quittance" },
  { title: "Somme des montants" },
  { title: "SLA" },
  { title: "Statut" },
];

export const ACCOUNTING_DELIVERYSLIP_CREATION_TABLE_HIDDEN_COLUMNS_DEFAULT = [
  "id",
  "virement",
  "publicDeliverySlipStatusCode",
  "publicDeliverySlipStatusLabel",
  "details",
  "isLoaded",
  "isSelected",
];

export const ACCOUNTING_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT = [
  "quittanceReference",
  "quittanceLinePolicyReference",
  "publicQuittanceStatusCode",
  "publicQuittanceStatusLabel",
  "details",
  "isLoaded",
  "isSelected",
];

export const ACCOUNTING_QUITTANCE_TABLE_DETAILS_COLUMNS_DEFAULT = [
  { title: "" },
  { title: "N° Quittance" },
  { title: "N° Police" },
  { title: "Client" },
  { title: "Cession" },
  { title: "Réassureur" },
  { title: "Bénéficiaire du règlement" },
  { title: "Taux de cession" },
];

export const ACCOUNTING_DELIVERYSLIP_TABLE_COLUMNS_DEFAULT = [
  { title: "N° Bordereau" },
  { title: "Nb de quittance" },
  { title: "Somme des montants" },
  { title: "SLA" },
  { title: "Statut" },
];

export const ACCOUNTING_DELIVERYSLIP_TABLE_HIDDEN_COLUMNS_DEFAULT = [
  "id",
  "virement",
  "publicQuittanceStatusCode",
  "publicQuittanceStatusLabel",
  "publicDeliverySlipStatusCode",
  "publicDeliverySlipStatusLabel",
  "details",
  "isLoaded",
  "isSelected",
];

export const ACCOUNTING_DELIVERYSLIP_TABLE_DETAILS_COLUMNS_DEFAULT = [
  { title: "" },
  { title: "N° Quittance" },
  { title: "N° Police" },
  { title: "Client" },
  { title: "Cession" },
  { title: "Réassureur" },
  { title: "Bénéficiaire du règlement" },
  { title: "Taux de cession" },
];

export const ACCOUNTING_PAYMENT_DELIVERYSLIP_TABLE_COLUMNS_DEFAULT = [
  { title: "N° de virement" },
  { title: "N° Bordereau" },
  { title: "Nb de quittance" },
  { title: "Somme des montants" },
  { title: "SLA" },
  { title: "Statut" },
];

export const ACCOUNTING_PAYMENT_DELIVERYSLIP_TABLE_HIDDEN_COLUMNS_DEFAULT = [
  "id",
  "publicQuittanceStatusCode",
  "publicQuittanceStatusLabel",
  "publicDeliverySlipStatusCode",
  "publicDeliverySlipStatusLabel",
  "details",
  "isLoaded",
  "isSelected",
  "quittanceId",
];

export const ACCOUNTING_PAYMENT_DELIVERYSLIP_TABLE_DETAILS_COLUMNS_DEFAULT = [
  { title: "" },
  { title: "N° Quittance" },
  { title: "N° Police" },
  { title: "Assuré" },
  { title: "Cession" },
  { title: "Réassureur" },
  { title: "Bénéficiaire du règlement" },
  { title: "Taux de cession" },
];
