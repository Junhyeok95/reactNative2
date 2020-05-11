import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

const defaultContext: IUserContext = {
  URI: undefined,
  updateURI: (uri: string) => {},
  userInfo: undefined,
  userInfo2: undefined,
  login: (email: string, password: string) => {},
  login2: (email: string, password: string) => {},
  getUserInfo: () => {},
  getUserInfo2: () => {},
  logout: () => {},
  logout2: () => {},
};

const UserContext = createContext(defaultContext);

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const UserContextProvider = ({children}: Props) => {
  // 사용 방법 -> const {} = useContext<IUserContext>(UserContext);
  const [URI,setURI] = useState<string>("http://btrya23.iptime.org:8000");
  const updateURI = (uri: string): void => {
    setURI(uri);
  }

  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  const [userInfo2, setUserInfo2] = useState<IUserInfo2 | undefined>(undefined);

  // 사용 방법 -> const {} = useContext<IUserContext>(UserContext);
  const login = (email: string, password: string): void => {
    // Use Eamil and Passowrd for login API
    // Get token and UserInfo via Login API
    AsyncStorage.setItem('token', 'let data = JSON.stringify()').then((data) => {
      console.log("> login ");
      console.log(data);
      // let json = JSON.parse(data)
      setUserInfo2({
        name: 'WDJ',
        email: 'YJU.AC.KR',
        key: '-1'
      });
    });
  };

  const login2 = (email: string, password: string): void => {
    fetch(
      URI+'/wdjapp', { 
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          _email: email,
          _password: password,
        })
    })
    .then(response => response.json())
    .then(json => {
      console.log(">> json");
      console.log(json);
      let data = JSON.stringify(json);
      if(json.id){
        AsyncStorage.setItem('login2', data).then((data) => {
          // let json = JSON.parse(data)
          setUserInfo2({
            name: json.name,
            email: json.email,
            key: json.id,
          });
        });
      } else {
        Alert.alert("내용을 잘못입력했습니다");
      }
    })
    .catch(error => {
      Alert.alert(error.toString());
    });
  };

  // 사용 방법 -> const {} = useContext<IUserContext>(UserContext);
  const getUserInfo = (): void => {
    // AsyncStorage.getItem('token')
    //   .then(value => {
    //     if (value) {
    //       setUserInfo({
    //         name: 'WDJ',
    //         email: 'YJU.AC.KR',
    //       });
    //     }
    //   })
    //   .catch(() => {
    //     setUserInfo(undefined);
    //   });
  };
  const getUserInfo2 = (): void => {
    AsyncStorage.getItem('login2')
      .then(value => {
        if (value && typeof value === 'string') {
          let userInfoAsyncStorage = JSON.parse(value);
          setUserInfo2({
            name: userInfoAsyncStorage.name,
            email: userInfoAsyncStorage.email,
            key: userInfoAsyncStorage.id
          });
        } else {
        }
      })
      .catch(() => {
        console.log("1! catch getUserInfo2 에러");
        setUserInfo2(undefined);
      });
  };
  // 사용 방법 -> const {} = useContext<IUserContext>(UserContext);
  const logout = (): void => {
    // AsyncStorage.removeItem('token');
    // setUserInfo(undefined);
  };
  const logout2 = (): void => {
    AsyncStorage.removeItem('login2');
    setUserInfo2(undefined);
  };

  useEffect(() => {
    // getUserInfo();
    getUserInfo2();
  }, []);

  return (
    <UserContext.Provider
      value={{
        URI,
        updateURI,
        userInfo,
        userInfo2,
        login,
        login2,
        getUserInfo,
        getUserInfo2,
        logout,
        logout2,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContextProvider, UserContext};