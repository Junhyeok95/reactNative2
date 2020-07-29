import React from 'react';
import Styled from 'styled-components/native';
import Button from '~/Components/Button';

const Container = Styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 8px;
  border-bottom-width: 2px;
  border-bottom-color: #000000;
`;
const Text = Styled.Text`
  flex: 2;
  font-size: 16px;
  font-weight: bold;
  color: #555;
`;

interface Props {
  title?: string;
  btnLabel: string;
  onPress?: () => void;
}

const Subtitle = ({title, btnLabel, onPress}: Props) => {
  return (
    <Container>
      <Text>{title}</Text>
      <Button style={{padding: 4}} label={btnLabel} onPress={onPress} />
    </Container>
  );
};
export default Subtitle;
