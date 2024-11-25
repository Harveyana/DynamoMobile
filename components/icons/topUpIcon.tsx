import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle } from "react-native-svg"


export default function TopupIcon() {
    return (
      <View >
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Rect width="32" height="32" rx="16" fill="#EEFBF7"/>
        <Path d="M15.1002 15.1002V9.7002H16.9002V15.1002H22.3002V16.9002H16.9002V22.3002H15.1002V16.9002H9.7002V15.1002H15.1002Z" fill="#38C793"/>
        </Svg>
      </View>
    );
  }