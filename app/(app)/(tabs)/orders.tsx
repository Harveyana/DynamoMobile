import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, SectionList, TouchableOpacity, View, RefreshControl } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';

import AddToCart from '@/components/addToCart';
import { useNavigation,useRouter } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import CartCard from '@/components/cartCard';
import WalletIcon from '@/components/icons/walletIcon';
import CardIcon from '@/components/icons/cardIcon';
import { useProductStore } from '@/store/useProduct';
import { formatDate,truncateString } from '@/constants/utils';
import EmptyWallet from '@/components/icons/emptyWallet';
import useToast from '@/constants/useToast';
import EmptyOrder from '@/components/icons/emptyOrder';



interface Product {
  id:string;
  storeId:string;
  name:string;
  SKU:string;
  price:number;
  // Variants:Variant[];
  cart_Quantity:number;    
  images:string[];
  categories:string[];
}


interface Order {
  id: string;
  store: string
  userId: string
  products: Product[]
  Status: string
  price: number
  createdAt: string
  paymentMethod: string
}



const Orders = () => {
  const [quantity, setQuantity] = useState(1)

  const [orders, setOrders] = useState<Order[]>([])
  const getOrders = useProductStore((state:any) => state.getOrders)
  const router = useRouter()
  const showToast = useToast()

  

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  const fetchMore = async () => {
    try {
      const data = await getOrders(orders[orders.length-1]?.id,10)
       console.log(data)
      if(data.success){
        return orders.push(...data.orders)
      }else{
        return showToast(data?.msg, false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { 

    const fetchOrder = async () => {
      try {
        const data = await getOrders()
         console.log(data)
        if(data.success){
          return setOrders(data?.orders)
        }else{
          return showToast(data?.msg, false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
  }, [refreshing]); 


  const orderSections = orders.map((order) => ({
    title: formatDate(order.createdAt),
    data: [order],
  }));


 
  
  return (
    // <ImageBackground source={require('@/assets/images/bgHome.png')} style={styles.image}>
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      {/* header */}
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

        <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
           Orders
        </SoraText>

      </View>

      {/* body */}
      { orders.length ? <View className='bg-white flex-1 rounded-t-3xl py-6 gap-y-5'>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >

          <View className=' flex flex-col items-start'>


              <SectionList
                    sections={orderSections}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({item}) => (
                      <TouchableOpacity onPress={() => router.push({ pathname: '/order', params: { orderId: item.id } })} className='px-6 flex flex-row items-center justify-start gap-3 py-2'>
                        <View className='w-24 border border-[#E5E5E5] flex flex-row rounded-xl justify-center items-center bg-transparent'>
                          <Image
                            className='rounded-xl w-full h-24'
                            style={[{aspectRatio:1,resizeMode:'cover'}]}
                            source={{uri:item.products[0].images[0]}}
                          />
                        </View>
                        <View className='flex flex-col items-start justify-center gap-y-1'>
                          <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                            Order #{truncateString(item.id,12)} 
                          </SansText>
                          <SansText style={{fontSize:14,color:'#080708',fontWeight:'400'}}>
                            {item.products.length + 1} items 
                          </SansText>
                          <SoraText style={{fontSize:16,color:'#080708',fontWeight:'600'}}>
                            ₦{item.price}
                          </SoraText>
                          <SansText numberOfLines={1} style={{fontSize:8,color:item.Status == 'PENDING'? '#F17B2C':'#38C793',fontWeight:'400',backgroundColor:item.Status == 'PENDING'? '#EFE7DD':'#E7F7F1'}} className=' py-1 px-3 rounded-lg'>
                            {item.Status}
                          </SansText>
                        </View>

                      </TouchableOpacity>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                      <SoraText className='pl-6' style={{fontSize:14,color:'black',marginVertical:10}}>
                        {title}
                      </SoraText>
                    )}

                    renderSectionFooter={() => (
                      <View style={{width:hp('100%')}} className='bg-gray-200 py-1 my-4'>

                      </View>
                    )}
                  />

          </View>


                <View className='flex flex-col items-center gap-x-3 justify-start w-fit p-2 rounded-2xl'>

                  <TouchableOpacity onPress={()=>fetchMore()} className=' bg-transparent rounded-xl flex flex-col items-center justify-center'>
                    <SoraText style={{fontSize:14,color:'#080708',fontWeight:'700'}}>
                      Load more
                    </SoraText>
                    <FontAwesome name="chevron-down" size={11} color="#C5C1C1" className='' />
                  </TouchableOpacity>
                  
                </View>
                    
          

        </ScrollView>

      </View>

      : <View className='w-full px-6 bg-white  flex-1 items-center justify-center rounded-t-3xl py-6 gap-y-8'>

          <View className='w-full flex flex-col items-center justify-center mb-16'>

            <EmptyOrder />

            <SansText className='text-center mt-2' style={{fontSize:16,color:'#686767',fontWeight:'400'}}>You have no orders yet. Shop in a mall on the app and the orders will appear here</SansText>
          </View>

        </View>
      }

    </SafeAreaView>
    // </ImageBackground>
  )
}

export default Orders

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'center'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: "400",
    textAlign: 'center'
  },
});