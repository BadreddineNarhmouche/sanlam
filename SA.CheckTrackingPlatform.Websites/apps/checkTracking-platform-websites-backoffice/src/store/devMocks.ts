export const isDevelopmentOffline =
  process.env.NODE_ENV === "development" &&
  process.env.REACT_APP_USE_DEV_MOCKS === "true";

export const devMockInternalRoles = [
  {
    internalUserId: 1,
    internalRoleId: 1,
    internalRoleCode: "ReceiptByBusinessUnit",
  },
  {
    internalUserId: 1,
    internalRoleId: 2,
    internalRoleCode: "BoOut",
  },
  {
    internalUserId: 1,
    internalRoleId: 3,
    internalRoleCode: "BoIn",
  },
  {
    internalUserId: 1,
    internalRoleId: 4,
    internalRoleCode: "ClientOut",
  },
  {
    internalUserId: 1,
    internalRoleId: 5,
    internalRoleCode: "ClientIn",
  },
  {
    internalUserId: 1,
    internalRoleId: 6,
    internalRoleCode: "BackToBusinessUnit",
  },
  {
    internalUserId: 1,
    internalRoleId: 7,
    internalRoleCode: "ReturnedCheckIn",
  },
];

export const devMockStatuses = [
  { id: 1, code: "EDT", label: "Edite" },
  { id: 2, code: "REM", label: "Recu metier" },
  { id: 3, code: "EB", label: "Envoi BO" },
  { id: 4, code: "RB", label: "Recu BO" },
  { id: 5, code: "EC", label: "Envoi client" },
  { id: 6, code: "RC", label: "Retour client" },
  { id: 7, code: "RM", label: "Retour metier" },
  { id: 8, code: "RCR", label: "Cheque retourne recu" },
];

export const devMockChecks = [
  {
    id: 101,
    amount: 1520.35,
    serviceName: "Auto",
    checkNumber: "CHK-000101",
    lotNumber: "LOT-2026-01",
    beneficiaryName: "Client Demo 1",
    sinisterNumber: "SIN-2026-001",
  },
  {
    id: 102,
    amount: 980.0,
    serviceName: "Sante",
    checkNumber: "CHK-000102",
    lotNumber: "LOT-2026-02",
    beneficiaryName: "Client Demo 2",
    sinisterNumber: "SIN-2026-002",
  },
  {
    id: 103,
    amount: 2350.9,
    serviceName: "Habitation",
    checkNumber: "CHK-000103",
    lotNumber: "LOT-2026-03",
    beneficiaryName: "Client Demo 3",
    sinisterNumber: "SIN-2026-003",
  },
];

export const devMockReasonMoves = [
  { id: 1, code: "MR", label: "Motif retour" },
  { id: 2, code: "MT", label: "Motif traitement" },
];

export const devMockKpis = {
  numberOfChecksIssuedButNotAcknowledgedByTheBusinessUnit: 2,
  numberOfChecksReceivedByBusinessUnitButNotByRegistryOffice: 1,
  numberOfChecksReceivedByRegistryOfficeButNotSentToClient: 1,
  numberOfReturnedChecksNotYetReceived: 0,
};

export const devMockTimelineResponse = {
  isSuccess: true,
  warningMessage: "",
  informationMessage: "Timeline mocked in development mode.",
};

export const devMockExportedKpiFile = {
  name: "kpi-demo.xlsx",
  contentType:
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  content: "AA==",
};

export const getDevMockCheckDetails = (checkId?: string | number) => {
  const selectedCheck =
    devMockChecks.find(
      (check) => String(check.id) === String(checkId ?? devMockChecks[0].id)
    ) ?? devMockChecks[0];

  return {
    ...selectedCheck,
    bankName: "Banque Demo",
    branchName: "Casablanca Centre",
    recipientName: "Registry Office",
    accountNumber: "ACC-0001",
    registerOrderNumber: "REG-0001",
    transactionNumber: "TX-0001",
    timelines: [
      {
        creationDate: "2026-03-03T09:00:00Z",
        status: {
          code: "EDT",
          label: "Edite",
        },
        user: {
          firstName: "Dev",
          lastName: "User",
        },
      },
      {
        creationDate: "2026-03-03T10:30:00Z",
        status: {
          code: "REM",
          label: "Recu metier",
        },
        user: {
          firstName: "Dev",
          lastName: "User",
        },
      },
    ],
  };
};
