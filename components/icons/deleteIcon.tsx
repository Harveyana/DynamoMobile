import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle } from "react-native-svg"


export default function DeleteIcon() {
    return (
      <View >
        <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Rect width="36" height="36" rx="18" fill="#FAFAFA"/>
          <Path d="M22.5 12.6H27V14.4H25.2V26.1C25.2 26.3387 25.1052 26.5676 24.9364 26.7364C24.7676 26.9052 24.5387 27 24.3 27H11.7C11.4613 27 11.2324 26.9052 11.0636 26.7364C10.8948 26.5676 10.8 26.3387 10.8 26.1V14.4H9V12.6H13.5V9.9C13.5 9.66131 13.5948 9.43239 13.7636 9.2636C13.9324 9.09482 14.1613 9 14.4 9H21.6C21.8387 9 22.0676 9.09482 22.2364 9.2636C22.4052 9.43239 22.5 9.66131 22.5 9.9V12.6ZM23.4 14.4H12.6V25.2H23.4V14.4ZM15.3 10.8V12.6H20.7V10.8H15.3Z" fill="#686767"/>
        </Svg>

      </View>
    );
  }