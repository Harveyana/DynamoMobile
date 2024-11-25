import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';

// import { useNavigation,useRouter } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useRef,useState } from 'react';
// import Toast from 'react-native-root-toast';
import useToast from '@/constants/useToast';

// import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
// import CloseIcon, { CloseIcon2 } from '@/components/icons/closeIcon';
// import BackIcon from '@/components/icons/backIcon';
// import EditIcon from '@/components/icons/editIcon';
import CameraIcon from '@/components/icons/cameraIcon';
import GalleryIcon from '@/components/icons/galleryIcon';
import { useAuthStore } from '@/store/useAuth';
import { uploadToFirebase, uploadImageAsync } from '@/firebase-config';
import * as ImagePicker from 'expo-image-picker';

type props ={
  updateImage:(url:string)=> void
}


const uploader = ({updateImage}:props) => {

    const [permission, requestPermission] = ImagePicker.useCameraPermissions();
    const [loading, setLoading] = useState(false);

    const user = useAuthStore((state:any) => state.user)

    const showToast = useToast()

    const takePhoto = async () => {
      try {
        const cameraResp = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });

        if (!cameraResp.canceled) {
          const { uri } = cameraResp.assets[0];
          console.log(uri)
          // const fileName = uri.split("/").pop();
          setLoading(true)
          const uploadResp = await uploadToFirebase(uri, user.firstName);
          console.log("uploadResp",uploadResp);

          updateImage(uploadResp as string)
          setLoading(false)

        }
      } catch (e) {
        console.log(e)
        showToast('image upload failed', false)
      }
    };

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setLoading(true)
        const uploadResp = await uploadToFirebase(result.assets[0].uri, user.firstName);
        console.log("uploadResp",uploadResp);
        updateImage(uploadResp as string)
        setLoading(false)

      }
    };



  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View>
        <Text>Permission Not Granted - {permission?.status}</Text>
        <StatusBar style="auto" />
        <TouchableOpacity onPress={requestPermission}><Text>Request Permission</Text></TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View className='flex items-center justify-center'>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (

    <View className='gap-y-4'>
              
              <TouchableOpacity onPress={()=> takePhoto()} className='w-full p-4 rounded-2xl border border-[#C5C1C1]'>

                <View className='flex flex-row items-center gap-x-3 justify-start'>

                  <CameraIcon/>
                  <View className=' bg-transparent rounded-xl flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      Take A Picture
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      take a selfie of yourself
                    </SansText>
                  </View>
                  <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='ml-auto' />
                </View>
                    
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> pickImage()}  className='w-full p-4 rounded-2xl border border-[#C5C1C1]'>

                <View className='flex flex-row items-center gap-x-3 justify-start'>

                  <GalleryIcon/>
                  <View className=' bg-transparent rounded-xl flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      Upload from Gallery
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      browse through your photos
                    </SansText>
                  </View>
                  <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='ml-auto' />
                </View>
                    
              </TouchableOpacity>


    </View>

  );
};

export default uploader