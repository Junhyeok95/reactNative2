import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';

const Container = Styled.View`
  flex: 1;
  background-color: #8CD3C5;
`;
const Text = Styled.Text`
  font-size: 32px;
`;

const View = Styled.View`
  height: 50%;
  margin: 16px;
`;


type NavigationProp = StackNavigationProp<MainFirstStackNavi, 'Driving'>;

interface Props {
  navigation: NavigationProp;
}

const Driving = ({navigation}: Props) => {
  useEffect(() => {
    console.log("--- --- Driving");
  },[]);
  return (
      <Container>
        <View>
          {/* <LottieView
            // style={{border:1}}
            resizeMode={'cover'}
            // source={require('')}
            autoPlay
            loop
            imageAssetsFolder={'images'}
          /> */}
        </View>
        <Text>
            Driving
        </Text>
      </Container>
  );
};

export default Driving;
