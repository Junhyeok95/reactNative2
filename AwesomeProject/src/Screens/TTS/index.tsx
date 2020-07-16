import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import Voice from '@react-native-community/voice';
import Ttsjs from './Ttsjs';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #FAFAFA;
`;
const View = Styled.View`
  width: 90%;
  height: 90%;
  background-color: #0000FF44;
  justify-content: center;
  align-items: center;
`;
const Text = Styled.Text`
  font-size: 42px;
  font-weight:900;
`;
const Record = Styled.TouchableOpacity`
  border: 3px solid blue;
  padding: 15px;
  background-color: white;
  margin: 10px;
`;

interface Props {
}

const TTS = ({}: Props) => {

  const [isRecord, setIsRecord] = useState<boolean>(false);
  const buttonLabel = isRecord ? 'Stop' : 'Start';

  useEffect(() => {

    return () => {

    };

  },[]);

  return (
    <Container>
      <View>
        <Text>
          TTS Test
        </Text>
        <Record onPress={()=>setIsRecord(!isRecord)}>
          <Text style={isRecord ?{color:"#AA0000"}:{}}>
            {buttonLabel}
          </Text>
        </Record>

        <Ttsjs
        _speak={"Thank you very much"}
        _language={"en-US"}
        _onPress={()=>{
          console.log("en-US / com.apple.ttsbundle.Samantha-compact");
        }}/>

        <Ttsjs
        _speak={"감사합니다"}
        _language={"ko-KR"}
        _onPress={()=>{
          console.log("ko-KR / com.apple.ttsbundle.Yuna-compact");
        }}/>

        <Ttsjs
        _speak={"ありがとうございます"}
        _language={"ja-JP"}
        _onPress={()=>{
          console.log("ja-JP / com.apple.ttsbundle.Kyoko-compact");
        }}/>
        
      </View>
    </Container>
  );
};

export default TTS;
