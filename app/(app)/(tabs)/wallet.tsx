import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, RefreshControl } from 'react-native'
import Svg, { Path,Rect,Circle } from "react-native-svg"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';

import { useNavigation,useRouter } from 'expo-router';


import { SansText, SoraText, SansBold } from '@/components/StyledText';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Skeleton } from '@rneui/themed';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import BackIcon from '@/components/icons/backIcon'; 

import { useProductStore } from '@/store/useProduct';
import { useAuthStore } from '@/store/useAuth';
import useToast from '@/constants/useToast';
import { formatNumber } from '@/constants/cartStorage';
import SkeletonLoader from '@/components/skeleton';
import EmptyCart from '@/components/icons/emptyCart';
import EmptyWallet from '@/components/icons/emptyWallet';
import CloseIcon, { CloseIcon2 } from '@/components/icons/closeIcon';
import TopupIcon from '@/components/icons/topUpIcon';
import QayaIcon2 from '@/components/icons/qayaIcon2';
import EyeIconSlash from '@/components/icons/eyeIconSlash';





const Account = () => {

  const sheetRef = useRef<BottomSheetMethods>(null);
  const navigation = useNavigation();

  const router = useRouter()

  const [currency, setCurrency] = useState('NGN')
  const [Transactions, setTransactions] = useState<any[]>([]);
  const [Transaction, setTransaction] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [hideBalance, toggleHideBalance] = useState(false);
  const [loading, setLoading] = useState(false)


  const getBalance = useProductStore((state:any) => state.getWalletBalance)
  const getTransactions = useProductStore((state:any) => state.getTransactions)

  const balance = useAuthStore((state:any)=> state.walletBalance)
  const user = useAuthStore((state:any) => state.user)


  const showToast = useToast()
  const viewTransaction = (transaction:any)=>{
    setTransaction(transaction)
    sheetRef.current?.open()
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);



  useEffect(() => {
    // Load the cart when the component mounts
    // const fetchBalance = async () => {
    //   const data = await getBalance();
    //   if(data.success){
    //     setCurrency(data.wallet.currency)
    //     return useAuthStore.setState({ walletBalance: Number(data.wallet.balance)})
    //   }else{
    //     return Toast.show(data?.msg,toastConfig)
    //   }
      
    // };

    const fetchTransactions = async () => {
      setLoading(true)
      const data = await getTransactions(10);
      if(data.success){
        setTransactions(data.transactions)
        return setLoading(false)
      }else{
        showToast(data?.msg,false)
        return setLoading(false)
      }
      
    };

    fetchTransactions();
    // fetchBalance();
  }, [refreshing]);




  return (
    // <ImageBackground source={require('@/assets/images/bgHome.png')} style={styles.image}>
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      {/* header */}
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

        <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
          Wallet
        </SoraText>

      </View>

      {/* body */}
      <View className='px-6 bg-white flex-1 rounded-t-3xl py-6 gap-y-5'>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
           
          <View className='w-full flex flex-col items-center justify-center bg-[#080708] border border-black rounded-2xl px-7 py-6 gap-y-6 '>

            <View className='flex flex-row gap-x-2 items-center justify-center'>

              {user && !hideBalance && <SoraText numberOfLines={1} style={{fontSize:20,color:'#FFFFFF',fontWeight:'600'}}>
               {currency} {formatNumber(user.wallet?.balance)}
              </SoraText>}

              { user && hideBalance && <SoraText numberOfLines={1} style={{fontSize:20,color:'#FFFFFF',fontWeight:'600'}}>
                ******
              </SoraText>}

              {!hideBalance && <TouchableOpacity onPress={()=>{toggleHideBalance(!hideBalance)}} className='mt-1'>
                <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M12.4998 4.40039C17.3526 4.40039 21.39 7.89239 22.2369 12.5004C21.3909 17.1084 17.3526 20.6004 12.4998 20.6004C7.647 20.6004 3.6096 17.1084 2.7627 12.5004C3.6087 7.89239 7.647 4.40039 12.4998 4.40039ZM12.4998 18.8004C14.3353 18.8 16.1163 18.1765 17.5514 17.032C18.9864 15.8876 19.9904 14.2898 20.3991 12.5004C19.9889 10.7124 18.9842 9.11639 17.5494 7.97341C16.1145 6.83043 14.3343 6.20807 12.4998 6.20807C10.6653 6.20807 8.88512 6.83043 7.45023 7.97341C6.01535 9.11639 5.01069 10.7124 4.6005 12.5004C5.00918 14.2898 6.0132 15.8876 7.44823 17.032C8.88325 18.1765 10.6643 18.8 12.4998 18.8004ZM12.4998 16.5504C11.4257 16.5504 10.3955 16.1237 9.63601 15.3642C8.87649 14.6047 8.4498 13.5745 8.4498 12.5004C8.4498 11.4263 8.87649 10.3961 9.63601 9.63661C10.3955 8.87709 11.4257 8.45039 12.4998 8.45039C13.5739 8.45039 14.6041 8.87709 15.3636 9.63661C16.1231 10.3961 16.5498 11.4263 16.5498 12.5004C16.5498 13.5745 16.1231 14.6047 15.3636 15.3642C14.6041 16.1237 13.5739 16.5504 12.4998 16.5504ZM12.4998 14.7504C13.0965 14.7504 13.6688 14.5133 14.0908 14.0914C14.5127 13.6694 14.7498 13.0971 14.7498 12.5004C14.7498 11.9037 14.5127 11.3314 14.0908 10.9094C13.6688 10.4874 13.0965 10.2504 12.4998 10.2504C11.9031 10.2504 11.3308 10.4874 10.9088 10.9094C10.4868 11.3314 10.2498 11.9037 10.2498 12.5004C10.2498 13.0971 10.4868 13.6694 10.9088 14.0914C11.3308 14.5133 11.9031 14.7504 12.4998 14.7504Z" fill="white"/>
                </Svg>
              </TouchableOpacity>}

              { hideBalance && <TouchableOpacity onPress={()=>{toggleHideBalance(!hideBalance)}} className='mt-1'>
                <EyeIconSlash />
              </TouchableOpacity>}

            </View>

            <TouchableOpacity onPress={()=>router.push('/fundWallet')} className='w-full flex bg-white flex-row items-center justify-center rounded-2xl'>
              <SansBold className='my-2' style={{fontSize:16,color:'#080708',fontWeight:'500'}}>
                Fund Wallet
              </SansBold>
            </TouchableOpacity>

          </View>


          <View className=' mt-6 flex flex-row items-center justify-between'>
              <SoraText style={{fontSize:18,color:'black'}}>
                Transactions
              </SoraText>

              <TouchableOpacity onPress={()=>{router.push('/transactions')}} className='flex flex-row items-center justify-center gap-x-3'>
                <SansText style={{fontSize:14,color:'#3626A7',fontWeight:'600'}}>
                  See all
                </SansText>
                <FontAwesome name="chevron-right" size={11} color="#3626A7" className='mt-1' />
              </TouchableOpacity>
          </View>


          {/* transactions */}


          <View className=' flex flex-col items-start mt-6'>


          {Transactions.length ? <FlatList
              className='w-full'
                  data={Transactions}
                  numColumns={1}
                  renderItem={({item}) => (

                    <TouchableOpacity onPress={()=>{viewTransaction(item)}} className='w-full my-2 '>
                        <View className=' bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 pl-4 pr-6'>
                              
                          <View className='w-[80%] flex flex-row items-center justify-start gap-x-2'>
          
                            {item.store ? <Image
                              className='rounded-xl bg-transparent w-8'
                              style={[{aspectRatio:1,resizeMode:'cover'}]}
                              source={{uri:item.store.organisation.logo}}
                            />:
                             <TopupIcon/>
                            }
          
                            <View className='flex flex-col items-start justify-center w-[85%]'>
                              <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                                {item.description}
                              </SoraText>
                              <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                                {item.createdAt.slice(0,10)}
                              </SansText>
                            </View>
          
                          </View>
          
                          <View className='flex flex-col items-start justify-center'>
                              <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                                ₦ {formatNumber(item.amount)}
                              </SoraText>
          
                              <SansText numberOfLines={1} style={{fontSize:9,color:'#38C793',fontWeight:'400'}}>
                                {item.status}
                              </SansText>
          
                          </View>
          
                        </View>
          
                      </TouchableOpacity>
                         
                  )}
                  // ItemSeparatorComponent={()=><View className='mx-2'></View>}
                  contentContainerStyle={[{columnGap:16,marginTop:4 }]}
          />:<></>}

          {!Transactions.length && !loading ? <View className='w-full px-6 bg-white  flex-1 items-center justify-center rounded-t-3xl py-6 gap-y-8'>

                <View className='w-full flex flex-col items-center justify-center mb-16'>

                  <EmptyWallet />

                  <SansText className='text-center mt-2' style={{fontSize:16,color:'#686767',fontWeight:'400'}}>You have no transactions yet.  Make you first transaction today</SansText>
                </View>

            </View>:<></>
          }

          {loading ? <View className='w-full pt-[40px] flex flex-col items-center justify-center gap-y-4'>

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

          </View>:<></>}


          </View>

          

        </ScrollView>

      </View>

      <BottomSheet disableKeyboardHandling={true} style={{backgroundColor:'#FFFFFF'}} height={'60%'} ref={sheetRef} hideDragHandle={true}	>

          <View style={{marginTop: hp('5%')}} className='flex relative flex-row items-center justify-between px-6'>

            <QayaIcon2/>

            <TouchableOpacity onPress={()=>(sheetRef.current?.close())} className='flex flex-col gap-y-1'>
              <CloseIcon/>
            </TouchableOpacity>

          </View>

          { Transaction && <View className='w-full flex flex-col gap-y-3 items-start justify-start px-6 mt-6'>

            <View className=' flex flex-col items-start justify-center'>
              <SansText style={{fontSize:12,color:'#686767',fontWeight:'500'}}>
                Transaction Type 
              </SansText>
              <SansText style={{fontSize:16,color:'#100F0F',fontWeight:'400'}}>
                {Transaction.type}  
              </SansText>
            </View>

            <View className=' flex flex-col items-start justify-center'>
              <SansText style={{fontSize:12,color:'#686767',fontWeight:'500'}}>
                Reference Number 
              </SansText>
              <SansText style={{fontSize:16,color:'#100F0F',fontWeight:'400'}}>
                {Transaction.reference}  
              </SansText>
            </View>

            <View className=' flex flex-col items-start justify-center'>
              <SansText style={{fontSize:12,color:'#686767',fontWeight:'500'}}>
                Payment Date 
              </SansText>
              <SansText style={{fontSize:16,color:'#100F0F',fontWeight:'400'}}>
                {Transaction.createdAt}
              </SansText>
            </View>

            <View className=' flex flex-col items-start justify-center'>
              <SansText style={{fontSize:12,color:'#686767',fontWeight:'500'}}>
               Description 
              </SansText>
              <SansText style={{fontSize:16,color:'#100F0F',fontWeight:'400'}}>
               {Transaction.description}
              </SansText>
            </View>

            <View className=' flex flex-col items-start justify-center'>
              <SansText style={{fontSize:12,color:'#686767',fontWeight:'500'}}>
               Amount 
              </SansText>
              <SansText style={{fontSize:16,color:'#100F0F',fontWeight:'400'}}>
               ₦{Transaction.amount} 
              </SansText>
            </View>

            <View className=' flex flex-col items-start justify-center'>
              <SansText style={{fontSize:12,color:'#686767',fontWeight:'500'}}>
               Status 
              </SansText>
              <SansText style={{fontSize:16,color: Transaction.status == 'SUCCESSFUL' ? '#38C793' :Transaction.status =='PENDING' ? '#F17B2C': '#FF2E42',fontWeight:'400'}}>
               {Transaction.status}
              </SansText>
            </View>

          </View>}
    
      </BottomSheet>




    </SafeAreaView>
    // </ImageBackground>
  )
}

export default Account
