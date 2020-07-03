import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import Home from '~/Screens/Home';
import Profile from '~/Screens/Profile';

interface Props {}

const App = ({}: Props) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Home />
      <Profile />
    </>
  );
};

export default App;
