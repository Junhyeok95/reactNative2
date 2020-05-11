import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {Platform, Alert, FlatList} from "react-native";
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';

import IconButton from '~/Components/IconButton';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';

const Footer = Styled.View`
  position: absolute;
  bottom: 8px;
  left: 16px;
  right: 16px;
  border: 1px;
`;
const SaveContainer = Styled.View`
  padding: 8px;
`;
const TouchableOpacity = Styled.TouchableOpacity`
  background-color: #FFF7;
`;
const Save = Styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;
const SaveName = Styled.Text`
  width: 100%;
  text-align: center;
  background-color: #FFF;
  font-weight: 600;
`;
const TopView = Styled.View`
  position: absolute;
  background-color: #0F0C;
  top: 60px;
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

type TypeDrawerProp = DrawerNavigationProp<DrawNaviParamList, 'MainTabNavi'>;
interface DrawerProp {
  navigation: TypeDrawerProp;
}

const MapMarker = ({navigation}: DrawerProp) => {
  const saveLocations2 = require('./saveLocations2.json');
  let saveData = [];
  for(let i=0; i<saveLocations2.length; i++){
    let arr = saveLocations2[i].routes[0].geometry.coordinates.map((item: any[]) =>{ return {latitude: item[1], longitude: item[0]}});
    saveData.push(arr);
  }
  const [markerList, setMarkerList] = useState<Array<String>>(["1","2","3","4","5","6","7","8"]);
  const [location, setLocation] = useState<IGeolocation>({
    latitude: 35.896311,
    longitude: 128.622051,
  });
  
  const [poly, setPoly] = useState<number>(-1);
  const [locations, setLocations] = useState<Array<IGeolocation>>([]);
  const [locationsArr, setLocationsArr] = useState<Array<any>>(saveData);
  const [time, setTime] = useState<any>();

  const [p1, setP1] = useState<number>(0);
  const [p2, setP2] = useState<number>(0);
  const [p3, setP3] = useState<number>(0);
  
  // const saveLocations = require('./saveLocations.json');
  // let jsonData = saveLocations2[0].routes[0].geometry.coordinates.map((item: any[]) =>{
  //   return {latitude: item[1], longitude: item[0]}});
  // console.log(jsonData);
  
  useEffect(() => {
    
    console.log("--- --- MapMarker Mount");
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

  // useEffect(() => {
  //   return () => {}
  // },[ ___ ]);

  const renderItem = ({ item, index }:any) => {
    let num = 0;
    num = index;
    return (
      <SaveContainer>
        <TouchableOpacity
        style={index<3?{borderColor:"#00F", borderWidth:3}:index<7?{borderColor:"#0AA", borderWidth:3}:index<12?{borderColor:"#CA7", borderWidth:3}:{borderColor:"#CCC", borderWidth:3}} onPress={(index)=>{
          setPoly(num);
          setP1(Math.floor(Math.random() * 15) + 1);
          setP2(Math.floor(Math.random() * 15) + 1);
          setP3(Math.floor(Math.random() * 5) + 1);
        }}>
          <Save>
            <Icon2
              name="map"
              color={'#000000'}
              size={30}
            />
          </Save>
          <SaveName numberOfLines={1}>{index}</SaveName>
        </TouchableOpacity>
      </SaveContainer>
    );
  }

  return (
    <>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        loadingEnabled={true}
        showsUserLocation={true}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        {poly >= 0 && <Polyline
          coordinates={locationsArr[poly]}
          strokeWidth={3}
          strokeColor="#00f"
        />}
      </MapView>
      <IconButton
        style={{position:"absolute", top:60, right:24, width:50, height:50, backgroundColor:"#FFFFFF", borderWidth:3, borderRadius:30, paddingTop:2}}
        icon="menu"
        color="#000000"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <Footer>
        <FlatList
        data={locationsArr}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => {
          return `myMarker-${index}`;
        }}
        renderItem={renderItem}
      />
      </Footer>
      <TopView>
        <Text style={{flex:1, paddingLeft:8, paddingRight:8, padding:4, backgroundColor:"#FFF"}}>
          time : {time}
        </Text>
        <Text style={{flex:1, paddingLeft:8, padding:4, backgroundColor:"#FFF"}}>
          급정거 : {p1}
        </Text>
        <Text style={{flex:1, paddingLeft:8, padding:4, backgroundColor:"#FFF"}}>
          급가속 : {p2}
        </Text>
        <Text style={{flex:1, paddingLeft:8, padding:4, backgroundColor:"#FFF"}}>
          졸음 : {p3}
        </Text>
      </TopView>
    </>
  );
};

export default MapMarker;