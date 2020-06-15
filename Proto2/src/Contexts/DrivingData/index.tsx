import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface Props { // cache 유저 있을 경우에 기록 뭉치를 부름
  cache?: boolean;
  children: JSX.Element | Array<JSX.Element>;
}

const DrivingDataContext = createContext<IDrivingData>({ // 초기값
  drivingSaveDataArr: [],
  setDrivingSaveDataArr: (data: any) => {},

  drivingSaveData: undefined,
  setDrivingSaveData: (data: any) => {},

  linkInfo: [],
  setLinkInfo: (data: any) => {},
  defaultInfo: [],
  setDefaultInfo: (data: any) => {},
  checkInfo: [],
  setCheckInfo: (data: any) => {},

  drivingSave: (data?: IDrivingSaveData) => {},
  drivingRemove: () => {}
});

const DrivingDataProvider = ({cache, children}: Props) => { // 선언하면 이걸로 초기화됨

  // ## 필요한것 ... -> 운전시작시간, 운전종료시간, 위도경도 배열, 감지 배열(위도, 경도, 급정거, 급가속, 졸음, 주시태만, 날짜, 시간)
  const [drivingSaveDataArr, setDrivingSaveDataArr] = useState<Array<IDrivingSaveData> | undefined>([]); // 따로두면 시간,라인,마커 관계힘듬
  const [drivingSaveData, setDrivingSaveData] = useState<IDrivingSaveData>(); // 따로두면 시간,라인,마커 관계힘듬
  // 라즈베리 + 아두이노 정보 -> 14개
  // [ 신고버튼상태, 요, 피치, 롤, 시선방향, 좌눈, 우눈, 화면x, 화면y, 왼좌표x, 왼좌표y, 우좌표x, 우좌표y , 카운터 ] // 화면, 좌표는 1/3 된 값
  const [linkInfo, setLinkInfo] = useState<Array<number>>([-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1 ,-1]);
  // 휴대폰 기본 확인 정보
  // [ 공백, 위도, 경도, 링크상태, 운전상태, 현재속도, 이전속도 ] -> 7개
  const [defaultInfo, setDefaultInfo] = useState<Array<number>>([-1,-1,-1,-1,-1,-1,-1]);
  // 토탈 체크 정보 -> 10개
  // [ 운전시작, 운전종료, 사고상태, 신고접수카운트, 가속상태, 가속횟수, 감속상태, 감속횟수, 졸음상태, 졸음횟수, 태만상태, 태만횟수 ]
  const [checkInfo, setCheckInfo] = useState<Array<number>>([-1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1]);

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
    // ARR 작업을 하자
    const cachedData = await getCacheData('DrivingList');
    if (cachedData) { // 기록이 있으면 가저옴
      console.log("get Cache Data List > ", cachedData.length);
      setDrivingSaveDataArr(cachedData);
      return;
    } else {
        console.log('get Cache Data List x');
      return;
    }
  };

  // 운전 기록 후 setDraving, 그 뒤 캐시값으로 던지기
  const drivingSave = async (data?:IDrivingSaveData) => {
    console.log('운전 기록 시도');
    if(drivingSaveDataArr != undefined && data != undefined){
      let list = [...drivingSaveDataArr, data];
      console.log('운전 기록 성공', list.length);
      setDrivingSaveDataArr(list);
      AsyncStorage.setItem('DrivingList', JSON.stringify(list));
    }
  }

  const drivingRemove = async () => {
    console.log('drivingRemove');
    AsyncStorage.removeItem('DrivingList');
    setDrivingSaveDataArr(undefined);
  }

  // const setToDay = (): void => {
  //   // setTimeout(() => {
  //     let today = new Date();
  //     console.log(today);
  //     console.log(+new Date());
  //     let yyyy, mm, dd;
  //     yyyy = today.getFullYear().toString(); // 년도
  //     let month = today.getMonth() + 1;  // 월
  //     if(month<10) mm = "0"+month.toString();
  //     else mm = month.toString();
  //     let date = today.getDate();  // 날짜
  //     if(date<10) dd = "0"+date.toString();
  //     else dd = date.toString(); 
  //     let setDate = yyyy+mm+dd;
  //     // console.log(setDate);
  //     // console.log(typeof(setDate));
  //     // console.log(typeof(parseInt(setDate)));
  //     // console.log(typeof(yyyy));
  //     // console.log(typeof(today.getFullYear()));
  //     // console.log(typeof(today.getFullYear().toString()));
  //     let _defaultInfo = [...defaultInfo];
  //     _defaultInfo[0] = parseInt(setDate);
  //     setDefaultInfo(_defaultInfo);
  //   // }, 2000);
  // }

  useEffect(() => {
    setDrivingList(); // 리스트 호출
    // setToDay();
    // let ttt = new Date(3600000);
    // let ttt = new Date(1500000000000);
    // let ttt2 = new Date(1500000000000+7200000+240000+8000);
    // console.log("시간 -> " , ttt);
    // console.log("시간 -> " , ttt2);
    // console.log("시간 h -> " , ttt2.getHours()-ttt.getHours());
    // console.log("시간 m -> " , ttt2.getMinutes()-ttt.getMinutes());
    // console.log("시간 s -> " , ttt2.getSeconds()-ttt.getSeconds());
    // console.log("시간 t -> " , new Date(ttt2.getTime()-ttt.getTime()).getMinutes());
  }, []);

  return (
    <DrivingDataContext.Provider
      value={{
        drivingSaveDataArr,
        setDrivingSaveDataArr,

        drivingSaveData,
        setDrivingSaveData,
        
        defaultInfo,
        setDefaultInfo,
        linkInfo,
        setLinkInfo,
        checkInfo,
        setCheckInfo,

        drivingSave, // 저장 이외에 삭제도 필요함 하지만 지금은 필요하지않지
        drivingRemove
      }}>
      {children}
    </DrivingDataContext.Provider>
  );
};

export {DrivingDataProvider, DrivingDataContext};