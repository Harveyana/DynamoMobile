import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, Button, TouchableOpacity, View } from 'react-native'
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Camera, CameraType,BarCodeScanningResult } from 'expo-camera/legacy';

import React, { useState, useEffect, useCallback } from "react";

// import { Image } from 'expo-image';
import CartIcon from '@/components/icons/cartIcon';
import BellIcon from '@/components/icons/bellIcon';

import AddToCart from '@/components/addToCart';
import { useNavigation, useRouter } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import {debounce} from 'lodash';
import BackIcon from '@/components/icons/backIcon';
import RangeIcon from '@/components/icons/rangeIcon';
import HandIcon from '@/components/icons/handIcon';
import CameraScan from '@/components/camera';
import CameraNext from '@/components/cameraNext';






const Scan = () => {
  
    // const [type, setType] = useState(CameraType.back);
    // const [permission, requestPermission] = Camera.useCameraPermissions();
    const router = useRouter()
    const navigation = useNavigation()
    // const [scanned, setScanned] = useState(false);
    const [loaded, setLoaded] = useState(false);
    // const [data, setData] = useState('');
    // const [cameraKey, setKey] = useState('')

    useEffect(() => {
      navigation.addListener('focus', () => {
        console.log("hey man you are looking to me");
        setLoaded(true)
      });
      navigation.addListener('blur', () => {
        console.log("hey man where are you going?");
        setLoaded(false)
      });
    }, [navigation]);


    // const debounceCall = useCallback(
    //   debounce((text:string) => {
    //     if (data === text) return;
    //     setLoaded(false)
    //     router.navigate({ pathname: '/product', params: { productId: text } });
    //   }, 500),
    //   [],
    // );
   
    // const handleBarCodeScanned = async(result:{type:String;data:string}) => {
    //   setScanned(true);
    //   console.log(data)
    //   setData(data)
    //   debounceCall(result.data)
    //   // if (data === result.data) return;
    //   // return router.push({ pathname: '/product', params: { productId: result.data } })
    //   // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // };

    // if (!permission) {
    //   // Camera permissions are still loading
    //   return <View />;
    // }

    // if (!permission.granted) {
    //   // Camera permissions are not granted yet
    //   return (
    //     <View style={styles.container}>
    //       <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
    //       <Button onPress={requestPermission} title="grant permission" />
    //     </View>
    //   );
    // }

  return (
   <>
   
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      <CameraNext active={loaded} />
    </SafeAreaView>

   </>
    
  )

}

export default  Scan

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems:'center'
//   },
// });

// function resumePreview() {
//   throw new Error('Function not implemented.');
// }
