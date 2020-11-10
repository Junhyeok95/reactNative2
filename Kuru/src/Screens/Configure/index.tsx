import React, {useState, useContext, useEffect} from 'react';
import Styled from 'styled-components/native';
import {DrivingDataContext} from '~/Contexts/DrivingData';
import {UserContext} from '~/Contexts/User/index';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import {useTranslation} from 'react-i18next';

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
const TouchableOpacity = Styled.TouchableOpacity``;

const TouchText = Styled.Text`
  border-width: 2px;
  border-color: blue;
  padding: 2px 6px;
`;
const TextTouchableOpacity = Styled.TouchableOpacity`
  position: absolute;
  align-items: center;
  right: 3px;
  bottom: 3px;
`;
const BR: string = '\n';

type NavigationProp = StackNavigationProp<MainFourthStackNavi, 'Configure'>;

interface Props {
  navigation: NavigationProp;
}

const Configure = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {
    userLanguage,
    updateUserLanguage,
    userInfo2,
    settingSearchRes,
    settingSearch,
  } = useContext<IUserContext>(UserContext);
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
          <Label>{t('deviceinformation')}</Label>
        </LabelContainer>
        {settingSearchRes ? (
          <>
            <Text>
              {t('devicecode')} : {settingSearchRes.product_key}
            </Text>
            <Text>
              {t('purchasedate')} : {settingSearchRes.created_at.slice(0, 10)}
            </Text>
          </>
        ) : (
          <>
            <Text>{t('devicecode')} :</Text>
            <Text>{t('purchasedate')} :</Text>
          </>
        )}
      </BackContainer>
      <BackContainer>
        <LabelContainer>
          <Label>{t('termsofuse')}</Label>
        </LabelContainer>
        <TouchableOpacity onPress={() => drivingDelete()}>
          <TextContainer>
            <Text>{t('termsofuselorem')}</Text>
          </TextContainer>
        </TouchableOpacity>
      </BackContainer>
      <Container2>
        <BackContainer2>
          <Label>{t('versioninformation')}</Label>
          <Text>
            {t('currentversion')} : 1. 3. 5{BR}
            {t('latestversion')} : 1. 3. 5
          </Text>
        </BackContainer2>
        <BackContainer2>
          <Label>{t('languageinformation')}</Label>
          <Text>
            {t('currentlanguage')} : {userLanguage}
          </Text>
          <TextTouchableOpacity
            onPress={() => {
              console.log('언어변경');
              if (userLanguage == 'en') {
                updateUserLanguage('kr');
              }
              if (userLanguage == 'kr') {
                updateUserLanguage('jp');
              }
              if (userLanguage == 'jp') {
                updateUserLanguage('en');
              }
            }}>
            <TouchText>{t('change')}</TouchText>
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
