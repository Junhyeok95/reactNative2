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

const TopLeftView = Styled.View`
  position: absolute;
  background-color: #00FC;
  top: 4px;
  left: 4px;
  width: 50px;
  height: 50px;
  border: 1px;
`;
const TopRighView = Styled.View`
  position: absolute;
  background-color: #FFFC;
  top: 4px;
  right: 4px;
  width: 250px;
  border-radius: 16px;
  height: 150px;
`;
const CenterRightView = Styled.View`
  position: absolute;
  background-color: #FFFF;
  right: 5%;
  top: 44%;
  width: 10%;
  height: 12%;
  border: 1px;
`;
const BottomLeftView = Styled.View`
  position: absolute;
  background-color: #0F0C;
  left: 24px;
  bottom: 24px;
  width: 50px;
  height: 50px;
  border: 1px;
`;
const TouchableOpacity = Styled.TouchableOpacity`
  flex: 1;
  border: 1px;
  margin: 5px;
  padding 1px;
  justify-content: center;
  align-items: center;

`;
const Text = Styled.Text`
  text-align: center;
  font-size: 16px;
`;
const TopRighViewText = Styled.Text``;



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

  useEffect(() => {
    console.log("--- --- MapTest");
    return () => {
      console.log("--- --- MapTest return");
    };
  },[]);

  const [region, setRegion] = useState<any>({
    latitude: 35.896311,
    longitude: 128.622051,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const [onSave, setOnSave] = useState<boolean>(false);

  const deltaArr = [1, 0.5, 0.1, 0.08, 0.04, 0.01, 0.005, 0.001];
  let deltaCnt = 0;

  return (
    <>
      
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        loadingEnabled={true}
        showsUserLocation={true}
        
        onMapReady={() => {
        }}

        region={region}

        onRegionChangeComplete={regio => {
          console.log("onRegionChangeComplete");
          console.log(regio);
          console.log(region);
        }}

        onUserLocationChange={ e => {
          console.log("onUserLocationChange");
          console.log(e.nativeEvent.coordinate);
          if(onSave){
            setRegion({
              latitude:e.nativeEvent.coordinate.latitude,
              longitude:e.nativeEvent.coordinate.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            })
          }
        }}
      >
      </MapView>
      <StatusBar barStyle="dark-content" backgroundColor={'#FF000077'} translucent={true} />
      <TopLeftView
        style={{marginTop: getStatusBarHeight()}}
      >
      </TopLeftView>
      <TopRighView
        style={{marginTop: getStatusBarHeight()}}
      >
        <Text>kkkㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</Text>
        <Text>kkkㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</Text>
        <Text>kkkㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</Text>
        <Text>kkkㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</Text>
        <Text>kkkㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</Text>
        <Text>kkkㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</Text>
        <Text>kkkㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</Text>
      </TopRighView>
      <CenterRightView>
        <TouchableOpacity
          style={{height:30,backgroundColor:"#0AA"}}
          onPress={()=>{
            if (deltaCnt >= 0 || deltaCnt <= 7){
              if (deltaCnt<7){
                deltaCnt++;
              }
            }
            setRegion({
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: deltaArr[deltaCnt],
              longitudeDelta: deltaArr[deltaCnt],
            })
            
          }}
        >
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{height:30,backgroundColor:"#0FA"}}
          onPress={()=>{
            if (deltaCnt >= 0 || deltaCnt <= 7){
              if (deltaCnt>0){
                deltaCnt--;
              }
            }
            setRegion({
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: deltaArr[deltaCnt],
              longitudeDelta: deltaArr[deltaCnt],
            })
          }}  
        >
          <Text>-</Text>
        </TouchableOpacity>
      </CenterRightView>
      <BottomLeftView>
        <Button
          label={onSave?"중지":"기록"}
          style={{flex:1, backgroundColor:"#FFFFFFFF"}}
          onPress={()=>{
            if(onSave){
              console.log("운전 기록 중지");
            }
            setOnSave(!onSave);
          }}/>        
      </BottomLeftView>
    </>
  );
};

export default MapTest;

