import React, {useState} from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 8px;
`;
const Text = Styled.Text`
  flex: 1;
  font-size: 24px;
  font-weight: bold;
`;
const Switch = Styled.Switch`
  margin-left: 8px;
`;

interface Props {}

const Toggle = ({  }: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const state = ['OFF', 'ON'];

  return (
    <Container>
      <Text>{isEnabled ? state[1] : state[0]}</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </Container>
  );
};
export default Toggle;
