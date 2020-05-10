import React, {useContext, useState, useEffect} from 'react';
import Styled from 'styled-components/native';

import {
  FlatList, Platform, Alert,
  PermissionsAndroid, AppState,
  NativeModules, NativeEventEmitter,} from 'react-native';

import Toggle from '~/Screens/Bluetooth/List/Toggle';
import Subtitle from '~/Screens/Bluetooth/List/Subtitle';

import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';
import Button from '~/Components/Button';

import {DrivingDataContext} from '~/Contexts/DrivingData';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Container = Styled.View`
  flex: 1;
  width: 90%;
  background-color: #8CD3C5;
`;
const View = Styled.View``;
const FlatListContainer = Styled(FlatList)``;

const EmptyItem = Styled.View``;
const TouchableHighlight = Styled.TouchableHighlight``;

const Text = Styled.Text`
  padding: 8px;
  margin: 4px;
  background-color: #EEE;
  border: 1px;
  border-radius: 10px;
  border-color: #00F;
  font-size: 24px;
  text-align: center;
`;

const ButtonContainer = Styled.View`
  flex-direction: row;
  height: 10%;
`;

const DataContainer = Styled.View`
  background-color: #00F;
  height: 8%;
  margin: 6px;
`;
const TestText = Styled.Text`
  margin: 2px;
  text-align: center;
  background-color: #FFF;
  font-size: 32px;
  flex:1;
`;

const URI = '';

const json = async () => {
  try {
    let response = await fetch(URI);
    console.log("1");
    // console.log("response", response);
    let responseJsonData = await response.json();
    console.log("2");
    console.log("responseJsonData", responseJsonData);
    console.log("3");
    return responseJsonData;
  } catch (e) {
    console.log(e);
  }
}

interface Props {}

const List = ({  }: Props) => {

  // 안드로이드 블루투스 요청
  const androidPermissionBluetooth = () => {
    if (Platform.OS === 'android') {
      BleManager.enableBluetooth() // Android only
      .then(() => {
        console.log('android Bluetooth check OK');
      })
      .catch((error) => {
        Alert.alert('You need to enable bluetooth to use this app.');
      });
    } else if (Platform.OS === 'ios') {
      Alert.alert('PermissionBluetooth, Android only');
    }
  };

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

  ////////// ////////// ////////// ////////// //////////

  const {testArr, testFun} = useContext(DrivingDataContext);

  const [scanning, setScanning] = useState<boolean>(false);
  const [peripherals, setPeripherals] = useState(new Map());
  const [appState, setAppState] = useState<string>(AppState.currentState);

  const [raspId, setRaspId] = useState<string>('');
  const [blueToothEnable, setBlueToothEnable] = useState<boolean>(false);

  const [roll, setRoll] = useState<number>(0); // 갸웃갸웃
  const [pitch, setPitch] = useState<number>(0); // 끄덕끄덕
  const [yaw, setYaw] = useState<number>(0); // 도리도리

  const RASP_SERVICE_UUID = '13333333-3333-3333-3333-000000000000';
  const RASP_NOTIFY_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-000000000001';
  const RASP_READ_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-000000000002';
  const RASP_WRITE_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-000000000003';

  const [restring, setRestring] = useState<string>("x");


  useEffect(()=>{
    // let id = setInterval(() => {
    //   json();
    // }, 1000);

    console.log('> List useEffect');

    if (Platform.OS === 'android') {
      androidPermissionBluetooth();
      androidPermissionLocation();
    }

    AppState.addEventListener("change", HandleAppStateChange);
    BleManager.start({showAlert: false}); // StartOptions 가능, showAlert->ios

    const HandlerDiscoverPeripheral = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', HandleDiscoverPeripheral );
    const HandlerStop = bleManagerEmitter.addListener('BleManagerStopScan', HandleStopScan );
    const HandlerDisconnectedPeripheral = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', HandleDisconnectedPeripheral );
    const HandlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', HandleUpdateValueForCharacteristic );

    return() => {

      // clearInterval(id);

      HandlerDiscoverPeripheral.remove();
      HandlerStop.remove();
      HandlerDisconnectedPeripheral.remove();
      HandlerUpdate.remove();
      AppState.removeEventListener("change", HandleAppStateChange);
    };
  }, []);

  ////////// ////////// ////////// ////////// //////////

  // 0. 화면 전환
  const HandleAppStateChange = (nextAppState:any) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('> App has come to the foreground!');
      // point
      // _RetrieveConnected();
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('!!! !!! Connected peripherals: ' + peripheralsArray.length);
      });
    }
    setAppState(nextAppState);
  };

  // 1. Emitter addListener 장치 검색
  const HandleDiscoverPeripheral = (peripheral:any) => {
    console.log('> 장치 검색 성공 : ', peripheral.id);
    let _peripherals = peripherals;
    if (!peripheral.name) { // 이름이 없을 경우
      peripheral.name = 'NO NAME';
    }
    _peripherals.set(peripheral.id, peripheral);
    setPeripherals( new Map(_peripherals) );
  };

  // 2. Emitter addListener 장치 검색 취소 BleManagerStopScan 중지되면 실행
  const HandleStopScan = () => {
    console.log('> Scanning Stop');
    setScanning(false);
  };

  // 3. Emitter addListener 연결 취소 됬을 경우
  const HandleDisconnectedPeripheral = (data:any) => {
    setRaspId('');
    console.log('> disconnect 2');
    console.log('> 연결 취소 : ' + data.peripheral);

    let _peripherals = peripherals;
    let _peripheral = _peripherals.get(data.peripheral);
    if (_peripheral) {
      _peripheral.connected = false;
      _peripherals.set(_peripheral.id, _peripheral);
      setPeripherals(new Map(_peripherals));
    }
  };

  
  let myarr = [0, 0,0, 0,0, 0,0 ];
    // 카운트 , 왼눈 뜬, 오른 뜬 , 왼눈 감, 오눈 감 , 시선체크, 시선미체크
    // 3-왼눈 4-오눈 5-시선

  // 4. Emitter addListener 변경
  const HandleUpdateValueForCharacteristic = (data:any) => {
    try {
      if (data){

        console.log("context Test");

        console.log(data.value);
        // let updateArrCheck = data.value;
        // myarr[0] += 1
        // if(updateArrCheck[3] == 1){
        //   myarr[1] += 1
        // }
        // if(updateArrCheck[3] == 2){
        //   myarr[3] += 1
        // }
        // if(updateArrCheck[4] == 1){
        //   myarr[2] += 1
        // }
        // if(updateArrCheck[4] == 2){
        //   myarr[4] += 1
        // }
        // if(updateArrCheck[5] > 5){
        //   myarr[5] += 1
        // }
        // if(updateArrCheck[5] < 5){
        //   myarr[6] += 1
        // }
        // console.log(myarr);


        let str = JSON.stringify(data.value);
        setRestring(str);

        // let arr = testArr;
        // for(let i = 0 ; i < arr.length ; i++){
        //   arr[i] = data.value[i]
        // }
        // testFun(arr); // 저장
        
        // console.log(arr);
        // console.log("context Test");


        /*
          임시 테스트 규칙
          0 ->
          1 ->
          2 ->
          3 ->
          4 ->
          5 ->
          6 ->
          7 ->
          8 ->
          9 ->
          10 ->
        */
      }
    } catch (error) {

    }
  };

  const _Scan = () => {
    if (!scanning) {
      // 기본 장치 값 초기화
      // setPeripherals( new Map() );
      BleManager.scan([], 2, false).then((results) => {
        setScanning(true);
        console.log('> Scanning ...');
      });
    }
  }

  const _RetrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('> No connected peripherals');
      }
      console.log(results[0].id);
      let _peripherals = peripherals;
      for (let i = 0; i < results.length; i++) {
        let _peripheral = results[i];
        _peripheral.connected = true;
        _peripherals.set(_peripheral.id, _peripheral);
        setPeripherals( new Map(_peripherals) );
      }
    });
  }

  const _connectBtn = (peripheral:any) => {
    if (peripheral){
      if (peripheral.connected){
        // BleManager.stopNotification(raspId, RASP_SERVICE_UUID, RASP_NOTIFY_CHARACTERISTIC_UUID).then(() => {
        //   console.log('> stopNotification ' + raspId);
        // }).catch((error) => { // stopNotification
        //   console.log('> stopNotification error', error);
        // });
        setRaspId('');
        BleManager.disconnect(peripheral.id);
        console.log('> disconnect 1');
      } else {

        BleManager.connect(peripheral.id).then(() => {
          let _peripherals = peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            _peripherals.set(peripheral.id, p);
            setPeripherals(new Map(_peripherals));
          }
          setRaspId(peripheral.id);
          console.log('###### Connected to ' + peripheral.id);

          setTimeout(() => {
            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              console.log("### retrieveServices");
              console.log(peripheralInfo);

              // setTimeout(() => { // 2 setTimeout
              //   BleManager.startNotification(peripheral.id, RASP_SERVICE_UUID, RASP_NOTIFY_CHARACTERISTIC_UUID).then(() => {
              //     console.log('### Started notification on ' + peripheral.id);
              //   }).catch((error) => { // startNotification
              //     console.log('Notification error', error);
              //   });
              // }, 300); // 2 setTimeout

            });
          }, 500);

        }).catch((error) => {
          console.log('> Connection error', error);
        });

      }
    }
  };

  const renderEmpty = () => <EmptyItem><Text style={{textAlign: 'center'}}>NO List</Text></EmptyItem>
  const renderItem = ({ item, index }:any) => {
    const color = item.connected ? '#00BFFF' : '#F5FFFA';
    return (
      <TouchableHighlight onPress={() => { _connectBtn(item) }}>
        <View style={{margin: 8, backgroundColor: color}}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 4}}>{item.name}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  const list = Array.from(peripherals.values());
  const btnScanTitle = 'Ble 검색 ('+(scanning?'ON':'OFF')+')';

  return (
    <Container>
      <Toggle />
      <Subtitle title = {'Device List ->'+raspId} btnLabel={btnScanTitle} onPress={_Scan} />
      <FlatListContainer
        keyExtractor={( item, index ):any => {
          return `key-${index}`;
        }}
        data={list}
        ListEmptyComponent={renderEmpty} // data 배열이 없을 경우 표시되는 컴포넌트
        renderItem={renderItem}
      />
      <ButtonContainer>
        <Button
          style={{ flex: 1 }}
          label="clear"
          onPress={() => {
            setPeripherals( new Map() );
          }}  
        />
        <Button
          style={{ flex: 1 }}
          label="url"
          onPress={() => {
            try {
              // json();
            } catch (error) {
              
            }
          }}  
        />
        <Button
          style={{ flex: 1 }}
          label={"notify"+"\n"+"start"}
          onPress={() => {

            BleManager.startNotification(raspId, RASP_SERVICE_UUID, RASP_NOTIFY_CHARACTERISTIC_UUID).then(() => {
              console.log('### Started notification on ' + raspId);
            }).catch((error) => { // startNotification
              console.log('> startNotification error', error);
            });

          }}
        />
        <Button
          style={{ flex: 1 }}
          label={"notify"+"\n"+"stop"}
          onPress={() => {

            BleManager.stopNotification(raspId, RASP_SERVICE_UUID, RASP_NOTIFY_CHARACTERISTIC_UUID).then(() => {
              console.log('> stopNotification ' + raspId);
            }).catch((error) => { // stopNotification
              console.log('> stopNotification error', error);
            });

          }}  
        />
      </ButtonContainer>
      <ButtonContainer>
        <Button
          style={{ flex: 1 }}
          label="Connected"
          onPress={() => {
            _RetrieveConnected();
            console.log("id");
          }}  
        />
        <Button
          style={{ flex: 1 }}
          label="Info"
          onPress={() => {
            BleManager.retrieveServices(raspId).then((peripheralInfo) => {
              console.log("### retrieveServices");
              console.log(peripheralInfo);
            });
          }}  
        />
        <Button
          style={{ flex: 1 }}
          label="read"
          onPress={() => {
            BleManager.read(raspId, RASP_SERVICE_UUID, RASP_READ_CHARACTERISTIC_UUID)
            .then((readData) => {
              console.log('Read : ');
              console.log(readData);
              // console.log('Read: ' + readData[1]);
            })
            .catch((error) => {
              console.log(error);
            });

          }}
        />
        <Button
          style={{ flex: 1 }}
          label="wirte"
          onPress={() => {
            if(raspId != ''){
              // // 'b' array
              const test = [2,2,2,2,3,3,-1];
              BleManager.write(raspId, RASP_SERVICE_UUID, RASP_WRITE_CHARACTERISTIC_UUID, test)
              .then(() => {
                // Success code
              })
              .catch((error) => {
                // Failure code
                console.log(error);
              });
            }
          }}  
        />
      </ButtonContainer>
      <DataContainer>
        <TestText>{restring}</TestText>
      </DataContainer>
    </Container>
  );
};
export default List;
