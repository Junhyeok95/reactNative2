import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Styled from 'styled-components/native';

const View = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = Styled.Text`
  font-size: 32px;
`;

interface Props {}

const App = ({ }: Props) => {

  useEffect(() => {
    console.log("App useEffect");
  }, []);

  return (
    <>
      <View>
        <Text>
          Hello
        </Text>
      </View>
    </>
  );
};

export default App;
