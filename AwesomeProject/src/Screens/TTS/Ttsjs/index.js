import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import Tts from 'react-native-tts';

const Button = Styled.TouchableOpacity`
  border: 3px solid red;
  padding: 10px;
  margin: 10px;
  background-color: white;
`;
const Text = Styled.Text`
  font-size: 24px;
  font-weight:700;
`;

const Ttsjs = ({ _speak, _language, _onPress }) => {

  let _iosVoiceId = "com.apple.ttsbundle.Samantha-compact";

  useEffect(() => {

    

    // Tts.setDefaultLanguage(''); // 해당국가 찾아서 셋팅 필요
    // Tts.voices().then(voices => console.log(voices)); // 단말기 지원 리스트 확인

    Tts.addEventListener('tts-start', event => {});
    Tts.addEventListener('tts-finish', event => {});
    Tts.addEventListener('tts-cancel', event => {});

    // Tts.stop(); // 클리어
    // Tts.speak('Hello Yeungjin University', {
    //   rate: 0.5,
    // });

    return () => {
    };
  },[]);

  return (
    <Button onPress={()=>{

      if(_language == "ko-KR"){
        console.log("한국어 지원");
        _iosVoiceId = 'com.apple.ttsbundle.Yuna-compact';
      }
      if(_language == "ja-JP"){
        console.log("일본어 지원");
        _iosVoiceId = 'com.apple.ttsbundle.Kyoko-compact';
      }

      Tts.stop(); // 클리어
      Tts.speak(_speak, {
        iosVoiceId: _iosVoiceId,
        // iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
        // iosVoiceId: 'com.apple.ttsbundle.Kyoko-compact',
        // iosVoiceId: 'com.apple.ttsbundle.Yuna-compact',
        rate: 0.5,
      });
    }}>
      <Text>
        국가 : {_language}
      </Text>
      <Text>
        {_speak}
      </Text>
    </Button>
  );
};

export default Ttsjs;