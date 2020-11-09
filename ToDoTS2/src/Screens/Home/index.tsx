import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';

const View = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Image = Styled.Image`
  width: 300px;
  height: 300px;
`;
const Text = Styled.Text`
  font-size: 40px;
`;

interface Props {}

const Home = ({}: Props) => {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    setData('Hello');
    return () => {};
  }, []);

  return (
    <>
      <View>
        <Text>{data}</Text>
        <Image source={require('./yt.png')} />
      </View>
    </>
  );
};

export default Home;
