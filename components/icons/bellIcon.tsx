import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path } from "react-native-svg"


export default function BellIcon() {
    return (
      <View >
        <Svg width="21" height="21" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M18 16.7H0V14.9H0.9V8.6279C0.9 4.1387 4.527 0.5 9 0.5C13.473 0.5 17.1 4.1387 17.1 8.6279V14.9H18V16.7ZM2.7 14.9H15.3V8.6279C15.3 5.1332 12.4794 2.3 9 2.3C5.5206 2.3 2.7 5.1332 2.7 8.6279V14.9ZM6.75 17.6H11.25C11.25 18.1967 11.0129 18.769 10.591 19.191C10.169 19.6129 9.59674 19.85 9 19.85C8.40326 19.85 7.83097 19.6129 7.40901 19.191C6.98705 18.769 6.75 18.1967 6.75 17.6Z" fill="#686767"/>
        </Svg>
      </View>
    );
  }
  