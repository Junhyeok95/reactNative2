import React, {useEffect} from 'react';
import Styled from 'styled-components/native';
import List from '~/Screens/Bluetooth/List';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation, initReactI18next} from 'react-i18next';

const Container = Styled.View`
  flex: 1;
  background-color: #EFEFEF;
`;
const Text = Styled.Text`
`;
type NavigationProp = StackNavigationProp<MainThirdStackNavi, 'List'>;

interface Props {
  navigation: NavigationProp;
}

const Bluetooth = ({navigation}: Props) => {
  const {t, i18n} = useTranslation();

  useEffect(() => {
    console.log('--- --- Bluetooth');
    i18n
      .use(initReactI18next) // passes i18n down to react-i18next
      .init({
        lng: 'jp',
      });
  }, []);

  return (
    <Container>
      <Text>{t('hello')}</Text>
      <List navigation={navigation} />
    </Container>
  );
};

export default Bluetooth;
