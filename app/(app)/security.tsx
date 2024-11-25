import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';

import { useNavigation,useRouter } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useRef,useState } from 'react';

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon, { CloseIcon2 } from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import CartCard from '@/components/cartCard';
import WalletIcon from '@/components/icons/walletIcon';
import CardIcon from '@/components/icons/cardIcon';
import ProfileIcon from '@/components/icons/profileIcon';
import LockIcon from '@/components/icons/lockIcon';
import HeadsetIcon from '@/components/icons/headsetIcon';
import LogoutIcon from '@/components/icons/logoutIcon';
import EditIcon from '@/components/icons/editIcon';
import CameraIcon from '@/components/icons/cameraIcon';
import GalleryIcon from '@/components/icons/galleryIcon';
import BiometricIcon from '@/components/icons/biometricIcon';



const Security = () => {

  const navigation = useNavigation();
  const [search, setSearch] = useState('')


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
          Security
        </SoraText>

      </View>

      {/* body */}
      <View className='px-6 bg-white flex-1 rounded-t-3xl py-4'>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >

            <SansText className='my-8' style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
              Secure your account from intruders. No let anyone wole you
            </SansText>


            <View className='gap-y-4' >
                
                <TouchableOpacity onPress={()=>(router.push('/changePassWord'))} className='w-full p-4 rounded-2xl border border-[#C5C1C1]'>

                  <View className='flex flex-row items-center gap-x-3 justify-start'>

                    <LockIcon/>
                    <View className=' bg-transparent rounded-xl flex flex-col items-start justify-center'>
                      <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                        Change Password
                      </SoraText>
                      <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                        secure your account
                      </SansText>
                    </View>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='ml-auto' />
                  </View>
                      
                </TouchableOpacity>



                {/* <TouchableOpacity onPress={()=>(router.push('/biometrics'))} className='w-full p-4 rounded-2xl border border-[#C5C1C1]'>

                  <View className='flex flex-row items-center gap-x-3 justify-start'>

                    <BiometricIcon/>
                    <View className=' bg-transparent rounded-xl flex flex-col items-start justify-center'>
                      <SoraText style={{fontSize:14,color:'#080708',fontWeight:'700'}}>
                        Biometric
                      </SoraText>
                      <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                        use face id or fingerprint for security
                      </SansText>
                    </View>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='ml-auto' />
                  </View>
                      
                </TouchableOpacity> */}


            </View>
          

        </ScrollView>

      </View>




    </SafeAreaView>
    // </ImageBackground>
  )
}

export default Security
