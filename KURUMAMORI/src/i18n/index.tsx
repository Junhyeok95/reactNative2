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
      singin: 'Sign In',
      singup: 'Sign Up',
      incorrectlyentered: 'incorrectly entered',
      // SignIn
      // Navigator + Drawer
      main: 'Main',
      map: 'Map',
      statistics: 'statistics',
      driving: 'driving',
      pairing: 'pairing',
      information: 'Information',
      configure: 'setting',
      singout: 'Sing Out',
      // Navigator + Drawer
      // Driving
      pairingPlease: 'Please connect the pairing',
      pairingOK: 'Drive safely ~!',
      lefticon: 'Pairing',
      leftOKicon: 'No signal',
      righticon: 'No signal',
      rightOKicon: 'To go' + '\n' + 'driving',
      rightOKingicon: 'Driving',
      // Driving
      // Bluetooth
      bluetoothONalert: 'Please turn on Bluetooth',
      bluetooth: 'Bluetooth',
      list: 'Peripheral Device List',
      scan: 'Scan',
      // Bluetooth
      // Profile
      memberinformation: 'Member Information',
      membername: 'Name',
      membergender: 'Gender',
      memberbirthday: 'Birthday',
      memberphone: 'Mobile Phone',
      emergencycontactinformation: 'Emergency Contact Information',
      emergencycontactphone: 'Mobile Phone',
      medicalinformation: 'Medical Information',
      medicalhospital: 'Hospital',
      medicalhistory: 'Medical History',
      medication: 'Medication',
      medicalsymptom: 'Symptom',
      propertyinsurancecompany: 'Property Insurance Company',
      insurancecompany: 'Insurance Company',
      insurancecompanyphone: 'Mobile Phone',
      subscriptiondate: 'Subscription Date',
      maturitydate: 'Maturity Date',
      // Profile
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
      // Navigator + Drawer
      main: '메인',
      map: '지도',
      statistics: '통계',
      driving: '운전',
      pairing: '페어링',
      information: '정보',
      configure: '설정',
      singout: '로그아웃',
      // Navigator + Drawer
      // Driving
      pairingPlease: '페어링을 연결하십시오',
      pairingOK: '안전운전 하세요 ~!',
      lefticon: '페어링',
      leftOKicon: '신호없음',
      righticon: '신호없음',
      rightOKicon: '운전하기',
      rightOKingicon: '운전중',
      // Driving
      // Bluetooth
      bluetoothONalert: '블루투스를 켜 주세요',
      bluetooth: '블루투스',
      list: '주변 장치 목록',
      scan: '검색',
      // Bluetooth
      // Profile
      memberinformation: '회원 정보',
      membername: '이름',
      membergender: '성별',
      memberbirthday: '생일',
      memberphone: '연락처',
      emergencycontactinformation: '비상 연락망',
      emergencycontactphone: '연락처',
      medicalinformation: '의료 정보',
      medicalhospital: '다니는 병원',
      medicalhistory: '병력',
      medication: '복용중인 약',
      medicalsymptom: '증상',
      propertyinsurancecompany: '손해 보험사',
      insurancecompany: '보험사',
      insurancecompanyphone: '연락처',
      subscriptiondate: '가입일',
      maturitydate: '만기일',
      // Profile
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
      // SignIn
      // Navigator + Drawer
      main: 'メーン',
      map: '地図',
      statistics: '統計',
      driving: '運転',
      pairing: 'ペアリング',
      information: '情報',
      configure: '設定',
      singout: 'ログアウト',
      // Navigator + Drawer
      // Driving
      pairingPlease: 'ペアリングをつなげてください',
      pairingOK: '安全運転してください ~!',
      lefticon: 'ペアリング',
      leftOKicon: '信号なし',
      righticon: '信号なし',
      rightOKicon: '運転する',
      rightOKingicon: '運転中',
      // Driving
      // Bluetooth
      bluetoothONalert: 'ブルートゥースをつけてください',
      bluetooth: 'ブルートゥース',
      list: '周辺装置リスト',
      scan: '検索',
      // Bluetooth
      // Profile
      memberinformation: '会員情報',
      membername: '名前',
      membergender: '性別',
      memberbirthday: '誕生日',
      memberphone: '連絡先',
      emergencycontactinformation: '非常連絡網',
      emergencycontactphone: '連絡先',
      medicalinformation: '医療情報',
      medicalhospital: '通っている病院',
      medicalhistory: '病歴',
      medication: '服用中の薬',
      medicalsymptom: '症状',
      propertyinsurancecompany: '損害保険会社',
      insurancecompany: '保険会社',
      insurancecompanyphone: '連絡先',
      subscriptiondate: '加入日',
      maturitydate: '満期日',
      // Profile
      test: 'テスト',
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
