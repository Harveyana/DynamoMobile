import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, SectionList, TouchableOpacity, View, RefreshControl } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import Svg, { Path,Rect,Circle } from "react-native-svg"

// import { Image } from 'expo-image';
import CartIcon from '@/components/icons/cartIcon';
import BellIcon from '@/components/icons/bellIcon';

import AddToCart from '@/components/addToCart';
import { useNavigation,useRouter } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useRef,useState, useEffect } from 'react';

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import useToast from '@/constants/useToast';
import { Skeleton } from '@rneui/themed';

import MenuIcon, { MenuIcon2 } from '@/components/icons/menuIcon';
import { useProductStore } from '@/store/useProduct';
import NotificationFilter from '@/components/notificationfilter';
import { formatDate,truncateString } from '@/constants/utils';
import EmptyWallet from '@/components/icons/emptyWallet';
import TopupIcon from '@/components/icons/topUpIcon';
import ProductIcon from '@/components/icons/productIcon';
import StoreIcon from '@/components/icons/storeIcon';
import OrderIcon from '@/components/icons/orderIcon';
import GeneralIcon from '@/components/icons/generalIcon';





const Notifications = () => {
  
  const [Notifications, setNotifications] = useState<any[]>([]);

  const [Notification, setNotification] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const getNotifications = useProductStore((state:any) => state.getNotifications)
  const StoreId = useProductStore((state:any) => state.Store_id)
  const filterNotifications = useProductStore((state:any) => state.filterNotifications)
  // const loading = useProductStore((state:any) => state.loading)
  const [loading, setLoading] = useState(false)



  const sheetRef = useRef<BottomSheetMethods>(null);
  const sheetRef2 = useRef<BottomSheetMethods>(null);

  const router = useRouter()

  const viewNotification = (notification:any)=>{
    setNotification(notification)
    sheetRef2.current?.open()
  }
  const groupByDate = (notifications:any) => {
    return notifications.reduce((groupedNotifications:any, notification:any) => {
      const dateKey = formatDate(notification.createdAt);
      if (!groupedNotifications[dateKey]) {
        groupedNotifications[dateKey] = [];
      }
      groupedNotifications[dateKey].push(notification);
      return groupedNotifications;
    }, {});
  };

  const groupedNotifications = groupByDate(Notifications);

  const getfilteredNotifications = async(
    type?:string,
    startDate?:string,
    endDate?:string,
  )=>{
    setLoading(true)
    try {
      
      sheetRef.current?.close()
      const results = await filterNotifications(
        20,
       type,
       startDate,
       endDate
      );

      if (results?.success) {
        setNotifications(results?.notifications);
        return setLoading(false)
      }

    } catch (error) {
      console.error('Error fetching filters:', error);
    }finally {
      setLoading(false)
    }
    
  }

  const showToast = useToast()
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {

    const fetchNotifications = async () => {
      setLoading(true)
      const data = await getNotifications(20);
      if(data.success){
        setNotifications(data.notifications)
        return setLoading(false)
      }else{
        showToast(data?.msg,false)
        return setLoading(false)
      }
      
    };

    fetchNotifications();
  }, [refreshing]);


  const notificationSections = Notifications.map((notification) => ({
    title: formatDate(notification.createdAt),
    data: [notification],
  }));

  if(loading){
    return (
        <SafeAreaView className='flex-1 bg-[#fffff]'>

          <View style={{marginTop: hp('8%')}} className='relative flex-row items-center justify-between px-6'>

            <TouchableOpacity onPress={()=>(router.back())} className='flex flex-col gap-y-1'>
              <BackIcon/>
            </TouchableOpacity>

            <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
              Notifications
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
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      {/* header */}
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-between px-6'>

        <TouchableOpacity onPress={()=>(router.back())} className='flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
          Notifications
        </SoraText>

        <TouchableOpacity onPress={()=>{sheetRef.current?.open()}} className=''>
          <MenuIcon2/>
        </TouchableOpacity>

      </View>

      {/* body */}
      <View className='bg-white flex-1 rounded-t-3xl py-6 gap-y-5'>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >

          {/* <View className=' flex flex-col items-start'>


              {notificationSections.length ? <SectionList
                    className='w-full'
                    sections={notificationSections}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={()=>{viewNotification(item)}} className='w-[90%] my-2 mx-auto flex flex-row items-center justify-center'>
                          <View className='w-full bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-4'>
                                
                            <View className='w-fit flex flex-row items-center justify-start gap-x-2'>

                              {item.type == 'TOPUP' && <TopupIcon/>}
                              {item.type == 'PRODUCT' && <ProductIcon/>}
                              {item.type == 'STORE' &&  <StoreIcon/>}
                              {item.type == 'ORDER' && <OrderIcon/>}
                              {item.type == 'GENERAL' && <GeneralIcon/>}

                              <View className='flex flex-col items-start justify-center w-[85%]'>
                                <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                                 {item.title}
                                </SoraText>
                                <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                                  {item?.content}
                                </SansText>
                              </View>

                            </View>

                          
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
              />: <></>}

              {!notificationSections.length && <View className='w-full px-6 bg-white  flex-1 items-center justify-center rounded-t-3xl py-6 gap-y-8'>

                <View className='w-full flex flex-col items-center justify-center mb-16'>

                  <EmptyWallet />

                  <SansText className='text-center mt-2' style={{fontSize:16,color:'#686767',fontWeight:'400'}}>You have no notification yet.</SansText>
                </View>

              </View>}

          </View> */}

          <View className='w-full flex flex-col items-start'>
            {Notifications.length ? (
              Object.keys(groupedNotifications).map((date) => (
                <View className='w-full border-b-8 border-gray-200  my-4' key={date}>
                  <SoraText className='pl-6' style={{ fontSize: 14, color: 'black', marginVertical: 10 }}>
                    {date}
                  </SoraText>
                  <FlatList
                   className='mx-auto'
                    data={groupedNotifications[date]}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => viewNotification(item)}
                        className='w-[93%] my-2 mx-auto flex flex-row items-center justify-center'
                      >
                        <View className='w-full bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-4'>
                          <View className='w-fit flex flex-row items-center justify-start gap-x-2'>
                            {item.type === 'TOPUP' && <TopupIcon />}
                            {item.type === 'PRODUCT' && <ProductIcon />}
                            {item.type === 'STORE' && <StoreIcon />}
                            {item.type === 'ORDER' && <OrderIcon />}
                            {item.type === 'GENERAL' && <GeneralIcon />}
                            <View className='flex flex-col items-start justify-center w-[85%]'>
                              <SoraText numberOfLines={1} style={{ fontSize: 14, color: '#080708', fontWeight: '600' }}>
                                {item.title}
                              </SoraText>
                              <SansText numberOfLines={1} style={{ fontSize: 12, color: '#686767', fontWeight: '400' }}>
                                {item?.content}
                              </SansText>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              ))
            ) : (
              <View className='w-full px-6 bg-white  flex-1 items-center justify-center rounded-t-3xl py-6 gap-y-8'>
                <View className='w-full flex flex-col items-center justify-center mb-16'>
                  <EmptyWallet />
                  <SansText className='text-center mt-2' style={{ fontSize: 16, color: '#686767', fontWeight: '400' }}>
                    You have no notifications yet.
                  </SansText>
                </View>
              </View>
            )}
          </View>
          

        </ScrollView>

        <BottomSheet disableKeyboardHandling={true} style={{backgroundColor:'#FFFFFF'}} height={'100%'} ref={sheetRef} hideDragHandle={true}	>

          <View style={{marginTop: hp('5%')}} className='flex relative flex-row items-center justify-between px-6'>

            <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
              Filter
            </SoraText>

            <TouchableOpacity onPress={()=>(sheetRef.current?.close())} className='flex flex-col gap-y-1'>
              <CloseIcon/>
            </TouchableOpacity>

          </View>

          <NotificationFilter OnUpdate={(payload)=>{
              getfilteredNotifications(
                payload.type,
                payload.startDate,
                payload.endDate,
              )}} 
          />


        </BottomSheet>

        <BottomSheet disableKeyboardHandling={true} style={{backgroundColor:'white'}} height={'60%'} ref={sheetRef2} hideDragHandle={true}	>

          { Notification && <>
          
            <View style={{marginTop: hp('5%')}} className='flex relative flex-row items-center justify-between px-6'>

              <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
                {Notification.title}
              </SoraText>

              <TouchableOpacity onPress={()=>(sheetRef2.current?.close())} className='flex flex-col gap-y-1'>
                <CloseIcon/>
              </TouchableOpacity>

            </View>

            <View className='w-full flex flex-col gap-y-3 items-start justify-start px-6 mt-6'>

              <View className=' flex flex-col items-start justify-center'>
                <SansText style={{fontSize:16,color:'#100F0F',fontWeight:'400'}}>
                  {Notification.content }
                </SansText>
                <SansText style={{fontSize:16,color:'#100F0F',fontWeight:'400'}}>
                  {formatDate(Notification.createdAt) }
                </SansText>
              </View>

            </View>
          
          </>}

          
    
        </BottomSheet>

      </View>

    </SafeAreaView>
  )
}

export default Notifications