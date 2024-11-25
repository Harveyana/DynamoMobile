import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,Pressable, View, RefreshControl } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Svg, { Path,Rect,Circle } from "react-native-svg"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';
import CartIcon from '@/components/icons/cartIcon';
import BellIcon from '@/components/icons/bellIcon';

import AddToCart from '@/components/addToCart';
import { useNavigation,useRouter } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import Banner from '@/components/banner';
import React, { useCallback, useMemo, useRef,useState, useEffect } from 'react';
import { Rating } from '@kolking/react-native-rating';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import MenuIcon, { MenuIcon2 } from '@/components/icons/menuIcon';
import { useProductStore } from '@/store/useProduct';
import { useAuthStore } from '@/store/useAuth';
import useToast from '@/constants/useToast';
import QayaIcon2 from '@/components/icons/qayaIcon2';
import { formatNumber } from '@/constants/cartStorage';
import EmptyWallet from '@/components/icons/emptyWallet';
import TopupIcon from '@/components/icons/topUpIcon';
import TransactionFilter from '@/components/transactionfilter';
import EmptyCart from './icons/emptyCart';






const ProductReviews = ({productId}:{productId:string}) => {
  const [search, setSearch] = useState('')
  
  const sheetRef = useRef<BottomSheetMethods>(null);
  const sheetRef2 = useRef<BottomSheetMethods>(null);

  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false);
  const [Reviews, setReviews] = useState<any[]>([]);
  const [loading, setloading] = useState<boolean>(false);



  // const getBalance = useProductStore((state:any) => state.getWalletBalance)
  const getProductReviews = useProductStore((state:any) => state.getProductReviews)
  const StoreId = useProductStore((state:any) => state.Store_id)
  // const loading = useProductStore((state:any) => state.loading)

  dayjs.extend(relativeTime);

  const showToast = useToast()

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  useEffect(() => {

    const fetchReviews = async () => {
      setloading(true)
      const data = await getProductReviews(productId,20);
      if(data.success){
        setReviews(data.reviews)
      }
      setloading(false)
      
    };

    fetchReviews();
  }, [refreshing]);

  

  if(!Reviews.length){
    return (
       <>
       <SafeAreaView className='flex bg-[#fffff]'>

          <View className='px-6 bg-white flex items-start justify-center rounded-t-3xl py-6 gap-y-8'>

            <View className='w-full flex flex-col items-center justify-center mb-16'>

              <EmptyCart />

              <SansText className='text-center mt-2' style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Product has no reviews yet</SansText>
            </View>

          </View>

        </SafeAreaView>

       </>
    )
  }


  return (
    <SafeAreaView className='flex bg-[#fffff] h-full'>

      <View className='bg-white h-full flex rounded-t-3xl pt-6 gap-y-5'>
      
        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className='h-full flex flex-col items-start'>

            <FlatList
                className='w-full'
                    data={Reviews}
                    numColumns={1}
                    renderItem={({item}) => (

                      <View className='relative flex flex-col gap-y-2 border border-[#E5E5E5] rounded-2xl px-5 py-4' >
                        <View className='w-full flex flex-row items-center justify-start gap-x-2 '>

                          <Image
                            className='rounded-full w-[36px]'
                            style={[{aspectRatio:1,resizeMode:'cover'}]}
                            source={{uri: item?.user.photoUrl}}
                          />
                          <View className='flex flex-col items-start justify-center'>
                            <SoraText numberOfLines={1} style={{fontSize:16,color:'#0D0D0D',fontWeight:'600'}}>
                              {item?.user.firstName} {item?.user.lastName}
                            </SoraText>
                            <TouchableOpacity onPress={()=>sheetRef.current?.open()} className='flex flex-row items-center justify-center gap-x-2'>
                              <Rating size={14} rating={item.rating ? item.rating : 0 } disabled />
                              <SansText numberOfLines={1} style={{fontSize:14,color:'#483D3D',fontWeight:'400'}} className=''>({item.rating ? item.rating : 0 })</SansText>
                            </TouchableOpacity>

                          </View>

                        </View>
                        <SansText numberOfLines={5} style={{fontSize:14,color:'#686767',fontWeight:'400'}}>{item.feedback}</SansText>
                        <SansText className='absolute top-4 right-5' numberOfLines={5} style={{fontSize:14,color:'#686767',fontWeight:'400'}}>{dayjs().to(dayjs(item.createdAt))}</SansText>
                      </View>


                          
                    )}
                    ItemSeparatorComponent={()=><View className='my-3'></View>}
                contentContainerStyle={[{columnGap:16,marginTop:4 }]}
            />


          </View>

          

        </ScrollView>


      </View>




    </SafeAreaView>
  )
}

export default ProductReviews
