import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';
import Svg, { Path,Rect,Circle } from "react-native-svg"

import { useNavigation,useRouter } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useRef,useState } from 'react';
import Toast from 'react-native-root-toast';
import useToast from '@/constants/useToast';

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import Uploader from '@/components/uploader';
import CloseIcon, { CloseIcon2 } from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import EditIcon from '@/components/icons/editIcon';
import CameraIcon from '@/components/icons/cameraIcon';
import GalleryIcon from '@/components/icons/galleryIcon';
import { useAuthStore } from '@/store/useAuth';
import { RadioButton } from 'react-native-paper';
import { uploadToFirebase } from '@/firebase-config';
import * as ImagePicker from 'expo-image-picker';




const DeleteAccount = () => {

  const sheetRef = useRef<BottomSheetMethods>(null);
  const navigation = useNavigation();
  const showToast = useToast()

  const user = useAuthStore((state:any) => state.user)
  const deleteAccount = useAuthStore((state:any) => state.deleteAccount)
  const LogOutUser = useAuthStore((state:any) => state.logOut)

  
  const [showSuccess, setShowSucess] = useState(false);
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState('ACCOUNT INACTIVITY');  



  const DeleteAccount  = async()=>{
    sheetRef.current?.close()
    if(!password) return
    const result = await deleteAccount(password,checked);

    console.log(result)
    if(result?.success){
      return setShowSucess(true)
    }else{
      return showToast(result?.msg,false)
    }

  }
  const router = useRouter()

  if(showSuccess) return (
    <>

        <View className='px-6 bg-white  flex-1 items-start justify-center rounded-t-3xl py-6 gap-y-8'>

          <View className='w-full flex flex-col items-center justify-center mb-16'>

            <Image
              source={require('@/assets/images/mark.png')}
              style={{resizeMode:'cover'}}
              className='mb-3'
            />

            <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
             Account Deleted Successfully
            </SoraText>

            <SansText className='text-center mt-2' style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Your account is no longer in our database</SansText>
          </View>

          <Pressable onPress={()=> LogOutUser()} className=' absolute bottom-12 left-6 w-full bg-[#FF2E42] mx-auto flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
            <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
             Back to Login
            </SansText>
          </Pressable>

        </View>

    
    </>
  )


  return (
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      {/* header */}
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

        <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
          Delete Account
        </SoraText>

      </View>

      {/* body */}
      <View className='px-6 bg-white flex-1 rounded-t-3xl py-6 gap-y-5'>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
           
          <View className='w-full flex flex-row items-center justify-center gap-x-3 '>


            <View className='w-full flex flex-col items-start gap-y-4'>

              <View className='w-full flex flex-col gap-y-3 items-start justify-center'>

                <SansText style={{fontSize:16,color:'#686767',fontWeight:'600'}}>
                  If you delete your Account.
                </SansText>

                <View className='w-full flex flex-row items-start justify-center gap-x-3'>
                  <View className='w-2 h-2 bg-[#686767] rounded-full mt-2'></View>
                  <SansText className='w-[90%]' style={{fontSize:16,color:'#686767',fontWeight:'600'}}>
                    You will no longer be able to login to your Qaya account 
                  </SansText>
                </View>

                <View className='w-full flex flex-row items-start justify-center gap-x-3'>
                  <View className='w-2 h-2 bg-[#686767] rounded-full mt-2'></View>
                  <SansText className='w-[90%]' style={{fontSize:16,color:'#686767',fontWeight:'600'}}>
                    Your account will be deactivated for 30 days. During deactivation, your account won’t be accessible. After 30 days your account will be permanently deleted 
                  </SansText>
                </View>

              </View>
              


              <SoraText style={{fontSize:16,color:'#686767'}}>
               Please tell us why you want to delete your account?
              </SoraText>

              <View className='w-full flex flex-col gap-y-1'>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:16,color:'#686767',fontWeight:'600'}}>
                    Security concerns 
                  </SansText>

                  <RadioButton
                    color='#66C27C'
                    uncheckedColor='#e4e4e4'
                    value="SECURITY CONCERN'"
                    status={ checked === 'SECURITY CONCERN' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('SECURITY CONCERN')}
                  />

                </View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:16,color:'#686767',fontWeight:'600'}}>
                    You found an alternative 
                  </SansText>

                  <RadioButton
                    color='#66C27C'
                    uncheckedColor='#e4e4e4'
                    value="ALTERNATIVE'"
                    status={ checked === 'ALTERNATIVE' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('ALTERNATIVE')}
                  />

                </View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:16,color:'#686767',fontWeight:'600'}}>
                    Account inactivity
                  </SansText>

                  <RadioButton
                    color='#66C27C'
                    uncheckedColor='#e4e4e4'
                    value="ACCOUNT INACTIVITY'"
                    status={ checked === 'ACCOUNT INACTIVITY' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('ACCOUNT INACTIVITY')}
                  />

                </View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:16,color:'#686767',fontWeight:'650'}}>
                    Others
                  </SansText>

                  <RadioButton
                    color='#66C27C'
                    uncheckedColor='#e4e4e4'
                    value="OTHERS'"
                    status={ checked === 'OTHERS' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('OTHERS')}
                  />

                </View>

              
              </View>

              <View className='w-full flex flex-col gap-y-1'>

                { checked === 'OTHERS' && <TextInput
                  className='w-full border border-[#E5E5E5] rounded-2xl p-4 mt-4'
                  multiline={true}
                  numberOfLines={10}
                  placeholder='enter reason'
                  onChangeText={setChecked}
                  style={{ height:150, textAlignVertical: 'top',}}
                />}

                <TouchableOpacity onPress={()=> sheetRef.current?.open()} className='w-full bg-[#FF2E42] mt-8 flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
                    <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                     Delete Account
                    </SansText>
                </TouchableOpacity>

              </View>

              

            </View>
            

          </View>

        </ScrollView>

      </View>

      <BottomSheet style={{backgroundColor:'#FFFFFF'}} height={hp('40%')} ref={sheetRef} hideDragHandle={true}	>

        <View className='px-6 my-6 gap-y-2'>

          <View className='flex flex-row items-center justify-between'>

            <SoraText style={{fontSize:18,color:'#080708',fontWeight:'600'}}>
              Delete Confirmation
            </SoraText>
            <TouchableOpacity onPress={()=>(sheetRef.current?.close())} className=''>
              <CloseIcon/>
            </TouchableOpacity>

          </View>

          <View className='flex flex-col gap-y-6' >

            <View className='flex flex-col gap-y-2'>

              <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                Enter password to delete
              </SansText>
              <TextInput
                    className='w-full border border-[#E5E5E5] rounded-xl px-3 py-2.5'
                    numberOfLines={1}
                    onChangeText={setPassword}
              />

            </View>

          
            <View className='w-full flex flex-row items-center gap-x-3 justify-start'>
                <TouchableOpacity onPress={()=> DeleteAccount()} className='w-[60%] bg-[#FF2E42] flex flex-row items-center justify-center gap-x-2 py-4 px-4 rounded-2xl'>
                  <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                    Yes, Delete
                  </SansText>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>(sheetRef.current?.close())} className='w-[30%] flex flex-row items-end justify-end gap-x-2 py-4 rounded-2xl'>
                  <SansText style={{fontSize:18,color:'#686767',fontWeight:'500'}}>
                    Cancel
                  </SansText>
                </TouchableOpacity>

            </View>


          </View>


        </View>
              

            
      </BottomSheet>




    </SafeAreaView>
  )
}

export default DeleteAccount