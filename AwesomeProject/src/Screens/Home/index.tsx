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
  background-color: #0000AA99;
`;
const Text = Styled.Text`
  font-size: 20px;
`;

interface Props {
}

const Home = ({}: Props) => {

  useEffect(() => {
    return () => {
    };
  },[]);

  return (
    <Container>
      <View>
        <Text>
          Home
        </Text>
      </View>
    </Container>
  );
};

export default Home;
