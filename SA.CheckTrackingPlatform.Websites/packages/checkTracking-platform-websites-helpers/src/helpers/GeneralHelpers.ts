import * as _ from "lodash";
import { GeneralConstants } from "../constants/global";
import { DIGITS_THOUSANDS_SEPARATOR } from "../constants/validators";
import { parse, isBefore } from "date-fns";
import { FileExtensionConstants } from "./ConstantsHelper";

const isArrayUndefinedOrEmpty = (arr: any[]): boolean => {
  return !arr || arr.length === 0;
};

const isStringNullOrWhiteSpace = (value): boolean => {
  return (
    value === undefined ||
    value === null ||
    value.trim() === GeneralConstants.empty
  );
};

const isObjectNull = (value): boolean => {
  return value === undefined || value === null;
};

const isObjectNotNull = (value): boolean => {
  return !isObjectNull(value);
};

const isStringNullOrEmpty = (value): boolean => {
  return (
    value === undefined || value === null || value === GeneralConstants.empty
  );
};

const isObjectNullOrEmpty = (obj): boolean => {
  if (obj === null || obj === undefined) {
    return true;
  }

  if (typeof obj !== "object") {
    return true;
  }

  return Object.keys(obj).length === 0;
};

const buildFullName = (firstName: string, lastName: string): string => {
  if (
    isStringNullOrWhiteSpace(firstName) &&
    isStringNullOrWhiteSpace(lastName)
  ) {
    return GeneralConstants.empty;
  } else {
    return isStringNullOrWhiteSpace(firstName)
      ? lastName
      : firstName.toLowerCase().charAt(0).toUpperCase() +
          firstName.slice(1) +
          (isStringNullOrWhiteSpace(lastName)
            ? GeneralConstants.empty
            : GeneralConstants.whiteSpace +
              lastName.toLowerCase().charAt(0).toUpperCase() +
              lastName.slice(1));
  }
};

const buildFullNameAbbreviation = (
  firstName: string,
  lastName: string
): string => {
  return (
    (isStringNullOrWhiteSpace(firstName)
      ? GeneralConstants.empty
      : firstName.charAt(0)) +
    (isStringNullOrWhiteSpace(lastName)
      ? GeneralConstants.empty
      : lastName.charAt(0))
  );
};

const buildOrganizationNameCode = (
  organizationName: string,
  code: string
): string => {
  if (isStringNullOrWhiteSpace(code)) {
    return organizationName;
  } else {
    return (
      organizationName +
      GeneralConstants.whiteSpace +
      GeneralConstants.openingParenthesis +
      code +
      GeneralConstants.closingParenthesis
    );
  }
};

const formatNumberInput = (value): string => {
  if (!value || isNaN(value)) return "";

  return parseFloat(value)
    .toString()
    .replace(DIGITS_THOUSANDS_SEPARATOR, "$1 ");
};

const parseInputValue = (inputValue): number => {
  const numericValue = inputValue.replace(/[^\d.]/g, "");
  const parsedValue = parseFloat(numericValue);
  return parsedValue;
};

const formatNumber = (num: number): any => {
  return isNumeric(num)
    ? num.toString().replace(DIGITS_THOUSANDS_SEPARATOR, "$1 ")
    : num;
};

const isNumeric = (number): boolean =>
  _.isFinite(_.parseInt(number)) && !_.isNaN(_.parseInt(number));

const getCurrentMonth = (intl: any): string => {
  const month = new Date().toLocaleString(intl.locale, { month: "long" });
  const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  return formattedMonth;
};

const isNumber = (variable: any): boolean => {
  return typeof variable === "number" && isFinite(variable);
};

const formatCurrentDate = (date: Date): string => {
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const base64ToUint8Array = (base64: string): any => {
  const binaryString = window.atob(base64); // decode base64
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const appendObjectToFormData = (
  obj: any,
  formData: FormData,
  prefix = ""
): void => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const fullKey =
        prefix && prefix !== ""
          ? Array.isArray(obj)
            ? `${prefix}[${key}]`
            : `${prefix}.${key}`
          : key;

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const arrayKey = `${fullKey}[${i}]`;
          if (value[i] && isFile(value[i])) {
            formData.append(fullKey, value[i]);
          } else if (Array.isArray(value[i]) || typeof value[i] === "object") {
            appendObjectToFormData(value[i], formData, arrayKey);
          } else {
            formData.append(arrayKey, value[i]);
          }
        }
      } else if (isFile(value)) {
        formData.append(fullKey, value);
      } else if (typeof value === "object") {
        appendObjectToFormData(value, formData, fullKey);
      } else {
        formData.append(fullKey, value);
      }
    }
  }
};

const isFile = (value: any): boolean => {
  return value instanceof File;
};

const filterObjectByTemplate = (
  obj: Record<string, any>,
  template: Record<string, any>
): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const key in template) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
};

const isFirstDateEarlier = (
  dateString1: any,
  dateString2: any,
  inputFormat: any = "dd/MM/yyyy"
): boolean => {
  try {
    const date1 = parse(dateString1, inputFormat, new Date());
    const date2 = parse(dateString2, inputFormat, new Date());

    // Compare the dates
    return isBefore(date1, date2);
  } catch (error) {
    return false;
  }
};

const filterDataByKeys = (dataArray: any[], keys: string[]): any[] => {
  return dataArray.map((item: any) => {
    const filteredItem: Record<string, any> = {};
    keys.forEach((key: string) => {
      // eslint-disable-next-line no-prototype-builtins
      if (item.hasOwnProperty(key)) {
        filteredItem[key] = item[key];
      }
    });
    return filteredItem;
  });
};

const isArrayNullOrEmpty = (value) => {
  if (value === undefined || !Array.isArray(value)) {
    return true;
  } else {
    return value.length <= 0;
  }
};

const isArrayNotNullOrEmpty = (value) => {
  return !isArrayNullOrEmpty(value);
};

const hashStringValue = (value: string, shift: number) => {
  return value
    .split("")
    .map((char) => {
      if (char.match(/[a-zA-Z]/)) {
        const isUpperCase = char === char.toUpperCase();
        const baseCharCode = isUpperCase
          ? "A".charCodeAt(0)
          : "a".charCodeAt(0);

        const charCode = char.charCodeAt(0);
        const shiftedCharCode =
          ((((charCode - baseCharCode + shift) % 26) + 26) % 26) + baseCharCode;

        return String.fromCharCode(shiftedCharCode);
      } else {
        return char;
      }
    })
    .join("");
};

const isFileTypeValid = (fileType) => {
  const knownContentTypes = [
    "text/plain",
    "text/xml",
    "text/richtext",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/x-png",
    "image/tiff",
    "image/bmp",
    "image/x-xbitmap",
    "image/x-jg",
    "image/x-emf",
    "image/x-wmf",
    "application/octet-stream",
    "application/postscript",
    "application/base64",
    "application/macbinhex40",
    "application/pdf",
    "application/xml",
    "application/atom+xml",
    "application/rss+xml",
    "application/x-compressed",
    "application/x-zip-compressed",
    "application/x-gzip-compressed",
    "application/x-msdownload",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  return knownContentTypes.includes(fileType);
};

const isFileSizeValid = (
  fileSize,
  minimumLengthInBytes,
  maximumLengthInBytes
) => {
  return fileSize > minimumLengthInBytes && fileSize <= maximumLengthInBytes;
};

const getFileExtension = (filename) => {
  var parts = filename.split(".");
  return parts[parts.length - 1].toLowerCase();
};

const isSupportedImageExtension = (filename) => {
  switch (getFileExtension(filename)) {
    case FileExtensionConstants.bmp:
    case FileExtensionConstants.tga:
    case FileExtensionConstants.jpg:
    case FileExtensionConstants.jpeg:
    case FileExtensionConstants.jpe:
    case FileExtensionConstants.jfif:
    case FileExtensionConstants.jps:
    case FileExtensionConstants.gif:
    case FileExtensionConstants.png:
      return true;
    default:
      return false;
  }
};

const isExcelExtension = (filename) => {
  var ext = getFileExtension(filename);
  return (
    ext === FileExtensionConstants.oldExcel ||
    ext === FileExtensionConstants.modernExcel
  );
};

const isPdfExtension = (filename) => {
  return getFileExtension(filename) === FileExtensionConstants.pdf;
};

const isTextExtension = (filename) => {
  return getFileExtension(filename) === FileExtensionConstants.text;
};

export const GeneralHelper = {
  isStringNullOrWhiteSpace,
  isObjectNull,
  isObjectNotNull,
  isObjectNullOrEmpty,
  isStringNullOrEmpty,
  buildFullName,
  buildFullNameAbbreviation,
  buildOrganizationNameCode,
  formatNumber,
  formatNumberInput,
  parseInputValue,
  isNumeric,
  getCurrentMonth,
  formatCurrentDate,
  base64ToUint8Array,
  appendObjectToFormData,
  isFile,
  isArrayUndefinedOrEmpty,
  filterObjectByTemplate,
  isFirstDateEarlier,
  isNumber,
  filterDataByKeys,
  isArrayNullOrEmpty,
  isArrayNotNullOrEmpty,
  hashStringValue,
  isFileTypeValid,
  isFileSizeValid,
  isSupportedImageExtension,
  isExcelExtension,
  isPdfExtension,
  isTextExtension,
};
