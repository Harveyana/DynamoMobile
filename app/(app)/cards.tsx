import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import Svg, { Path,Rect,Circle } from "react-native-svg"


import { useNavigation,useRouter } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useRef,useState } from 'react';

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon, { CloseIcon2 } from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import VisaIcon from '@/components/icons/visaIcon';
import MasterCardIcon from '@/components/icons/masterCardIcon';
import AllCards from '@/components/allCards';




const Cards = () => {

  const navigation = useNavigation();

  const router = useRouter()

  return (
    // <ImageBackground source={require('@/assets/images/bgHome.png')} style={styles.image}>
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      {/* header */}
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

        <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
          Cards
        </SoraText>

      </View>

      {/* body */}
      {/* <View className='px-6 bg-white flex-1 items-center justify-start rounded-t-3xl gap-y-5' style={{paddingTop:hp('20%')}}>

      
          <View className='w-full flex flex-col items-center justify-center gap-y-4'>

            <Svg width="93" height="92" viewBox="0 0 93 92" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Rect x="0.5" width="92" height="92" rx="46" fill="#EDEDED"/>
              <Path d="M30.975 30.4751H62.025C62.4825 30.4751 62.9213 30.6568 63.2448 30.9803C63.5683 31.3038 63.75 31.7426 63.75 32.2001V59.8001C63.75 60.2576 63.5683 60.6964 63.2448 61.0199C62.9213 61.3434 62.4825 61.5251 62.025 61.5251H30.975C30.5175 61.5251 30.0787 61.3434 29.7552 61.0199C29.4317 60.6964 29.25 60.2576 29.25 59.8001V32.2001C29.25 31.7426 29.4317 31.3038 29.7552 30.9803C30.0787 30.6568 30.5175 30.4751 30.975 30.4751ZM60.3 44.2751H32.7V58.0751H60.3V44.2751ZM60.3 40.8251V33.9251H32.7V40.8251H60.3ZM49.95 51.1751H56.85V54.6251H49.95V51.1751Z" fill="#686767"/>
            </Svg>


            <SansText className='text-center' style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                You have no cards added yet. Please add card
            </SansText>

            <Pressable onPress={()=>router.push('/(app)/addCard')} className='w-full bg-[#FF2E42] flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
                <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                  Add Card
                </SansText>
            </Pressable>

            

          </View>

          
      </View> */}

      <AllCards />


    </SafeAreaView>
    // </ImageBackground>
  )
}

export default Cards

