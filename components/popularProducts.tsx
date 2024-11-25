import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons, MaterialIcons  } from '@expo/vector-icons';
// import { Image } from 'expo-image';
import CartIcon from '@/components/icons/cartIcon';
import BellIcon from '@/components/icons/bellIcon';

import AddToCart from '@/components/addToCart';
import { useNavigation,useRouter } from 'expo-router';

import {debounce} from 'lodash';
import { SansText, SoraText } from '@/components/StyledText';
import Banner from '@/components/banner';
import React, { useCallback, useMemo, useRef,useState, useEffect } from 'react';
// import { retrieveCart,formatNumber,clearCart } from '@/constants/cartStorage';
import { retrieveHistory } from '@/constants/historyStorage';

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { useProductStore } from '@/store/useProduct';
import { Skeleton } from '@rneui/themed';
import CloseIcon, { CloseIcon2 } from '@/components/icons/closeIcon';






const PopularProducts = () => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [Products, setProducts] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  const sheetRef = useRef<BottomSheetMethods>(null);

  const getPopularProducts = useProductStore((state:any) => state.getPopularProducts)
  const StoreId = useProductStore((state:any) => state.Store_id)
  // const loading = useProductStore((state:any) => state.loading)

  const router = useRouter()

 

  const fetchProducts = async () => {
    try {
      setLoading(true)
      console.log('StoreId:', StoreId);
      if (!StoreId) return;
      const result = await getPopularProducts(8,StoreId);
      console.log('Fetched Products:', result);
      if (result?.success) {
        // Toast.show(deals?.msg,toastConfig)
        return setProducts([...result?.products]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  if(loading){
    return (
       <>
          <View className='w-full pt-[40px] flex flex-col items-center justify-center gap-y-4'>

            <View className='w-full flex flex-row items-center justify-center  gap-3'>
                    <View className='w-[20%] flex flex-row items-center justify-center'>
                        <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={70} animation="wave"/>
                    </View>

                    <View className='w-[75%] flex flex-col items-center justify-center  gap-2'>

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

            <View className='w-full flex flex-row items-center justify-center  gap-3'>
                    <View className='w-[20%] flex flex-row items-center justify-center'>
                        <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={70} animation="wave"/>
                    </View>

                    <View className='w-[75%] flex flex-col items-center justify-center  gap-2'>

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

            <View className='w-full flex flex-row items-center justify-center  gap-3'>
                    <View className='w-[20%] flex flex-row items-center justify-center'>
                        <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={70} animation="wave"/>
                    </View>

                    <View className='w-[75%] flex flex-col items-center justify-center  gap-2'>

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

            <View className='w-full flex flex-row items-center justify-center  gap-3'>
                    <View className='w-[20%] flex flex-row items-center justify-center'>
                        <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={70} animation="wave"/>
                    </View>

                    <View className='w-[75%] flex flex-col items-center justify-center  gap-2'>

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

          </View>
       </>
    )
  }


  return (
    <SafeAreaView className='flex-1 bg-[#fffff]'>

      {/* body */}
      <View className='bg-white flex-1 rounded-t-3xl pt-6 gap-y-5'>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className=' gap-y-6'>

            { Products.length ? <View className='px-1 flex flex-col items-start'>
                  <SoraText style={{fontSize:16,color:'black'}}>
                    Popular Products
                  </SoraText>

                  <FlatList
                    className='w-full'
                        data={Products}
                        numColumns={1}
                        renderItem={({item}) => (

                          <TouchableOpacity onPress={() => router.push({ pathname: '/product', params: { productId: item.id } })} className='flex flex-row items-center justify-start gap-3 py-2'>
                            <View className='w-24 border border-[#E5E5E5] flex flex-row rounded-xl justify-center items-center bg-transparent'>
                              <Image
                                className='rounded-xl w-full h-24'
                                style={[{aspectRatio:1,resizeMode:'cover'}]}
                                source={{uri:item.images[0].url}}
                              />
                            </View>
                            <View className='flex flex-col items-start justify-center gap-x-3'>
                              <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                                {item.name}
                              </SansText>
                              <SoraText style={{fontSize:16,color:'#080708',fontWeight:'600'}}>
                                ₦{item.price}
                              </SoraText>
                              <SansText numberOfLines={1} style={{fontSize:8,color:'#686767',fontWeight:'400'}} className='line-through bg-[#F8F4F4] p-1 rounded-lg'>
                                ₦{item.Sales_price}
                              </SansText>
                            </View>

                          </TouchableOpacity>
                        )}
                        // ItemSeparatorComponent={()=><View className='mx-2'></View>}
                      contentContainerStyle={[{columnGap:16,marginTop:4 }]}
                  />

                </View>: <></>
            
            }
            

          </View>

          

        </ScrollView>
        

      </View>




    </SafeAreaView>
  )
}

export default PopularProducts