import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

const Container = Styled.View`
  flex: 1;
  align-items: center;
  background-color: #8CD3C5;
  padding-top: 24px;
  padding-bottom: 24px;
`;
const BackContainer = Styled.View`
  width: 80%;
  background-color: #FCFCFC;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 12px;
  border-width: 1px;
  border-color: #DDD;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.3);
`;
const LabelContainer = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
const Label = Styled.Text`
  color: #000000;
  font-size: 24px;
`;
const Text = Styled.Text`
  color: #555;
  font-size: 16px;
  padding-left: 8px;
  padding-right: 8px;
`;
const BR:string = '\n';

type NavigationProp = StackNavigationProp<MainFourthStackNavi, 'Setting'>;

interface Props {
  navigation: NavigationProp;
}

const Setting = ({navigation}: Props) => {
  useEffect(() => {
    console.log("--- --- Setting");
  },[]);
  return (
    <Container>
      <BackContainer>
        <LabelContainer>
          <Label>기기 정보</Label>
        </LabelContainer>
        <Text>
          기기 코드
          {BR}
          ABCD - EFGH - 1234
        </Text>
      </BackContainer>
      <BackContainer>
        <LabelContainer>
          <Label>이용약관</Label>
        </LabelContainer>
      </BackContainer>
      <BackContainer>
        <LabelContainer>
          <Label>버전 정보</Label>
        </LabelContainer>
        <Text>
          현재버전 1. 2. 7
          {BR}
          최신버전 1. 2. 9
        </Text>
      </BackContainer>
    </Container>
  );
};

export default Setting;
