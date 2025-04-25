import {frTranslationMessages} from '../../translations/fr';
import {DEFAULT_LANGUAGE} from '../../constants/global';

type Messages = Record<string, string>;

export const formatTranslationMessages = (
  locale: string,
  messages: Messages,
): Messages => {
  const defaultFormattedMessages: Messages =
    locale !== DEFAULT_LANGUAGE
      ? formatTranslationMessages(DEFAULT_LANGUAGE, frTranslationMessages)
      : {};

  return Object.keys(messages).reduce(
    (formattedMessages: Messages, key: string) => {
      let message: string = messages[key];
      if (!message && locale !== DEFAULT_LANGUAGE) {
        message = defaultFormattedMessages[key];
      }
      return Object.assign(formattedMessages, {[key]: message});
    },
    {},
  );
};

export const translationMessages = {
  fr: formatTranslationMessages(DEFAULT_LANGUAGE, frTranslationMessages),
};
