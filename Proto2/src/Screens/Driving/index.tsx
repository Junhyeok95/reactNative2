import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import Button from '~/Components/Button';

const Container = Styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #8CD3C5;
`;
const Text = Styled.Text`
  font-size: 32px;
`;

const View = Styled.View`
  background-color: #00F3;
  height: 40%;
  width: 70%;
  margin: 16px;
`;

const DrivingButtonContainer = Styled.View`
  background-color: #F00;
  position: absolute;
  right: 12px;
  bottom: 24px;
  padding: 8px;
  border-radius: 4px;
  width: 100px;
`;
const DeviceButtonContainer = Styled.View`
  position: absolute;
  left: 12px;
  bottom: 24px;
  padding: 8px;
  border-radius: 4px;
  width: 100px;
`;


type NavigationProp = StackNavigationProp<MainFirstStackNavi, 'Driving'>;

interface Props {
  navigation: NavigationProp;
}

const Driving = ({navigation}: Props) => {

  const [device, setDevice] = useState<boolean>(false);
  const [driving, setDriving] = useState<boolean>(false);


  useEffect(() => {
    console.log("--- --- Driving");
  },[]);
  return (
    <Container>
      {/* <Text>
        오늘의 운전점수
      </Text> */}
      <View>
        <LottieView
          style={{flex:1, backgroundColor:'#8CD3C5'}}
          resizeMode={'contain'}
          source={require('~/Assets/Lottie/nodata2.json')}
          autoPlay
          loop
          imageAssetsFolder={'images'}
        />
      </View>
      <Text>
        운전기록이 없습니다
      </Text>
      <DeviceButtonContainer style={{backgroundColor: device?'#00F':'#555'}}>
        <Button
          style={{flex:1, padding:8}}
          label={device?'페어링':'신호없음'}
          onPress={() => {
            setDevice(!device);
            if(device){
              // navigation.navigate('MainThirdStackNavi');
            } else {
              // navigation.navigate('MainThirdStackNavi');
            }
          }}
      />
      </DeviceButtonContainer>
      <DrivingButtonContainer style={{backgroundColor: driving?'#00F':'#555'}}>
        <Button
          style={{flex:1, padding:8}}
          label="운전 시작"
          onPress={() => {
            navigation.navigate('MapTabNavi');
          }}
        />
      </DrivingButtonContainer>
    </Container>
  );
};

export default Driving;
