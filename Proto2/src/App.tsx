import 'react-native-gesture-handler';
import React, {Fragment, useEffect} from 'react';
import Styled from 'styled-components/native';
import {UserContextProvider} from '~/Contexts/User';
import {DrivingDataProvider} from '~/Contexts/DrivingData';
import Navigator from '~/Screens/Navigator';

interface Props {}

const App = ({ }: Props) => {

  useEffect(() => {
    console.log("App.tsx useEffect");
  }, []);

  return (
    <Fragment>
      <UserContextProvider>
        <DrivingDataProvider>
          <Navigator />
        </DrivingDataProvider>
      </UserContextProvider>
    </Fragment>
  );
};

export default App;
