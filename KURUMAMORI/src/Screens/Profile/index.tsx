import React, {useState, useContext, useEffect} from 'react';
import Styled from 'styled-components/native';
import {UserContext} from '~/Contexts/User/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

const Container = Styled.View`
  flex: 1;
  align-items: center;
  padding-top: 24px;
  background-color: #EFEFEF;
  padding-bottom: 24px;
`;
const BackContainer = Styled.View`
  width: 90%;
  background-color: #FFFFFF;
  margin-top: 6px;
  padding: 12px;
  border-width: 1px;
  margin-bottom: 6px;
  border-color: #AAAA;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.5);
  elevation: 30;
`;
const LabelContainer = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
const Label = Styled.Text`
  color: #000000;
  font-weight: bold;
  font-size: 20px;
`;
const Text = Styled.Text`
  font-size: 16px;
  padding-left: 10px;
  padding-right: 10px;
`;

type NavigationProp = StackNavigationProp<MainSecondStackNavi, 'Profile'>;

interface Props {
  navigation: NavigationProp;
}

const Profile = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {userInfo2, profileSearchRes, profileSearch} = useContext<IUserContext>(
    UserContext,
  );

  useEffect(() => {
    console.log('--- --- Profile');
    if (userInfo2) {
      if (userInfo2.key != -1 && userInfo2.key != undefined) {
        profileSearch();
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
          <Label>{t('memberinformation')}</Label>
        </LabelContainer>
        {profileSearchRes ? (
          <>
            <Text>
              {t('membername')} :{' '}
              {profileSearchRes[0].name
                ? profileSearchRes[0].name.toString()
                : ''}
            </Text>
            <Text>
              {t('membergender')} :{' '}
              {profileSearchRes[0].gender
                ? profileSearchRes[0].gender.toString()
                : ''}
            </Text>
            <Text>
              {t('memberbirthday')} :{' '}
              {profileSearchRes[0].birth
                ? profileSearchRes[0].birth.toString()
                : ''}
            </Text>
            <Text>
              {t('memberphone')} :{' '}
              {profileSearchRes[0].phone
                ? profileSearchRes[0].phone.toString()
                : ''}
            </Text>
          </>
        ) : (
          <>
            <Text>{t('membername')} :</Text>
            <Text>{t('membergender')} :</Text>
            <Text>{t('memberbirthday')} :</Text>
            <Text>{t('memberphone')} :</Text>
          </>
        )}
      </BackContainer>

      <BackContainer>
        <LabelContainer>
          <Label>{t('emergencycontactinformation')}</Label>
        </LabelContainer>
        <Text>
          {t('emergencycontactphone')} :{' '}
          {profileSearchRes && profileSearchRes[1] ? profileSearchRes[1] : ''}
        </Text>
      </BackContainer>

      <BackContainer>
        <LabelContainer>
          <Label>{t('medicalinformation')}</Label>
        </LabelContainer>
        {profileSearchRes && profileSearchRes[2] ? (
          <>
            <Text>
              {t('medicalhospital')} : {profileSearchRes[2].hospital}
            </Text>
            <Text>
              {t('medicalhistory')} : {profileSearchRes[2].sickness_name}
            </Text>
            <Text>
              {t('medication')} : {profileSearchRes[2].medicine}
            </Text>
            <Text>
              {t('medicalsymptom')} : {profileSearchRes[2].symptom}
            </Text>
          </>
        ) : (
          <>
            <Text>{t('medicalhospital')} :</Text>
            <Text>{t('medicalhistory')} :</Text>
            <Text>{t('medication')} :</Text>
            <Text>{t('medicalsymptom')} :</Text>
          </>
        )}
      </BackContainer>
      <BackContainer>
        <LabelContainer>
          <Label>{t('propertyinsurancecompany')}</Label>
        </LabelContainer>
        {profileSearchRes && profileSearchRes[3] && profileSearchRes[4] ? (
          <>
            <Text>
              {t('insurancecompany')} : {profileSearchRes[3].insurance_name}
            </Text>
            <Text>
              {t('insurancecompanyphone')} :{' '}
              {profileSearchRes[3].insurance_phone}
            </Text>
            <Text>
              {t('subscriptiondate')} : {profileSearchRes[4].subscription_date}
            </Text>
            <Text>
              {t('maturitydate')} : {profileSearchRes[4].expiration_date}
            </Text>
          </>
        ) : (
          <>
            <Text>{t('insurancecompany')} :</Text>
            <Text>{t('insurancecompanyphone')} :</Text>
            <Text>{t('subscriptiondate')} :</Text>
            <Text>{t('maturitydate')} :</Text>
          </>
        )}
      </BackContainer>
    </Container>
  );
};

export default Profile;
