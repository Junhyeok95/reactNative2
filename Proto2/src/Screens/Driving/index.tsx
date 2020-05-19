import React, {useState, useContext, useEffect} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import Button from '~/Components/Button';
import {DrivingDataContext} from '~/Contexts/DrivingData';

const Container = Styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #EFEFEF;
`;
const Text = Styled.Text`
  font-size: 32px;
`;

const View = Styled.View`
  background-color: #00F3;
  height: 40%;
  width: 80%;
  margin: 16px;
`;

const DrivingButtonContainer = Styled.View`
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 10px;
  border-width: 8px;
  bottom: 2%;
  right: 2%;
  width: 120px;
  height: 60px;
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
  font-size: 24px;
`;

const DeviceButtonContainer = Styled.View`
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 10px;
  border-width: 8px;
  bottom: 2%;
  left: 2%;
  width: 120px;
  height: 60px;
  justify-content: center;
  align-items: center;
`;


type NavigationProp = StackNavigationProp<MainFirstStackNavi, 'Driving'>;

interface Props {
  navigation: NavigationProp;
}

const Driving = ({navigation}: Props) => {

  const {defaultInfo} = useContext<IDrivingData>(DrivingDataContext);

  useEffect(() => {
    console.log("--- --- Driving");
    console.log(defaultInfo);
    return () => {
      console.log("--- --- Driving return");
    };
  },[]);
  return (
    <Container>
      {/* <Text>
        오늘의 운전점수
      </Text> */}
      <View>
        <LottieView
          style={{flex:1, backgroundColor:'#EFEFEF'}}
          resizeMode={'contain'}
          source={require('~/Assets/Lottie/nodata2.json')}
          autoPlay
          imageAssetsFolder={'images'}
        />
      </View>
      <Text>
        운전기록이 없습니다 {defaultInfo[3]}
      </Text>
      <DeviceButtonContainer style={{borderColor: defaultInfo[3] == 1?'#00F':'#111111'}}>
        <Bt
          onPress={() => {
            if(defaultInfo[3] != 1){
              navigation.navigate('MainThirdStackNavi');
            } else {
            }
          }}
        >
          <BtLabel>{defaultInfo[3] == 1?'페어링':'신호없음'}</BtLabel>
        </Bt>
      </DeviceButtonContainer>
      <DrivingButtonContainer style={{borderColor: defaultInfo[4] == 1?'#00F':'#111111'}}>
        <Bt
          onPress={() => {
            navigation.navigate('MapTabNavi');
          }}
        >
          <BtLabel>{defaultInfo[4] == 1?'운전중':'운전'}</BtLabel>
        </Bt>
      </DrivingButtonContainer>
    </Container>
  );
};

export default Driving;
