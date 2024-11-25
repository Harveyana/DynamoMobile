import { View, Text, StyleSheet, Dimensions,TouchableOpacity, Image, Button } from "react-native"

import { Camera, CameraType, BarCodeScanningResult } from 'expo-camera/legacy';

import React, { useCallback, useMemo, useRef,useState, useEffect } from 'react';

import { useNavigation, useRouter } from 'expo-router';
import {debounce} from 'lodash';
import BackIcon from '@/components/icons/backIcon';
import RangeIcon from '@/components/icons/rangeIcon';
import HandIcon from '@/components/icons/handIcon';
import { SansText, SoraText } from '@/components/StyledText';




const CameraScan = ({ active }: { active: boolean }) => {

    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const router = useRouter()
    const navigation = useNavigation()
    const [scanned, setScanned] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState('');
    // const [cameraKey, setKey] = useState('')
  




  useEffect(() => { 

    
  }, []); 


  const debounceCall = useCallback(
    debounce((text:string) => {
      if (data === text) return;
      setLoaded(false)
      router.push({ pathname: '/product', params: { productId: text } });
    }, 100),
    [],
  );
 
  const handleBarCodeScanned = async(result:{type:String;data:string}) => {
    setScanned(true);
    console.log(data)
    setData(data)
    debounceCall(result.data)
    // if (data === result.data) return;
    // return router.push({ pathname: '/product', params: { productId: result.data } })
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }



  return (
    <>
    
    { active && <Camera key={data} onBarCodeScanned={(result:BarCodeScanningResult)=>{
          console.log(result.data);
          handleBarCodeScanned(result)
        }} 
        type={type}
        style={[StyleSheet.absoluteFillObject,styles.container]}
        >

          <View className='w-full flex flex-col items-center justify-center gap-y-8'>
            <RangeIcon/>

            <View className='w-full flex flex-col items-center justify-center gap-y-3 bg-transparent'>
              <HandIcon/>
              <SansText style={{fontSize:16,color:'#FFFFFF',fontWeight:'400'}}>Scan the QR Code on the Product</SansText>

              <TouchableOpacity onPress={()=>{router.push('/search')} } className=''>
                <SansText style={{fontSize:16,color:'#FFFFFF',fontWeight:'400'}}>Can’t find product? <SansText style={{fontSize:16,color:'#F9DB6D'}}>Search here</SansText></SansText>
              </TouchableOpacity>
              
              {/* {data !== '' && <SansText style={{fontSize:14,color:'#FFFFFF',fontWeight:'400'}}>{data}</SansText>}
              {scanned && (
                <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
              )} */}
            </View>
            
          </View>

        </Camera>}

    </>
    
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems:'center'
  },
});

export default CameraScan