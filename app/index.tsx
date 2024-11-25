import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const StartPage = () => {
  return (
    // <SafeAreaView className='bg-red-500 border border-black p-2'>
        <View className='flex-1 justify-center bg-[#f92e43]'>
          {/* <ActivityIndicator size="large" color="black" /> */}
          <Image
            source={require('@/assets/images/loader.gif')}
            style={{resizeMode:'cover'}}
            className='w-full h-full'
          />
        </View>
    // </SafeAreaView>
    
  )
}

export default StartPage

// const styles = StyleSheet.create({})