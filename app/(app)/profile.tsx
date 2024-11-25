import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';

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
import { uploadToFirebase } from '@/firebase-config';
import * as ImagePicker from 'expo-image-picker';




const Profile = () => {

  const sheetRef = useRef<BottomSheetMethods>(null);
  const navigation = useNavigation();
  const showToast = useToast()

  const user = useAuthStore((state:any) => state.user)
  const updateProfile = useAuthStore((state:any) => state.updateProfile)

  const [photoUrl, setphotoUrl] = useState(user ? user.photoUrl : require('@/assets/images/harvey.png'));
  const [firstName, setFirstName] = useState(user ? user.firstName : '');
  const [lastName, setLastName] = useState(user ? user.lastName : '');
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : '');
  const [email, setEmail] = useState(user ? user.email : '');


  
  

  const updateDetails = async(newPhotoUrl?:string)=>{

    
    const result = await updateProfile({
      firstName:firstName, 
      lastName:lastName, 
      email:email, 
      photoUrl: newPhotoUrl ? newPhotoUrl : photoUrl, 
      phoneNumber:phoneNumber
    });

    console.log(result)
    if(result?.success){
      useAuthStore.setState({user: result?.user})
      return showToast(result?.msg,true)
    }else{
      return showToast(result?.msg,false)
    }

  }


  const showTabBar = () => {
    navigation.setOptions({
      tabBarStyle: { 
        display: 'flex',
        backgroundColor: '#FAFAFA',
        height:70,
        paddingBottom:10,
        paddingTop:10
      }      
    });
  };

  const hideTabBar = () => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' }
    });
  };

  const openBottomSheet = () => {
    hideTabBar()
    sheetRef.current?.open();
  };

  const closeBottomSheet = () => {
    showTabBar()
    sheetRef.current?.close();
  };

  const SetImage = (url:string)=>{
    if(!url) return showToast('Please retry Upload',false)
    setphotoUrl(url)
    closeBottomSheet()
    updateDetails(url)
  }

  const router = useRouter()

  return (
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      {/* header */}
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

        <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
          Profile
        </SoraText>

      </View>

      {/* body */}
      <View className='px-6 bg-white flex-1 rounded-t-3xl py-6 gap-y-5'>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
           
          <View className='w-full flex flex-row items-center justify-center gap-x-3 '>

            {user && <View  className='relative'>

              <Image
                className='rounded-full w-[100px]'
                style={[{aspectRatio:1,resizeMode:'cover'}]}
                source={{uri:photoUrl}}

              />

              <TouchableOpacity onPress={()=> openBottomSheet()} className='absolute bottom-1 right-2'>
                <EditIcon/>
              </TouchableOpacity>

            </View>}
            

          </View>




          <View className='w-full flex flex-col items-start mt-6'>

            {/* inputs */}

              <View className='w-full rounded-2xl flex flex-col items-center justify-center py-3 gap-y-4'>
                  

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


                <View className='flex flex-col items-start justify-center gap-y-2'>
                    
                  <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                    Phone Number
                  </SansText>
                  
                  <View className='pt-1 flex flex-row gap-x-2'>
                      <TextInput
                          className='border border-[#E4E5E7] px-4 py-2 rounded-xl w-full'
                          onChangeText={(value)=>{setPhoneNumber(value)}}
                          value={phoneNumber}
                          placeholder="08081232882"
                          autoCapitalize='words'
                      />
                        
                  </View>
  
                </View>


                <View className='flex flex-col items-start justify-center gap-y-2'>
                    
                  <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                    Email Address
                  </SansText>
                  
                  <View className='pt-1 flex flex-row gap-x-2'>
                      <TextInput
                          className='border border-[#E4E5E7] px-4 py-2 rounded-xl w-full'
                          onChangeText={(value)=>{setEmail(value)}}
                          value={email}
                          placeholder="hello@alignui.com"
                          autoCapitalize='words'
                          readOnly={true}
                      />
                        
                  </View>
  
                </View>
        

              </View>

              <View className='w-full flex flex-col'>

                <TouchableOpacity onPress={()=>updateDetails()} className='w-full bg-[#FF2E42] mt-8 flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
                    <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                    Save Changes
                    </SansText>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{router.push({ pathname: '/deleteAccount'})}} className='w-full bg-white flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
                    <SansText style={{fontSize:18,color:'#686767',fontWeight:'600'}}>
                    Delete Account
                    </SansText>
                </TouchableOpacity>

              </View>
              

            

          </View>

          

        </ScrollView>

      </View>

      <BottomSheet height={hp('40%')} style={{backgroundColor:'#FFFFFF'}} ref={sheetRef} hideDragHandle={true}	>

        <View className='px-6 my-6 gap-y-6'>

          <View className='flex flex-row items-center justify-between'>

            <SoraText style={{fontSize:18,color:'#080708',fontWeight:'600'}}>
              Edit Photo
            </SoraText>
            <TouchableOpacity onPress={()=>(closeBottomSheet())} className=''>
              <CloseIcon/>
            </TouchableOpacity>

          </View>

      
          <Uploader updateImage={(url:string)=> SetImage(url) } />


        </View>
              

            
      </BottomSheet>




    </SafeAreaView>
  )
}

export default Profile