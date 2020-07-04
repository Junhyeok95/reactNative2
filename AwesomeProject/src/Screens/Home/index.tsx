import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import DeviceInfo from 'react-native-device-info';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #EEEEEE;
`;
const View = Styled.View`
  width: 80%;
  height: 80%;
  background-color: #0000AA99;
  justify-content: center;
  align-items: center;
`;
const Text = Styled.Text`
  font-size: 24px;
  color: #000000;
  margin: 8px;
`;

interface Props {
}

const Home = ({}: Props) => {

  const [ID, setID] = useState<string>("");
  const [Tablet, setTablet] = useState<boolean>(false);
  
  
  useEffect(() => {
    
    const uniqueID = DeviceInfo.getUniqueId();
    const isTablet = DeviceInfo.isTablet();
    
    if(setID){
      setID(uniqueID);
    }
    if(isTablet){
      setTablet(isTablet);
    }

    return () => {
    };
  },[]);

  return (
    <Container>
      <View>
        <Text>
          Home
        </Text>
        <Text>
          uniqueID
        </Text>
        <Text style={{ width:300, fontSize:20, textAlign:"center"}}>
          {ID}
        </Text>
        <Text>
        isTablet {Tablet}
        </Text>
      </View>
    </Container>
  );
};

export default Home;
