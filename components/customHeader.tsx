import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CustomHeader = () => {
  return (
    <SafeAreaView className='border border-black'>
        <View className=''>
          <Text>CustomHeader</Text>   
        </View>
    </SafeAreaView>
    
  )
}

export default CustomHeader;
