import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle } from "react-native-svg"


export default function MinusIcon() {
    return (
      <View >
        <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Rect x="0.799805" y="1" width="23" height="23" rx="11.5" fill="white"/>
          <Rect x="0.799805" y="1" width="23" height="23" rx="11.5" stroke="#E5E5E5"/>
          <Path d="M15.6331 11.8335H8.96647C8.59828 11.8335 8.2998 12.132 8.2998 12.5002C8.2998 12.8684 8.59828 13.1668 8.96647 13.1668H15.6331C16.0013 13.1668 16.2998 12.8684 16.2998 12.5002C16.2998 12.132 16.0013 11.8335 15.6331 11.8335Z" fill="black"/>
        </Svg>

      </View>
    );
  }