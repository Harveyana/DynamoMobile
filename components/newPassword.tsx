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
import useToast from '@/constants/useToast';


interface Props {

    // returnBack: () => void;
    update: (password:string) => void;
}

const NewPassword = ({update}:Props) => {

    const [seconds, setSeconds] = useState(60);
    const [clickable, setClickable] = useState(false);

    const [password, setPassword] = useState(''); 
    const [showPassword, setShowPassword] = useState(false); 
    const [confirmPassword, setconfirmPassword] = useState(''); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const showToast = useToast()
    // useEffect(() => {
    //     if (clickable) {
    //       const interval = setInterval(() => {
    //         if (seconds > 0) {
    //           setSeconds(prevSeconds => prevSeconds - 1);
    //         } else {
    //           clearInterval(interval);
    //           setClickable(false); // Disable clickability when countdown finishes
    //           setSeconds(60); // Reset countdown to 60 seconds
    //         }
    //       }, 1000);
    
    //       return () => clearInterval(interval);
    //     }
    //   }, [clickable, seconds]);

    const submitPassword = ()=>{
      if(!password || !confirmPassword ) return showToast('Enter complete details',false)
      if(password !== confirmPassword ) return showToast('password must match confirm password',false)
      update(password)
    }
    
  return (

    <View className='px-6 bg-white flex-1 rounded-t-3xl py-6 gap-y-8'>

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
                
              {/* enter password */}

              <View className='w-full flex flex-col items-start justify-center gap-y-2'>
                        
                <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                  Enter New Password
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


              {/* enter password */}

              <View className='w-full flex flex-col items-start justify-center gap-y-2'>
                        
                <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                  Confirm New Password
                </SansText>
                              
                <View className='border border-[#E4E5E7] rounded-xl w-full flex flex-row items-center justify-between'>
                          
                  <TextInput
                    className='w-[85%] px-4 py-2 rounded-xl'
                    onChangeText={setconfirmPassword}
                    value={confirmPassword}
                    secureTextEntry={showConfirmPassword}
                    autoCapitalize={'none'}
      
                  />

                  <TouchableOpacity onPress={()=>setShowConfirmPassword(!showConfirmPassword)} className='mx-3'>
                    <EyeIcon/>
                  </TouchableOpacity>
                                  
                </View>
              
              </View>
      
      
                    

            </View>


            <TouchableOpacity onPress={()=>submitPassword()} className='w-full bg-[#FF2E42] mt-12 flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
                <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                  Proceed
                </SansText>
            </TouchableOpacity>

          

        </View>

        

      </ScrollView>

    </View>
  )
}

export default NewPassword

