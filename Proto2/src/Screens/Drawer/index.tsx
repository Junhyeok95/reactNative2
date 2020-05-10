import React, {useContext} from 'react';
import Styled from 'styled-components/native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {UserContext} from '~/Contexts/User';
import {TouchableHighlight} from "react-native";

import Icon from 'react-native-vector-icons/SimpleLineIcons';

const Header = Styled.View`
  border-bottom-width: 1px;
  border-color: #D3D3D3;
  align-items: center;
  justify-content: center;
`;
const Text = Styled.Text`
  margin: 8px;
  font-size: 32px;
`;
const Footer = Styled.View`
  border-top-width: 1px;
  border-color: #D3D3D3;
`;

interface Props {
  props: DrawerContentComponentProps<DrawerContentOptions>;
}

const Drawer = ({props}: Props) => {
  const {logout} = useContext<IUserContext>(UserContext);
  return (
    <>
      <DrawerContentScrollView {...props}>
        <Header>
          <Text>User ID</Text>
        </Header>
        <DrawerItemList {...props} />
        <Footer>
          <DrawerItem
            icon={({ }) => (
              <Icon
                style={{margin:0, padding:0}}
                name="logout"
                color={'#000000'}
                size={24}
              />
            )}
            label="로그아웃"
            onPress={() => {
              logout();
            }}
          />
        </Footer>
      </DrawerContentScrollView>
    </>
  );
};

export default Drawer;
