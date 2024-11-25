import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle } from "react-native-svg"


export default function GeneralIcon() {
    return (
      <View >
       <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Rect width="32" height="32" rx="16" fill="#FFF1F3"/>
        <Path d="M23.5 22H8.5V20.5H9.25V15.2733C9.25 11.5323 12.2725 8.5 16 8.5C19.7275 8.5 22.75 11.5323 22.75 15.2733V20.5H23.5V22ZM10.75 20.5H21.25V15.2733C21.25 12.361 18.8995 10 16 10C13.1005 10 10.75 12.361 10.75 15.2733V20.5ZM14.125 22.75H17.875C17.875 23.2473 17.6775 23.7242 17.3258 24.0758C16.9742 24.4275 16.4973 24.625 16 24.625C15.5027 24.625 15.0258 24.4275 14.6742 24.0758C14.3225 23.7242 14.125 23.2473 14.125 22.75Z" fill="#FF2E42"/>
      </Svg>
      </View>
    );
  }