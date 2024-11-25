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
import { Skeleton } from '@rneui/themed';
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






const Transactions = () => {
  const [search, setSearch] = useState('')
  
  const sheetRef = useRef<BottomSheetMethods>(null);
  const sheetRef2 = useRef<BottomSheetMethods>(null);

  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false);
  const [Transactions, setTransactions] = useState<any[]>([]);

  const [Transaction, setTransaction] = useState<any>(null);


  const getBalance = useProductStore((state:any) => state.getWalletBalance)
  const getTransactions = useProductStore((state:any) => state.getTransactions)
  const StoreId = useProductStore((state:any) => state.Store_id)
  const filterTransactions = useProductStore((state:any) => state.filterTransactions)
  // const loading = useProductStore((state:any) => state.loading)
  const [loading, setLoading] = useState(false)


  const showToast = useToast()

  const viewTransaction = (transaction:any)=>{
    setTransaction(transaction)
    sheetRef2.current?.open()
  }

  const getfilteredTransactions = async (
    type?:string,
    status?:string,
    startDate?:string,
    endDate?:string,
    ) => {
      setLoading(true)
    try {
      sheetRef.current?.close()
      console.log('StoreId:', StoreId);
      if (!StoreId) return;
      const results = await filterTransactions(
        20,
       type,
       status,
       startDate,
       endDate
      );

      if (results?.success) {
        console.log(results?.transactions)
        setTransactions(results?.transactions);
        return setLoading(false)
      }

    } catch (error) {
      console.error('Error fetching filters:', error);
    } finally {
      setLoading(false)
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  useEffect(() => {

    const fetchTransactions = async () => {
      setLoading(true)
      const data = await getTransactions(20);
      if(data.success){
        setTransactions(data.transactions)
        return setLoading(false)
      }else{
        showToast(data?.msg,false)
        return setLoading(false)
      }
      
    };

    fetchTransactions();
  }, [refreshing]);

  

  if(loading){
    return (
        <SafeAreaView className='flex-1 bg-[#fffff]'>

          <View style={{marginTop: hp('8%')}} className='relative flex-row items-center justify-between px-6'>

            <TouchableOpacity onPress={()=>(router.back())} className='flex flex-col gap-y-1'>
              <BackIcon/>
            </TouchableOpacity>

            <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
              <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
               Transactions
              </SoraText>
            </SoraText>

            <TouchableOpacity onPress={()=>{sheetRef.current?.open()}} className=''>
              <MenuIcon2/>
            </TouchableOpacity>

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


  return (
    // <ImageBackground source={require('@/assets/images/bgHome.png')} style={styles.image}>
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      {/* header */}
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-between px-6'>

        <TouchableOpacity onPress={()=>(router.back())} className=' flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
         Transactions
        </SoraText>

        <TouchableOpacity onPress={()=>{sheetRef.current?.open()}} className=''>
          <MenuIcon2/>
        </TouchableOpacity>

      </View>

      {/* body */}
      <View className='bg-white flex-1 rounded-t-3xl pt-6 gap-y-5'>
      
        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className='flex flex-col items-start px-6'>

            {Transactions.length ? <FlatList
                className='w-full'
                    data={Transactions}
                    numColumns={1}
                    renderItem={({item}) => (

                      <TouchableOpacity onPress={()=>{viewTransaction(item)}} className='w-full my-2 '>
                          <View className=' bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 pl-4 pr-6'>
                                
                            <View className='w-[80%] flex flex-row items-center justify-start gap-x-2'>
            
                              {item.organisation ? <Image
                                className='rounded-xl bg-transparent w-8'
                                style={[{aspectRatio:1,resizeMode:'cover'}]}
                                source={{uri:item.organisation.logo}}
                              />: <TopupIcon/>
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
            />

            : 
              <View className='w-full px-6 bg-white  flex-1 items-center justify-center rounded-t-3xl py-6 gap-y-8'>

                <View className='w-full flex flex-col items-center justify-center mb-16'>

                  <EmptyWallet />

                  <SansText className='text-center mt-2' style={{fontSize:16,color:'#686767',fontWeight:'400'}}>You have no transactions yet.  Make you first transaction today</SansText>
                </View>

              </View>
            }


          </View>

          

        </ScrollView>

        <BottomSheet disableKeyboardHandling={true} style={{backgroundColor:'white'}} height={'100%'} ref={sheetRef} hideDragHandle={true}	>

          <View style={{marginTop: hp('5%')}} className='flex relative flex-row items-center justify-between px-6'>

            <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
              Filter
            </SoraText>

            <TouchableOpacity onPress={()=>(sheetRef.current?.close())} className='flex flex-col gap-y-1'>
              <CloseIcon/>
            </TouchableOpacity>

          </View>

          <TransactionFilter OnUpdate={(payload)=>{
              getfilteredTransactions(
                payload.type,
                payload.status,
                payload.startDate,
                payload.endDate,
              )}} 
          />
    
        </BottomSheet>

        <BottomSheet disableKeyboardHandling={true} style={{backgroundColor:'white'}} height={'60%'} ref={sheetRef2} hideDragHandle={true}	>

          <View style={{marginTop: hp('5%')}} className='flex relative flex-row items-center justify-between px-6'>

            <QayaIcon2/>

            <TouchableOpacity onPress={()=>(sheetRef2.current?.close())} className='flex flex-col gap-y-1'>
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
        

      </View>




    </SafeAreaView>
    // </ImageBackground>
  )
}

export default Transactions
