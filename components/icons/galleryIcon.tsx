import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path,Rect,Circle } from "react-native-svg"


export default function GalleryIcon() {
    return (
      <View >
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Rect width="32" height="32" rx="16" fill="#FBECED"/>
          <Path d="M21.6 17.4C20.4254 17.4 19.3257 17.722 18.3849 18.2813C19.2227 19.2603 19.8728 20.3853 20.3029 21.6H21.6V17.4ZM18.8028 21.6C17.4308 18.3114 14.1856 16 10.4 16V21.6H18.8028ZM10.4 14.6C13.081 14.6 15.5261 15.6045 17.3818 17.2572C18.6347 16.4347 20.1013 15.9976 21.6 16V10.4H22.3056C22.6892 10.4 23 10.7115 23 11.0951V22.3049C22.9987 22.4887 22.9252 22.6647 22.7952 22.7947C22.6653 22.9248 22.4894 22.9985 22.3056 23H9.6944C9.51017 22.9998 9.33355 22.9265 9.20334 22.7962C9.07314 22.6658 9 22.4891 9 22.3049V11.0951C9.00128 10.9113 9.07483 10.7353 9.20476 10.6053C9.33469 10.4752 9.51057 10.4015 9.6944 10.4H11.8V9H13.2V11.8H10.4V14.6ZM20.2 9V11.8H14.6V10.4H18.8V9H20.2ZM19.15 15.3C18.8715 15.3 18.6045 15.1894 18.4075 14.9925C18.2106 14.7955 18.1 14.5285 18.1 14.25C18.1 13.9715 18.2106 13.7045 18.4075 13.5075C18.6045 13.3106 18.8715 13.2 19.15 13.2C19.4285 13.2 19.6955 13.3106 19.8925 13.5075C20.0894 13.7045 20.2 13.9715 20.2 14.25C20.2 14.5285 20.0894 14.7955 19.8925 14.9925C19.6955 15.1894 19.4285 15.3 19.15 15.3Z" fill="#FF2E42"/>
        </Svg>
      </View>
    );
  }