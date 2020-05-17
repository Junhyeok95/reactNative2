import React, {useState} from 'react';
import Styled from 'styled-components/native';

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
const BackContainer = Styled.View`
  border-width: 1px;
  border-color: #AAAA;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.5);
`;

interface Props {
  onValueChange: () => void;
  value: boolean;
}

const Toggle = ({onValueChange, value}: Props) => {
  // const [isEnabled, setIsEnabled] = useState(true);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // const state = ['OFF', 'ON'];

  return (
    <Container>
      <Text>Bluetooth
        {/* {isEnabled ? state[1] : state[0]} */}
      </Text>
      <Switch onValueChange={onValueChange} value={value} />
    </Container>
  );
};
export default Toggle;
