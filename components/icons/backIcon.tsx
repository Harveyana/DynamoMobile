import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle } from "react-native-svg"


export default function BackIcon() {
    return (
      <View >
        <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Rect x="1.25" y="1.25" width="37.5" height="37.5" rx="18.75" fill="white"/>
          <Rect x="1.25" y="1.25" width="37.5" height="37.5" rx="18.75" stroke="#F2F2F2" stroke-width="1.5"/>
          <Path d="M16.245 19.1H27.1998V20.9H16.245L21.0726 25.7276L19.8 27.0002L12.7998 20L19.8 12.9998L21.0726 14.2724L16.245 19.1Z" fill="#686767"/>
        </Svg>
      </View>
    );
  }