import React, {useContext, useState, useEffect} from 'react';
import {Platform} from 'react-native';
import Styled from 'styled-components/native';
import {UserContext} from '~/Contexts/User';
import {StackNavigationProp} from '@react-navigation/stack';

import {Keyboard} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '~/Components/Button';
import Input from '~/Components/Input';

const TouchableWithoutFeedback = Styled.TouchableWithoutFeedback``;
const Container = Styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #8CD3C5;
  justify-content: center;
  align-items: center;
`;
const View = Styled.View`
  height: 50%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const Text = Styled.Text`
  font-size: 32px;
  padding: 8px;
  border: 1px;
`;
const FormContainer = Styled.View`
  width: 80%;
  height: 200px;
  justify-content: center;
  align-items: center;
`;
const ButtonContainer = Styled.View`
  flex: 1;
  flex-direction: row;
`;
const ButtonMargin = Styled.View`
  width: 16px;
`;
type NavigationProp = StackNavigationProp<LoginStackNaviParamList, 'SignIn'>;

interface Props {
  navigation: NavigationProp;
}

const SignIn = ({navigation}: Props) => {
  const {login} = useContext<IUserContext>(UserContext);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <View>
          <Icon
            style={{marginBottom: 8}}
            name="account-circle"
            color={'#888'}
            size={200}
          />
          <FormContainer>
          <Input
            style={{flex:1, backgorunColr:"#F00", marginBottom: 8 }}
            placeholder={'이메일'}
            keyboardType={'email-address'}
          />
          <Input
            style={{ marginBottom: 8 }}
            secureTextEntry={true}
            placeholder={'비밀번호'}
          />
          <Button
            // label="Sign In"
            style={{ backgroundColor:"#DDDDDD", marginBottom: 8 }}
            label="로그인"
            onPress={ async () =>{
              // let URI = 'http://btrya23.iptime.org:8000/wdjapp';
              // try {
              //   let response = await fetch(URI, {
              //     method: 'GET',
              //     headers:{
              //       'Accept':'application/json',
              //       'Content-Type':'application/json',
              //     },
              //   });
              //   let responseJsonData = await response.json();
              //   console.log(responseJsonData);
              // } catch (e) {
              //   console.log(e);
              // }
              login('WDJ@YJU', 'password');
            }} // 이 동작이 setUserInfo 실행 -> NavigationContainer 의 함수로 인해서 MainNavi 스택으로 이동
            />
            <Button
            // label="Sign In"
            style={{ backgroundColor:"#DDDDDD", marginBottom: 8 }}
            label="로그인"
            onPress={ async () =>{
              let URI = 'http://btrya23.iptime.org:8000/wdjapp';
              try {
                let response = await fetch(URI, {
                  method: 'POST',
                  headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                  },
                  body: JSON.stringify({
                    data2: 'data2',
                    key2: 'key2',
                    name2: 'name2',
                    email2: 'email2',
                  })
                });
                let responseJsonData = await response.json();
                console.log(responseJsonData);
              } catch (e) {
                console.log(e);
              }
              // login('WDJ@YJU', 'password');
            }} // 이 동작이 setUserInfo 실행 -> NavigationContainer 의 함수로 인해서 MainNavi 스택으로 이동
            />
          <ButtonContainer>
            <Button
              style={{ backgroundColor:"#DDDDDD" }}
              label="회원가입"
              onPress={() => navigation.navigate('SignUp')}
            />
            <ButtonMargin />
            <Button
              style={{ backgroundColor:"#DDDDDD" }}
              label="비밀번호 재설정"
              onPress={() => navigation.navigate('ResetPassword')}
            />
          </ButtonContainer>
        </FormContainer>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;