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
import Sound from 'react-native-sound';

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


  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        loadingEnabled={true}
        showsUserLocation={true}
        
        onMapReady={() => {
        }}

        initialRegion={{
          latitude: 35.896311,
          longitude: 128.622051,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}

        onRegionChange={region => {
          console.log("onRegionChange");
          console.log(region);
        }}

        onRegionChangeComplete={region => {
          console.log("onRegionChangeComplete");
          console.log(region);
        }}

        onUserLocationChange={ e => {
          console.log("onUserLocationChange");
          console.log(e.nativeEvent.coordinate);
        }}
      >
      </MapView>
    </>
  );
};

export default MapTest;

