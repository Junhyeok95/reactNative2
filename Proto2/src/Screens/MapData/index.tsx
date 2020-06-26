import React, {useContext, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';

import IconButton from '~/Components/IconButton';
import Button from '~/Components/Button';

import {
  FlatList, Platform, Alert, Modal,
  PermissionsAndroid, AppState, StatusBar,
  NativeModules, NativeEventEmitter,} from 'react-native';

import {DrivingDataContext} from '~/Contexts/DrivingData';
import {UserContext} from '~/Contexts/User';

import Geolocation from 'react-native-geolocation-service';
import Sound from 'react-native-sound';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import ReactInterval from 'react-interval';
import LottieView from 'lottie-react-native';

const audioList = [
  {
    title: 'fast', // 0
    isRequire: true,
    url: require('./fast_detect.mp3')
  },
  {
    title: 'sleep', // 1 
    isRequire: true,
    url: require('./sleep_detect.mp3')
  },
  {
    title: 'slow', // 2
    isRequire: true,
    url: require('./slow_detect.mp3')
  },
  {
    title: 'sago', // 3
    isRequire: true,
    url: require('./sago.mp3')
  },
  {
    title: 'auto_singo', // 4
    isRequire: true,
    url: require('./auto_singo.mp3')
  },
  {
    title: 'singo_req', // 5
    isRequire: true,
    url: require('./singo_req.mp3')
  },
  {
    title: 'cancel', // 6
    isRequire: true,
    url: require('./cancel.mp3')
  },
  {
    title: 'singogo', // 7
    isRequire: true,
    url: require('./singogo.mp3')
  },
  {
    title: 'lookfront_eye', // 8
    isRequire: true,
    url: require('./lookfront_eye.mp3')
  },
  {
    title: 'i119', // 9
    isRequire: true,
    url: require('./i119.mp3')
  },
]

const Text = Styled.Text`
  font-size: 16px;
`;
const Text2 = Styled.Text`
  font-size: 24px;
`;

const Text_red = Styled.Text`
  color: #FF0000;
`;
const Text_blue = Styled.Text`
  color: #0000FF;
`;

const TopLeftView = Styled.View`
  position: absolute;
  background-color: #FFFFFFDD;
  border-color: #00F;
  border-width: 2px;
  border-radius: 16px;
  top: 1%;
  left: 2%;
  width: 55%;
  padding: 4% 8%;
`;
const TouchableOpacity = Styled.TouchableOpacity``;

const TopLeftViewTouch = Styled.View`
  flex: 1;
`;
const TopLeftViewTouch2 = Styled.View`
`;

const TopRightView = Styled.View`
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 25px;
  border-width: 1px;
  border-color: #AAA;
  top: 1%;
  right: 2%;
  width: 50px;
  height: 50px;
`;
const CenterRightView = Styled.View`
  position: absolute;
  right: 2%;
  top: 44%;
  width: 40px;
  height: 12%;
`;
const CenterTestTestRightView = Styled.View`
  position: absolute;
  right: 2%;
  top: 17%;
  width: 40px;
  height: 6%;
`;
const CenterTestRightView = Styled.View`
  position: absolute;
  right: 2%;
  top: 26%;
  width: 40px;
  height: 12%;
`;
const BottomLeftView = Styled.View`
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 25px;
  border-width: 1px;
  border-color: #AAA;
  bottom: 2%;
  left: 2%;
  width: 50px;
  height: 50px;
`;
const BottomLeftView2 = Styled.View`
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 25px;
  border-width: 1px;
  border-color: #AAA;
  bottom: 2%;
  left: 4%;
  margin-left: 50px;
  width: 50px;
  height: 50px;
`;
const BottomRightView = Styled.View`
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 10px;
  border-width: 2px;
  border-color: #AAA;
  bottom: 2%;
  right: 2%;
  width: 100px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;
const Bt = Styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const BtLabel = Styled.Text`
  font-size: 22px;
  font-weight: 900;
`;
const SingoView = Styled.View`
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 20px;
  border-width: 5px;
  border-color: #F00;
  top: 10%;
  left: 5%;
  right: 5%;
  bottom: 10%;
  justify-content: center;
  align-items: center;
  padding: 10%;
`;
const SingoTextView = Styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;
const SingoText = Styled.Text`
  font-size: 24px;
`;
const SingoCancelBtn = Styled.TouchableOpacity`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  border-width: 5px;
  border-color: #F00;
  justify-content: center;
  background-color: #DDDD;
  align-items: center;
`;
const SingoCancelBtnText = Styled.Text`
  font-size: 96px;
`;

const CenteredView = Styled.View`
  position: absolute;
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;
const ModalView = Styled.View`
  margin: 20px;
  backgroundColor: #000;
  borderRadius: 20px;
  padding: 35px;
  alignItems: center;
  shadowColor: #00F;
  shadowOffset: {
    width: 0px;
    height: 2px;
  };
  shadowOpacity: 0.5;
  shadowRadius: 5;
  elevation: 5;
`;


// position:"absolute", top:60, right:24, width:50, height:50, backgroundColor:"#0008", borderRadius:30, paddingTop:2

interface IGeolocation {
  latitude: number;
  longitude: number;
}

// 이동 .. ~/Contexts/DrivingData/@types/index.d.ts
// interface IMarkerlocation { // web DB 기준
//   latitude: number;
//   longitude: number;
//   bool_report: boolean;
//   bool_sudden_acceleration: boolean;
//   bool_sudden_stop: boolean;
//   bool_sleep: boolean;
//   timestamp: number;
// }

interface ICoordinate {
  latitude: number;
  longitude: number;
  speed: number | null;
  timestamp: any;
}

interface ILatLng {
  latitude: number;
  longitude: number;
}

interface ICamera {
  center: ILatLng;
  heading: number;
  pitch: number;
  zoom: number;
  altitude: number;
}
interface ILocation {
  latitude: number;
  longitude: number;
}

type TypeDrawerProp = DrawerNavigationProp<DrawNaviParamList, 'MainTabNavi'>;
interface DrawerProp {
  navigation: TypeDrawerProp;
}

const MapData = ({navigation}: DrawerProp) => {
  // 안드로이드 위치권한 요청
  const androidPermissionLocation = () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => { // check
        if (result) {
          console.log("android LOCATION check OK");
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => { // request
            if (result) {
              console.log("android LOCATION request Ok");
            } else {
              console.log("android LOCATION reject");
            }
          });
        }
      });
    } else if (Platform.OS === 'ios') {
      // Alert.alert('PermissionLocation, Android only');
    }
  };

  const face = (num:number) :string => {
    if(num==0) return " ";
    if(num==10) return "정면";
    if(num==20) return " 좌 ";
    if(num==30) return " 우 ";
    return "";
  }
  const eyePoint = (num:number) :string => {
    if(num==0) return "X";
    if(num==1) return "On";
    if(num==2) return "Off";
    return "";
  }
  const eyePoint2 = (num:number) :any => {
    if(num==0) return "X";
    if(num==1) return "눈 뜸";
    if(num==2) return <Text_blue>졸음</Text_blue>;
    return "";
  }
  
  const {
    drivingSaveData, setDrivingSaveData,
    drivingStart, drivingMarkerSave, drivingSave,
    linkInfo, setLinkInfo,
    defaultInfo, setDefaultInfo,
    checkInfo, setCheckInfo
  } = useContext(DrivingDataContext);

  const {userInfo2} = useContext<IUserContext>(UserContext);
  const [infoTouch, setInfoTouch] = useState<boolean>(false);
  
  const [modal, setModal] = useState<boolean>(false);
  const [marginTop, setMarginTop] = useState<number>(1);

  const [onTime, setOnTime] = useState<any>();
  const [speed, setSpeed] = useState<number>(0);

  const [linkInfo_4Cnt, setLinkInfo_4Cnt] = useState<number>(0);
  const [linkInfo_5Cnt, setLinkInfo_5Cnt] = useState<number>(0);

  const [onSave, setOnSave] = useState<boolean>(false);
  const [onPolyline, setOnPolyline] = useState<boolean>(false);
  const [onMarker, setOnMarker] = useState<boolean>(false);
  const [driving, setDriving] = useState<boolean>(false);

  // MapMarker Point
  const [_startTime, _setStartTime] = useState<number>(0);
  const [_endTime, _setEndTime] = useState<number>();
  // MapMarker Point

  const [coordinate, setCoordinate] = useState<ICoordinate>({
    latitude: 0.0000,
    longitude: 0.0000,
    speed: 0.0000,
    timestamp: 0,
     // Milliseconds since Unix epoch ㄴㄴㄴ
  });
  const [coordinate2, setCoordinate2] = useState<ICoordinate>({
    latitude: 0.0000,
    longitude: 0.0000,
    speed: 0.0000,
    timestamp: 0, // Milliseconds since Unix epoch
  });

  const [camera, setCamera] = useState<ICamera>({
    center: {
      latitude: 35.896311,
      longitude: 128.622051
    },
    heading: 0,
    pitch: 0,
    zoom: 15,
    altitude: 0
  });

  const [locations, setLocations] = useState<Array<IGeolocation>>([]);
  // 사고감지 locations
  const [markerLocations, setMarkerLocations] = useState<Array<IMarkerlocation>>([]);

  let sound1: Sound;
  let sound2: Sound;

  const [modalVisibleSleep, setModalVisibleSleep] = useState(false);

  useEffect(() => {
    // 장터발
    // setTimeout(jang, 1000);

    // 지울예정
    androidPermissionLocation();
    console.log("--- --- MapData Mount");

    return () => {
      console.log("--- --- MapData return");
    };

    // setModal(true);
    
    // let _check = [...checkInfo];
    // console.log(_check);
    
    // setCheckInfo([0,0,0,0,0,0,0,0,0]);
    // setLinkInfo([1,100,100,160,10,2,2,1,1,1,1,1,1,1]);

    // setCheckInfo([-1,-1,-1,-1 ,-1,-1,-1,-1,-1]);
    // setLinkInfo([-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1 ,-1]);

    // sound1 = new Sound(audioList[9].url, (error) => {
    //   if(error){
    //     return;
    //   } else {
    //     sound1.play((success)=>{
    //       sound1.release();
    //     })
    //   }
    // });

  },[]);


  let drivingClear_ = ():void => {
    // 신고버튼 빼고 클리어된다
    let _checkInfo = [...checkInfo];
    _checkInfo[3] = 0;
    _checkInfo[4] = 0;

    _checkInfo[6] = 0;
    _checkInfo[7] = 0;
    _checkInfo[8] = 0;
    _checkInfo[9] = 0;
    setCheckInfo(_checkInfo);
  }
  // 도탈 체크 ... 
  let linkInfo_ = ():void => {
    if(driving){ // 운전상태 체크

      if(checkInfo[3] == 1){
        // 카운트 모달 열기
        let _checkInfo = [...checkInfo];
        _checkInfo[4] += 1; // 신고접수 온
        console.log("신고 접수 카운트",checkInfo[4]);
        console.log(_checkInfo[4]);
        setCheckInfo(_checkInfo);
        console.log(checkInfo[4]);
      }

      // 전화중이다 애니메이션, 사고상태 클리어
      // 신고접수상태 클리어, 모달창 다 닫기
      if(checkInfo[4] >= 15){
        let _checkInfo = [...checkInfo];
        console.log("신고 접수 카운팅 완료 !!", checkInfo[4]);
        console.log(_checkInfo[4]);
        _checkInfo[3] = 0; // 신고접수상태 클리어
        _checkInfo[4] = 0;
        _checkInfo[5] = 1; // 신고완료상태 시작
        setCheckInfo(_checkInfo);
        // 카운트 모달 닫기

        // ############ 아아아아
        setModal(false);
        // ############ 아아아아

        // if(checkInfo[5] == 1){ 이걸 여기 흡수
        console.log("신고 접수 완료 !! 음성 송출");
        // 신고음성, 신고 전화중 모달 5~10초
        sound2 = new Sound(audioList[7].url, (error) => {
          if(error){
            return;
          } else {
            sound2.play((success)=>{
              sound2.release();
            })
          }
        });
        console.log("자동 신고로 인해 운전을 종료합니다");

        let _checkInfo2 = [...checkInfo];
        _checkInfo2[0] = 0; // 운전 종료
        _checkInfo2[1] = 1; // 운전 종료
        _checkInfo2[2] = 0; // 사고상태 클리어
        _checkInfo2[3] = 0; // 신고 접수상태 클리어
        _checkInfo2[4] = 0; // 신고 카운터 클리어
        _checkInfo2[5] = 0; // 신고 완료상태 클리어
        _checkInfo2[6] = 0; // 클리어
        _checkInfo2[7] = 0; // 클리어
        _checkInfo2[8] = 0; // 클리어
        _checkInfo2[9] = 0; // 클리어
        setCheckInfo(_checkInfo2);

        let reportCheckId = false;
        if(onSave && userInfo2 && userInfo2.key){
          if(userInfo2.key != -1 && userInfo2.key != undefined){
            if(userInfo2.key >= 3){
              reportCheckId = true;
            }
          }
        }
        let {latitude, longitude, timestamp} = coordinate2;
        let _markerLocation = {
          latitude,
          longitude,
          bool_report: reportCheckId,
          bool_sudden_acceleration: false,
          bool_sudden_stop: false,
          bool_sleep: false,
          timestamp, // 이건 앱에서만 활용함
        }
        console.log(_markerLocation);
        console.log(markerLocations.length);
        // 마커를 기록함
        setMarkerLocations([...markerLocations, _markerLocation]);
        if(onSave && userInfo2 && userInfo2.key){
          if(userInfo2.key != -1 && userInfo2.key != undefined){
            // 유저가 있으므로 마커를 웹으로 전송함
            console.log(_markerLocation);
            drivingMarkerSave(_markerLocation);
          }
        }

        let _drivingSaveData = Object.assign({}, drivingSaveData);
        let _endT = new Date().getTime();
        _setEndTime(() => _endT);
        // console.log(locations);

        if(locations){
          if(userInfo2 && userInfo2.key){
            _drivingSaveData.webUserId = userInfo2.key;
          }
          if(userInfo2 && userInfo2.name){
            _drivingSaveData.Drivingline = locations;
            _drivingSaveData.name = userInfo2.name;
            _drivingSaveData.startTime = _startTime;
            _drivingSaveData.endTime = _endT;
          }
          if(markerLocations != undefined){
            if(markerLocations.length > 1){
              console.log("저장한다 마크마크");
              _drivingSaveData.DrivingMarker = markerLocations;
            }
          }
          if(_drivingSaveData.endTime && _drivingSaveData.startTime){
            if(_drivingSaveData.endTime-_drivingSaveData.startTime > 500){
              console.log("운전을 기록합니다");
              drivingSave(_drivingSaveData); // 운전 종료 로직 4번으로 씀
            }
          }
        }
        
        setDrivingSaveData(undefined);
        setLocations([]); // 초기화
        setMarkerLocations([]);
        setDriving(false); // 운전
        setOnSave(false); // 기록        
      }

      // 카운트 10 이상 시
      // 신고 완료 상태 활성화 (운전 종료, 각종 클리어, 신고한다는 음성, 모달창 닫기)
    }
    
    // 신고 카운터가 꽉 차서 신고가 갔음
    if(checkInfo[5] == 1){
      console.log("check Info 5가 1입니다");
                // console.log("신고 접수 완료 !! 음성 송출");

                // // 신고음성, 신고 전화중 모달 5~10초
                // sound2 = new Sound(audioList[7].url, (error) => {
                //   if(error){
                //     return;
                //   } else {
                //     sound2.play((success)=>{
                //       sound2.release();
                //     })
                //   }
                // });
                
                // // 여기 신고완료 클리어 및 기록저장 및 신고
                // console.log("자동 신고로 인해 운전을 종료합니다");
                // setDriving(false);
                
                // let _checkInfo = [...checkInfo];
                // console.log("checkInfo 두개");
                // console.log(checkInfo[5]);
                // console.log(_checkInfo[5]);
                // _checkInfo[0] = 0; // 운전 종료
                // _checkInfo[1] = 1; // 운전 종료
                // _checkInfo[2] = 0; // 사고상태 클리어
                // _checkInfo[3] = 0; // 신고 접수상태 클리어
                // _checkInfo[4] = 0; // 신고 카운터 클리어
                // _checkInfo[5] = 0; // 신고 완료상태 클리어
                // _checkInfo[6] = 0; // 클리어
                // _checkInfo[7] = 0; // 클리어
                // _checkInfo[8] = 0; // 클리어
                // _checkInfo[9] = 0; // 클리어
                // setCheckInfo(_checkInfo);

                // let _drivingSaveData = Object.assign({}, drivingSaveData);
                // let _endT = new Date().getTime();
                // _setEndTime(() => _endT);
                // // console.log(locations);

                // if(locations){
                //   if(userInfo2 && userInfo2.key){
                //     _drivingSaveData.webUserId = userInfo2.key;
                //   }
                //   if(userInfo2 && userInfo2.name){
                //     _drivingSaveData.Drivingline = locations;
                //     _drivingSaveData.name = userInfo2.name;
                //     _drivingSaveData.startTime = _startTime;
                //     _drivingSaveData.endTime = _endT;
                //   }
                //   if(markerLocations != undefined){
                //     if(markerLocations.length > 1){
                //       console.log("저장한다 마크마크");
                //       _drivingSaveData.DrivingMarker = markerLocations;
                //     }
                //   }
                //   if(_drivingSaveData.endTime && _drivingSaveData.startTime){
                //     if(_drivingSaveData.endTime-_drivingSaveData.startTime > 500){
                //       console.log("운전을 기록합니다");
                //       drivingSave(_drivingSaveData);
                //     }
                //   }
                // }
                // setDrivingSaveData(undefined);
                // setLocations([]); // 초기화
                // setMarkerLocations([]);
                // setDriving(false); // 운전
                // setOnSave(false); // 기록
    }
  }

  let linkInfo_0 = ():void => {
    if(driving){ // 운전상태 체크
      if(linkInfo[0] == 119 && checkInfo[3] != 1 && checkInfo[10]!=119){ // 신고접수 상태 체크
        // 신고버튼 on상태, 신고접수 off상태, 이전신고버튼적용 no상태
          let _checkInfo = [...checkInfo];
          
          // 신고의사를 묻는 알람
          sound1 = new Sound(audioList[5].url, (error) => {
            if(error){
              return;
            } else {
              sound1.play((success)=>{
                sound1.release();
              })
            }
          });
        setModal(true);

          // 온과 동시에 카운트가 올라가고 신고접수, 버튼이 소모됨
          _checkInfo[2] = 1; // 사고상태 온
          _checkInfo[3] = 1; // 신고접수 온
          _checkInfo[10] = 119; // 신고 버튼 1회성 소모
          setCheckInfo(_checkInfo);
      }

      if(linkInfo[0] == 77 && checkInfo[3] == 1){ // 신고버튼 상태 체크
        // 취소버튼 on상태, 신고접수 on상태, 사고상태 on상태
        let _checkInfo = [...checkInfo];
        setModal(false);

        if(_checkInfo[3]!=0){
          // 신고취소를 알람
          sound1 = new Sound(audioList[6].url, (error) => {
            if(error){
              return;
            } else {
              sound1.play((success)=>{
                sound1.release();
              })
            }
          });
        }

        _checkInfo[2] = 0; // 사고상태 오프
        _checkInfo[3] = 0; // 신고접수 오프
        _checkInfo[4] = 0; // 신고 카운터 클리어
        _checkInfo[10] = 0; // 신고 버튼 1회성 리셋
        setCheckInfo(_checkInfo);
      }
      // 신고접수상태를 보고 카운터를 토탈체크에서 올리자
    }
  }

  let linkInfo_3 = ():void => {

    if(driving){ // 운전상태 체크
      if(checkInfo[2] != 1){ // 사고 상태 체크
        if(linkInfo[3] != -1 && linkInfo[3] != 0){ // 가울기 링크값이 들어오고있는지 체크
          if(linkInfo[3] < 50 || 150 < linkInfo[3]){ // 기울어젔는지 체크
            console.log("기울기 사고");

              // 신고의사를 묻는 알람
              sound1 = new Sound(audioList[5].url, (error) => {
                if(error){
                  return;
                } else {
                  sound1.play((success)=>{
                    sound1.release();
                  })
                }
              });

              // 이 모달로 2 3 을 취소시키는 뭔가를 만들어야함
              setModal(true);

              // 기울기 사고로 인한 사고접수 완료 !!

              // 사고 접수
              let _checkInfo = [...checkInfo];
              _checkInfo[2] = 1;
              _checkInfo[3] = 1;
              setCheckInfo(_checkInfo);
          }
        }
      }
    }
  };

  let linkInfo_4 = ():void => {
    if(driving){ // 운전상태 체크
      // if(checkInfo[9] != 1){ // 주시태만 상태 체크
        if(linkInfo[4] != -1){ // 값이 들어오고 있는지 체크
          if(linkInfo[4] == 30 || linkInfo[4] == 20){
            setLinkInfo_4Cnt((linkInfo_4Cnt)=>{
              return (
                linkInfo_4Cnt+1
              );
            });
            console.log("태만 체크", linkInfo_4Cnt);
            if(linkInfo_4Cnt > 6){
              // 태만 클리어
              setLinkInfo_4Cnt(0);
              // 태만 감지 사운드
              sound1 = new Sound(audioList[8].url, (error) => {
                if(error){
                  return;
                } else {
                  sound1.play((success)=>{
                    sound1.release();
                  })
                }
              });

              // // 주시태만 중
              // let _checkInfo = [...checkInfo];
              // _checkInfo[9] = 1;
              // setCheckInfo(_checkInfo);

              // setTimeout(() => {
              //   let _checkInfo = [...checkInfo];
              //   _checkInfo[9] = 0;
              //   setCheckInfo(_checkInfo);
              // }, 5000);
            }
          } else if( linkInfo[4] == 10 ){
            // 정면주시 보상
            console.log("정면 성공 체크", linkInfo_4Cnt);
            if(linkInfo_4Cnt>1){
              setLinkInfo_4Cnt((linkInfo_4Cnt)=>{
                return (
                  linkInfo_4Cnt -= 2
                );
              });
            }
            if(linkInfo_4Cnt<0){
              setLinkInfo_4Cnt((linkInfo_4Cnt)=>{
                return (
                  linkInfo_4Cnt = 0
                );
              });
            }
          } else {

          } // 
        } // 링크
      // } // 주시
    } // 운전
  }

  let linkInfo_5 = ():void => {
    if(driving){ // 운전상태 체크
      // if(checkInfo[8] != 1){ // 졸음 상태 체크
        if(linkInfo[5] != -1){ // 눈 값이 들어오고 있는지 체크
          if(linkInfo[5] == 2){ // 눈을 감고있는지 체크
            setLinkInfo_5Cnt((linkInfo_5Cnt)=>{
              return (
                linkInfo_5Cnt+1
              );
            });
            console.log(">> 졸음 체크", linkInfo_5Cnt);
            if(linkInfo_5Cnt > 6){
              // 졸음 클리어
              setLinkInfo_5Cnt(0);
              
              // 졸음감지
              sound1 = new Sound(audioList[9].url, (error) => {
                if(error){
                  return;
                } else {
                  sound1.play((success)=>{
                    sound1.release();
                  })
                }
              });
              let {latitude, longitude, timestamp} = coordinate2;
              let _markerLocation = {
                latitude,
                longitude,
                bool_report: false,
                bool_sudden_acceleration: false,
                bool_sudden_stop: false,
                bool_sleep: true,
                timestamp, // 이건 앱에서만 활용함
              }
              console.log(_markerLocation);
              console.log(markerLocations.length);
              // 마커를 기록함
              setMarkerLocations([...markerLocations, _markerLocation]);
              if(onSave && userInfo2 && userInfo2.key){
                if(userInfo2.key != -1 && userInfo2.key != undefined){
                  // 유저가 있으므로 마커를 웹으로 전송함
                  console.log(_markerLocation);
                  drivingMarkerSave(_markerLocation);
                }
              }

            }
          } else if (linkInfo[5] == 1){
            // 눈뜸 보상
            console.log(">> 눈뜸 체크", linkInfo_5Cnt);
            if(linkInfo_5Cnt>1){
              setLinkInfo_5Cnt((linkInfo_5Cnt)=>{
                return (
                  linkInfo_5Cnt -= 2
                );
              });
            }
            if(linkInfo_5Cnt<0){
              setLinkInfo_5Cnt((linkInfo_5Cnt)=>{
                return (
                  linkInfo_5Cnt = 0
                );
              });
            }
          } else {
            // console.log(" 11 아니고 22 아닌 상황");
          }
        }
      // }
    }
  }

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1, marginTop}}
        loadingEnabled={true}

        showsUserLocation={true}
        
        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={true}

        camera={camera}
        onUserLocationChange={ e => {
// 각종 값을 체크하는 함수를 만들어야함
// console.log("-> linkInfo ", linkInfo);
// console.log("-> defaultInfo ", defaultInfo);
// console.log("-> checkInfo ", checkInfo);
          if(onSave){
            // console.log("지터발   ", linkInfo);
            // console.log("장터발변수확인 > " , jangCnt);


            // 함수 체크 로직
            

            // console.log("onUserLocationChange !!");
            const {latitude, longitude} = e.nativeEvent.coordinate;
            setLocations([...locations, {latitude, longitude}]);

            setCoordinate2({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              speed: e.nativeEvent.coordinate.speed,
              // timestamp: e.nativeEvent.coordinate.timestamp,
              timestamp: new Date(),
            });

            setCamera( camera => {
              return ({
                center: {
                  latitude: latitude,
                  longitude: longitude
                },
                heading: 0,
                pitch: 0,
                zoom: camera.zoom,
                altitude: 0
              });
            });
            
            // console.log("checkInfo", checkInfo);
            // console.log("linkInfo", linkInfo);

          }
        }}
      >
        {onSave && onPolyline && (<Polyline
          coordinates={locations}
          strokeWidth={3}
          strokeColor="#00F" 
        />)}
        {onSave && onMarker && markerLocations.map((markerLocation: ILocation, index: number) => (
          <Marker
            key={`markerLocation-${index}`}
            coordinate={{
              latitude: markerLocation.latitude,
              longitude: markerLocation.longitude,
            }}
          />
        ))}
      </MapView>
      {driving && (
        <ReactInterval
        timeout={1000} enabled={driving}
        callback={() => {
          // console.log("짱 터발", linkInfo);
          linkInfo_();
          linkInfo_0();
          linkInfo_3();
          linkInfo_4();
          linkInfo_5();
        }}
        />
      )}

      {driving && (
        <TopLeftView style={{marginTop:getStatusBarHeight()}}>
          <TouchableOpacity onPress={()=>{
            setInfoTouch(!infoTouch);
          }}>
            <TopLeftViewTouch>
              {infoTouch == true ? (
                <>
                  {/* <Text2> {new Date(coordinate2.timestamp).getHours() + ":"+ new Date(coordinate2.timestamp).getMinutes() + ":"+ new Date(coordinate2.timestamp).getSeconds()} { typeof coordinate2.speed === "number" && coordinate2.speed > 0 ? (coordinate2.speed*3.6).toFixed(1)+" km/h" : ""}</Text2> */}
                  <Text2>
                    속도 : { typeof coordinate2.speed === "number" && coordinate2.speed >= 0 ? (coordinate2.speed*3.6).toFixed(1)+" km/h" : "0 km/h"}
                  </Text2>
                  <Text2>
                    차량 : {linkInfo[3]==-1?"0":linkInfo[3]-100} 도
                  </Text2>
                  <Text2>정면 / 좌 / 우</Text2>
                  <Text2>집중 / 졸음</Text2>
                  <Text2></Text2>
                  <Text>
                    시선감지 : {linkInfo[4]==-1?"X":face(linkInfo[4])} / {linkInfo[5]==-1?"X":eyePoint2(linkInfo[5])}
                  </Text>
                  <Text>
                    차량감지 : {linkInfo[1]==-1?"X":linkInfo[1]} / {linkInfo[2]==-1?"X":linkInfo[2]} / {linkInfo[3]==-1?"X":linkInfo[3]}
                  </Text>
                  <Text></Text>
              </>
              ) : (
                <>
                  <Text>
                    SLR : {linkInfo[4]==-1?"X":face(linkInfo[4])} / {linkInfo[5]==-1?"X":eyePoint(linkInfo[5])} / {linkInfo[6]==-1?"X":eyePoint(linkInfo[6])}
                  </Text>
                  <Text>
                    YPR : {linkInfo[1]==-1?"X":linkInfo[1]} / {linkInfo[2]==-1?"X":linkInfo[2]} / {linkInfo[3]==-1?"X":linkInfo[3]}
                  </Text>
                  <Text></Text>
                  <Text>위도 : {coordinate2.latitude.toFixed(5)}</Text>
                  <Text>경도 : {coordinate2.longitude.toFixed(5)}</Text>
                  <Text>속도 : {typeof coordinate2.speed === "number" ? (coordinate2.speed*3.6).toFixed(1)+" km/h" : ""}</Text>
                  {/* <Text>시간 : {parseInt((coordinate2.timestamp/1000).toString())}</Text> */}
                  <Text>시간 : {new Date(coordinate2.timestamp).getHours() + ":"+ new Date(coordinate2.timestamp).getMinutes() + ":"+ new Date(coordinate2.timestamp).getSeconds()}</Text>
                </>
              )}

              {/* <Text>위도 : {coordinate.latitude.toFixed(5)}</Text>
              <Text>경도 : {coordinate.longitude.toFixed(5)}</Text>
              <Text>속도 : {typeof coordinate.speed === "number" ? (coordinate.speed*3.6).toFixed(1)+" km/h" : ""}</Text>
              <Text>시간 : {parseInt((coordinate.timestamp/1000).toString())}</Text>
              <Text></Text> */}
              
            </TopLeftViewTouch>
          </TouchableOpacity>
        </TopLeftView>
      )}

      <TopRightView style={{marginTop:getStatusBarHeight()}}>
        <IconButton
          style={{flex:1}}
          icon="menu"
          color="#000000"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      </TopRightView>

      <CenterRightView>
        <IconButton
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#AAA",
            borderRadius: 10,
            borderWidth: 1,
          }}
          icon="plus"
          color="#000000"
          onPress={() => {
            setCamera({
              center: {
                latitude: camera.center.latitude,
                longitude: camera.center.longitude
              },
              heading: 0,
              pitch: 0,
              zoom: camera.zoom+1,
              altitude: 0
            });
          }}
        />
        <IconButton
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#AAA",
            borderRadius: 10,
            borderWidth: 1,
          }}
          icon="minus"
          color="#000000"
          onPress={() => {
            setCamera({
              center: {
                latitude: camera.center.latitude,
                longitude: camera.center.longitude
              },
              heading: 0,
              pitch: 0,
              zoom: camera.zoom-1,
              altitude: 0
            });
          }}
        />
      </CenterRightView>
      
      <CenterTestTestRightView>
        <IconButton
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#AAA",
            borderRadius: 10,
            borderWidth: 1,
          }}
          icon="wifi"
          color="#000000"
          onPress={() => {
            sound1 = new Sound(audioList[1].url, (error) => {
              if(error){
                return;
              } else {
                sound1.play((success)=>{
                  sound1.release();
                })
              }
            });
            let {latitude, longitude, timestamp} = coordinate2;
            let _markerLocation = {
              latitude,
              longitude,
              bool_report: false,
              bool_sudden_acceleration: false,
              bool_sudden_stop: false,
              bool_sleep: true,
              timestamp, // 이건 앱에서만 활용함
            }
            console.log(_markerLocation);
            console.log(markerLocations.length);
            // 마커를 기록함
            setMarkerLocations([...markerLocations, _markerLocation]);
            if(onSave && userInfo2 && userInfo2.key){
              if(userInfo2.key != -1 && userInfo2.key != undefined){
                // 유저가 있으므로 마커를 웹으로 전송함
                console.log(_markerLocation);
                drivingMarkerSave(_markerLocation);
              }
            }
        }}/>
      </CenterTestTestRightView>

      <CenterTestRightView>
        {/* 급가속 */}
        <IconButton
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#AAA",
            borderRadius: 10,
            borderWidth: 1,
          }}
          size="32"
          icon="car-electric"
          color="#000000"
          onPress={() => {
            sound1 = new Sound(audioList[0].url, (error) => {
              if(error){
                return;
              } else {
                sound1.play((success)=>{
                  sound1.release();
                })
              }
            });
            let {latitude, longitude, timestamp} = coordinate2;
            let _markerLocation = {
              latitude,
              longitude,
              bool_report: false,
              bool_sudden_acceleration: true,
              bool_sudden_stop: false,
              bool_sleep: false,
              timestamp, // 이건 앱에서만 활용함
            }
            console.log(_markerLocation);
            console.log(markerLocations.length);
            // 마커를 기록함
            setMarkerLocations([...markerLocations, _markerLocation]);
            if(onSave && userInfo2 && userInfo2.key){
              if(userInfo2.key != -1 && userInfo2.key != undefined){
                // 유저가 있으므로 마커를 웹으로 전송함
                console.log(_markerLocation);
                drivingMarkerSave(_markerLocation);
              }
            }
          }}
        />
        {/* airplane */}
        {/* gauge-empty */}
        {/* trending-up */}

        {/* 급감속 */}
        <IconButton
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#AAA",
            borderRadius: 10,
            borderWidth: 1,
          }}
          size="32"
          icon="car-off"
          color="#000000"
          onPress={() => {
            sound1 = new Sound(audioList[2].url, (error) => {
              if(error){
                return;
              } else {
                sound1.play((success)=>{
                  sound1.release();
                })
              }
            });
            let {latitude, longitude, timestamp} = coordinate2;
            let _markerLocation = {
              latitude,
              longitude,
              bool_report: false,
              bool_sudden_acceleration: false,
              bool_sudden_stop: true,
              bool_sleep: false,
              timestamp, // 이건 앱에서만 활용함
            }
            console.log(_markerLocation);
            console.log(markerLocations.length);
            // 마커를 기록함
            setMarkerLocations([...markerLocations, _markerLocation]);
            if(onSave && userInfo2 && userInfo2.key){
              if(userInfo2.key != -1 && userInfo2.key != undefined){
                // 유저가 있으므로 마커를 웹으로 전송함
                console.log(_markerLocation);
                drivingMarkerSave(_markerLocation);
              }
            }
          }}
        />
        {/* gauge-full */}
        {/* tortoise */}
        {/* trending-down */}
      </CenterTestRightView>

      <BottomLeftView>
        <IconButton
          icon="crosshairs-gps"
          color="#000000"
          onPress={() => {
            Geolocation.getCurrentPosition(
              async position => {
                const {latitude, longitude, speed} = position.coords;
                const {timestamp} = position;
                setCoordinate({
                  latitude: latitude,
                  longitude: longitude,
                  speed: speed,
                  timestamp: timestamp,
                });
                setCamera( camera => {
                  return ({
                    center: {
                      latitude: latitude,
                      longitude: longitude
                    },
                    heading: 0,
                    pitch: 0,
                    zoom: camera.zoom,
                    altitude: 0
                  });
                });
              },
              error => {
                console.log(error.code, error.message);
              },
              {
                timeout: 0,
                maximumAge: 0,
                enableHighAccuracy: true,
              }
            );
          }}
        />
      </BottomLeftView>
      {driving && (<BottomLeftView2>
        <IconButton
          icon={onPolyline?"eye":"eye-off"}
          color={onPolyline?"#00FA":"#AAAA"}
          onPress={() => {
            setOnPolyline(!onPolyline);
            setOnMarker(!onMarker);
          }}
        />
      </BottomLeftView2>)}

      <BottomRightView style={driving?{backgroundColor:"#00F"}:{backgroundColor:"#FFF"}}>
        <Bt
          onPress={()=>{
            if(driving){
              Alert.alert('운전을 종료합니다');
              console.log("운전을 종료합니다");
              // 저장해야함
              // _drivingSaveData.Drivingline = [...locations];
              let _drivingSaveData = Object.assign({}, drivingSaveData);
              let _endT = new Date().getTime();
              _setEndTime(() => _endT);
              // console.log(locations);

              if(locations){
                if(userInfo2 && userInfo2.key){
                  _drivingSaveData.webUserId = userInfo2.key;
                }
                if(userInfo2 && userInfo2.name){
                  _drivingSaveData.Drivingline = locations;
                  _drivingSaveData.name = userInfo2.name;
                  _drivingSaveData.startTime = _startTime;
                  _drivingSaveData.endTime = _endT;
                }
                if(markerLocations != undefined){
                  if(markerLocations.length > 1){
                    console.log("저장한다 마크마크");
                    _drivingSaveData.DrivingMarker = markerLocations;
                  }
                }
                if(_drivingSaveData.endTime && _drivingSaveData.startTime){
                  if(_drivingSaveData.endTime-_drivingSaveData.startTime > 500){
                    console.log("운전을 기록합니다");
                    drivingSave(_drivingSaveData);
                  }
                }
              }
              setDrivingSaveData(undefined);
              setLocations([]); // 초기화
              setMarkerLocations([]);
              // 저장해야함
              
              // --- 사고다시 가능
              let _checkInfo = [...checkInfo];
              _checkInfo[0] = 0;
              _checkInfo[1] = 1;
              setCheckInfo(_checkInfo);
              drivingClear_(); // checkInfo 클리어
              // --- 사고다시 가능
              Geolocation.clearWatch(0);

              // --- 운전 시작시간 클리어 ...
              _setStartTime(0);
              // --- 운전 시작시간 클리어 ...

              setDriving(false); // 운전
              setOnSave(false); // 기록
              
            } else {

              Alert.alert('운전을 시작합니다');

setTimeout(() => {
              if(userInfo2 && userInfo2.key){
                if(userInfo2.key != -1 && userInfo2.key != undefined){
                  console.log("아이디 확인, 운전 시작했다고 보고");
                  drivingStart(); // 아이디만 받음
                }
              }
              setOnPolyline(true);
              setOnMarker(true);

              // 저장해야함
              // save 전에 클리어
              setLocations([]);
              setMarkerLocations([]);
              _setStartTime(new Date().getTime());
              // 저장해야함
              
              // 운전시작
              let _checkInfo = [...checkInfo];
              _checkInfo[0] = 1;
              _checkInfo[1] = 0;
              setCheckInfo(_checkInfo);
              drivingClear_(); // checkInfo 클리어

              Geolocation.watchPosition(
                position => {
                  let now = new Date();
                  const {latitude, longitude, speed} = position.coords;
                  const {timestamp} = position;
                  setCoordinate({
                    latitude: latitude,
                    longitude: longitude,
                    speed: speed,
                    timestamp: timestamp,
                  });
                  setCamera( camera => {
                    return ({
                      center: {
                        latitude: latitude,
                        longitude: longitude
                      },
                      heading: 0,
                      pitch: 0,
                      zoom: camera.zoom,
                      altitude: 0
                    });
                  });
                },
                error => {
                  console.log(error);
                },
                {
                  timeout: 0,
                  maximumAge: 0,
                  enableHighAccuracy: true,
                  distanceFilter: 1,
                },
              );
            setDriving(true); // 운전
            setOnSave(true); // 기록

}, 2000);

            }

            // 무조건 실행, 운전스위치, 기록스위치
            // setDriving(!driving); // 운전
            // setOnSave(!onSave); // 기록
          }}
        >
          <BtLabel style={driving?{color:"#FFFFFF"}:{}}>
            {driving?"운전 종료":"운전 시작"}
          </BtLabel>
        </Bt>
      </BottomRightView>


      {modal &&
        <SingoView>
          <SingoTextView>
            <SingoText>사고가 감지되었습니다</SingoText>
            <SingoText>취소 버튼을 누르지않으면</SingoText>
            <SingoText>자동 신고를 하겠습니다</SingoText>
          </SingoTextView>
            <SingoCancelBtn
              onPress={()=>{
                setModal(false);
                let _checkInfo = [...checkInfo];
                _checkInfo[2] = 0; // 사고상태 오프
                _checkInfo[3] = 0; // 신고접수 오프
                _checkInfo[4] = 0; // 신고카운터 클리어
                setCheckInfo(_checkInfo);
                // 신고취소
                sound1 = new Sound(audioList[6].url, (error) => {
                  if(error){
                    return;
                  } else {
                    sound1.play((success)=>{
                      sound1.release();
                    })
                  }
                });
                // setTimeout(() => {
                //   let _checkInfo = [...checkInfo];
                //   _checkInfo[2] = 0;
                //   setCheckInfo(_checkInfo);
                // }, 5000);
              }}
            >
            <SingoCancelBtnText>취소</SingoCancelBtnText>
          </SingoCancelBtn>
        </SingoView>
      }

      {/* <CenteredView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleSleep}
        >
        </Modal>
        <ModalView>
        </ModalView>
      </CenteredView> */}
    </>
  );
};

export default MapData;

