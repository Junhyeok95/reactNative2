import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import Home from '~/Screens/Home';
import Profile from '~/Screens/Profile';
import SpeechTest from '~/Screens/SpeechTest';
import Mail from '~/Screens/Mail';
import Multi from '~/Screens/Multi';
import Multi2 from '~/Screens/Multi2';
import Multi3 from '~/Screens/Multi3';
import './i18n';

interface Props {}

const App = ({}: Props) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <Home />
      <Profile /> */}
      {/* <SpeechTest /> */}
      {/* <Mail /> */}
      {/* <Multi /> */}
      <Multi3 />
    </>
  );
};

export default App;
