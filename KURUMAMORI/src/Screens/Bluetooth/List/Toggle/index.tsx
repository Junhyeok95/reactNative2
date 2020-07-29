import React, {useContext} from 'react';
import Styled from 'styled-components/native';
import {DrivingDataContext} from '~/Contexts/DrivingData';
import {useTranslation} from 'react-i18next';

const Container = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
const Text = Styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
const Switch = Styled.Switch`
  margin-left: 8px;
`;
const TouchableOpacity = Styled.TouchableOpacity``;

interface Props {
  onValueChange: () => void;
  value: boolean;
}

const Toggle = ({onValueChange, value}: Props) => {
  const {t} = useTranslation();

  const {defaultInfo, setDefaultInfo} = useContext<IDrivingData>(
    DrivingDataContext,
  );

  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          let _defaultInfo = [...defaultInfo];
          console.log(_defaultInfo[3]);
          if (defaultInfo[3] == 1) {
            _defaultInfo[3] = 0;
          } else {
            _defaultInfo[3] = 1;
          }
          setDefaultInfo(_defaultInfo);
        }}>
        <Text>{t('bluetooth')}</Text>
      </TouchableOpacity>
      <Switch onValueChange={onValueChange} value={value} />
    </Container>
  );
};
export default Toggle;
