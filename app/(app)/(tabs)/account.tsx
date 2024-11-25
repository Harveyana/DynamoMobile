import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/useAuth';
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
import { Overlay } from '@rneui/themed';





const Account = () => {

  const sheetRef = useRef<BottomSheetMethods>(null);
  const navigation = useNavigation();

  const LogOutUser = useAuthStore((state:any) => state.logOut)
  const loading = useAuthStore((state:any) => state.loading)
  const user = useAuthStore((state:any) => state.user)

  const showTabBar = () => {
    navigation.setOptions({
      tabBarStyle: { 
        display: 'flex',
        backgroundColor: '#FAFAFA',
        height:70,
        paddingBottom:10,
        paddingTop:10
      }      
    });
  };

  const hideTabBar = () => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' }
    });
  };

  const openBottomSheet = () => {
    hideTabBar()
    sheetRef.current?.open();
  };

  const closeBottomSheet = () => {
    showTabBar()
    sheetRef.current?.close();
  };

  const router = useRouter()

  const logUserOut = ()=>{
    LogOutUser()
    // router.replace('/signIn')
  }

  return (
    // <ImageBackground source={require('@/assets/images/bgHome.png')} style={styles.image}>
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      {/* header */}
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

        <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
          Account
        </SoraText>

      </View>

      {/* body */}
      <View className='px-6 bg-white flex-1 rounded-t-3xl py-6 gap-y-5'>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
           
          {user && <View className='w-full flex flex-row items-center justify-start gap-x-3 '>

           <Image
              className='rounded-full w-[56px]'
              style={[{aspectRatio:1,resizeMode:'cover'}]}
              // source={require('@/assets/images/profile.png')}
              source={{uri:user && user.photoUrl}}
            />
            <View className='flex flex-col items-start justify-center'>
              <SoraText numberOfLines={1} style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
                {user.firstName} {user.lastName}
              </SoraText>
              <SansText numberOfLines={1} style={{fontSize:14,color:'#FF2E42',fontWeight:'400'}}>
                @{user.firstName}
              </SansText>

            </View>

          </View>}




          <View className=' flex flex-col items-start mt-6'>

            {/* profile */}

            <TouchableOpacity onPress={()=>(router.push('/(app)/profile'))} className='w-full my-2 '>
              <View className=' bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-5'>
                    
                <View className='w-full flex flex-row items-center justify-start gap-x-2'>

                  <ProfileIcon/>

                  <View className='flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      Profile
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      view and edit profile
                    </SansText>

                  </View>

                </View>

                <TouchableOpacity className=''>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='' />
                </TouchableOpacity>

              </View>

            </TouchableOpacity>

            {/* cards */}

            {/* <TouchableOpacity onPress={()=>(router.push('/(app)/cards'))} className='w-full my-2 '>
              <View className=' bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-5'>
                    
                <View className='w-full flex flex-row items-center justify-start gap-x-2'>

                  <CardIcon/>

                  <View className='flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      Cards
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      manage your cards here
                    </SansText>

                  </View>

                </View>

                <TouchableOpacity className=''>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='' />
                </TouchableOpacity>

              </View>

            </TouchableOpacity> */}

            {/* security */}

            <TouchableOpacity onPress={()=>(router.push('/(app)/security'))} className='w-full my-2 '>
              <View className=' bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-5'>
                    
                <View className='w-full flex flex-row items-center justify-start gap-x-2'>

                  <LockIcon/>

                  <View className='flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      Security
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      protect and secure your account
                    </SansText>

                  </View>

                </View>

                <TouchableOpacity className=''>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='' />
                </TouchableOpacity>

              </View>

            </TouchableOpacity>


            {/* Help and support */}

            <TouchableOpacity onPress={()=>(router.push('/(app)/support'))} className='w-full my-2 '>
              <View className=' bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-5'>
                    
                <View className='w-full flex flex-row items-center justify-start gap-x-2'>

                  <HeadsetIcon/>

                  <View className='flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      Help and Support
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      get in touch with us
                    </SansText>

                  </View>

                </View>

                <TouchableOpacity className=''>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='' />
                </TouchableOpacity>

              </View>

            </TouchableOpacity>


            {/* Logout */}

            <TouchableOpacity onPress={() => openBottomSheet()} className='w-full my-2 '>
              <View className=' bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-5'>
                    
                <View className='w-full flex flex-row items-center justify-start gap-x-2'>

                  <LogoutIcon/>

                  <View className='flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      Logout
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      you can always come back
                    </SansText>

                  </View>

                </View>

                <TouchableOpacity className=''>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='' />
                </TouchableOpacity>

              </View>

            </TouchableOpacity>

          </View>

          

        </ScrollView>

      </View>

      <BottomSheet style={{backgroundColor:'#FFFFFF'}} height={hp('30%')} ref={sheetRef} hideDragHandle={true}	>

        <View className='px-6 my-6 gap-y-2'>

          <View className='flex flex-row items-center justify-between'>

            <SoraText style={{fontSize:18,color:'#080708',fontWeight:'600'}}>
              Logout
            </SoraText>
            <TouchableOpacity onPress={()=>(closeBottomSheet())} className=''>
              <CloseIcon/>
            </TouchableOpacity>

          </View>

          <View className='gap-y-5' >

            <SansText style={{fontSize:14,color:'#686767',fontWeight:'400'}}>
              Are you sure you want to  logout? You can always come back. We’ll be here
            </SansText>
              

            <View className='w-full flex flex-row items-center gap-x-3 justify-start'>
                <TouchableOpacity onPress={()=> logUserOut()} className='w-[60%] bg-[#FF2E42] flex flex-row items-center justify-center gap-x-2 py-4 px-4 rounded-2xl'>
                  <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                    Yes, Logout
                  </SansText>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>(closeBottomSheet())} className='w-[30%] flex flex-row items-end justify-end gap-x-2 py-4 rounded-2xl'>
                  <SansText style={{fontSize:18,color:'#686767',fontWeight:'500'}}>
                    Cancel
                  </SansText>
                </TouchableOpacity>

            </View>


          </View>


        </View>
              

            
      </BottomSheet>

      <Overlay fullScreen isVisible={loading} overlayStyle={{backgroundColor:'none'}}>
        
          <Image
            source={require('@/assets/images/loader.gif')}
            style={{}}
            className='w-80 h-80 my-auto mx-auto'
          />

      </Overlay>




    </SafeAreaView>
    // </ImageBackground>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'center'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: "400",
    textAlign: 'center'
  },
});