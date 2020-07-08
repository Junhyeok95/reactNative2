import I18n from "@types/i18n-js";
import * as RNLocalize from "react-native-localize";
import ko from "./ko"; // ko-KR
import en from "./en";
import jp from "./jp";

const locales = RNLocalize.getLocales();
console.log("하하", locales);

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
  en,
  ko,
  jp
};

export default I18n;