import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle } from "react-native-svg"


export default function MenuIcon() {
    return (
      <View >
        <Svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Rect width="44" height="44" rx="10" fill="#FF2E42"/>
          <Path d="M19.75 28.75H24.25V26.5H19.75V28.75ZM11.875 15.25V17.5H32.125V15.25H11.875ZM15.25 23.125H28.75V20.875H15.25V23.125Z" fill="white"/>
        </Svg>
      </View>
    );
  }

  export function MenuIcon2() {
    return (
      <View >
        <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Rect x="1.25" y="1.25" width="37.5" height="37.5" rx="18.75" fill="white"/>
          <Rect x="1.25" y="1.25" width="37.5" height="37.5" rx="18.75" stroke="#F2F2F2" stroke-width="1.5"/>
          <Path d="M17.75 26.75H22.25V24.5H17.75V26.75ZM9.875 13.25V15.5H30.125V13.25H9.875ZM13.25 21.125H26.75V18.875H13.25V21.125Z" fill="#080708"/>
        </Svg>
      </View>
    );
  }