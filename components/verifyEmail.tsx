import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { useAuthStore } from '@/store/useAuth';



import { useNavigation,useRouter } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useEffect, useRef,useState } from 'react';
import BackIcon from '@/components/icons/backIcon';
import EyeIcon from '@/components/icons/eyeIcon';
import { PinInput } from '@pakenfit/react-native-pin-input';


interface Props {

    returnBack: () => void;
    submitOTP: (otp:string) => void;
    ResendOTP: () => void
}

const VerifyEmail = ({returnBack,submitOTP,ResendOTP}:Props) => {

    // const [random, setRandom] = useState(0);
    // const OTP = useAuthStore((state:any) => state.OTP)
    const user = useAuthStore((state:any) => state.user)
    const OtpVerified = useAuthStore((state:any) => state.OtpVerified)
    const [otp, setOtp] = useState('')

    const [seconds, setSeconds] = useState(60);
    const [clickable, setClickable] = useState(true);

    
    
  return (

    <View className='px-6 bg-white flex rounded-t-3xl py-6 gap-y-4'>


        <View className='w-full flex flex-row items-center justify-start gap-x-4'>

            <TouchableOpacity onPress={()=>returnBack()}>
              <BackIcon/>
            </TouchableOpacity>

            <SoraText className='mb-2' style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
              Verify Email
            </SoraText>

        </View>

        <View className='w-full '>

            <View className='w-full flex flex-col items-start justify-center gap-y-2'>
              <SansText style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Please verify your account with the code sent to {user ? user.email : 'your email'}</SansText>
              <PinInput  inputStyle={{width:wp('13.7%'),height:50,fontSize:18,borderColor: OtpVerified === 'none' ? '#E4E5E7' :OtpVerified === 'failed'? 'red' :OtpVerified === 'success' ? 'green': 'black'}} containerStyle={{display:'flex',alignItems:'center',justifyContent:'space-between'}} length={6} onFillEnded={otp =>{ if(otp.length == 6){submitOTP(otp)} }}/>              

              <TouchableOpacity onPress={()=>ResendOTP()}>
                <SansText style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Resend</SansText>
              </TouchableOpacity>

            </View>

        </View>

        
    </View>
  )
}

export default VerifyEmail

