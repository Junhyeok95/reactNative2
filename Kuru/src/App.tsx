import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <>
      <View style={styles.ViewStyle}>
        <Text style={styles.TextStyle}>Hello World</Text>
        <Image
          style={styles.ImageStyle}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <Image
          style={styles.ImageStyle}
          source={require('././Assets/Images/ok.png')}
        />
        <Icon name="home" size={24} color="#ffffff" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87ABFA',
  },
  ImageStyle: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
  TextStyle: {
    fontSize: 64,
  },
});

export default App;
