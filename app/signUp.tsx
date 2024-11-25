import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { useAuthStore } from '@/store/useAuth';
import Toast from 'react-native-root-toast';
import useToast from '@/constants/useToast';
import { Overlay } from '@rneui/themed';


import { useNavigation,useRouter } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useEffect, useMemo, useRef,useState } from 'react';
import BackIcon from '@/components/icons/backIcon';
import EyeIcon from '@/components/icons/eyeIcon';
import VerifyEmail from '@/components/verifyEmail';



const SignUp = () => {
  const router = useRouter()
  // step : "verify", "signUp","loader"

  
  const registerUser = useAuthStore((state:any) => state.register)
  const verifyOTP = useAuthStore((state:any) => state.verifyOTP)
  const resendOTP = useAuthStore((state:any) => state.resendOTP)
  const OtpVerified = useAuthStore((state:any) => state.OtpVerified)
  const user = useAuthStore((state:any) => state.user)
  const loading = useAuthStore((state:any) => state.loading)

  const [step, setStep] = useState('signUp')  
  const [progress, setProgress] = useState(0.2)


  const [password, setPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  // const [loader, setLoader] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const showToast = useToast()

  const initVerify = async(otp:string)=>{
    
    const emailVerified = await verifyOTP(otp,user.email)
    if(emailVerified.success){
      setProgress(1)
      setStep('success')
      useAuthStore.setState({ OtpVerified:'success' })
      return showToast(emailVerified.msg,true)
      
    }else{
      useAuthStore.setState({ OtpVerified:'failed' })
      return showToast(emailVerified.msg,false)
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


  const register = async()=>{
    
    const registered = await registerUser({
      firstName:firstName,
      lastName:lastName,
      phoneNumber:`+234${phoneNumber}`,
      email:email,
      password:password
    })
    console.log(registered)

    if(registered.success){
      console.log(registered)
      setProgress(0.7)
      setStep('verify')
      setIsFormValid(false)
      return showToast(registered.msg,true)
    }else{
      setIsFormValid(false)
      return showToast(registered.msg,false)
    }
  
  }


  const validateForm = () => { 

      // Validate name field 
      if (!firstName) {
        return Toast.show('first name is required.',toastConfig)
           
          // errors.name = ; 
      } 

      if (!lastName) {
        return Toast.show('last name is required.',toastConfig)
          // errors.name = ; 
      } 

      if (!phoneNumber) {
        return Toast.show('phoneNumber is required.',toastConfig)
          // errors.name = ; 
      } 

      // Validate email field 
      if (!email) { 
        return Toast.show('Email is required.',toastConfig)
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        return Toast.show('Email is invalid.',toastConfig)
      } 

      // Validate password field 
      if (!password) { 
        return Toast.show('Password is required.',toastConfig)
      } else if (password.length < 6) { 
        return Toast.show('Password must be at least 6 characters..',toastConfig)
          // errors.password = 'Password must be at least 6 characters.'; 
      } 

      setIsFormValid(true)
      // Set the errors and update form validity 
      // setErrors(errors); 
      // setIsFormValid(Object.keys(errors).length === 0); 
  }; 

  useEffect(() => {
    if(isFormValid){
      register(); 
    }
  }, [isFormValid]); 



  return (
    <SafeAreaView className='flex-1 bg-[#fffff]'>


    {/* header */}
    <ProgressBar style={{marginTop: hp('8%'),marginBottom:hp('1%'),display: step == 'loader' || step == 'success' ? 'none': 'flex'}} progress={progress} color={'#FF2E42'} />

    {step == 'signUp' ? <View className='px-6 bg-white flex-1 rounded-t-3xl py-6 gap-y-8'>

      <View className='relative flex flex-col items-start justify-center'>

        <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
          Create an Account
        </SoraText>

        <SansText numberOfLines={1} style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Sign up on Qaya</SansText>
      </View>


      <ScrollView 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >

        <View className='w-full flex flex-col items-start'>

          {/* inputs */}

            <View className='w-full rounded-2xl flex flex-col items-center justify-center py-3 gap-y-4'>
                
              {/* first name */}

              <View className='flex flex-col items-start justify-center gap-y-2'>
                  
                <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                  First Name
                </SansText>
                <View className='pt-1 flex flex-row gap-x-2'>
                  <TextInput
                      className='border border-[#E4E5E7] px-4 py-2 rounded-xl w-full'
                      onChangeText={(value)=>{setFirstName(value)}}
                      value={firstName}
                      placeholder="Harvey"
                      autoCapitalize='words'
                  />
                    
                </View>

              </View>

              {/* Last name */}

              <View className='flex flex-col items-start justify-center gap-y-2'>
                  
                <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                  Last Name
                </SansText>
                
                <View className='pt-1 flex flex-row gap-x-2'>
                    <TextInput
                        className='border border-[#E4E5E7] px-4 py-2 rounded-xl w-full'
                        onChangeText={(value)=>{setLastName(value)}}
                        value={lastName}
                        placeholder="Ana"
                        autoCapitalize='words'
                    />
                      
                </View>

              </View>

              {/* phone number */}

              <View className='flex flex-col items-start justify-center gap-y-2'>
                  
                <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                  Phone Number
                </SansText>
                
                <View className='pt-1 flex flex-row gap-x-2'>
                    <View className='px-3 w-full flex flex-row items-center justify-between border border-[#E4E5E7] rounded-xl'>
                      <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                        +234
                      </SansText>
                      <TextInput
                          className='w-[86%] py-2 rounded-xl'
                          onChangeText={(value)=>{setPhoneNumber(value)}}
                          value={phoneNumber}
                          inputMode='numeric'
                          placeholder="818 244621"
                      />
                   </View>
                    
                      
                </View>

              </View>

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

              {/* enter password */}

              <View className='w-full flex flex-col items-start justify-center gap-y-2'>
                        
                <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                  Password
                </SansText>
                              
                <View className='border border-[#E4E5E7] rounded-xl w-full flex flex-row items-center justify-between'>
                          
                  <TextInput
                    className='w-[85%] px-4 py-2 rounded-xl'
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={showPassword}
                    autoCapitalize={'none'}
      
                  />

                  <TouchableOpacity onPress={()=>setShowPassword(!showPassword)} className='mx-3'>
                    <EyeIcon/>
                  </TouchableOpacity>
                                  
                </View>
              
              </View>
      

            </View>


            <Pressable onPress={()=>validateForm()} className='w-full bg-[#FF2E42] mt-8 flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
                <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                  Proceed
                </SansText>
            </Pressable>

          

        </View>

        

      </ScrollView>

    </View>

    : step == 'verify' ? <VerifyEmail ResendOTP={()=>resend()} submitOTP={(otp:string)=>initVerify(otp)} returnBack={()=> setStep('signUp')} /> 


     : <View className='px-6 bg-white  flex-1 items-start justify-center rounded-t-3xl py-6 gap-y-8'>

        <View className='w-full flex flex-col items-center justify-center mb-16'>

          <Image
            source={require('@/assets/images/mark.png')}
            style={{resizeMode:'cover'}}
            className='mb-3'
          />

          <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
            Account Created Successfully
          </SoraText>

          <SansText className='text-center mt-2' style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Welcome to Qaya. Let’s start jumping the queue</SansText>
        </View>

        <Pressable onPress={()=> router.push('/(app)/(tabs)/home')} className=' absolute bottom-12 left-6 w-full bg-[#FF2E42] mx-auto flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
          <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
            Proceed
          </SansText>
        </Pressable>

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

export default SignUp


// const styles = StyleSheet.create({})