import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {UserContext} from '~/Contexts/User/index';
import CustomDrawer from '~/Screens/Drawer';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconButton from '~/Components/IconButton';
import SignIn from './SignIn';
import Driving from './Driving';
import Profile from './Profile';
import Bluetooth from './Bluetooth';
import Configure from './Configure';
import MapData from './MapData';
import MapMarker from './MapMarker';
import {useTranslation} from 'react-i18next';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

type TypeDrawerProp = DrawerNavigationProp<DrawNaviParamList, 'MainTabNavi'>;
interface DrawerProp {
  navigation: TypeDrawerProp;
}

const LoginStackNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#AAAAAA',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainFirstStackNavi = ({navigation}: DrawerProp) => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#002EF0',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: () => (
          <IconButton
            style={{marginRight: 8}}
            icon="menu"
            color="#FFFFFF"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Stack.Screen
        name="Driving"
        component={Driving}
        options={{
          headerTitle: t('headerTitle'),
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainSecondStackNavi = ({navigation}: DrawerProp) => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#002EF0',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: () => (
          <IconButton
            style={{marginRight: 8}}
            icon="menu"
            color="#FFFFFF"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: t('headerTitle'),
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
const MainThirdStackNavi = ({navigation}: DrawerProp) => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#002EF0',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: () => (
          <IconButton
            style={{marginRight: 8}}
            icon="menu"
            color="#FFFFFF"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Stack.Screen
        name="Bluetooth"
        component={Bluetooth}
        options={{
          headerTitle: t('headerTitle'),
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainFourthStackNavi = ({navigation}: DrawerProp) => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#002EF0',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: () => (
          <IconButton
            style={{marginRight: 8}}
            icon="menu"
            color="#FFFFFF"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Stack.Screen
        name="Configure"
        component={Configure}
        options={{
          headerTitle: t('headerTitle'),
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainTabNavi = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName="MainFirstStackNavi"
      shifting={true}
      activeColor={'#000000'}
      inactiveColor={'#AAAAAA'}
      barStyle={{backgroundColor: '#FFFFFF'}}>
      <Tab.Screen
        name="MainFirstStackNavi"
        component={MainFirstStackNavi}
        options={{
          tabBarLabel: t('driving'),
          tabBarIcon: 'car',
        }}
      />
      <Tab.Screen
        name="MainThirdStackNavi"
        component={MainThirdStackNavi}
        options={{
          tabBarLabel: t('pairing'),
          tabBarIcon: 'bluetooth',
        }}
      />
      <Tab.Screen
        name="MainSecondStackNavi"
        component={MainSecondStackNavi}
        options={{
          tabBarLabel: t('information'),
          tabBarIcon: 'account-outline',
        }}
      />
      <Tab.Screen
        name="MainFourthStackNavi"
        component={MainFourthStackNavi}
        options={{
          tabBarLabel: t('configure'),
          tabBarIcon: 'cog-outline',
        }}
      />
    </Tab.Navigator>
  );
};

const MapTabNavi = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName={'MapData'}
      shifting={true}
      activeColor={'#000000'}
      inactiveColor={'#AAAAAA'}
      barStyle={{backgroundColor: '#FFFFFF'}}>
      <Tab.Screen
        name={'MapData'}
        component={MapData}
        options={{
          tabBarLabel: t('map'),
          tabBarIcon: 'map-outline',
        }}
      />
      <Tab.Screen
        name={'MapMarker'}
        component={MapMarker}
        options={{
          tabBarLabel: t('statistics'),
          tabBarIcon: 'chart-bar',
        }}
      />
    </Tab.Navigator>
  );
};

const DrawNavi = () => {
  const {t} = useTranslation();
  return (
    <Drawer.Navigator
      initialRouteName={'MainTabNavi'}
      drawerPosition={'right'}
      drawerType={'slide'}
      drawerContent={(props) => <CustomDrawer props={props} />}
      drawerContentOptions={{
        activeTintColor: '#0000FF',
      }}>
      <Drawer.Screen
        name={'MainTabNavi'}
        component={MainTabNavi}
        options={{
          headerShown: false,
          title: t('main'),
          drawerIcon: ({}) => <Icon name="home" color={'#888'} size={24} />,
        }}
      />
      <Drawer.Screen
        name={'MapTabNavi'}
        component={MapTabNavi}
        options={{
          headerShown: false,
          title: t('map'),
          drawerIcon: ({}) => (
            <Icon
              style={{margin: 0, padding: 0}}
              name="map"
              color={'#888'}
              size={24}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const RootNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawNavi"
        component={DrawNavi}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default () => {
  const {userInfo, userInfo2} = useContext<IUserContext>(UserContext);
  return (
    <NavigationContainer>
      {userInfo || userInfo2 ? <RootNavi /> : <LoginStackNavi />}
    </NavigationContainer>
  );
};
