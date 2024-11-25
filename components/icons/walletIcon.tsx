import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle } from "react-native-svg"


export default function WalletIcon() {
    return (
      <View >
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Rect width="32" height="32" rx="16" fill="#FBECED"/>
          <Path d="M20.05 12.6248H22.075C22.254 12.6248 22.4257 12.6959 22.5523 12.8225C22.6789 12.9491 22.75 13.1208 22.75 13.2998V21.3998C22.75 21.5788 22.6789 21.7505 22.5523 21.8771C22.4257 22.0037 22.254 22.0748 22.075 22.0748H9.925C9.74598 22.0748 9.57429 22.0037 9.4477 21.8771C9.32112 21.7505 9.25 21.5788 9.25 21.3998V10.5998C9.25 10.4208 9.32112 10.2491 9.4477 10.1225C9.57429 9.99592 9.74598 9.9248 9.925 9.9248H20.05V12.6248ZM10.6 13.9748V20.7248H21.4V13.9748H10.6ZM10.6 11.2748V12.6248H18.7V11.2748H10.6ZM18.025 16.6748H20.05V18.0248H18.025V16.6748Z" fill="#FF2E42"/>
        </Svg>

      </View>
    );
  }