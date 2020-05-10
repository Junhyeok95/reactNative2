import React, {useEffect} from 'react';
import Styled from 'styled-components/native';
import Header from '~/Screens/Bluetooth/Header';
import List from '~/Screens/Bluetooth/List';

const Container = Styled.View`
  flex: 1;
  align-items: center;
`;

const Bluetooth = () => {

  useEffect(() => {
    console.log("--- --- Bluetooth");
  }, []);

  return (
    <Container>
      <Header />
      <List />
    </Container>
  );
};

export default Bluetooth;
