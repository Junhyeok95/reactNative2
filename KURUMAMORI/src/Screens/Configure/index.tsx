import React, {useState, useContext, useEffect} from 'react';
import Styled from 'styled-components/native';
import {DrivingDataContext} from '~/Contexts/DrivingData';
import {UserContext} from '~/Contexts/User/index';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';

const Container = Styled.View`
  flex: 1;
  align-items: center;
  background-color: #EFEFEF;
  padding-top: 24px;
  padding-bottom: 24px;
`;
const Container2 = Styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 6px;
`;

const BackContainer = Styled.View`
  width: 90%;
  background-color: #FFFFFF;
  padding: 12px;
  margin-top: 6px;
  margin-bottom: 6px;
  border-width: 1px;
  border-color: #AAAA;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.5);
  elevation: 50;
`;
const BackContainer2 = Styled.View`
  width: 49%;
  height: 100%;
  background-color: #FFFFFF;
  padding: 12px;
  border-width: 1px;
  border-color: #AAAA;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.5);
  elevation: 50;
`;

const LabelContainer = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
const Label = Styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: bold;
`;
const Text = Styled.Text`
  font-size: 16px;
  padding-left: 8px;
  padding-right: 8px;
`;
const TextContainer = Styled.View`
`;
const View = Styled.View`
  flex: 1;
  width: 80%;
  margin-top: 16px;
`;
const TouchText = Styled.Text`
  border-width: 1px;
  margin-top: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 8px;
  padding-right: 8px;
`;
const TouchableOpacity = Styled.TouchableOpacity``;
const TextTouchableOpacity = Styled.TouchableOpacity`
  align-items: center;
`;

const BR: string = '\n';

type NavigationProp = StackNavigationProp<MainFourthStackNavi, 'Configure'>;

interface Props {
  navigation: NavigationProp;
}

const Configure = ({navigation}: Props) => {
  const {userInfo2, settingSearchRes, settingSearch} = useContext<IUserContext>(
    UserContext,
  );
  const {drivingDelete} = useContext(DrivingDataContext);

  useEffect(() => {
    console.log('--- --- Configure');
    if (userInfo2) {
      if (userInfo2.key != -1 && userInfo2.key != undefined) {
        settingSearch();
      }
    }
    return () => {
      console.log('--- --- MapTest return');
    };
  }, []);

  return (
    <Container>
      <BackContainer>
        <LabelContainer>
          <Label>기기 정보</Label>
        </LabelContainer>
        {settingSearchRes ? (
          <>
            <Text>기기 코드 : {settingSearchRes.product_key}</Text>
            <Text>구입 날짜 : {settingSearchRes.created_at.slice(0, 10)}</Text>
          </>
        ) : (
          <>
            <Text>기기 코드 :</Text>
            <Text>구입 날짜 :</Text>
          </>
        )}
      </BackContainer>
      <BackContainer>
        <LabelContainer>
          <Label>이용약관</Label>
        </LabelContainer>
        <TouchableOpacity onPress={() => drivingDelete()}>
          <TextContainer>
            <Text>본 약관은 쿠루마모리가 제공하는 모든 서비스의 </Text>
            <Text>이용조건 및 절차, 이용자와 당 사이트의 권리,</Text>
            <Text>의무, 책임사항과 기타 필요한 사항을 규정함을 </Text>
            <Text>목적으로 합니다.</Text>
          </TextContainer>
        </TouchableOpacity>
      </BackContainer>
      <Container2>
        <BackContainer2>
          <Label>버전 정보</Label>
          <Text>
            현재버전 : 1. 0. 2{BR}
            최신버전 : 1. 0. 2
          </Text>
        </BackContainer2>
        <BackContainer2>
          <Label>언어 설정</Label>
          <Text>현재언어 : {}</Text>
          <TextTouchableOpacity>
            <TouchText>변경하기</TouchText>
          </TextTouchableOpacity>
        </BackContainer2>
      </Container2>
      <View>
        <LottieView
          style={{flex: 1, backgroundColor: '#EFEFEF'}}
          resizeMode={'contain'}
          source={require('~/Assets/Lottie/dev_lottie.json')}
          autoPlay
          imageAssetsFolder={'images'}
        />
      </View>
    </Container>
  );
};

export default Configure;
