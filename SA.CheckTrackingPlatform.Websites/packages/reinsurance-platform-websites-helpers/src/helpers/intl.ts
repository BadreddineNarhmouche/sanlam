export const translate = (idMessage: any, intl: any, values?: any): string =>
  intl?.formatMessage({id: idMessage}, values);
