import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';


import { useNavigation,useRouter } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useEffect, useRef,useState } from 'react';
import BackIcon from '@/components/icons/backIcon';
import EyeIcon from '@/components/icons/eyeIcon';
import { PinInput } from '@pakenfit/react-native-pin-input';
import { useAuthStore } from '@/store/useAuth';


interface Props {

    returnBack: () => void;
    submitOTP: () => void;
}

const VerifyOtp = ({returnBack}:Props) => {

  const OtpVerified = useAuthStore((state:any) => state.OtpVerified)


    const [seconds, setSeconds] = useState(60);
    const [clickable, setClickable] = useState(false);

    useEffect(() => {
        if (clickable) {
          const interval = setInterval(() => {
            if (seconds > 0) {
              setSeconds(prevSeconds => prevSeconds - 1);
            } else {
              clearInterval(interval);
              setClickable(false); // Disable clickability when countdown finishes
              setSeconds(60); // Reset countdown to 60 seconds
            }
          }, 1000);
    
          return () => clearInterval(interval);
        }
      }, [clickable, seconds]);
    
  return (

    <View className='px-6 bg-white flex-1 rounded-t-3xl py-6 gap-y-4'>

      {/* <View className='relative flex flex-col items-start justify-center'>

        <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
          Create an Account
        </SoraText>

        <SansText numberOfLines={1} style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Sign up on Qaya</SansText>
      </View> */}

        <View className='w-full flex flex-row items-center justify-start gap-x-4'>

            <TouchableOpacity onPress={()=>returnBack()}>
              <BackIcon/>
            </TouchableOpacity>

            <SoraText className='mb-2' style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
              OTP Verification
            </SoraText>

        </View>

        <View className='w-full flex flex-col items-start justify-center'>

            <View className='w-full flex flex-col items-start justify-center gap-y-4'>
              <SansText style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Please enter the verification code sent to ***oanayo@gmail.com </SansText>

              <PinInput inputStyle={{width:wp('13.7%'),height:50,fontSize:18,borderColor:'#E4E5E7'}} containerStyle={{display:'flex',alignItems:'center',justifyContent:'space-between'}} length={6} onFillEnded={otp =>{ console.log(otp) }}/>

              <TouchableOpacity onPress={()=>setClickable(true)} disabled={clickable}>
                <SansText style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Resend, {seconds}s</SansText>
              </TouchableOpacity>

            </View>

        </View>

        
    </View>
  )
}

export default VerifyOtp

