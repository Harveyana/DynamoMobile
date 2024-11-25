import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState,useEffect } from 'react';
import { useNavigation,useRouter } from 'expo-router';
import { SansText, SoraText } from '@/components/StyledText';
import { useProductStore } from '@/store/useProduct';
import getLocation from '@/constants/useLocation';
import { Skeleton } from '@rneui/themed';
import SkeletonLoader from './skeleton';
import Toast from 'react-native-root-toast';
import useToast from '@/constants/useToast';
import EmptyStores from './icons/emptyStores';



interface Props {
  close: () => void;
}


const Stores = ({close}:Props) => {

// const { location, errorMsg } = useLocation();
const [location, setLocation] = useState<{}|null>(null);
const [Stores, setStores] = useState<any[]>([]);

const router = useRouter()
const fetchStores = useProductStore((state:any) => state.getStores)
const StoreId = useProductStore((state:any) => state.Store_id)
// const loading = useProductStore((state:any) => state.loading)
const [loading, setLoading] = useState(false);

const showToast = useToast()

const SelectStore = async (storeId:string,storeName:string) => {
  try {
    await AsyncStorage.setItem('storeId', storeId);
    useProductStore.setState({ Store_id: storeId, Store_Name: storeName })
    close()
  } catch (e) {
    console.error('Failed to save name.');
  }
};

  
// const Stores = [
//   {
//     id: 1,
//     title: "Product 1",
//     price: 20.99,
//     supplier: "Supplier A"
//   },
//   {
//     id: 2,
//     title: "Product 2",
//     price: 15.49,
//     supplier: "Supplier B"
//   },
//   {
//     id: 3,
//     title: "Product 3",
//     price: 30.00,
//     supplier: "Supplier C"
//   },
//   {
//     id: 4,
//     title: "Product 4",
//     price: 10.99,
//     supplier: "Supplier A"
//   },
//   // Add more products as needed
// ];

const fetchLocation = async () => {
  setLoading(true)
  try {
    const loc = await getLocation();
    console.log(loc.coords)
    setLocation(loc);
    const getStores = await fetchStores(loc.coords.longitude,loc.coords.latitude)
    if(getStores?.success){
      // showToast(getStores?.msg,true)
      setStores([...Stores,...getStores?.stores])
      return setLoading(false)
    }else{
      setLoading(false)
      return showToast(getStores?.msg,false)
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false)
  }
};

  useEffect(() => { 
    fetchLocation();
  }, []); 

  if(loading){
    return (
       <>
       {/* <SafeAreaView className='flex-1 bg-[#fffff]'> */}

          <View className='w-full pt-[40px] flex flex-col items-center justify-center px-6 gap-y-12'>

            <View className='w-full flex flex-col items-center justify-center  gap-2'>
                    <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={15} animation="wave"/>
                    <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>
                    <View className='w-full flex flex-row items-center justify-start gap-x-3'>
                      <View className='w-[60%] flex flex-row items-center justify-center'>
                        <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={8} animation="wave"/>
                      </View>

                      <View className='w-[20%] flex flex-row items-center justify-center'>
                        <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={6} animation="wave"/>
                      </View>
                    </View>
            </View>

            <View className='w-full flex flex-col items-center justify-center  gap-2'>
                    <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={15} animation="wave"/>
                    <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>
                    <View className='w-full flex flex-row items-center justify-start gap-x-3'>
                      <View className='w-[60%] flex flex-row items-center justify-center'>
                        <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={8} animation="wave"/>
                      </View>

                      <View className='w-[20%] flex flex-row items-center justify-center'>
                        <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={6} animation="wave"/>
                      </View>
                    </View>
            </View>

            <View className='w-full flex flex-col items-center justify-center gap-2'>
                    <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={15} animation="wave"/>
                    <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>
                    <View className='w-full flex flex-row items-center justify-start gap-x-3'>
                      <View className='w-[60%] flex flex-row items-center justify-center'>
                        <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={8} animation="wave"/>
                      </View>

                      <View className='w-[20%] flex flex-row items-center justify-center'>
                        <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={6} animation="wave"/>
                      </View>
                    </View>
            </View>

            <View className='w-full flex flex-col items-center justify-center gap-2'>
                    <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={15} animation="wave"/>
                    <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>
                    <View className='w-full flex flex-row items-center justify-start gap-x-3'>
                      <View className='w-[60%] flex flex-row items-center justify-center'>
                        <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={8} animation="wave"/>
                      </View>

                      <View className='w-[20%] flex flex-row items-center justify-center'>
                        <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={6} animation="wave"/>
                      </View>
                    </View>
            </View>

          </View>

        {/* </SafeAreaView> */}

       </>
    )
  }

  if(!Stores.length){
    return (
       <>
       {/* <SafeAreaView className='flex-1 item-center justify-center bg-[#fffff]'> */}

          <View className='px-6 items-center justify-center rounded-t-3xl py-6 gap-y-4'>

            <View className='w-full flex flex-col items-center justify-center gap-y-6'>

              <EmptyStores />

              <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
                No Stores Yet
              </SoraText>

              <SansText className='text-center mt-2' style={{fontSize:16,color:'#686767',fontWeight:'400'}}>You have no stores in your location</SansText>

              <TouchableOpacity onPress={() =>{fetchLocation()}} className='bg-[#FF2E42] flex flex-row items-center justify-center gap-x-2 py-4 px-4 rounded-2xl mt-4'>
                  <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                    Rescan
                  </SansText>
              </TouchableOpacity>

            </View>

          </View>

        {/* </SafeAreaView> */}

       </>
    )
  }


  return (
    <>
    
      <FlatList
              className=''
                  data={Stores}
                  renderItem={({item}) => (
                    <TouchableOpacity onPress={()=>SelectStore(item.id,item.name)} className='border-b border-[#E5E5E5] px-10 py-8' >
                      <SoraText numberOfLines={1} style={{fontSize:14,color:'black'}}>{item.name}</SoraText>
                      <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>{item.location}</SansText>
                    </TouchableOpacity>
                      
                  )}
            contentContainerStyle={[{columnGap:16,marginTop:4 }]}
      />
        

    </>
  );
};

export default Stores