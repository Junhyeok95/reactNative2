import React, {useContext, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import IconButton from '~/Components/IconButton';
import Button from '~/Components/Button';
import {
  FlatList, Platform, Alert, StatusBar,
  PermissionsAndroid, AppState,
  NativeModules, NativeEventEmitter,} from 'react-native';
import {DrivingDataContext} from '~/Contexts/DrivingData';
import Geolocation from 'react-native-geolocation-service';
import Sound from 'react-native-sound';

import {getStatusBarHeight} from 'react-native-status-bar-height';

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
  width: 150px;
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

const MapTest = ({navigation}: DrawerProp) => {
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


  const [region, setRegion] = useState<any>({
    latitude: 35.896311,
    longitude: 128.622051,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const [onSave, setOnSave] = useState<boolean>(false);
  const [onMove, setOnMove] = useState<boolean>(false);

  const deltaArr = [1, 0.5, 0.1, 0.08, 0.04, 0.01, 0.005, 0.001];
  let deltaCnt = 0;

  // --------------------------------------------------------------
  const [driving, setDriving] = useState<boolean>(false);
  const [locations, setLocations] = useState<Array<IGeolocation>>([]);

  const {linkInfo, setLinkInfo, defaultInfo, setDefaultInfo, checkInfo, setCheckInfo} = useContext(DrivingDataContext);
  const [coordinate, setCoordinate] = useState<ICoordinate>({
    latitude: 0.0000,
    longitude: 0.0000,
    speed: 0.0000,
    timestamp: 0, // Milliseconds since Unix epoch
  });
  const face = (num:number) :string => {
    if(num==0) return "X";
    if(num==10) return "정면";
    if(num==20) return "오른쪽";
    if(num==30) return "왼쪽";
    return "";
  }
  const eyePoint = (num:number) :string => {
    if(num==0) return "X";
    if(num==1) return "On";
    if(num==2) return "Off";
    return "";
  }
  const moveData = require('./moveData.json');
  // let moveDataArr: any[] | (() => any[]) = [];
  // console.log("moveData.length");
  // console.log(moveData[0].coordinates);
  // console.log(moveData[0].coordinates.length);
  let arr = moveData[0].coordinates.map(
    (item: any[]) =>{ return {latitude: item[0], longitude: item[1]}}
  );
  const [locationsArr, setLocationsArr] = useState<Array<any>>(arr);
  // for(let i=0; i<10; i++){
  //   console.log(locationsArr[i]);
  // }
  // --------------------------------------------------------------


  useEffect(() => {
    console.log("--- --- MapTest");
    

    // 가상 운전을 위한 포문 추가

    // 가상 운전을 위한 포문 추가

    let moveCnt = 0;
    let movemove = setInterval(() => {
      if(onMove){
        if(onSave){
          let datadata = locationsArr[moveCnt];
          moveCnt++;
          if(moveCnt>300) moveCnt=0;
          console.log(datadata);
          // setRegion({
          //   latitude: region.latitude, // 포문
          //   longitude: region.longitude, // 포문
          //   latitudeDelta: region.latitudeDelta,
          //   longitudeDelta: region.longitudeDelta - (region.longitudeDelta/2),
          // });
          setLocations([...locations, datadata]); // 기록
          setRegion({
            latitude: datadata.latitude, // 포문
            longitude: datadata.longitude, // 포문
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          });
        }
      }
    }, 1000);
    return () => {
      console.log("--- --- MapTest return");
      clearInterval(movemove);
      moveCnt = 0;
    };
  },[]);

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        loadingEnabled={true}
        showsUserLocation={true}
        
        onMapReady={() => {
        }}

        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={true}

        region={region}
      >
        <Polyline
          coordinates={locationsArr}
          strokeWidth={3}
          strokeColor="#00F" 
        />
      </MapView>

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
              setRegion({
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta - (region.latitudeDelta/2),
                longitudeDelta: region.longitudeDelta - (region.longitudeDelta/2),
              });
              console.log(region);
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
              setRegion({
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta * 2,
                longitudeDelta: region.longitudeDelta * 2,
              });
              console.log(region);
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
          style={driving?{backgroundColor:"#0F0"}:{backgroundColor:"#FFF"}}
        >
          <Bt
            onPress={()=>{
              if(driving){
                Alert.alert('모의 운전을 종료합니다\n운전 시간 : 35분\n 급정거 : 7회 \n 급가속 4회 \n 졸음 1회');
                checkInfo[0] = 0;
                setOnMove(false);
                setOnSave(false);

              } else {
                Alert.alert('모의 운전을 시작합니다');
                setOnMove(true);
                setOnSave(true);
                checkInfo[0] = 1;
              }
              setDriving(!driving); // 운전
            }}
          >
            <BtLabel style={driving?{color:"#FFFFFF"}:{}}>
              {driving?"모의 운전 종료":"모의 운전 시작"}
            </BtLabel>
          </Bt>
        </BottomRightView>


    </>
  );
};

export default MapTest;

