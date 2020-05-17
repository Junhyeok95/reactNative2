import 'react-native-gesture-handler';
import React, {Fragment, useEffect} from 'react';
import Styled from 'styled-components/native';
import {UserContextProvider} from '~/Contexts/User';
import {DrivingDataProvider} from '~/Contexts/DrivingData';
import Navigator from '~/Screens/Navigator';
import SplashScreen from 'react-native-splash-screen'

interface Props {}

const App = ({ }: Props) => {

  useEffect(() => {
    console.log("===== ===== START ===== =====");
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
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
