import { filterData } from "@checkTracking/helpers";

const Amount = {
    fieldId: "Amount",
    type: "intervalMin",
    label: "quittance.search.primemin",
    gridOccupancy: 2,
};

const BankId = {
    fieldId: "bankId",
    type: "text",
    label: "quittance.search.policyReference",
    gridOccupancy: 2,
};

const BranchId = {
    fieldId: "BranchId",
    type: "text",
    label: "quittance.search.policyReference",
    gridOccupancy: 2,
};

const ServicesId = {
    fieldId: "ServicesId",
    type: "text",
    label: "quittance.search.policyReference",
    gridOccupancy: 2,
};
const CheckNumber = {
    fieldId: "CheckNumber",
    type: "text",
    label: "quittance.search.policyReference",
    gridOccupancy: 2,
};
const LotNumber = {
    fieldId: "LotNumber",
    type: "text",
    label: "quittance.search.policyReference",
    gridOccupancy: 2,
};
const RecipientName = {
    fieldId: "RecipientName",
    type: "text",
    label: "quittance.search.policyReference",
    gridOccupancy: 2,
};
const SinisterNumber = {
    fieldId: "bankId",
    type: "text",
    label: "quittance.search.policyReference",
    gridOccupancy: 2,
};
const AccountNumber = {
    fieldId: "bankId",
    type: "text",
    label: "quittance.search.policyReference",
    gridOccupancy: 2,
};

const RegisterOrderNumber = {
    fieldId: "bankId",
    type: "text",
    label: "quittance.search.policyReference",
    gridOccupancy: 2,
};

const TransactionNumber = {
    fieldId: "bankId",
    type: "text",
    label: "quittance.search.policyReference",
    gridOccupancy: 2,
};
const BeneficiaryName = {
    fieldId: "bankId",
    type: "text",
    label: "quittance.search.policyReference",
    gridOccupancy: 2,
};

export const CHECK_DETAILS_TABLE_COLUMNS = (option: any) => {
    return [
        { ...BankId, gridOccupancy: 3, isHeader: true },
        { ...BranchId, gridOccupancy: 2, isHeader: true },
        { ...Amount, gridOccupancy: 2, isHeader: true },
        { ...ServicesId, gridOccupancy: 2, isHeader: true },
        { ...CheckNumber, gridOccupancy: 2, isHeader: true },
        { ...LotNumber, gridOccupancy: 2, isHeader: true },
        { ...RecipientName, gridOccupancy: 2, isHeader: true },
        { ...SinisterNumber, gridOccupancy: 2, isHeader: true },
        { ...AccountNumber, gridOccupancy: 2, isHeader: true },
        { ...RegisterOrderNumber, gridOccupancy: 2, isHeader: true },
        { ...TransactionNumber, gridOccupancy: 2, isHeader: true },
        { ...BeneficiaryName, gridOccupancy: 2, isHeader: true },
    ];
};

export const FIRST_PAGE_QUITTANCE_TABLE_COLUMNS_DEFAULT = [
    { title: "N° chéques" },
    { title: "BankId" },
    { title: "Type de garantie" },
    { title: "N° de police" },
    { title: "Code partenaire" },
    { title: "Nom du client" },
];