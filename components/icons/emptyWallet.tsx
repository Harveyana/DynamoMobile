import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle } from "react-native-svg"


export default function EmptyWallet() {
    return (
      <View className='mb-5'>
        <Svg width="120" height="120" viewBox="0 0 93 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Rect x="0.5" width="92" height="92" rx="46" fill="#EDEDED"/>
        <Path d="M56.85 37.3746H62.025C62.4825 37.3746 62.9213 37.5564 63.2448 37.8799C63.5683 38.2034 63.75 38.6421 63.75 39.0996V59.7996C63.75 60.2571 63.5683 60.6959 63.2448 61.0194C62.9213 61.3429 62.4825 61.5246 62.025 61.5246H30.975C30.5175 61.5246 30.0787 61.3429 29.7552 61.0194C29.4317 60.6959 29.25 60.2571 29.25 59.7996V32.1996C29.25 31.7421 29.4317 31.3034 29.7552 30.9799C30.0787 30.6563 30.5175 30.4746 30.975 30.4746H56.85V37.3746ZM32.7 40.8246V58.0746H60.3V40.8246H32.7ZM32.7 33.9246V37.3746H53.4V33.9246H32.7ZM51.675 47.7246H56.85V51.1746H51.675V47.7246Z" fill="#686767"/>
        </Svg>
      </View>
    );
  }