import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle } from "react-native-svg"


export default function EditIcon() {
    return (
      <View >
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Circle cx="12" cy="12" r="12" fill="#F6F8FA"/>
          <Path d="M8.22925 14.6998L15.0751 7.85396L14.1207 6.89951L7.2748 13.7454V14.6998H8.22925ZM8.78883 16.0498H5.9248V13.1858L13.6434 5.46716C13.77 5.34062 13.9417 5.26953 14.1207 5.26953C14.2996 5.26953 14.4713 5.34062 14.5979 5.46716L16.5075 7.37674C16.634 7.50332 16.7051 7.67498 16.7051 7.85396C16.7051 8.03295 16.634 8.20461 16.5075 8.33119L8.78883 16.0498ZM5.9248 17.3998H18.0748V18.7498H5.9248V17.3998Z" fill="#686767"/>
        </Svg>
      </View>
    );
  }