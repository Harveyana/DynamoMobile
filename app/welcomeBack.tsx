import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';


import { useNavigation,useRouter } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useRef,useState } from 'react';
import BackIcon from '@/components/icons/backIcon';
import EyeIcon from '@/components/icons/eyeIcon';
import VerifyEmail from '@/components/verifyEmail';



const WelcomeBack = () => {
  const router = useRouter()
  // step : "verify", "signUp","loader"

  const [step, setStep] = useState('signUp')  
  const [progress, setProgress] = useState(0.2)


  const [search, setSearch] = useState('')
  const [password, setPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false); 

  const register = ()=>{
    setStep('loader')
    setTimeout(() => {
      setProgress(0.7)
      setStep('verify')
    }, 3000);

  }



  return (
    <SafeAreaView className='flex-1 bg-[#fffff]'>
    {/* header */}

    <View style={{marginTop: hp('8%'),marginBottom:hp('1%'),display: step == 'loader' ? 'none': 'flex'}} className='h-1 bg-[#66666614]'></View>

    {step == 'signUp' ? <View className='px-6 bg-white flex-1 rounded-t-3xl py-6 gap-y-8'>

      <View className='relative flex flex-col items-start justify-center'>

        <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
          Welcome Back, Anayo 
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

                <TouchableOpacity>
                  <SansText style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                    Forgot Password?
                  </SansText>
                </TouchableOpacity>
              
              </View>
      

            </View>


            <View className='w-full mt-8 flex flex-col items-center justify-center gap-y-4'>

              <TouchableOpacity onPress={()=>register()} className='w-full bg-[#FF2E42] flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
                  <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                    Sign In
                  </SansText>
              </TouchableOpacity>

              <TouchableOpacity className='flex flex-row items-center justify-center gap-x-2'>
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

    </View>

    : step == 'verify' ? <VerifyEmail proceed={()=> setStep('success')} returnBack={()=> setStep('signUp')} />

    : step == 'loader' ?  <View className='flex-1 justify-center bg-[#f92e43]'>
        <Image
          source={require('@/assets/images/loader.gif')}
          style={{resizeMode:'cover'}}
          className='w-full h-full'
        />
      </View>


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

        <Pressable onPress={()=> router.push('/(app)/(tabs)')} className=' absolute bottom-12 left-6 w-full bg-[#FF2E42] mx-auto flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
          <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
            Proceed
          </SansText>
        </Pressable>

      </View>}
     

    


  </SafeAreaView>
  )
}

export default WelcomeBack

// const styles = StyleSheet.create({})