import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// import {useTranslation} from 'react-i18next';
// const {t} = useTranslation();
// 사용법 {t('newURL')}

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      // SignIn
      newURL: 'new URL input (ex) -> http://0.0.0.0:80',
      kurumamo: ' クルマモ',
      ri9: 'リ9 ',
      email: 'email',
      password: 'password',
      singin: 'Sign in',
      singup: 'Sign up',
      incorrectlyentered: 'incorrectly entered',
      // SignIn
      test: 'test',
      hello: 'hello',
      home: 'home',
    },
  },
  kr: {
    translation: {
      // SignIn
      newURL: '새로운 URL 입력 (예시) -> http://0.0.0.0:80',
      kurumamo: ' クルマモ',
      ri9: 'リ9 ',
      email: '이메일',
      password: '비밀번호',
      singin: '로그인',
      singup: '회원가입',
      incorrectlyentered: '잘못입력했습니다',
      // SignIn
      test: '테스트',
      hello: '안녕',
      home: '집',
    },
  },
  jp: {
    translation: {
      // SignIn
      newURL: '新しい URL 入力 (例) -> http://0.0.0.0:80',
      kurumamo: ' クルマモ',
      ri9: 'リ9 ',
      email: 'Eメール',
      password: 'パスワード',
      singin: 'ログイン',
      singup: '新規登録',
      incorrectlyentered: '入力ミスです',
      // SignIntest: 'テスト',
      hello: 'こんにちは',
      home: '家',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en', // lng 오류 시

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
