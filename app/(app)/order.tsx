import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, SectionList, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';
import CartIcon from '@/components/icons/cartIcon';
import BellIcon from '@/components/icons/bellIcon';

import AddToCart from '@/components/addToCart';
import { useNavigation, useRouter, useLocalSearchParams,usePathname } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Skeleton } from '@rneui/themed';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import CartCard from '@/components/cartCard';
import WalletIcon from '@/components/icons/walletIcon';
import CardIcon from '@/components/icons/cardIcon';
import { useProductStore } from '@/store/useProduct';
import { formatDate, truncateString } from '@/constants/utils';
import { formatNumber } from '@/constants/cartStorage';
import useToast from '@/constants/useToast';
import QRCode from 'react-native-qrcode-svg';



// interface Variant {
//   name: string;
//   value: string;
//   price: number
// }
// Define the product type
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



const Order = () => {
  const [order, setOrder] = useState<Order|null>(null)


  const sheetRef = useRef<BottomSheetMethods>(null);

  const router = useRouter()
  const currentRoute = usePathname()
  const { orderId } = useLocalSearchParams();
  const getOrder = useProductStore((state:any) => state.getOrder)

  const showToast = useToast()
  const QayaLogo = require('@/assets/images/qayaBlue.png');
  
  useEffect(() => { 

    const fetchOrder = async () => {
      try {
        const data = await getOrder(orderId)
         console.log(data)
        if(data?.success){
          return setOrder(data?.order)
        }else{
          return showToast(data?.msg, false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
  }, []); 

  if(!order){
    return (

      <SafeAreaView className='flex-1 bg-[#fffff]'>
        <View className='w-full flex flex-col items-center justify-center gap-y-4'>
            <View style={{marginTop: hp('8%'),marginBottom:hp('1%')}} className='w-full relative flex-row items-center justify-between px-6'>

              <TouchableOpacity onPress={()=>(router.back())} className='flex flex-col gap-y-1'>
                <BackIcon/>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{router.push('/cart')}}  className='bg-white rounded-full p-1.5'>
                  <CartIcon/>
              </TouchableOpacity>

            </View>

            <View className='w-full flex flex-col px-6 gap-y-2'>

              <Skeleton className='w-full h-full rounded-xl' style={{borderRadius:15}} height={240} animation="wave"/>

              <Skeleton className='w-[30%] rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>

              <View className='w-[50%] flex flex-col items-start justify-start gap-y-2'>
                <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>

                <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>

                <View className='w-[25%] flex flex-row gap-x-2'>
                  <Skeleton circle className='w-full' height={28} />
                  <Skeleton circle className='w-full' height={28} />
                </View>

              </View>

              <Skeleton className='w-full h-full rounded-xl' style={{borderRadius:15}} height={140} animation="wave"/>

            </View>

          
            <View className='w-full flex flex-col items-center justify-center px-6 gap-y-2'>
              <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>

              <Skeleton className='w-[30%] rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>


            </View>

        </View>

      </SafeAreaView>
    )
   }


  

  return (
    // <ImageBackground source={require('@/assets/images/bgHome.png')} style={styles.image}>
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      {/* header */}
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

        <TouchableOpacity onPress={()=>router.back()} className='absolute left-6 flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
          Order #{truncateString(order?.id,8)}
        </SoraText>

      </View>

      {/* body */}
      <View className=' bg-white flex-1 rounded-t-3xl py-6 gap-y-5'>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >

          <View className='px-6 w-full relative flex flex-col items-start justify-center gap-y-2'>
            <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'500'}}>
              Order ID: <SansText style={{fontSize:14,color:'#686767',fontWeight:'400'}}>{order ? truncateString(order?.id,16): null}</SansText>
            </SoraText>
            <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'500'}}>
              Store: <SansText style={{fontSize:14,color:'#686767',fontWeight:'400'}}>{order?.store}</SansText>
            </SoraText>
            <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'500'}}>
              Placed On: <SansText style={{fontSize:14,color:'#686767',fontWeight:'400'}}>{formatDate(order?.createdAt)}</SansText>
            </SoraText>
            <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'500'}}>
              Payment Method: <SansText style={{fontSize:14,color:'#686767',fontWeight:'400'}}>{order?.paymentMethod}</SansText>
            </SoraText>
            <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'500'}}>
              Status: <SansText style={{fontSize:14,color:'#686767',fontWeight:'400'}}>{order?.Status}</SansText>
            </SoraText>
            <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'500'}}>
              Total: <SansText style={{fontSize:14,color:'#686767',fontWeight:'400'}}>₦{formatNumber(order?.price)}</SansText>
            </SoraText>
            <SansText numberOfLines={1} style={{fontSize:14,color:order?.Status == 'PENDING'? '#F17B2C':'#38C793',backgroundColor:order?.Status == 'PENDING'? '#EFE7DD':'#E7F7F1',fontWeight:'400'}} className='absolute top-2 right-6 py-1 px-5 rounded-lg'>
              {order?.Status}
            </SansText>
          </View>

          <View className='px-6 flex flex-col mt-8 py-4 border-y-4 border-gray-200 items-start'>
            
            <SoraText className='my-4' style={{fontSize:14,color:'#080708',fontWeight:'500'}}>
              Items In the Order
            </SoraText>

              <FlatList
                className='w-full'
                    data={order?.products}
                    numColumns={1}
                    renderItem={({item}) => (
                      <View className='flex flex-row items-center justify-start gap-3 py-2'>
                        <View className='w-24 border border-[#E5E5E5] flex flex-row rounded-xl justify-center items-center bg-transparent'>
                          <Image
                            className='rounded-xl w-full h-24'
                            style={[{aspectRatio:1,resizeMode:'cover'}]}
                            source={{uri:item.images[0]}}
                          />
                        </View>
                        <View className='flex flex-col items-start justify-center gap-x-3'>
                          <SansText numberOfLines={1} style={{fontSize:16,color:'#080708',fontWeight:'600'}}>
                            {item.name} 
                          </SansText>

                          <SansText style={{fontSize:14,color:'#080708',fontWeight:'500'}}>
                            x {item.cart_Quantity}
                          </SansText>

                          <SoraText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                           ₦{formatNumber(item.price)}
                          </SoraText>
                          
                        </View>

                      </View>
                    )}
                    // ItemSeparatorComponent={()=><View className='mx-2'></View>}
                  contentContainerStyle={[{columnGap:16,marginTop:4 }]}
            />

          </View>

          <View className='px-6 flex flex-col py-4 items-start'>

            <SoraText className='my-4' style={{fontSize:14,color:'#080708',fontWeight:'500'}}>
              Payment Information
            </SoraText>

            <View className='w-full relative flex flex-col items-start justify-center '>
            
              <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'500'}}>
                Payment Method: <SansText style={{fontSize:14,color:'#686767',fontWeight:'400'}}>{order?.paymentMethod}</SansText>
              </SoraText>
              <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'500'}}>
                Total: <SansText style={{fontSize:14,color:'#686767',fontWeight:'400'}}>₦{formatNumber(order?.price)}</SansText>
              </SoraText>
              <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'500'}}>
                Status: <SansText style={{fontSize:14,color:'#686767',fontWeight:'400'}}>{order?.Status}</SansText>
              </SoraText>
              
            
            </View>

            <TouchableOpacity onPress={()=> sheetRef.current?.open()} className='flex flex-row items-center justify-start gap-x-2'>
              <SoraText className='my-4' style={{fontSize:14,color:'#FF2E42',fontWeight:'500'}}>
                View QR Code
              </SoraText>
              <FontAwesome name="angle-double-right" size={20} color="#FF2E42" />
            </TouchableOpacity>


          </View>

        </ScrollView>

        <BottomSheet disableKeyboardHandling={true} style={{backgroundColor:'#FFFFFF'}} height={'60%'} ref={sheetRef} hideDragHandle={true}>

          <View className='flex flex-row items-center justify-between px-6 py-6 '>

            <SoraText style={{fontSize:18,color:'#080708',fontWeight:'600'}}>
              QR Code
            </SoraText>

            <TouchableOpacity onPress={()=> sheetRef.current?.close()} className=''>
                <CloseIcon/>
            </TouchableOpacity>

          </View>

          <View className='w-full py-8 flex items-center justify-center'>

            <QRCode
              value={order?.id}
              logo={QayaLogo}
              size={200}
              logoBackgroundColor='transparent'
            />

          </View>

          
              

            
        </BottomSheet>

      </View>

    </SafeAreaView>
    // </ImageBackground>
  )
}

export default Order

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