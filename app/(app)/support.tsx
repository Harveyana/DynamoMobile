import { FlatList, Image, ImageBackground, Pressable,Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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

import { CallIcon, EmailIcon, FacebookIcon, InstaIcon, LinkedIcon, WhatsappIcon, XIcon } from '@/components/icons/socialIcons';



const Account = () => {

  const navigation = useNavigation();

  const subject = "Mail Subject";
  const message = "Message Body";
  const phoneNumber = "+2347019246387";
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
          Help and Support
        </SoraText>

      </View>

      {/* body */}
      <View className='px-6 bg-white flex-1 rounded-t-3xl py-6 gap-y-5'>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
           
            <SansText className='text-center mt-4' style={{fontSize:15,color:'#080708',fontWeight:'400'}}>
              Reach us anyday, anytime. We’re here for you
            </SansText>


          <View className=' flex flex-col items-start mt-6'>

            {/* Emaill us */}

            <TouchableOpacity onPress={()=>Linking.openURL(`mailto:admin@helloqaya.com?subject=${subject}&body=${message}`)} className='w-full my-2 '>
              <View className=' bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-5'>
                    
                <View className='w-full flex flex-row items-center justify-start gap-x-2'>

                  <EmailIcon/>

                  <View className='flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      Email Us
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      send us an email here
                    </SansText>

                  </View>

                </View>

                <TouchableOpacity className=''>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='' />
                </TouchableOpacity>

              </View>

            </TouchableOpacity>

            {/* call us */}

            <TouchableOpacity onPress={()=>Linking.openURL(`tel:${phoneNumber}`)} className='w-full my-2 '>
              <View className=' bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-5'>
                    
                <View className='w-full flex flex-row items-center justify-start gap-x-2'>

                  <CallIcon/>

                  <View className='flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      Call Us
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      Reach our phone line here
                    </SansText>

                  </View>

                </View>

                <TouchableOpacity className=''>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='' />
                </TouchableOpacity>

              </View>

            </TouchableOpacity>

            {/* WhatsApp */}

            <TouchableOpacity onPress={()=>Linking.openURL(`http://api.whatsapp.com/send?phone=${phoneNumber}`)} className='w-full my-2 '>
              <View className=' bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-5'>
                    
                <View className='w-full flex flex-row items-center justify-start gap-x-2'>

                  <WhatsappIcon/>

                  <View className='flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      WhatsApp
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      Chat us here
                    </SansText>

                  </View>

                </View>

                <TouchableOpacity className=''>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='' />
                </TouchableOpacity>

              </View>

            </TouchableOpacity>


            {/* Facebook */}

            {/* <TouchableOpacity  className='w-full my-2 '>
              <View className=' bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-5'>
                    
                <View className='w-full flex flex-row items-center justify-start gap-x-2'>

                  <FacebookIcon/>

                  <View className='flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      Facebook
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      Follow us and send us a message
                    </SansText>

                  </View>

                </View>

                <TouchableOpacity className=''>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='' />
                </TouchableOpacity>

              </View>

            </TouchableOpacity> */}


            {/* X Formerly Twitter */}

            <TouchableOpacity onPress={()=> Linking.openURL('twitter://user?screen_name=helloqaya').catch(() => {Linking.openURL('https://www.twitter.com/helloqaya');})} className='w-full my-2 '>
              <View className=' bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-5'>
                    
                <View className='w-full flex flex-row items-center justify-start gap-x-2'>

                  <XIcon/>

                  <View className='flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      X Formerly Twitter
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      Follow us and send us a message
                    </SansText>

                  </View>

                </View>

                <TouchableOpacity className=''>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='' />
                </TouchableOpacity>

              </View>

            </TouchableOpacity>


            {/* Instagram */}

            <TouchableOpacity onPress={()=> Linking.openURL('instagram://user?username=ourqaya').catch(() => {Linking.openURL('https://www.instagram.com/ourqaya');})}  className='w-full my-2 '>
              <View className=' bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-5'>
                    
                <View className='w-full flex flex-row items-center justify-start gap-x-2'>

                  <InstaIcon/>

                  <View className='flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      Instagram
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      Follow us and send us a message
                    </SansText>

                  </View>

                </View>

                <TouchableOpacity className=''>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='' />
                </TouchableOpacity>

              </View>

            </TouchableOpacity>


            {/* LinkedIn */}

            <TouchableOpacity onPress={()=> Linking.openURL('linkedin://company/qaya-technologies').catch(() => {Linking.openURL('https://www.linkedin.com/company/qaya-technologies');})} className='w-full my-2 '>
              <View className=' bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-5'>
                    
                <View className='w-full flex flex-row items-center justify-start gap-x-2'>

                  <LinkedIcon/>

                  <View className='flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      LinkedIn
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      Follow us and send us a message
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



    </SafeAreaView>
    // </ImageBackground>
  )
}

export default Account
