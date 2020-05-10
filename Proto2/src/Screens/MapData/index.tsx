import React, {useContext, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';

import IconButton from '~/Components/IconButton';
import Button from '~/Components/Button';

import {
  FlatList, Platform, Alert,
  PermissionsAndroid, AppState,
  NativeModules, NativeEventEmitter,} from 'react-native';

import {DrivingDataContext} from '~/Contexts/DrivingData';

const RightView = Styled.View`
  position: absolute;
  background-color: #0F0C;
  overflow: hidden;
  width: 200px;
  right: 24px;
  bottom: 24px;
  border: 1px;
  padding: 8px;
  justify-content: center;
`;
const LeftView = Styled.View`
  position: absolute;
  background-color: #0F0C;
  width: 75px;
  height: 125px;
  left: 24px;
  bottom: 24px;
  border: 1px;
  padding: 8px;
`;
const TopView = Styled.View`
  position: absolute;
  background-color: #0F0C;
  width: 200px;
  height: 100px;
  top:60px;
  left: 24px;
  border: 1px;
  padding: 8px;
`;
const Text = Styled.Text`
  font-size: 16px;
`;

interface IGeolocation {
  latitude: number;
  longitude: number;
}
interface ICoordinate {
  altitude: number;
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
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => { // check
        if (result) {
          console.log("android LOCATION check OK");
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => { // request
            if (result) {
              console.log("android LOCATION request Ok");
            } else {
              console.log("android LOCATION reject");
            }
          });
        }
      });
    } else if (Platform.OS === 'ios') {
      Alert.alert('PermissionLocation, Android only');
    }
  };

  const {testArr, testFun} = useContext(DrivingDataContext);
  const [testDrawer, setTestDrawer] = useState<Array<number>>([]);

  const [driving, setDriving] = useState<boolean>(false);
  const [device, setDevice] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(0);

  const [time, setTime] = useState<any>();

  const [coordinate, setCoordinate] = useState<ICoordinate>({
    altitude: 0.0000,
    latitude: 0.0000,
    longitude: 0.0000,
    speed: 0.0000,
    timestamp: 0, // Milliseconds since Unix epoch
  });
  
  const [location, setLocation] = useState<IGeolocation>({
    latitude: 35.896311,
    longitude: 128.622051,
  });

  useEffect(() => {
    androidPermissionLocation();
    console.log("--- --- MapData Mount");
    let id = setInterval(() => {
      let now = new Date();
      // console.log(now.getHours());
      // console.log(now.getMinutes());
      // console.log(now.getSeconds());
      setTime(now.getHours()+" : "+now.getMinutes()+" : "+now.getSeconds());
    }, 1000);
    return () => {
      console.log("--- --- MapData return");
      clearInterval(id);
    };
  },[]);


// interface ICoordinate {
//   altitude: number;
//   latitude: number;
//   longitude: number;
//   speed: number;
//   timestamp: number;
// }

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        loadingEnabled={true}

        showsUserLocation={true}
        userLocationAnnotationTitle={" 필요합니다 "}
        showsMyLocationButton={true}
        showsPointsOfInterest={true}
        showsCompass={true}
        showsScale={true}
        showsBuildings={true}
        showsTraffic={true}
        showsIndoors={true}
        showsIndoorLevelPicker={true}

        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        onRegionChange={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        onRegionChangeComplete={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        onUserLocationChange={ e => {
          setCoordinate({
            altitude: e.nativeEvent.coordinate.altitude,
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            speed: e.nativeEvent.coordinate.speed,
            timestamp: e.nativeEvent.coordinate.timestamp,
          });
        }}
      >
      </MapView>
      <IconButton
        style={{position:"absolute", top:60, right:24, width:50, height:50, backgroundColor:"#0008", borderRadius:30, paddingTop:2}}
        icon="menu"
        color="#FFFFFF"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <RightView>
        <Text>고도 altitude : {coordinate.altitude.toFixed(4)}</Text>
        <Text>위도 latitude : {coordinate.latitude.toFixed(4)}</Text>
        <Text>경도 longitude : {coordinate.longitude.toFixed(4)}</Text>
        <Text>속도 speed : {coordinate.speed.toFixed(2)}</Text>
        <Text>----- timestamp -----</Text>
        <Text>{coordinate.timestamp}</Text>
      </RightView>
      <LeftView>
        {/* <Button
          label="보기"
          style={{backgroundColor:"#FFF", marginBottom:8}}
          onPress={()=>{
        }}/>
        <Button
          label="기록"
          style={{backgroundColor:"#FFF", marginBottom:8}}
          onPress={()=>{
        }}/> */}
        <Button
          label={device?"start\n"+" on":"start\n"+" off"}
          style={{backgroundColor:"#FFF"}}
          onPress={()=>{
            setDevice(!device);
        }}/>
        
      </LeftView>
      <TopView>
        <Text 
          style={{flex:1, padding:8, backgroundColor:"#FFF"}}
        >
          Time      {time}
          {"\n"}testArr /  {"cnt "+testDrawer[0]+" 좌 "+testDrawer[3]+" 우 "+testDrawer[4]}
        </Text>
      </TopView>
    </>
  );
};

export default MapData;

