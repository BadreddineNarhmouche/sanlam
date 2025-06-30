//#region AuthorizedRoles

export const AuthorizedRoles = {
  CheckTrackingPlatform: "platform-back-office-checkTracking",
};

//#endregion AuthorizedRoles

//#region InternalRoleCodeConstants

export const InternalRoleCodeConstants = {
  ReceiptByBusinessUnit: "ReceiptByBusinessUnit",
  BoOut: "BoOut",
  BoIn: "BoIn",
  ClientOut: "ClientOut",
  ClientIn: "ClientIn",
  BackToBusinessUnit: "BackToBusinessUnit",
  ReturnedCheckIn: "ReturnedCheckIn",
};
//#endregion InternalRoleCodeConstants

//#region LocalStorageKeyConstants

export const LocalStorageKeyConstants = {
  internalUserInternalRoles: "CurrentInternalUserInternalRoles",
  internalUser: "CurrentInternalUser",
};

//#endregion LocalStorageKeyConstants

//#region HelpFilePaths

export const HelpFilePaths = {
  generalSpecific: `${process.env.PUBLIC_URL}/HelpFiles/generalSpecific.pdf`,
};

//#endregion HelpFilePaths

//#region WorkFlowStepCodeConstants

export const WorkFlowStepCodeConstants = {
  treatSubscription: "TreatSubscription",
  validateSubscription: "ValidateSubscription",
};

//#endregion WorkFlowStepCodeConstants

//#region DocumentTypeCodeConstants

export const DocumentTypeCodeConstants = {
  honorDeclaration: "HonorDeclaration",
  coverNote: "CoverNote",
  settlementNote: "SettlementNote",
  deliverySlipDetail: "DeliverySlipDetail",
  other: "Other",
};

//#endregion DocumentTypeCodeConstants

//#region GeneralConstants

export const GeneralConstants = {
  empty: "",
  whiteSpace: " ",
  starString: "*",
  plusString: "+",
  percentage: "%",
  dash: "-",
  colons: ":",
  slash: "/",
  comma: ",",
  openingParenthesis: "(",
  closingParenthesis: ")",
  openingBracket: "[",
  closingBracket: "]",
  point: ".",
  pipe: "|",
  greaterThan: ">",
  lessThan: "<",
  greaterThanOrEqual: ">=",
  lessThanOrEqual: "<=",
  equal: "=",
  semicolon: ";",
  threePoints: "...",
  doubleDash: "--",
  dashWithWhiteSpaces: " - ",
  colonsWithWhiteSpaces: " : ",
  equalWithWhiteSpaces: " = ",
  doubleEqual: "==",
  doubleEqualWithWhiteSpaces: " == ",
  minusOne: "-1",
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  defaultPageSize: 10,
};

//#endregion GeneralConstants

//#region RegexPatternConstants

export const RegexPatternConstants = {
  cardId: "^[A-Z]{1}[0-9]{4,6}$|^[A-Z]{2}[0-9]{4,6}$",
  electronicAddress:
    "^([a-zA-Z0-9_-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$",
  phoneNumber: "^+?[0-9]{10,}$",
  userName: "^(?=[a-zA-Z]{4})(?!.*[._-]{2})[a-zA-Z0-9._-]{4,16}$",
  website:
    "^[a-z0-9-.]+.[a-z](:[a-z0-9]*)?/?([a-z0-9-._?,'/\\+&amp;%$#=~])*[^.,)(s]$",
  bankAccountNumber: "^[0-9]{24}$",
  name: /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
};

//#endregion RegexPatternConstants

//#region StringLengthConstants

export const StringLengthConstants = {
  id: 40,
  number: 50,
  suffix: 1,
  identifier: 30,
  code: 60,
  label: 100,
  largeLabel: 300,
  comment: 200,
  description: 500,
  firstName: 19,
  lastName: 20,
  fullName: 40,
  cardId: 10,
  phoneNumber: 10,
  address: 70,
  managementEntity: 25,
  bankAccountNumber: 24,
  socialSecurityNumber: 30,
  electronicAddress: 254,
  organizationName: 150,
  documentName: 100,
  documentPath: 350,
  documentContentType: 100,
  folderLocalFullPath: 150,
  subject: 100,
  body: 1000,
  token: 200,
  salt: 20,
  baseUrl: 1800,
};

//#endregion StringLengthConstants

//#region ColorCodeConstants

export const ColorCodeConstants = {
  greenLight: "#E3FAF6",
  greenDark: "#76C2B6",
  yellowLight: "#FEF1D1",
  yellowDark: "#FCB718",
  redLight: "#F6CCD1",
  redDark: "#F44336",
  blueLight: "#E3F6FF",
  blueDark: "#0081C6",
  greyLight: "#CACACA",
  greyDark: "#6E6E6E",
};

//#endregion ColorCodeConstants

//#region PolicySourceSystemCodeConstants

export const PolicySourceSystemCodeConstants = {
  gis: "GIS",
  ais: "AIS",
};

//#endregion PolicySourceSystemCodeConstants

//#region ContentTypeConstants

export const ContentTypeConstants = {
  pdf: "application/pdf",
  excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

//#enregion ContentTypeConstants

//#region BoolConstants

export const BoolConstants = {
  true: "true",
  false: "false",
};

//#endregion BoolConstants

//#region CaseFormatConstants

export const CaseFormatConstants = {
  normal: "normal",
  upper: "upper",
  lower: "lower",
  upperFirstCharacterLowerOthers: "upperFirstCharacterLowerOthers",
};

//#endregion CaseFormatConstants

//#region PageSizes

export const DefaultPageSize = 10;

export const PageSizes = [10, 20, 30];

//#endregion PageSizes

export const FileExtensionConstants = {
  text: "txt",
  word: "docx",
  oldExcel: "xls",
  modernExcel: "xlsx",
  powerPoint: "pptx",
  project: "mpp",
  pdf: "pdf",
  bmp: "bmp",
  tga: "tga",
  jpg: "jpg",
  jpeg: "jpeg",
  jpe: "jpe",
  jfif: "jfif",
  jps: "jps",
  gif: "gif",
  png: "png",
  zip: "zip",
  rar: "rar",
  sql: "sql",
};

export const FileSizeConstants = {
  minimumLengthInBytes: 1,
  maximumLengthInBytes: 2000000,
};
