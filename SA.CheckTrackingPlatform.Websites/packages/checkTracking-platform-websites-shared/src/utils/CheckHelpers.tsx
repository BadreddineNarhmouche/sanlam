import { InternalRoleCodeConstants } from "@checkTracking/helpers/lib/helpers/ConstantsHelper";
import { STATUS_TREATMENTS } from "../constants/global";
import { Chip } from "@checkTracking/ui-kit";

const ColorCodes = {
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

export const CheckByAllStatusComponent = (InternalRoleCode: string) => {
  switch (InternalRoleCode) {
    case InternalRoleCodeConstants.ReceiptByBusinessUnit:
      return STATUS_TREATMENTS.ReceiptByBusinessUnit;
    case InternalRoleCodeConstants.BoOut:
      return STATUS_TREATMENTS.BoOut;
    case InternalRoleCodeConstants.BoIn:
      return STATUS_TREATMENTS.BoIn;
    case InternalRoleCodeConstants.ClientOut:
      return STATUS_TREATMENTS.ClientOut;
    case InternalRoleCodeConstants.ClientIn:
      return STATUS_TREATMENTS.ClientIn;
    case InternalRoleCodeConstants.BackToBusinessUnit:
      return STATUS_TREATMENTS.BackToBusinessUnit;
    case InternalRoleCodeConstants.ReturnedCheckIn:
      return STATUS_TREATMENTS.ReturnedCheckIn;
    default:
      return "";
  }
};

export const TreatmentLabelComponent = (InternalRoleCode: string) => {
  switch (InternalRoleCode) {
    case InternalRoleCodeConstants.ReceiptByBusinessUnit:
      return "Reçu métier";
    case InternalRoleCodeConstants.BoOut:
      return "Envoi BO";
    case InternalRoleCodeConstants.BoIn:
      return "Reçu BO";
    case InternalRoleCodeConstants.ClientOut:
      return "Envoi client";
    case InternalRoleCodeConstants.ClientIn:
      return "Retour Client";
    case InternalRoleCodeConstants.BackToBusinessUnit:
      return "Retour métier";
    case InternalRoleCodeConstants.ReturnedCheckIn:
      return "Réception chèque retourné";
    default:
      return "";
  }
};

export const GetNextStatusComponent = (InternalRoleCode: string) => {
  switch (InternalRoleCode) {
    case STATUS_TREATMENTS.ReceiptByBusinessUnit:
      return STATUS_TREATMENTS.BoOut;
    case STATUS_TREATMENTS.BoOut:
      return STATUS_TREATMENTS.BoIn;
    case STATUS_TREATMENTS.BoIn:
      return STATUS_TREATMENTS.ClientOut;
    case STATUS_TREATMENTS.ClientOut:
      return STATUS_TREATMENTS.ClientIn;
    case STATUS_TREATMENTS.ClientIn:
      return STATUS_TREATMENTS.BackToBusinessUnit;
    case STATUS_TREATMENTS.BackToBusinessUnit:
      return STATUS_TREATMENTS.ReceiptByBusinessUnit;
    case STATUS_TREATMENTS.ReturnedCheckIn:
      return STATUS_TREATMENTS.BackToBusinessUnit;
    default:
      return "";
  }
};
