import { frTranslationMessages } from '../../translations/fr';
import { DEFAULT_LANGUAGE } from '../../constants/global';
export const formatTranslationMessages = (locale, messages) => {
    const defaultFormattedMessages = locale !== DEFAULT_LANGUAGE
        ? formatTranslationMessages(DEFAULT_LANGUAGE, frTranslationMessages)
        : {};
    return Object.keys(messages).reduce((formattedMessages, key) => {
        let message = messages[key];
        if (!message && locale !== DEFAULT_LANGUAGE) {
            message = defaultFormattedMessages[key];
        }
        return Object.assign(formattedMessages, { [key]: message });
    }, {});
};
export const translationMessages = {
    fr: formatTranslationMessages(DEFAULT_LANGUAGE, frTranslationMessages),
};
//# sourceMappingURL=intl.js.map