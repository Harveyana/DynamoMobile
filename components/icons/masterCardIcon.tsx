import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle,ClipPath,Defs,G } from "react-native-svg"


export default function MasterCardIcon() {
    return (
      <View >
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Rect width="32" height="32" rx="16" fill="#FBECED"/>
          <G clip-path="url(#clip0_149_2024)">
          <Path d="M13.9248 11.2837H19.057V20.7205H13.9248V11.2837Z" fill="#FF5F00"/>
          <Path d="M14.2504 16.0022C14.2504 14.0849 15.1301 12.3842 16.4824 11.2838C15.4886 10.4835 14.2341 10 12.8655 10C9.62311 10 7 12.6843 7 16.0022C7 19.3201 9.62311 22.0044 12.8654 22.0044C14.234 22.0044 15.4885 21.5209 16.4824 20.7206C15.1301 19.6368 14.2504 17.9195 14.2504 16.0022Z" fill="#EB001B"/>
          <Path d="M25.9814 16.0022C25.9814 19.3201 23.3583 22.0044 20.116 22.0044C18.7474 22.0044 17.4929 21.5209 16.499 20.7206C17.8676 19.6202 18.7312 17.9195 18.7312 16.0022C18.7312 14.0849 17.8513 12.3842 16.499 11.2838C17.4928 10.4835 18.7474 10 20.116 10C23.3583 10 25.9814 12.701 25.9814 16.0022Z" fill="#F79E1B"/>
          </G>
          <Defs>
          <ClipPath id="clip0_149_2024">
          <Rect width="19" height="12" fill="white" transform="translate(7 10)"/>
          </ClipPath>
          </Defs>
        </Svg>
      </View>
    );
  }
  