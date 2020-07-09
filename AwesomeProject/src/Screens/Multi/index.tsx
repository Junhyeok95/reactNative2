import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';

import RNLanguages from 'react-native-languages';
import I18n from "./I18n";

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

interface Props {
  // https://dev.to/vikrantnegi/creating-a-multi-language-app-in-react-native-1joj
}

const Multi = ({}: Props) => {

  const [ID, setID] = useState<string>("");
  const [Tablet, setTablet] = useState<boolean>(false);
  
  useEffect(() => {

      console.log('> language', RNLanguages.language);
      console.log('> languages', RNLanguages.languages);

    return () => {
    };
  },[]);

  return (
    <Container>
      <View>
        <Text>
          반갑다
        </Text>
        {/* <I18n /> */}
      </View>
    </Container>
  );
};

export default Multi;
