import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';

import { useTranslation, initReactI18next } from "react-i18next";

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #AAAAAA;
`;
const View2 = Styled.View`
`
const Border = Styled.View`
  border: 2px blue solid;
`
const View = Styled.View`
  width: 80%;
  height: 80%;
  background-color: #FFFFFF;
  justify-content: center;
  align-items: center;
`;
const Text = Styled.Text`
  font-size: 32px;
  color: #000000;
  margin: 8px;
  text-align: center;
`;
const Btn = Styled.Button`
`;
const BtnText = Styled.Text`
  font-size: 48px;
  color: #0000aa;
  margin: 8px;
`;


interface Props {

}

const Multi3 = ({}: Props) => {

  const [touch, setTouch] = useState<boolean>(false);

  const { t, i18n } = useTranslation();
  
  useEffect(() => {

    console.log("multi3 반갑습니다 i18n");
    // console.log(i18n);

    return () => {
    };

  },[]);

  return (
    <Container>
      <View2>
        <BtnText>
          언어 : { touch ? "한국어" : "일본어" }
        </BtnText>
      </View2>
      <View>
        <Btn title={"MMMMMM"+"\n"+"MMMMMM"+"\n"+"MMMMMM"+"\n"+"MMMMMM"} onPress={()=>{
          console.log("버튼 클릭");
          if(touch){
            i18n
              .use(initReactI18next) // passes i18n down to react-i18next
              .init({
                lng: "jp",
              });
          } else {
            i18n
            .use(initReactI18next) // passes i18n down to react-i18next
            .init({
              lng: "kr",
            });
          }
          setTouch(!touch);
        }}/>
        <Border>
          <Text>
            React native {'\n'}
            Hooks {'\n'}
            Typescript
          </Text>
        </Border>
        <Text>
          {t('Welcome')}
        </Text>
        <Text>
          {t('hello')}
        </Text>
        <Text>
          {t('home')}
        </Text>
      </View>
    </Container>
  );
};

export default Multi3;