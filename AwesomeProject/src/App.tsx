import React from 'react';
import {SafeAreaView, StatusBar, View, Text, Image} from 'react-native';
import Home from '~/Screens/Home';
import Profile from '~/Screens/Profile';
import SpeechTest from '~/Screens/SpeechTest';
import Mail from '~/Screens/Mail';
import Multi from '~/Screens/Multi';
import Multi2 from '~/Screens/Multi2';
import Multi3 from '~/Screens/Multi3';
import TTS from '~/Screens/TTS';
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
      {/* <Multi3 /> */}
      {/* <TTS /> */}
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 40,
            textAlign: 'center',
            backgroundColor: '#00FF0055',
          }}>
          Hello
        </Text>
        <View style={{backgroundColor: '#00FF0077'}}>
          <Image
            style={{
              width: 50,
              height: 50,
            }}
            source={{
              uri: 'https://pbs.twimg.com/media/EGR6H_dXkAE9Pu8.jpg',
            }}
            // source={require('./abc.png')}
          />
        </View>
      </View>
    </>
  );
};

export default App;
