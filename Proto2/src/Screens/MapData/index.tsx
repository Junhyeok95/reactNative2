import React, {useContext, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';

import IconButton from '~/Components/IconButton';
import Button from '~/Components/Button';

import {
  FlatList, Platform, Alert,
  PermissionsAndroid, AppState,
  NativeModules, NativeEventEmitter,} from 'react-native';

import {DrivingDataContext} from '~/Contexts/DrivingData';
import Geolocation from 'react-native-geolocation-service';

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
      Alert.alert('PermissionLocation, Android only');
    }
  };

  const {testArr, testFun} = useContext(DrivingDataContext);
  const [testDrawer, setTestDrawer] = useState<Array<number>>([]);


  const [onMap, setOnMap] = useState<boolean>(false);
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

  const [locations, setLocations] = useState<Array<IGeolocation>>([]);

  useEffect(() => {
    androidPermissionLocation();

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
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

        onMapReady={() => {
          setMarginTop(0);
          setOnMap(true);
        }}

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
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            speed: e.nativeEvent.coordinate.speed,
            timestamp: e.nativeEvent.coordinate.timestamp,
          });
          if(onSave){
            const {latitude, longitude} = e.nativeEvent.coordinate;
            setLocations([...locations, {latitude, longitude}]);
          }
        }}
      >
        {onSave && (<Polyline
          coordinates={locations}
          strokeWidth={3}
          strokeColor="#00F" 
        />)}
      </MapView>
      <IconButton
        style={{position:"absolute", top:60, right:24, width:50, height:50, backgroundColor:"#0008", borderRadius:30, paddingTop:2}}
        icon="menu"
        color="#FFFFFF"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <RightView>
        <Text style={{flex:1, padding:2, backgroundColor:"#FFF"}}>위도 : {coordinate.latitude.toFixed(4)}</Text>
        <Text style={{flex:1, padding:2, backgroundColor:"#FFF"}}>경도 : {coordinate.longitude.toFixed(4)}</Text>
        <Text style={{flex:1, padding:2, backgroundColor:"#FFF"}}>속도 : {coordinate.speed.toFixed(1)}</Text>
        <Text style={{flex:1, padding:2, backgroundColor:"#FFF"}}>시간 : {parseInt((coordinate.timestamp/1000).toString())}</Text>
      </RightView>
      <LeftView>
        <Button
          label="초기화"
          style={{backgroundColor:"#FFF", padding:8, marginBottom:12}}
          onPress={()=>{
            setLocations([]);
          }}/>
        <Button
          label={onSave?"중지":"기록"}
          style={{backgroundColor:"#FFF", padding:8, marginBottom:12}}
          onPress={()=>{
            if(onSave){
              console.log("운전 기록 중지");
            }
            setOnSave(!onSave);
          }}/>
        <Button
          label={driving?"운전 종료":"운전 시작"}
          style={driving?{backgroundColor:"#00F", color:"#FFFFFF", padding:8}:{backgroundColor:"#FFF", padding:8}}
          color={driving?"#FFFFFF":"#000000"}
          onPress={()=>{
            if(driving){
              Alert.alert('운전을 종료합니다');
            }
            setDriving(!driving);
          }}/>
      </LeftView>
      <TopView>
        <Text style={{flex:1, paddingLeft:8, paddingRight:8, padding:4, backgroundColor:"#FFF"}}>
          time : {time}
        </Text>
      </TopView>
    </>
  );
};

export default MapData;

