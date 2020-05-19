import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface Props { // cache 유저 있을 경우에 기록 뭉치를 부름
  cache?: boolean;
  children: JSX.Element | Array<JSX.Element>;
}

const DrivingDataContext = createContext<IDrivingData>({ // 초기값
  drivingSaveData: [],
  defaultInfo: [],
  linkInfo: [],
  checkInfo: [],
  drivingSave: (data?: IDrivingSaveData) => {},
  setDefaultInfo: (data: any) => {},
  setLinkInfo: (data: any) => {},
  setCheckInfo: (data: any) => {},
});

const DrivingDataProvider = ({cache, children}: Props) => { // 선언하면 이걸로 초기화됨

  const [drivingSaveData, setDrivingSaveData] = useState<Array<IDrivingSaveData>>([]); // 따로두면 시간,라인,마커 관계힘듬
  // 라즈베리 + 아두이노 정보 -> 14개
  // [ 신고버튼상태, 요, 피치, 롤, 시선방향, 좌눈, 우눈, 화면x, 화면y, 왼좌표x, 왼좌표y, 우좌표x, 우좌표y , 카운터 ] // 화면, 좌표는 1/3 된 값
  const [linkInfo, setLinkInfo] = useState<Array<number>>([-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1 ,-1]);
  // 휴대폰 기본 확인 정보
  // [ 날짜, 위도, 경도, 링크상태, 운전상태, 현재속도, 이전속도 ] -> 7개
  const [defaultInfo, setDefaultInfo] = useState<Array<number>>([-1,-1,-1,-1,-1,-1,-1]);
  // 토탈 체크 정보 -> 10개
  // [ 운전시작, 운전종료, 사고상태, 신고접수카운트, 가속상태, 가속횟수, 감속상태, 감속횟수, 졸음상태, 졸음횟수 ]
  const [checkInfo, setCheckInfo] = useState<Array<number>>([-1,-1,-1,-1, -1,-1,-1,-1,-1,-1]);

  const getCacheData = async (key: string) => { // 활용해서 운전기록뭉치 (날짜 : {기록 : {위도, 경도} , 포인트 : {내용}  })
    const cacheData = await AsyncStorage.getItem(key);
    if (cache === false || cacheData === null) {
      return undefined;
    }
    const cacheList = JSON.parse(cacheData); // 캐시 리스트에서 날짜 조회해서 지우기, 보관날짜 생각 년월일 숫자로 ...

    return cacheList;
  };

  const setCachedData = (key: string, data: Array<any>) => {
    AsyncStorage.setItem(key, JSON.stringify(data));
  };

  // 초기값 
  const setDrivingList = async () => { // 운전기록뭉치
    const cachedData = await getCacheData('DrivingList');
    if (cachedData) { // 기록이 있으면 가저옴
      setDrivingSaveData(cachedData);
      return;
    } else {
        // console.log('x cachedData -> setDrivingList()');
      return;
    }
  };

  // 운전 기록 후 setDraving, 그 뒤 캐시값으로 던지기
  const drivingSave = async (data?:IDrivingSaveData) => {
    console.log('drivingSave');
    // setDrivingSaveData([...drivingSaveData, {name:"", webUserId:"", time:0, Drivingline:[],DrivingMarker:[]}]);
    // setCachedData('DrivingList', drivingSaveData);
  }

  useEffect(() => {
    setDrivingList(); // 리스트 호출
  }, []);

  return (
    <DrivingDataContext.Provider
      value={{
        drivingSaveData,
        drivingSave,
        defaultInfo,
        setDefaultInfo,
        linkInfo,
        setLinkInfo,
        checkInfo,
        setCheckInfo
      }}>
      {children}
    </DrivingDataContext.Provider>
  );
};

export {DrivingDataProvider, DrivingDataContext};