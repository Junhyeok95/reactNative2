import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import RNLanguages from 'react-native-languages';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #AAAAAA;
`;
const View = Styled.View`
  width: 80%;
  height: 80%;
  background-color: #FFFFFF;
  justify-content: center;
  align-items: center;
`;
const Text = Styled.Text`
  font-size: 24px;
  color: #000000;
  margin: 8px;
`;

const _resources = {
  en: {
    translation: {
      "Welcome": "Welcome"
    }
  },
  kr: {
    translation: {
      "Welcome": "kr"
    }
  },
  jp: {
    translation: {
      "Welcome": "jp"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: _resources,

    lng: "kr",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });


interface Props {

}

const Multi2 = ({}: Props) => {

  const [User, setUser] = useState<string>("");
  const [touch, setTouch] = useState<boolean>(false);

  const { t, i18n } = useTranslation();
  
  useEffect(() => {


    console.log('> 이거 .. language', RNLanguages.language);
    console.log('> 이거 .. languages', RNLanguages.languages);
    
    console.log();

    return () => {
    };

  },[]);

  return (
    <Container>
      <View>
        <Text>
          반갑다 {t('Welcome')} 반갑다
        </Text>
      </View>
    </Container>
  );
};

export default Multi2;