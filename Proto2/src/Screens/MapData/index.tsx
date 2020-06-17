import React, {useContext, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';

import IconButton from '~/Components/IconButton';
import Button from '~/Components/Button';

import {
  FlatList, Platform, Alert,
  PermissionsAndroid, AppState, StatusBar,
  NativeModules, NativeEventEmitter,} from 'react-native';

import {DrivingDataContext} from '~/Contexts/DrivingData';
import {UserContext} from '~/Contexts/User';

import Geolocation from 'react-native-geolocation-service';
import Sound from 'react-native-sound';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getBottomSpace } from 'react-native-iphone-x-helper';

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
  }
]

const Text = Styled.Text`
  font-size: 16px;
`;
const TopLeftView = Styled.View`
  position: absolute;
  background-color: #FFFFFFDD;
  border-color: #00F;
  border-width: 2px;
  border-radius: 16px;
  top: 1%;
  left: 2%;
  width: 50%;
  padding: 5% 10%;
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
const CenterTestRightView = Styled.View`
  position: absolute;
  right: 2%;
  top: 24%;
  width: 40px;
  height: 6%;
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
  font-size: 32px;
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
  timestamp: number;
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
    if(num==0) return "X";
    if(num==10) return "정면";
    if(num==20) return "왼쪽";
    if(num==30) return "오른쪽";
    return "";
  }
  const eyePoint = (num:number) :string => {
    if(num==0) return "X";
    if(num==1) return "On";
    if(num==2) return "Off";
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
  
  const [modal, setModal] = useState<boolean>(false);
  const [marginTop, setMarginTop] = useState<number>(1);

  const [onTime, setOnTime] = useState<any>();
  const [speed, setSpeed] = useState<number>(0);

  const [onSave, setOnSave] = useState<boolean>(false);
  const [onPolyline, setOnPolyline] = useState<boolean>(false);
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
  let singoSetTimeout: NodeJS.Timeout;

  useEffect(() => {
    // 지울예정
    // setCheckInfo([-1,-1,-1,-1, -1,-1,-1,-1,-1,-1]);
    androidPermissionLocation();
    console.log("--- --- MapData Mount");
  },[]);

  let linkInfo_3 = ():void => {
    // if(driving){ // 운전상태 체크
      if(checkInfo[2] != 1){ // 사고 상태 체크
        if(linkInfo[3] != -1){ // 가울기 링크값이 들어오고있는지 체크
          if(linkInfo[3] < 70 || 130 < linkInfo[3]){ // 기울어젔는지 체크
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

            setModal(true);
            singoSetTimeout = setTimeout(() => {

              setModal(false);
              // // 신고되는 http 로직 넣어야함

              // 신고를 했다는 알림
              sound2 = new Sound(audioList[7].url, (error) => {
                if(error){
                  return;
                } else {
                  sound2.play((success)=>{
                    sound2.release();
                  })
                }
              });

            }, 10000);

            let _checkInfo = [...checkInfo];
            _checkInfo[2] = 1;
            setCheckInfo(_checkInfo);
          }
        }
      }
    // }
  };

  let linkInfo_4Cnt = 0; // 태만 카운트
  let linkInfo_4 = ():void => {
    // if(driving){ // 운전상태 체크

    // 주시태만 체크
    // if(checkInfo[?] != 1){ // 주시태만 상태 체크
    //   if(linkInfo[10] != -1){ // 값이 들어오고 있는지 체크
        if(linkInfo[4] == 30 || linkInfo[4] == 20){
          linkInfo_4Cnt++; // sleep 체크 변수
          console.log("태만 체크", linkInfo_4Cnt);
            if(linkInfo_4Cnt > 5){
              // 태만 클리어
              linkInfo_4Cnt = 0;
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
              // _checkInfo[?] = 1;
              // setCheckInfo(_checkInfo);

              // setTimeout(() => {
              //   let _checkInfo = [...checkInfo];
              //   _checkInfo[?] = 0;
              //   setCheckInfo(_checkInfo);
              // }, 5000);
            }
        } else if( linkInfo[4] == 10 ){
          // 정면주시 보상
          console.log("정면 성공 체크", linkInfo_4Cnt);
          if(linkInfo_4Cnt>1){
            linkInfo_4Cnt -= 2;
          }
        } else {

        }
    //     }
    //   }
    // }
      // }
  }

  let linkInfo_5Cnt = 0; // 졸음 카운트
  let linkInfo_5 = ():void => {
    // if(driving){ // 운전상태 체크

    // if(checkInfo[?] != 1){ // 졸음 상태 체크
    //   if(linkInfo[5] != -1){ // 눈 값이 들어오고 있는지 체크
        if(linkInfo[5] == 2 && linkInfo[6] == 2){ // 눈을 감고있는지 체크
          linkInfo_5Cnt++; // sleep 체크 변수
          console.log(">>        졸음 체크", linkInfo_5Cnt);
            if(linkInfo_5Cnt > 8){
              // 졸음 클리어
              linkInfo_5Cnt = 0;
              // 졸음운전 슬립 사운드
              sound1 = new Sound(audioList[1].url, (error) => {
                if(error){
                  return;
                } else {
                  sound1.play((success)=>{
                    sound1.release();
                  })
                }
              });
              

              // let _checkInfo = [...checkInfo];
              // _checkInfo[?] = 1;
              // setCheckInfo(_checkInfo);

              // setTimeout(() => {
              //   let _checkInfo = [...checkInfo];
              //   _checkInfo[?] = 0;
              //   setCheckInfo(_checkInfo);
              // }, 5000);
            }
        } else if (linkInfo[5] == 1 && linkInfo[6] == 1){
          console.log(">>        눈뜸 성공 체크", linkInfo_5Cnt);
          if(linkInfo_5Cnt>1){
            linkInfo_5Cnt -= 2;
          }
        } else {

        }
    //     }
    //   }
    // }
      // }
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
            // console.log("onUserLocationChange !!");
            const {latitude, longitude} = e.nativeEvent.coordinate;
            setLocations([...locations, {latitude, longitude}]);

            setCoordinate2({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              speed: e.nativeEvent.coordinate.speed,
              timestamp: e.nativeEvent.coordinate.timestamp,
            });
          }
        }}
      >
        {onSave && onPolyline && (<Polyline
          coordinates={locations}
          strokeWidth={3}
          strokeColor="#00F" 
        />)}
      </MapView>

      {driving && (
        <TopLeftView style={{marginTop:getStatusBarHeight()}}>
          <Text>
            SLR : {linkInfo[4]==-1?"X":face(linkInfo[4])} / {linkInfo[5]==-1?"X":eyePoint(linkInfo[5])} / {linkInfo[6]==-1?"X":eyePoint(linkInfo[6])}
          </Text>
          <Text>
            YPR : {linkInfo[1]==-1?"X":linkInfo[1]} / {linkInfo[2]==-1?"X":linkInfo[2]} / {linkInfo[3]==-1?"X":linkInfo[3]}
          </Text>
          <Text></Text>

          {/* <Text>위도 : {coordinate.latitude.toFixed(5)}</Text>
          <Text>경도 : {coordinate.longitude.toFixed(5)}</Text>
          <Text>속도 : {typeof coordinate.speed === "number" ? (coordinate.speed*3.6).toFixed(1)+" km/h" : ""}</Text>
          <Text>시간 : {parseInt((coordinate.timestamp/1000).toString())}</Text>
          <Text></Text> */}

          <Text>위도 : {coordinate2.latitude.toFixed(5)}</Text>
          <Text>경도 : {coordinate2.longitude.toFixed(5)}</Text>
          <Text>속도 : {typeof coordinate2.speed === "number" ? (coordinate2.speed*3.6).toFixed(1)+" km/h" : ""}</Text>
          <Text>시간 : {parseInt((coordinate2.timestamp/1000).toString())}</Text>
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

      <CenterTestRightView>
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
            // 아래 처럼 만들어야함
            // setLocations([...locations, {latitude, longitude}]);
            Geolocation.getCurrentPosition(
              async position => {
                const {latitude, longitude} = position.coords;
                const {timestamp} = position;
                let _markerLocation =
                {
                  latitude,
                  longitude,
                  bool_report: true,
                  bool_sudden_acceleration: false,
                  bool_sudden_stop: false,
                  bool_sleep: false,
                  timestamp, // 이건 앱에서만 활용함
                }
                // 마커를 기록함
                setMarkerLocations([...markerLocations, _markerLocation]);
                if(userInfo2 && userInfo2.key){
                  if(userInfo2.key != -1 && userInfo2.key != undefined){
                    // 유저가 있으므로 마커를 웹으로 전송함
                    drivingMarkerSave(_markerLocation);
                  }
                }
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
                  // 탐지 객체도 넣어야함 DrivingMarker
                  _drivingSaveData.name = userInfo2.name;
                  _drivingSaveData.startTime = _startTime;
                  _drivingSaveData.endTime = _endT;
                }
                if(_drivingSaveData.endTime && _drivingSaveData.startTime){
                  if(_drivingSaveData.endTime-_drivingSaveData.startTime > 500){
                    console.log("운전을 기록합니다");
                    drivingSave(_drivingSaveData);
                  }
                }
              }
              setDrivingSaveData(_drivingSaveData);
              setLocations([]); // 초기화
              // 저장해야함
              
              // --- 사고다시 가능
              let _checkInfo = [...checkInfo];
              _checkInfo[0] = 0;
              _checkInfo[1] = 1;
              _checkInfo[2] = 0;
              setCheckInfo(_checkInfo);
              // --- 사고다시 가능
              Geolocation.clearWatch(0);

              // --- 운전 시작시간 클리어 ...
              _setStartTime(0);
              // --- 운전 시작시간 클리어 ...
              
            } else {

              Alert.alert('운전을 시작합니다');
              if(userInfo2 && userInfo2.key){
                if(userInfo2.key != -1 && userInfo2.key != undefined){
                  console.log("아이디 확인, 운전 시작했다고 보고");
                  drivingStart(); // 아이디만 받음
                }
              }
              setOnPolyline(true);

              // 저장해야함
              // save 전에 클리어
              setLocations([]);
              _setStartTime(new Date().getTime());
              // 저장해야함
              
              let _checkInfo = [...checkInfo];
              _checkInfo[0] = 1;
              _checkInfo[1] = 0;
              _checkInfo[2] = 0;
              setCheckInfo(_checkInfo);

//               Geolocation.watchPosition(
//                 position => {
//                   let now = new Date();
// // linkInfo_3(); // 사고체크
// // linkInfo_4(); // 태만 체크
// // linkInfo_5(); // 졸음체크
//                   const {latitude, longitude, speed} = position.coords;
//                   const {timestamp} = position;
//                   setCoordinate({
//                     latitude: latitude,
//                     longitude: longitude,
//                     speed: speed,
//                     timestamp: timestamp,
//                   });
//                   setCamera( camera => {
//                     return ({
//                       center: {
//                         latitude: latitude,
//                         longitude: longitude
//                       },
//                       heading: 0,
//                       pitch: 0,
//                       zoom: camera.zoom,
//                       altitude: 0
//                     });
//                   });
//                 },
//                 error => {
//                   console.log(error);
//                 },
//                 {
//                   timeout: 0,
//                   maximumAge: 0,
//                   enableHighAccuracy: true,
//                   distanceFilter: 1,
//                 },
//               );
            }

            // 무조건 실행, 운전스위치, 기록스위치
            setDriving(!driving); // 운전
            setOnSave(!onSave); // 기록
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
                clearTimeout(singoSetTimeout);
                setModal(false);
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
                setTimeout(() => {
                  let _checkInfo = [...checkInfo];
                  _checkInfo[2] = 0;
                  setCheckInfo(_checkInfo);
                }, 5000);
              }}
            >
            <SingoCancelBtnText>취소</SingoCancelBtnText>
          </SingoCancelBtn>
        </SingoView>
      }
    </>
  );
};

export default MapData;

