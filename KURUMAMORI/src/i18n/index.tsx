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
      // Configure
      deviceinformation: 'Device Information',
      devicecode: 'Device Code',
      purchasedate: 'Purchase Date',
      termsofuse: 'Terms of Use',
      termsofuselorem:
        'The purpose of this Agreement is to prescribe the conditions and procedures for the use of all services provided by the head office, the rights, obligations, responsibilities, and other necessary matters of the users and the site.',
      versioninformation: 'Version',
      currentversion: 'Current',
      latestversion: 'Latest',
      languageinformation: 'Language',
      currentlanguage: 'Current',
      change: 'Change',
      // Configure
      // MapData
      startdriving: 'Start',
      startdrivingmodal: 'Start driving',
      stopdriving: 'Stop',
      stopdrivingmodal: 'Stop driving',
      speed: 'Speed',
      drivingtime: 'Time',
      looking: 'Looking',
      front: 'Front',
      left: 'Left',
      right: 'Right',
      state: 'State',
      normal: 'Normal',
      drowsiness: 'Drowsiness',
      drowsinessalert: 'Drowsiness',
      latitude: 'Latitude',
      longitude: 'Longitude',
      time: 'Time',
      singotext:
        'An accident has been detected. If you do not press the cancel button, it will automatically report.',
      cancel: 'Cancel',
      reportOKtext2: 'Location and medical information has been sent.',
      reportOKtext3: 'Report is complete.',
      // MapData
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
      // Configure
      deviceinformation: '장치 정보',
      devicecode: '장치 코드',
      purchasedate: '구입 날짜',
      termsofuse: '이용 약관',
      termsofuselorem:
        '본 약관은 쿠루마모리가 제공하는 모든 서비스의 이용조건 및 절차,이용자와 당 사이트의 권리,의무,책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.',
      versioninformation: '버전 정보',
      currentversion: '현재 버전',
      latestversion: '최신 버전',
      languageinformation: '언어 정보',
      currentlanguage: '현재 언어',
      change: '변경하기',
      // Configure
      // MapData
      startdriving: '운전 시작',
      startdrivingmodal: '운전을 시작합니다',
      stopdriving: '운전 중지',
      stopdrivingmodal: '운전을 중지합니다',
      speed: '속도',
      drivingtime: '주행 시간',
      looking: '시선 감지',
      front: '정면',
      left: '좌',
      right: '우',
      state: '운전 상태',
      normal: '정상',
      drowsiness: '졸음',
      drowsinessalert: '졸음 감지',
      latitude: '위도',
      longitude: '경도',
      time: '현재 시간',
      singotext:
        '사고가 감지되었습니다. \n취소 버튼을 누르지 않으면 \n자동으로 신고됩니다.',
      cancel: '신고 취소',
      reportOKtext2: '위치정보, 의료정보 전송',
      reportOKtext3: '신고가 완료되었습니다',
      // MapData
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
      // Configure
      deviceinformation: '装置情報',
      devicecode: '装置コード',
      purchasedate: '購入日付',
      termsofuse: '利用約款',
      termsofuselorem:
        '本約款は本社が提供するすべてのサービスの利用条件および手続き、利用者と当サイトの権利、義務、責任事項とその他必要事項を規定することを目的とします。',
      versioninformation: 'バージョン情報',
      currentversion: '現在',
      latestversion: '最新',
      languageinformation: '言語情報',
      currentlanguage: '現在',
      change: '変更する',
      // Configure
      // MapData
      startdriving: '運転開始',
      startdrivingmodal: '運転を始めます',
      stopdriving: '運転中止',
      stopdrivingmodal: '運転を中止します',
      speed: '速度',
      drivingtime: '走行時間',
      looking: '視線検知',
      front: '正面',
      left: '左',
      right: '右',
      state: '運転状態',
      normal: '正常',
      drowsiness: '眠気',
      drowsinessalert: '眠気検知',
      latitude: '緯度',
      longitude: '経度',
      time: '現在時刻',
      singotext:
        '事故が検知されました。\nキャンセルボタンを\n押さない場合は、\n自動的に申告されます。',
      cancel: 'キャンセル',
      reportOKtext2: '位置情報、医療情報　送信',
      reportOKtext3: '申告が完了しました',
      // MapData
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
    lng: 'jp',
    fallbackLng: 'en', // lng 오류 시

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
