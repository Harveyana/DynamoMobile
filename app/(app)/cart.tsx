import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,ListRenderItem, RefreshControl } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';
import CartIcon from '@/components/icons/cartIcon';
import BellIcon from '@/components/icons/bellIcon';

import AddToCart from '@/components/addToCart';
import { useNavigation,useRouter } from 'expo-router';

import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import Toast from 'react-native-root-toast';
import useToast from '@/constants/useToast';

import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useEffect, useRef,useState } from 'react';
import { Skeleton } from '@rneui/themed';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import CartCard from '@/components/cartCard';
import WalletIcon from '@/components/icons/walletIcon';
import CardIcon from '@/components/icons/cardIcon';
import { retrieveCart,formatNumber,clearCart } from '@/constants/cartStorage';
import { useProductStore } from '@/store/useProduct';
import { useAuthStore } from '@/store/useAuth';
import Payment from '@/components/payment';
import EmptyCart from '@/components/icons/emptyCart';
import { UseCart } from '@/constants/useCart';



interface Variant {
  name: string;
  value: string;
  price: number
}
// Define the product type
// interface Product {
//   id:string;
//   storeId:string;
//   name:string;
//   SKU:string;
//   price:number;
//   Variants:Variant[];
//   cart_Quantity:number;    
//   images:any[];
//   categories:string[];
// }
interface Product {
  id:string;
  storeId:string;
  name:string;
  price:number;
  variants:Variant[];
  quantity:number;    
  images:string[];
}

interface Order {
  id: string
  userId: string
  products: Product[]
  Status: string
  price: number
  createdAt: string
  paymentMethod: string
}


const Cart = () => {
  // const [cart, setCart] = useState<Product[]>([]);
  const [key, setKey] = useState(1);
  // const [total, setTotal] = useState(0);
  const [view, setView] = useState('cart')
  const [order, setOrder] = useState<Order|null>()
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false)
  // const [totalPrice, setTotalPrice] = useState<number>(0);
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();


  const sheetRef = useRef<BottomSheetMethods>(null);
  const totalPrice = useProductStore((state:any) => state.totalCartPrice)
  const storeId = useProductStore((state:any) => state.Store_id)
  const CreateOrder = useProductStore((state:any) => state.createOrder)
  const OrderUpdate = useProductStore((state:any) => state.updateOrder)

  const getCart = useProductStore((state:any) => state.getCart)
  const removeFromCart = useProductStore((state:any) => state.removeFromCart)
  const reduceQuantity = useProductStore((state:any) => state.reduceQuantity)
  const increaseQuantity = useProductStore((state:any) => state.increaseQuantity)
  const cartkey = useProductStore((state:any) => state.key)
  const generalCart = useProductStore((state:any) => state.cart)

  const balance = useAuthStore((state:any)=> state.walletBalance)
  const user = useAuthStore((state:any)=> state.user)


  const router = useRouter()

  const showToast = useToast()
  const { cart, total, error, isLoading,refresh } = UseCart();

    const updateSummary = () =>{
      const total = cart.reduce((acc, product) => {
        return acc + product.price * product.cart_Quantity;
      }, 0);
  
      console.log(total)
      // setTotalPrice((prev)=>prev + total)
      useProductStore.setState({key: key + 1})
      useProductStore.setState({totalCartPrice:total})
    }

    const initializeOrder = async()=>{
      const orderCreated = await CreateOrder(storeId)
      if(orderCreated?.success){
        console.log(orderCreated?.order)
        // await clearCart()
        setOrder(orderCreated.order)
        return sheetRef.current?.open()

      }else{
        return showToast(orderCreated?.msg,false)
      }
    }

    const initializePayment = async()=>{
        // console.log(orderCreated?.order)
        // await clearCart()
        // setOrder(orderCreated.order)
        paystackWebViewRef.current?.startTransaction()
    }

    const payWithWallet = async()=>{
      sheetRef.current?.close()
      if(balance < totalPrice){
        return showToast('insufficient Balance',false)
      }
      // console.log({cart:cart,price:totalPrice,store :storeId,methode:'WALLET'})
      const orderPaid = await OrderUpdate(order?.id,'WALLET')
      console.log('wallet order',orderPaid)
      if(orderPaid?.success){
        console.log(orderPaid?.order)
        // await clearCart()
        setOrder(orderPaid.order)
        useAuthStore.setState({user: orderPaid.user})
        setView('success')
        
      }else{
        return showToast('payment failed',false)
      }
    }

    
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

  // useEffect(() => {
  //   // Load the cart when the component mounts
  //   const loadCart = async () => {
  //     setLoading(true)
  //     const data = await getCart(storeId);
  //     if(data?.success){
  //       setTotal(data.cartTotal)
  //       console.log('cart',data)
  //       // useProductStore.setState({totalCartPrice: data.cart?.cartTotal})
  //       useProductStore.setState({cart: data.products})

  //       setCart(data.cart?.products)
  //       return setLoading(false)
  //     }else{
  //       showToast(data?.msg,false)
  //       return setLoading(false)
  //     }
      
  //   };

  //   loadCart();
  // }, [refreshing]);

  useEffect(() => {
    refresh()
  }, [refreshing]);


  const removeProduct = async(product:Product)=>{
    
    const data = await removeFromCart({
      id: product.id,
      storeId: product.storeId,
      name: product.name,
      price: product.price,
      variants: product.variants,
      quantity: product.quantity,
      images: product.images,
    });
    refresh()

    

  }

  const handleIncreaseQuantity = async (product:Product) => {
    // setKey(key+1)
    const data = await increaseQuantity({
      id: product.id,
      storeId: product.storeId,
      name: product.name,
      price: product.price,
      variants: product.variants,
      quantity: product.quantity,
      images: product.images,
    });
    refresh()
    // setKey(key+1)
    if(data?.success){
      
      // setTotal(data.cartTotal)
      // console.log('cart',data)
      
      // useProductStore.setState({key: data.cart?.products.length})
      // return setCart(data.cart?.products)
      // return useProductStore.setState({cart: data.cart?.products})

    }
  };

  const handleDecreaseQuantity = async (product:Product) => {
    const data = await reduceQuantity({
      id: product.id,
      storeId: product.storeId,
      name: product.name,
      price: product.price,
      variants: product.variants,
      quantity: product.quantity,
      images: product.images,
    });
     refresh()
    // setKey(key+1)
    if(data?.success){
      
      // setTotal(data.cartTotal)
      // console.log('cart',data)
      
      // useProductStore.setState({key: data.cart?.products.length})
      // return setCart(data.cart?.products)
      // return useProductStore.setState({cart: data.cart?.products})

    }
  };

  

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <CartCard 
    item={item}
    remove={(product:Product)=>removeProduct(product)} 
    onIncreaseQuantity={(product:Product)=>handleIncreaseQuantity(product)}
    onDecreaseQuantity={(product:Product)=>handleDecreaseQuantity(product)}
    />
  );


  if(isLoading){
    return (
        <SafeAreaView className='flex-1 bg-[#fffff]'>

          <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

            <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
              <BackIcon/>
            </TouchableOpacity>

            <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
              Cart
            </SoraText>

          </View>

          <View className='w-full pt-[40px] flex flex-col items-center justify-center gap-y-4 px-6'>

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


        </SafeAreaView>
          
    )
  }

  if(cart.length){

    return (
      <>
      {view == 'cart' ? <SafeAreaView className='flex-1 bg-[#fffff]'>
        {/* header */}
        
        <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

          <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
            <BackIcon/>
          </TouchableOpacity>

          <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
            Cart
          </SoraText>

        </View>

        {/* body */}
        <View className='px-6 bg-white flex-1 rounded-t-3xl py-6 gap-y-5'>

          <Paystack
            paystackKey="pk_test_db9973cb80c3b6b6a52824a8a30dd5e53c8390e8"
            billingEmail="admin@helloqaya.com"
            amount={total}
            refNumber={order?.id}
            channels={["bank","card","ussd","bank_transfer","qr","mobile_money"]}
            onCancel={(e) => {
              // handle response here
              console.log(e)
            }}
            onSuccess={async(res) => {
              // handle response here
              console.log(res)
              const result = await OrderUpdate(res.transactionRef?.reference,'TRANSFER')
              console.log(result)
              setView('success')

            }}
            ref={paystackWebViewRef}
          />

          <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >

            <View className=' flex flex-col items-start'>

                <FlatList
                  className='w-full'
                      data={cart}
                      numColumns={1}
                      keyExtractor={(item) => item.id}
                      renderItem={renderItem}
                />

              </View>

            

          </ScrollView>

          <Pressable onPress={() => initializeOrder()} className='bg-[#FF2E42] flex flex-row items-center justify-center gap-x-2 py-4 px-4 rounded-2xl'>
              <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                Pay Now
              </SansText>
              <SoraText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                (₦{formatNumber(total)})
              </SoraText>
          </Pressable>

        </View>

        <BottomSheet style={{backgroundColor:'#FFFFFF'}} height={hp('46%')} ref={sheetRef} hideDragHandle={true}	>

          <View className='px-6 my-6 gap-y-8'>

            <View className='flex flex-row items-center justify-between'>

              <SoraText style={{fontSize:18,color:'#080708',fontWeight:'600'}}>
                Payment
              </SoraText>
              <TouchableOpacity onPress={()=>(sheetRef.current?.close())} className=''>
                <CloseIcon/>
              </TouchableOpacity>

            </View>

            <Payment payWithTransfer={()=> initializePayment()} payWithWallet={()=> payWithWallet()} />


          </View>
                
        </BottomSheet>


      </SafeAreaView>:<></>}



      {view == 'success' ? <SafeAreaView className='flex-1 bg-[#fffff]'>


        <View className='px-6 bg-white  flex-1 items-start justify-center rounded-t-3xl py-6 gap-y-8'>

          <View className='w-full flex flex-col items-center justify-center mb-16'>

            <Image
              source={require('@/assets/images/mark.png')}
              style={{resizeMode:'cover'}}
              className='mb-3'
            />

            <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
              Payment Made Successfully
            </SoraText>

            <SansText className='text-center mt-2' style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Now, let’s jump the queue</SansText>
          </View>

          <Pressable onPress={async() => { setView('cart'); router.push({ pathname: '/order', params: { orderId: order?.id } })}} className=' absolute bottom-12 left-6 w-full bg-[#FF2E42] mx-auto flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
            <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
              View Order
            </SansText>
          </Pressable>

        </View>

      </SafeAreaView> :<></>}

      </>
    )

  }

  if(!cart.length){
    return (
       <>
       <SafeAreaView className='flex-1 bg-[#fffff]'>

          <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

            <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
              <BackIcon/>
            </TouchableOpacity>

            <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
              Cart
            </SoraText>

          </View>


          <View className='px-6 bg-white  flex-1 items-start justify-center rounded-t-3xl py-6 gap-y-8'>

            <View className='w-full flex flex-col items-center justify-center mb-16'>

              <EmptyCart />

              <SansText className='text-center mt-2' style={{fontSize:16,color:'#686767',fontWeight:'400'}}>You have no items added yet. Add items to your cart and it’ll appear here</SansText>
            </View>

            <Pressable onPress={() => {router.push('/home')}} className=' absolute bottom-12 left-6 w-full bg-[#FF2E42] mx-auto flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
              <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                Continue Shopping
              </SansText>
            </Pressable>

          </View>

        </SafeAreaView>

       </>
    )
  }

  
}

export default Cart
