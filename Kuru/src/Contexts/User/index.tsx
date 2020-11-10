/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import {useTranslation, initReactI18next} from 'react-i18next';

const defaultContext: IUserContext = {
  URL: undefined,
  updateURL: (_url: string) => {},
  userInfo: undefined,
  userInfo2: undefined,
  profileSearchRes: undefined,
  settingSearchRes: undefined,
  login: (_email: string, _password: string) => {},
  login2: (_email: string, _password: string) => {},
  getUserInfo: () => {},
  profileSearch: () => {},
  settingSearch: () => {},
  logout: () => {},
  userLanguage: undefined,
  updateUserLanguage: (_language: string) => {},
};
const UserContext = createContext(defaultContext);

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const UserContextProvider = ({children}: Props) => {
  const [URL, setURL] = useState<string>();
  const updateURL = (url: string): void => {
    setURL(url);
    AsyncStorage.setItem('saveURL', url);
  };
  const initURL = async () => {
    try {
      const myURL = await AsyncStorage.getItem('saveURL');
      if (myURL !== null) {
        setURL(myURL);
      } else if (myURL === null) {
        setURL('http://52.68.251.247');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {t, i18n} = useTranslation();
  const [userLanguage, setUserLanguage] = useState<string>();
  const updateUserLanguage = (language: string): void => {
    try {
      i18n
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
          lng: language, // 파라미터
        });
    } catch (error) {
      console.log('>>>', error);
    }
    setUserLanguage(language);
    AsyncStorage.setItem('saveUserLanguage', language);
    console.log('> updateUserLanguage : ', language);
  };
  const initUserLanguage = async () => {
    try {
      const myUserLanguage = await AsyncStorage.getItem('saveUserLanguage');
      if (myUserLanguage !== null) {
        setUserLanguage(myUserLanguage);
      } else if (myUserLanguage === null) {
        setUserLanguage('kr');
      }
      try {
        i18n
          .use(initReactI18next) // passes i18n down to react-i18next
          .init({
            lng: myUserLanguage !== null ? myUserLanguage : 'kr', // 파라미터
          });
      } catch (error) {
        console.log('>>>', error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  const [userInfo2, setUserInfo2] = useState<IUserInfo2 | undefined>(undefined);
  const [profileSearchRes, setProfileSearchRes] = useState<any | undefined>(
    undefined,
  );
  const [settingSearchRes, setSettingSearchRes] = useState<any | undefined>(
    undefined,
  );

  const login = (_email: string, _password: string): void => {
    let TEST_JSON_DATA = {name: 'WDJ', email: 'YJU.AC.KR', key: '-1'};
    console.log(JSON.stringify(TEST_JSON_DATA));
    AsyncStorage.setItem('login2', JSON.stringify(TEST_JSON_DATA)).then(() => {
      setUserInfo2({
        name: TEST_JSON_DATA.name,
        email: TEST_JSON_DATA.email,
        key: TEST_JSON_DATA.key,
      });
    });
  };

  const login2 = (email: string, password: string): void => {
    fetch(URL + '/app', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        _email: email,
        _password: password,
        _option: 0, // 로그인 로직
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        let data = JSON.stringify(json);
        if (json.id) {
          AsyncStorage.setItem('login2', data).then(() => {
            setUserInfo2({
              name: json.name,
              email: json.email,
              key: json.id,
            });
          });
        } else {
          Alert.alert('내용을 잘못입력했습니다', data);
        }
      })
      .catch((error) => {
        Alert.alert(error.toString());
      });
  };

  const profileSearch = () => {
    if (userInfo2) {
      console.log('의료정보 요청입니다');
      console.log(userInfo2.key);
      console.log(URL);
      fetch(URL + '/app', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          _option: 1, // 의료정보 로직
          _key: userInfo2.key,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log('의료정보 응답입니다');
          console.log(json);
          setProfileSearchRes(json);
        })
        .catch((error) => {
          Alert.alert(error.toString());
        });
    }
  };

  const settingSearch = () => {
    if (userInfo2) {
      fetch(URL + '/app', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          _option: 2, // 기기 로직
          _key: userInfo2.key,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setSettingSearchRes(json);
        })
        .catch((error) => {
          Alert.alert(error.toString());
        });
    }
  };

  const getUserInfo = (): void => {
    AsyncStorage.getItem('login2')
      .then((value) => {
        if (value && typeof value === 'string') {
          let userInfoAsyncStorage = JSON.parse(value);
          setUserInfo2({
            name: userInfoAsyncStorage.name,
            email: userInfoAsyncStorage.email,
            key: userInfoAsyncStorage.id,
          });
        } else {
          console.log('> getUserInfo else 발생');
        }
      })
      .catch(() => {
        console.log('> catch getUserInfo 에러');
        setUserInfo2(undefined);
      });
  };

  const logout = (): void => {
    AsyncStorage.removeItem('login2');
    setUserInfo(undefined);
    setUserInfo2(undefined);
    setProfileSearchRes(undefined);
    setSettingSearchRes(undefined);
  };

  useEffect(() => {
    getUserInfo();
    initURL();
    initUserLanguage();
  }, []);

  return (
    <UserContext.Provider
      value={{
        URL,
        updateURL,
        userLanguage,
        updateUserLanguage,
        userInfo,
        userInfo2,
        profileSearchRes,
        settingSearchRes,
        login,
        login2,
        getUserInfo,
        profileSearch,
        settingSearch,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContextProvider, UserContext};
