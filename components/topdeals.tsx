import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useRef, useState,useEffect } from 'react';
import { useNavigation,useRouter } from 'expo-router';
import { SansText, SoraText } from '@/components/StyledText';
import { useProductStore } from '@/store/useProduct';
import AddToCart from '@/components/addToCart';
import SkeletonLoader from './skeleton';
import Toast from 'react-native-root-toast';
import useToast from '@/constants/useToast';
import EmptyStores from './icons/emptyStores';

// import { Skeleton } from '@rneui/themed';
// import SkeletonLoader from './skeleton';




const Topdeals = () => {


const [Products, setProducts] = useState<any[]>([]);
const router = useRouter()

const getDeals = useProductStore((state:any) => state.getDeals)
const StoreId = useProductStore((state:any) => state.Store_id)

// const loading = useProductStore((state:any) => state.loading)
const [loading, setLoading] = useState(true)


const showToast = useToast()
  

const fetchProducts = async () => {
  setLoading(true)
  try {
    console.log('StoreId:', StoreId);
    if (!StoreId) return;
    const deals = await getDeals(StoreId, 5);
    console.log('Fetched Products:', deals);
    if (deals?.success) {
      // showToast(deals?.msg,true)
      setProducts([...deals?.products]);
      return setLoading(false)
    }else{
      showToast(deals?.msg,false)
      return setLoading(false)
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    setLoading(false)
  }
};

useEffect(() => {
  fetchProducts();
}, [StoreId]);


if(loading){

  return (
    <>
     <View className='items-center justify-center rounded-t-3xl py-6 gap-y-8'>

        <SkeletonLoader/>

      </View>
    </>
  )

}


if(!Products.length){

  return (
    <>
     <View className='px-6 items-center justify-center rounded-t-3xl py-6 gap-y-8'>

        <View className='w-full flex flex-col items-center justify-center mb-16'>

          <EmptyStores />

          <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
            No Product Found
          </SoraText>

        </View>

      </View>
    </>
  )

}

  return (
    <>
    
      {Products.length ? <FlatList
              className=''
                  data={Products}
                  numColumns={2}
                  renderItem={({item}) => (
                          <TouchableOpacity onPress={() => router.push({ pathname: '/product', params: { productId: item.id } })} className='w-[46%] my-2 rounded-xl mx-[2%]'>
                              <View className=' bg-transparent rounded-xl'>
                                  <View className='w-full border border-[#E5E5E5] flex flex-row rounded-xl justify-center items-center bg-transparent'>
                                      <Image
                                          className='rounded-xl bg-transparent w-full h-32'
                                          style={[{aspectRatio:1,resizeMode:'cover'}]}
                                          source={{uri:item.images[0].url}}
                                      />
                                  </View>
                                  <View className='bg-transparent'>
                                      <View className='flex flex-row items-center justify-start'>
                                        <SoraText numberOfLines={1} style={{fontSize:14,color:'black'}}>₦{item.Sale_Status === 'ACTIVE'? item.Sales_price : item.price}</SoraText>
                                        {item.Sale_Status === 'ACTIVE' && <SansText numberOfLines={1} style={{fontSize:6,color:'#686767',fontWeight:'400'}} className='line-through bg-[#F8F4F4] p-1 rounded-lg'>₦{item.price}</SansText>}
                                      </View>
                                      
                                      <SansText numberOfLines={1} style={{fontSize:14,color:'#686767',fontWeight:'400'}}>{item.name}</SansText>
                                  </View>

                                  <TouchableOpacity className='absolute bottom-2 right-0'>
                                  <AddToCart />
                                  </TouchableOpacity>
                      
                              </View>
                          </TouchableOpacity>
                      
          
                  )}
                  // ItemSeparatorComponent={()=><View className='mx-2'></View>}
                  contentContainerStyle={[{columnGap:16,marginTop:4 }]}
      />

      : <></>}

    </>
  );
};

export default Topdeals