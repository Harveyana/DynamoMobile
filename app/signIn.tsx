import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Overlay } from '@rneui/themed';
import { useAuthStore } from '@/store/useAuth';
import Toast from 'react-native-root-toast';
import useToast from '@/constants/useToast';



import { useNavigation,useRouter } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useRef,useState } from 'react';
import BackIcon from '@/components/icons/backIcon';
import EyeIcon from '@/components/icons/eyeIcon';
import VerifyEmail from '@/components/verifyEmail';



const SignIn = () => {
  const router = useRouter()
  const showToast = useToast()

  const loginUser = useAuthStore((state:any) => state.loginUser)
  const loading = useAuthStore((state:any) => state.loading)

  // const [step, setStep] = useState('signUp')  


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false); 
  const [isFormValid, setIsFormValid] = useState(false);


  const login = async()=>{
    if(!isFormValid) return

    const loggedIn = await loginUser({
      email:email.trim(),
      password:password.trim()
    })

    if(loggedIn && loggedIn?.success){
      // showToast(loggedIn.msg,true);
      return router.push('/(app)/(tabs)/home')
    }else{
      setIsFormValid(false)
      return showToast(`${loggedIn.msg}`, false);
    }
    

  }

  const validateForm = () => { 

    // Validate email field 
    if (!email) { 
      return showToast('Email is required', false);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return showToast('Email is invalid', false);
    } 

    // Validate password field 
    if (!password) { 
      return showToast('Password is required', false);
    }

    setIsFormValid(true)
    // Set the errors and update form validity 
    
  }; 

  // useEffect(() => { 
  //   validateForm(); 
  // }, [email, password]); 

  useEffect(() => { 
    if(isFormValid){
      login();
    }
  }, [isFormValid]); 


  return (
    <SafeAreaView className='flex-1 bg-[#fffff]'>
    {/* header */}

    <View style={{marginTop: hp('8%'),marginBottom:hp('1%')}} className='h-1 bg-[#66666614]'></View>

    <View className='px-6 bg-white flex-1 rounded-t-3xl py-6 gap-y-8'>

      <View className='relative flex flex-col items-start justify-center'>

        <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
          Login 
        </SoraText>

        <SansText numberOfLines={1} style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Login to your account</SansText>
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
                    placeholder="enter password"
      
                  />

                  <TouchableOpacity onPress={()=>setShowPassword(!showPassword)} className='mx-3'>
                    <EyeIcon/>
                  </TouchableOpacity>
                                  
                </View>

                <TouchableOpacity onPress={()=>router.push('/forgotPass')}>
                  <SansText style={{fontSize:14,color:'#686767',fontWeight:'400'}}>
                    Forgot Password?
                  </SansText>
                </TouchableOpacity>
              
              </View>
      

            </View>


            <View className='w-full mt-8 flex flex-col items-center justify-center gap-y-4'>

              <TouchableOpacity onPress={()=>validateForm()} className='w-full bg-[#FF2E42] flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
                  <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                    Sign In
                  </SansText>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>router.push('/signUp')} className='flex flex-row items-center justify-center gap-x-2'>
                  <SansText style={{fontSize:14,color:'#686767',fontWeight:'400'}}>
                    Are you a new user? 
                  </SansText>

                  <SansText style={{fontSize:14,color:'#FF2E42',fontWeight:'400'}}>
                    Create account 
                  </SansText>
              </TouchableOpacity>


            </View>
            

          

        </View>

        

      </ScrollView>

      <Overlay fullScreen isVisible={loading} overlayStyle={{backgroundColor:'none'}}>
        
          <Image
            source={require('@/assets/images/loader.gif')}
            style={{}}
            className='w-80 h-80 my-auto mx-auto'
          />

      </Overlay>

    </View>
     
  </SafeAreaView>
  )
}

export default SignIn

// const styles = StyleSheet.create({})