import React from 'react';
import Styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Container = Styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

interface Props {
  icon: string;
  style?: Object;
  color?: string;
  onPress?: () => void;
}

const IconButton = ({icon, style, color, onPress}: Props) => {
  return (
    <Container style={style} onPress={onPress}>
      <Icon name={icon} color={color ? color : 'white'} size={24} />
    </Container>
  );
};

export default IconButton;
