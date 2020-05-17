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
import Geolocation from 'react-native-geolocation-service';
import Sound from 'react-native-sound';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const audioList = [
  {
    title: 'fast',
    isRequire: true,
    url: require('./fast_detect.mp3')
  },
  {
    title: 'sleep',
    isRequire: true,
    url: require('./sleep_detect.mp3')
  },
  {
    title: 'slow',
    isRequire: true,
    url: require('./slow_detect.mp3')
  },
]

const RightView = Styled.View`
  position: absolute;
  background-color: #0F0C;
  overflow: hidden;
  right: 24px;
  bottom: 24px;
  border: 1px;
  padding: 8px;
  justify-content: center;
`;
const TopView = Styled.View`
  position: absolute;
  background-color: #0F0C;
  top: 60px;
  left: 24px;
  border: 1px;
  padding: 8px;
`;
const LeftView = Styled.View`
  position: absolute;
  background-color: #0F0C;
  left: 24px;
  bottom: 24px;
  border: 1px;
  padding: 8px;
`;
const Text = Styled.Text`
  font-size: 16px;
`;

const TouchableOpacity = Styled.TouchableOpacity`
  background-color: #FFF7;
`;
const TopViewTEST = Styled.View`
  position: absolute;
  background-color: #00fC;
  top: 120px;
  right: 24px;
  width: 30px;
  height: 30px;
  border: 2px;
  padding: 2px;
`;
const TopViewTEST2 = Styled.View`
  position: absolute;
  background-color: #00fC;
  top: 180px;
  right: 24px;
  width: 30px;
  height: 30px;
  border: 2px;
  padding: 2px;
`;
const TopViewTEST3 = Styled.View`
  position: absolute;
  background-color: #00fC;
  top: 240px;
  right: 24px;
  width: 30px;
  height: 30px;
  border: 2px;
  padding: 2px;
`;


const TopLeftView = Styled.View`
  position: absolute;
  background-color: #FFFFFFDD;
  border-color: #00F;
  border-width: 2px;
  border-radius: 16px;
  top: 1%;
  left: 2%;
  width: 40%;
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
  font-size: 20px;
`;


// position:"absolute", top:60, right:24, width:50, height:50, backgroundColor:"#0008", borderRadius:30, paddingTop:2

interface IGeolocation {
  latitude: number;
  longitude: number;
}
interface ICoordinate {
  latitude: number;
  longitude: number;
  speed: number;
  timestamp: number;
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

  const {linkInfo, setLinkInfo, defaultInfo, setDefaultInfo, checkInfo, setCheckInfo} = useContext(DrivingDataContext);
  const [testDrawer, setTestDrawer] = useState<Array<number>>([]);

  const [marginTop, setMarginTop] = useState<number>(1);

  const [speed, setSpeed] = useState<number>(0);
  const [onSave, setOnSave] = useState<boolean>(false);
  const [driving, setDriving] = useState<boolean>(false);
  const [time, setTime] = useState<any>();

  const [coordinate, setCoordinate] = useState<ICoordinate>({
    latitude: 0.0000,
    longitude: 0.0000,
    speed: 0.0000,
    timestamp: 0, // Milliseconds since Unix epoch
  });
  
  const [location, setLocation] = useState<IGeolocation>({
    latitude: 35.896311,
    longitude: 128.622051,
  });

  const [region, setRegion] = useState<any>({
    latitude: 35.896311,
    longitude: 128.622051,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const [locations, setLocations] = useState<Array<IGeolocation>>([]);
  let sound1: Sound;

  const _location = ():any => {
    return location;
  }

  useEffect(() => {
    androidPermissionLocation();

    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        await setLocation({
          latitude,
          longitude,
        });
        console.log("나에위치");
        await console.log(_location());
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

      console.log("--- --- MapData Mount");
      let id = setInterval(() => {
        let now = new Date();
        // console.log(now.getHours());
        // console.log(now.getMinutes());
        console.log(now.getSeconds());
      }, 1000);
    return () => {
      console.log("--- --- MapData return");
      clearInterval(id);
    };
  },[]);

  let checkInfo_0 = () :boolean => {
    if (checkInfo[0] == -1 || checkInfo[0] == 0) {
      return false;
    } else if (checkInfo[0] == 1) {
      return true;
    }
    return false;
  };
  let linkInfo_3 = ():void => {
    if( linkInfo[3] != -1){
      if( linkInfo[3] < 50 || 150 < linkInfo[3] )
      console.log("기울기 경고 경고");
    }
  } 

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
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

        region={region}

        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}

        onUserLocationChange={ e => {
          if(onSave){
            setCoordinate({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              speed: e.nativeEvent.coordinate.speed,
              timestamp: e.nativeEvent.coordinate.timestamp,
            });
            const {latitude, longitude} = e.nativeEvent.coordinate;
            setLocations([...locations, {latitude, longitude}]);
            // 각종 값을 체크하는 함수를 만들어야함
            linkInfo_3();
            console.log("-> linkInfo ", linkInfo);
            console.log("-> defaultInfo ", defaultInfo);
            console.log("-> checkInfo ", checkInfo);
          }
        }}
      >
        {onSave && (<Polyline
          coordinates={locations}
          strokeWidth={3}
          strokeColor="#00F" 
        />)}
      </MapView>
      {/* <TopViewTEST>
        <TouchableOpacity style={{flex:1}}
          onPress={()=>{
            sound1 = new Sound(audioList[0].url, (error) => {
              if(error){
                Alert.alert('error');
                return;
              } else {
                sound1.play((success)=>{
                  sound1.release();
                })
              }
            });
          }}
        >
        </TouchableOpacity>
      </TopViewTEST>
      <TopViewTEST2>
        <TouchableOpacity style={{flex:1}}
          onPress={()=>{
            sound1 = new Sound(audioList[1].url, (error) => {
              if(error){
                Alert.alert('error');
                return;
              } else {
                sound1.play((success)=>{
                  sound1.release();
                })
              }
            });
          }}
        >
        </TouchableOpacity>
      </TopViewTEST2>
      <TopViewTEST3>
        <TouchableOpacity style={{flex:1}}
          onPress={()=>{
            sound1 = new Sound(audioList[2].url, (error) => {
              if(error){
                Alert.alert('error');
                return;
              } else {
                sound1.play((success)=>{
                  sound1.release();
                })
              }
            });
          }}
        >
        </TouchableOpacity>
      </TopViewTEST3> */}

      {driving && (
        <TopLeftView style={{marginTop:getStatusBarHeight()}}>
          <Text>
            SLR : {linkInfo[4]==-1?"X":face(linkInfo[4])} / {linkInfo[5]==-1?"X":eyePoint(linkInfo[5])} / {linkInfo[6]==-1?"X":eyePoint(linkInfo[6])}
          </Text>
          <Text>
            YPR : {linkInfo[1]==-1?"X":linkInfo[1]} / {linkInfo[2]==-1?"X":linkInfo[2]} / {linkInfo[3]==-1?"X":linkInfo[3]}
          </Text>
          <Text>위도 : {coordinate.latitude.toFixed(4)}</Text>
          <Text>경도 : {coordinate.longitude.toFixed(4)}</Text>
          <Text>속도 : {coordinate.speed.toFixed(1)}</Text>
          <Text>시간 : {parseInt((coordinate.timestamp/1000).toString())}</Text>
        </TopLeftView>
      )}

      <TopRightView
        style={{marginTop:getStatusBarHeight()}}
      >
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
          }}
        />
      </CenterRightView>

      <BottomLeftView>
        <IconButton
          icon="crosshairs-gps"
          color="#000000"
          onPress={() => {
            Geolocation.getCurrentPosition(
              async position => {
                const {latitude, longitude} = position.coords;
                setRegion({
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: region.latitudeDelta,
                  longitudeDelta: region.longitudeDelta,
                })
                console.log(position.coords);
                console.log("나에위치");
              },
              error => {
                console.log(error.code, error.message);
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
          }}
        />
      </BottomLeftView>

      <BottomRightView
        style={driving?{backgroundColor:"#00F"}:{backgroundColor:"#FFF"}}
      >
        <Bt
          onPress={()=>{
            if(driving){
              Alert.alert('운전을 종료합니다\n\n운전 시간 : 35분\n 급정거 : 7회 \n 급가속 4회 \n 졸음 1회');
              checkInfo[0] = 0;
              setLocations([]); // 저장해야함
            } else {
              Alert.alert('운전을 시작합니다');
              checkInfo[0] = 1;
            }
            setDriving(!driving); // 운전
            setOnSave(!onSave); // 기록
          }}
        >
          <BtLabel style={driving?{color:"#FFFFFF"}:{}}>
            {driving?"운전 종료":"운전 시작"}
          </BtLabel>
        </Bt>
      </BottomRightView>
    </>
  );
};

export default MapData;

