import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle,G,Defs,ClipPath } from "react-native-svg"


export default function RangeIcon() {
    return (
      <View >
        <Svg width="332" height="296" viewBox="0 0 332 296" fill="none" xmlns="http://www.w3.org/2000/svg">
          <G clip-path="url(#clip0_151_2493)">
          </G>
          <Rect x="2.39565" y="45.3957" width="326.209" height="204.887" rx="15.6043" stroke="white" stroke-opacity="0.5" stroke-width="0.791304"/>
          <Path fill-rule="evenodd" clip-rule="evenodd" d="M18 1C8.61116 1 1 8.61116 1 18V33.9167H0V18C0 8.05887 8.05887 0 18 0H56.7905V1H18ZM56.7905 295H18C8.61116 295 1 287.389 1 278V262.083H0V278C0 287.941 8.05887 296 18 296H56.7905V295ZM268.176 296H313.276C323.217 296 331.276 287.941 331.276 278V262.083H330.276V278C330.276 287.389 322.665 295 313.276 295H268.176V296ZM268.176 1H313.276C322.665 1 330.276 8.61116 330.276 18V33.9167H331.276V18C331.276 8.05888 323.217 0 313.276 0H268.176V1Z" fill="white"/>
          <Defs>
          <ClipPath id="clip0_151_2493">
          <Rect x="2" y="45" width="327" height="205.678" rx="16" fill="white"/>
          </ClipPath>
          </Defs>
        </Svg>
      </View>
    );
  }