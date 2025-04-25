const CIN_REGEX = /^[A-Za-z]{1,2}\d{1,6}$/;
const DEFAULT_REGEX = '.*';
const MOBILE_PHONE_REGEX = /^(06|07)\d{8}$/;
const LANDLINE_PHONE_REGEX = /^(05)\d{8}$/;
const CHECK_ZERO_REGEX_10 = /^(?!0{10}$).{10}$/;
const CHECK_ZERO_REGEX_15 = /^(?!0{15}$).{15}$/;
const DIGITS_ONLY_REGEX = /^\d+$/;
const DIGITS_THOUSANDS_SEPARATOR = /(\d)(?=(\d{3})+(?!\d))/g;
export { CIN_REGEX, DEFAULT_REGEX, MOBILE_PHONE_REGEX, LANDLINE_PHONE_REGEX, CHECK_ZERO_REGEX_10, CHECK_ZERO_REGEX_15, DIGITS_ONLY_REGEX, DIGITS_THOUSANDS_SEPARATOR, };
//# sourceMappingURL=validators.js.map