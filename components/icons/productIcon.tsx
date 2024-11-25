import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle } from "react-native-svg"


export default function ProductIcon() {
    return (
      <View >
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Rect width="32" height="32" rx="16" fill="#FFF1F3"/>
        <Path d="M12.25 13V11.5C12.25 10.5054 12.6451 9.55161 13.3483 8.84835C14.0516 8.14509 15.0054 7.75 16 7.75C16.9946 7.75 17.9484 8.14509 18.6517 8.84835C19.3549 9.55161 19.75 10.5054 19.75 11.5V13H22C22.1989 13 22.3897 13.079 22.5303 13.2197C22.671 13.3603 22.75 13.5511 22.75 13.75V22.75C22.75 22.9489 22.671 23.1397 22.5303 23.2803C22.3897 23.421 22.1989 23.5 22 23.5H10C9.80109 23.5 9.61032 23.421 9.46967 23.2803C9.32902 23.1397 9.25 22.9489 9.25 22.75V13.75C9.25 13.5511 9.32902 13.3603 9.46967 13.2197C9.61032 13.079 9.80109 13 10 13H12.25ZM12.25 14.5H10.75V22H21.25V14.5H19.75V16H18.25V14.5H13.75V16H12.25V14.5ZM13.75 13H18.25V11.5C18.25 10.9033 18.0129 10.331 17.591 9.90901C17.169 9.48705 16.5967 9.25 16 9.25C15.4033 9.25 14.831 9.48705 14.409 9.90901C13.9871 10.331 13.75 10.9033 13.75 11.5V13Z" fill="#FF2E42"/>
        </Svg>
      </View>
    );
  }