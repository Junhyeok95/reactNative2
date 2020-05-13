import React, {useContext, useState, useEffect} from 'react';
import {Platform, Linking, Alert} from 'react-native';
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
  background-color: #FFFFFF;
  justify-content: center;
  align-items: center;
`;
// border-width: 10px;
// border-top-width: 50px;
// border-bottom-width: 50px;
// border-color: #002EF0CC;
const View = Styled.View`
  width: 100%;
  align-items: center;
`;
const TextRowView = Styled.View`
  flex-direction: row;
`;

const KrumamoText = Styled.Text`
  font-size: 60px;
  color: #000000;
`;
const Ri9Text = Styled.Text`
  font-size: 60px;
  color: #FF0000;
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

const TopView = Styled.View`
  position: absolute;
  top: 48px;
  left: 16px;
`;
const TouchableOpacityView = Styled.View`
`;
const TouchableOpacity = Styled.TouchableOpacity`
  padding: 8px;
  border: 1px;
`;
const TouchableOpacity2 = Styled.TouchableOpacity`
  padding: 8px;
  border: 1px;
`;
const Label = Styled.Text`
  font-size: 16px;
  text-align: center;
  color: #000000;
`;

type NavigationProp = StackNavigationProp<LoginStackNaviParamList, 'SignIn'>;

interface Props {
  navigation: NavigationProp;
}

const SignIn = ({navigation}: Props) => {
  const {login, login2} = useContext<IUserContext>(UserContext);
  let loginNum = 0;

  const [inputEmail, setInputEamil] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <View>
          <TextRowView>
            <KrumamoText> クルマモ</KrumamoText><Ri9Text>リ9 </Ri9Text>
          </TextRowView>
          <Icon
            style={{margin: 36}}
            name="account-circle"
            color={'#0009'}
            size={200}
          />
          <FormContainer>
            <Input
              style={{flex:1, backgorunColr:"#F00", marginBottom: 8}}
              placeholder={'이메일'}
              keyboardType={'email-address'}
              onChangeText={e=>setInputEamil(e)}
            />
            <Input
              style={{ marginBottom: 8 }}
              secureTextEntry={true}
              placeholder={'비밀번호'}
              onChangeText={e=>setInputPassword(e)}
            />
            <Button
              // label="Sign In"
              style={{ backgroundColor:"#DDDDDD", marginBottom: 8 }}
              label="로그인"
              onPress={()=>{
                if(inputEmail.trim() && inputPassword.trim()){
                  let inputE = inputEmail.trim();
                  let inputP = inputPassword.trim();
                  login2(inputE, inputP);
                }else{
                  Alert.alert("내용을 잘못입력했습니다");
                }
              }}
              // 이 동작이 setUserInfo 실행 -> NavigationContainer 의 함수로 인해서 MainNavi 스택으로 이동
            />
            <ButtonContainer>
              <Button
                style={{ backgroundColor:"#DDDDDD" }}
                label="회원가입"
                // onPress={() => navigation.navigate('SignUp')}
                onPress={() => Linking.openURL('http://btrya23.iptime.org:8000/auth/signup')}
              />
              {/* <ButtonMargin />
              <Button
                style={{ backgroundColor:"#DDDDDD" }}
                label="비밀번호 재설정"
                // onPress={() => navigation.navigate('ResetPassword')}
                onPress={() => Linking.openURL('https://yju.ac.kr')}
              /> */}
            </ButtonContainer>
          </FormContainer>
        </View>
        <TopView>
          <TouchableOpacityView>
            <TouchableOpacity>
              <Label>
                URL
              </Label>
            </TouchableOpacity>
            <TouchableOpacity2 onPress={()=>login('WDJ@YJU', 'password')}>
              <Label>
                MASTER
              </Label>
            </TouchableOpacity2>
          </TouchableOpacityView>
        </TopView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;