import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "Welcome": "English react-i18next",
      "hello": "hello",
      "home": "home"
    }
  },
  kr: {
    translation: {
      "Welcome": "KOREA",
      "hello": "안녕",
      "home": "집"
    }
  },
  jp: {
    translation: {
      "Welcome": "JAPAN",
      "hello": "こんにちは",
      "home": "家"

    }
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: "en", // lng 오류 시

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;