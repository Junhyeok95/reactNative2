import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #EEEEEE;
`;
const View = Styled.View`
  width: 80%;
  height: 80%;
  background-color: #00AA0099;
  justify-content: center;
  align-items: center;
`;
const Text = Styled.Text`
  font-size: 42px;
  color: #000000;
`;

interface Props {
}

const Profile = ({}: Props) => {

  useEffect(() => {
    return () => {
    };
  },[]);

  return (
    <Container>
      <View>
        <Text>
          Profile
        </Text>
      </View>
    </Container>
  );
};

export default Profile;
