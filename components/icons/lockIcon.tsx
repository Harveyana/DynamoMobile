import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle } from "react-native-svg"


export default function LockIcon() {
    return (
      <View >
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Rect width="32" height="32" rx="16" fill="#FBECED"/>
          <Path d="M20.0498 13.3002H21.3998C21.5788 13.3002 21.7505 13.3713 21.8771 13.4979C22.0037 13.6245 22.0748 13.7962 22.0748 13.9752V22.0752C22.0748 22.2542 22.0037 22.4259 21.8771 22.5525C21.7505 22.6791 21.5788 22.7502 21.3998 22.7502H10.5998C10.4208 22.7502 10.2491 22.6791 10.1225 22.5525C9.99592 22.4259 9.9248 22.2542 9.9248 22.0752V13.9752C9.9248 13.7962 9.99592 13.6245 10.1225 13.4979C10.2491 13.3713 10.4208 13.3002 10.5998 13.3002H11.9498V12.6252C11.9498 11.5511 12.3765 10.5209 13.136 9.76141C13.8955 9.00189 14.9257 8.5752 15.9998 8.5752C17.0739 8.5752 18.1041 9.00189 18.8636 9.76141C19.6231 10.5209 20.0498 11.5511 20.0498 12.6252V13.3002ZM11.2748 14.6502V21.4002H20.7248V14.6502H11.2748ZM15.3248 17.3502H16.6748V18.7002H15.3248V17.3502ZM12.6248 17.3502H13.9748V18.7002H12.6248V17.3502ZM18.0248 17.3502H19.3748V18.7002H18.0248V17.3502ZM18.6998 13.3002V12.6252C18.6998 11.9091 18.4153 11.2224 17.909 10.716C17.4026 10.2097 16.7159 9.9252 15.9998 9.9252C15.2837 9.9252 14.597 10.2097 14.0906 10.716C13.5843 11.2224 13.2998 11.9091 13.2998 12.6252V13.3002H18.6998Z" fill="#FF2E42"/>
        </Svg>
      </View>
    );
  }