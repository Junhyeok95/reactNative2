import React, {useContext, useEffect} from 'react';
import Styled from 'styled-components/native';
import List from '~/Screens/Bluetooth/List';

const Container = Styled.View`
  flex: 1;
  background-color: #EFEFEF;
`;

const Bluetooth = () => {

  useEffect(() => {
    console.log("--- --- Bluetooth");
  }, []);

  return (
    <Container>
      <List />
    </Container>
  );
};

export default Bluetooth;
