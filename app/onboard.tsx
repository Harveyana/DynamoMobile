import { ActivityIndicator, ImageBackground,TouchableOpacity, SafeAreaView, StyleSheet, Text, View,Animated} from 'react-native'
import React from 'react'
import {SansBold,SansText} from '@/components/StyledText'
import { useRouter } from 'expo-router';




const Onboard = () => {
  const router = useRouter()

  return (
    // <SafeAreaView className='bg-red-500 border border-black p-2'>
    <ImageBackground source={require('@/assets/images/onboard.png')} style={{flex: 1, resizeMode:'cover', justifyContent: 'center'}}>

      <TouchableOpacity onPress={()=>(router.push('/steps'))} className='flex-1'>
        <Animated.View sharedTransitionTag='sharedTag' className='flex-1 relative items-center justify-center '>
          {/* <ActivityIndicator size="large" color="black" /> */}

          <View className='absolute bottom-[15%]'>
            <SansBold className="text-center" style={{fontSize:24,color:'white'}}>
              Skip the{' '}
              <SansBold  style={{fontSize:24,color:'#F9DB6D',}}>
                queue,
              </SansBold>
              {' '}not the shopping.
            </SansBold>

            <SansText numberOfLines={1} style={{fontSize:16,color:'#FFFFFF',fontWeight:'400'}}>
              Qaya gets you through queue faster.
            </SansText>

          </View>
        </Animated.View>
      </TouchableOpacity>

    </ImageBackground>
    
  )
}

export default Onboard

// const styles = StyleSheet.create({})