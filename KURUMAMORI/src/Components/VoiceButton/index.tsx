import React from 'react';
import Styled from 'styled-components/native';
import TtsJS from './TtsJS';

const View = Styled.View`
`;
interface Props {}

const VoiceButton = ({}: Props) => {
  return (
    <View>
      <TtsJS
        _speak={'Thank you very much'}
        _language={'en-US'}
        _onPress={() => {
          console.log('en-US / com.apple.ttsbundle.Samantha-compact');
        }}
      />
    </View>
  );
};

export default VoiceButton;
