import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle,ClipPath,Defs,G } from "react-native-svg"


export default function DateIcon() {
    return (
      <View >
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M16.5 3.89961H20.1C20.3387 3.89961 20.5676 3.99443 20.7364 4.16321C20.9052 4.332 21 4.56091 21 4.79961V19.1996C21 19.4383 20.9052 19.6672 20.7364 19.836C20.5676 20.0048 20.3387 20.0996 20.1 20.0996H3.9C3.66131 20.0996 3.43239 20.0048 3.2636 19.836C3.09482 19.6672 3 19.4383 3 19.1996V4.79961C3 4.56091 3.09482 4.332 3.2636 4.16321C3.43239 3.99443 3.66131 3.89961 3.9 3.89961H7.5V2.09961H9.3V3.89961H14.7V2.09961H16.5V3.89961ZM14.7 5.69961H9.3V7.49961H7.5V5.69961H4.8V9.29961H19.2V5.69961H16.5V7.49961H14.7V5.69961ZM19.2 11.0996H4.8V18.2996H19.2V11.0996Z" fill="#686767"/>
        </Svg>
      </View>
    );
  }
  