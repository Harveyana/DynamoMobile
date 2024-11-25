import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { Overlay } from '@rneui/themed';


import { useNavigation,useRouter } from 'expo-router';

import { useAuthStore } from '@/store/useAuth';
import useToast from '@/constants/useToast';

import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useRef,useState } from 'react';
import BackIcon from '@/components/icons/backIcon';
import EyeIcon from '@/components/icons/eyeIcon';
import VerifyOtp from '@/components/verifyOtp';
import NewPassword from '@/components/newPassword';
import VerifyEmail from '@/components/verifyEmail';



const ForgotPass = () => {
  const router = useRouter()
  // step : "verify", "signUp","loader"

  const [step, setStep] = useState('main')  
  const [progress, setProgress] = useState(0.2)
  const recoverAccount = useAuthStore((state:any) => state.recoverAccount)
  const updatePassWord = useAuthStore((state:any) => state.updatePassWord)
  const resendOTP = useAuthStore((state:any) => state.resendOTP)
  const verifyOTP = useAuthStore((state:any) => state.verifyOTP)
  const loading = useAuthStore((state:any) => state.loading)

  const user = useAuthStore((state:any) => state.user)


  const showToast = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false); 


  const initVerify = async(otp:string)=>{
    
    const emailVerified = await verifyOTP(otp,user.email)
    if(emailVerified.success){
      setProgress(1)
      setStep('newPassword')
      useAuthStore.setState({ OtpVerified:'success' })
      return showToast(emailVerified.msg,true)
      
    }else{
      useAuthStore.setState({ OtpVerified:'failed' })
      return showToast(emailVerified.msg,false)
    }
  }


  const resetPassword = async(password:string)=>{

    const reset = await updatePassWord({userId:user.id, password:password})
    if(reset.success){
      console.log(reset)
      setProgress(0.7)
      setStep('success')
      return showToast(reset.msg,true)
    }else{
      return showToast(reset.msg,false)
    }

  }


  const findAccount = async()=>{

    const recovered = await recoverAccount(email)
    if(recovered.success){
      console.log(recovered)
      setProgress(0.7)
      setStep('verify')
      return showToast(recovered.msg,true)
    }else{
      return showToast(recovered.msg,false)
    }

  }

  const resend = async()=>{
    const resent = await resendOTP(user.email)
    if(resent.success){
      return showToast(resent.msg,true)
    }else{
      return showToast(resent.msg,false)
    }
  }



  return (
    <SafeAreaView className='flex-1 bg-[#fffff]'>
    {/* header */}
    <ProgressBar style={{marginTop: hp('8%'),marginBottom:hp('1%'),display: step == 'loader' || step == 'success' ? 'none': 'flex'}} progress={progress} color={'#FF2E42'} />

    {step == 'main' ? <View className='px-6 bg-white flex-1 rounded-t-3xl py-6 gap-y-8'>

      <View className='relative flex flex-col items-start justify-center'>

        <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
          Forgot Password?
        </SoraText>

        <SansText style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Please enter the e-mail associated with this account</SansText>
      </View>


      <ScrollView 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >

        <View className='w-full flex flex-col items-start'>

          {/* inputs */}

            <View className='w-full rounded-2xl flex flex-col items-center justify-center py-3 gap-y-4'>
                
              {/* email address */}

              <View className='flex flex-col items-start justify-center gap-y-2'>
                  
                <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                  Email Address
                </SansText>
                
                <View className='pt-1 flex flex-row gap-x-2'>
                    <TextInput
                        className='border border-[#E4E5E7] px-4 py-2 rounded-xl w-full'
                        onChangeText={(value)=>{setEmail(value)}}
                        value={email}
                        placeholder="hello@gmail.com"
                        autoCapitalize='words'
                    />
                      
                </View>

              </View>
                    

            </View>


            <TouchableOpacity onPress={()=>findAccount()} className='w-full bg-[#FF2E42] mt-12 flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
                <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                  Proceed
                </SansText>
            </TouchableOpacity>

          

        </View>

        

      </ScrollView>

    </View>

    // : step == 'verify' ? <VerifyOtp proceed={()=> {setStep('newPassword');setProgress(0.8)}} returnBack={()=> setStep('main')} />
    : step == 'verify' ? <VerifyEmail ResendOTP={()=>resend()} submitOTP={(otp:string)=>initVerify(otp)} returnBack={()=> setStep('main')} /> 


    : step == 'newPassword' ? <NewPassword update={(password:string)=> resetPassword(password)} />

    // : step == 'loader' ?  <View className='flex-1 justify-center bg-[#f92e43]'>
    //     <Image
    //       source={require('@/assets/images/loader.gif')}
    //       style={{resizeMode:'cover'}}
    //       className='w-full h-full'
    //     />
    //   </View>


     : <View className='px-6 bg-white  flex-1 items-start justify-center rounded-t-3xl py-6 gap-y-8'>

        <View className='w-full flex flex-col items-center justify-center mb-16'>

          <Image
            source={require('@/assets/images/mark.png')}
            style={{resizeMode:'cover'}}
            className='mb-3'
          />

          <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
            Password Reset Successful
          </SoraText>

          <SansText className='text-center mt-2' style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Hey Boss, Please keep your password safe and don’t share it with anyone</SansText>
        </View>

        <TouchableOpacity onPress={()=> router.push('/signIn')} className=' absolute bottom-12 left-6 w-full bg-[#FF2E42] mx-auto flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
          <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
            Login
          </SansText>
        </TouchableOpacity>

      </View>}

      <Overlay fullScreen isVisible={loading} overlayStyle={{backgroundColor:'none'}}>
        
        <Image
          source={require('@/assets/images/loader.gif')}
          style={{}}
          className='w-80 h-80 my-auto mx-auto'
        />

      </Overlay>

     

    


  </SafeAreaView>
  )
}

export default ForgotPass

// const styles = StyleSheet.create({})