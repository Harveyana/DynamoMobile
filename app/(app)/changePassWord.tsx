import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';

import { useNavigation,useRouter } from 'expo-router';
import { useAuthStore } from '@/store/useAuth';
import Toast from 'react-native-root-toast';
import useToast from '@/constants/useToast';


import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useRef,useState } from 'react';

import BackIcon from '@/components/icons/backIcon';

import EyeIcon from '@/components/icons/eyeIcon';
// import PasswordInput from '@/components/passWordInput';



const ChangePassword = () => {

  const showToast = useToast()
  const ChangePassWord = useAuthStore((state:any) => state.ChangePassWord)

  const navigation = useNavigation();
  const [password, setPassword] = useState(''); 
  const [newPassword, setNewPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 


  
    // State variable to track password visibility 
  const [showPassword, setShowPassword] = useState(false); 
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  async function resetPassword() {

    if(password == '' || newPassword == '' || confirmPassword == '' ) {
      return showToast('enter complete details',false)
    }

    if(newPassword !== confirmPassword){
      return showToast('new password and confirmed password do not match',false)
    }

    const result = await ChangePassWord({
      currentPassword:password, 
      newPassword:newPassword
    });

    if (result.success) {
      showToast(result?.msg,true)
      setPassword('')
      setNewPassword('')
      setConfirmPassword('')
      
    }else{
      showToast(result?.msg,false)
    }
    
}


  



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
          Change Password
        </SoraText>

      </View>

      {/* body */}
      <View className='px-6 bg-white flex-1 rounded-t-3xl py-4'>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >

            <SansText className='my-8' style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
              Change your password and keep it safe
            </SansText>


            <View className='gap-y-4' >

                {/* enter old password */}

                <View className='flex flex-col items-start justify-center gap-y-2'>
                        
                  <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                    Enter Old Password
                  </SansText>
                        
                  <View className='border border-[#E4E5E7] rounded-xl w-full flex flex-row items-center justify-between'>
                    
                    <TextInput
                      className='w-[85%] px-4 py-2 rounded-xl'
                      onChangeText={setPassword}
                      value={password}
                      secureTextEntry={!showPassword}
                      autoCapitalize={'none'}

                    />
                    <TouchableOpacity onPress={()=>setShowPassword(!showPassword)} className='mx-3'>
                      <EyeIcon/>
                    </TouchableOpacity>
                            
                  </View>
        
                </View>

                {/* enter new password */}

                <View className='flex flex-col items-start justify-center gap-y-2'>
                        
                  <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                    Enter New Password
                  </SansText>
                        
                  <View className='border border-[#E4E5E7] rounded-xl w-full flex flex-row items-center justify-between'>
                    
                    <TextInput
                      className='w-[85%] px-4 py-2 rounded-xl'
                      onChangeText={setNewPassword}
                      value={newPassword}
                      secureTextEntry={!showNewPassword}
                      autoCapitalize={'none'}
                    />
                    <TouchableOpacity onPress={()=>setShowNewPassword(!showNewPassword)} className='mx-3'>
                      <EyeIcon/>
                    </TouchableOpacity>
                            
                  </View>
        
                </View>

                {/* Confirm new password */}

                <View className='flex flex-col items-start justify-center gap-y-2'>
                        
                  <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                    Confirm New Password
                  </SansText>
                        
                  <View className='border border-[#E4E5E7] rounded-xl w-full flex flex-row items-center justify-between'>
                    
                    <TextInput
                      className='w-[85%] px-4 py-2 rounded-xl'
                      onChangeText={setConfirmPassword}
                      value={confirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize={'none'}
                    />
                    <TouchableOpacity onPress={()=>setShowConfirmPassword(!showConfirmPassword)} className='mx-3'>
                      <EyeIcon/>
                    </TouchableOpacity>
                            
                  </View>
        
                </View>


                <Pressable onPress={()=>resetPassword()} className='w-full bg-[#FF2E42] mt-8 flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
                  <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                  Save Changes
                  </SansText>
                </Pressable>


            </View>
          

        </ScrollView>

      </View>




    </SafeAreaView>
    // </ImageBackground>
  )
}

export default ChangePassword
