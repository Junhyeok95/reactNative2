interface IUserInfo {
  name: string;
  email: string;
}
interface IUserInfo2 {
  name: string | any;
  email: string | any;
  key: string | any;
}

interface IUserContext {
  URI: string | undefined;
  updateURI: (uri: string) => void;
  userInfo: IUserInfo | undefined;
  userInfo2: IUserInfo | undefined;
  login: (email: string, password: string) => void;
  login2: (email: string, password: string) => void;
  getUserInfo: () => void;
  getUserInfo2: () => void;
  logout: () => void;
  logout2: () => void;
}
