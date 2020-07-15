import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import Home from '~/Screens/Home';
import Profile from '~/Screens/Profile';
import SpeechTest from '~/Screens/SpeechTest';
import Mail from '~/Screens/Mail';
import Multi from '~/Screens/Multi';
import Multi2 from '~/Screens/Multi2';

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
      <Multi2 />
    </>
  );
};

export default App;
