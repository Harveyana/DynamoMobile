import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';

import { useNavigation,useRouter } from 'expo-router';

import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useRef,useState } from 'react';

import BackIcon from '@/components/icons/backIcon';

import { Switch } from 'react-native-paper';




const Biometrics = () => {

  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(false); 
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

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
          Biometrics
        </SoraText>

      </View>

      {/* body */}
      <View className='px-6 bg-white flex-1 rounded-t-3xl py-4'>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >

            <SansText className='my-8' style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
              Choose your preference
            </SansText>


            <View className='gap-y-4' >

                {/* enter old password */}

                <View className='flex flex-row items-start justify-between'>
                      
                  <View className='w-[70%] flex flex-col items-start justify-start gap-y-2'>

                    <SoraText style={{fontSize:15,color:'#080708',fontWeight:'400'}}>
                      Biometric 
                    </SoraText>
                    <SansText className='' style={{fontSize:14,color:'#686767',fontWeight:'400'}}>
                      With Biometrics saves you the hassle of typing in password each time 
                    </SansText>
              
                  </View>

                  <Switch value={isSwitchOn} color='#FF2E42' onValueChange={onToggleSwitch} />
                  
                </View>


            </View>
          

        </ScrollView>

      </View>




    </SafeAreaView>
    // </ImageBackground>
  )
}

export default Biometrics
