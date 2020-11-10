import 'react-native-gesture-handler';
import React, {Fragment, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {UserContextProvider} from '~/Contexts/User/index';
import {DrivingDataProvider} from '~/Contexts/DrivingData';
import Navigator from '~/Screens/Navigator';
import SplashScreen from 'react-native-splash-screen';
import '~/i18n';

interface Props {}

const App = ({}: Props) => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <Fragment>
      <UserContextProvider>
        <DrivingDataProvider>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={'transparent'}
            translucent={true}
          />
          <Navigator />
        </DrivingDataProvider>
      </UserContextProvider>
    </Fragment>
  );
};

export default App;
