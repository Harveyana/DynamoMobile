import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, RefreshControl } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import { useNavigation,useRouter } from 'expo-router';
import { Overlay } from '@rneui/themed';



// import { Image } from 'expo-image';
import CartIcon from '@/components/icons/cartIcon';
import BellIcon from '@/components/icons/bellIcon';

import AddToCart from '@/components/addToCart';

import { SansText, SoraText } from '@/components/StyledText';
import Banner from '@/components/banner';
import React, { useCallback, useEffect, useRef,useState } from 'react';

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon from '@/components/icons/closeIcon';
// import getLocation from '@/constants/useLocation';
import { useProductStore } from '@/store/useProduct';
import Topdeals from '@/components/topdeals';
import Stores from '@/components/stores';
import RateProducts from '@/components/rateProducts';






const Index = () => {

  // const { location, errorMsg } = useLocation();
  const [search, setSearch] = useState('')
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter()

  const loading = useProductStore((state:any) => state.loading)
  const storeName = useProductStore((state:any) => state.Store_Name)
  const StoreId = useProductStore((state:any) => state.Store_id)

  
  const sheetRef = useRef<BottomSheetMethods>(null);
  const reviewSheetRef = useRef<BottomSheetMethods>(null);

  const navigation = useNavigation();

  const showTabBar = () => {
    navigation.setOptions({
      tabBarStyle: { 
        display: 'flex',
        backgroundColor: '#FAFAFA',
        height:70,
        paddingBottom:10,
        paddingTop:10
      },      
    });
  };

  const hideTabBar = () => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' }
    });
  };

  const openBottomSheet = () => {
    // hideTabBar()
    sheetRef.current?.open();
  };

  const closeBottomSheet = () => {
    // showTabBar()
    sheetRef.current?.close();
  };

  const openReviewSheet = () => {
    // hideTabBar()
    reviewSheetRef.current?.open();
  };

  const closeReviewSheet = () => {
    // showTabBar()
    reviewSheetRef.current?.close();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  

  useEffect(() => { 
    if(StoreId) return
    openBottomSheet();
    // console.log('your location is',location)
  }, [refreshing]); 


  const DATA = [
    {
      id: '1',
      title: 'Food',
    },
    {
      id: '2',
      title: 'Fashion',
    },
    {
      id: '3',
      title: 'Health',
    },
    {
      id: '4',
      title: 'Electronics',
    },
    {
      id: '5',
      title: 'Automobile',
    },
  ];

  

  return (
    <ImageBackground source={require('@/assets/images/bgHome.png')} style={styles.image}>
    <SafeAreaView className='flex-1'>
      {/* header */}
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className=' flex-row items-center justify-between px-6'>
        {/* <Text style={styles.text}>Home</Text> */}
        <TouchableOpacity onPress={() => openBottomSheet()} className=' flex flex-col gap-y-1'>

          <SansText style={{fontSize:14}} className='text-white'>
           You are in
          </SansText>

          <View className='flex-row items-center justify-center gap-x-2'>
            <SansText style={{fontSize:16}} className='text-white truncate'>
              {/* Shoprite Ikeja */}
              {storeName == "" ? "Select Mall": storeName}
            </SansText>
            <FontAwesome name="chevron-down" size={11} color="white" />
          </View>

        </TouchableOpacity>

        <View className='flex flex-row gap-x-3 items-center justify-center'>

          <TouchableOpacity onPress={()=>{router.push('/cart')}}   className='bg-white rounded-full p-1.5'>
            <CartIcon/>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{router.push('/notifications')}} className='bg-white rounded-full p-2'>
            <BellIcon />
          </TouchableOpacity>
            
        </View>
      </View>

      {/* body */}
      <View className='bg-white flex-1 rounded-t-3xl pt-6 gap-y-5'>

        <View className='px-6 pt-1'>
          <TextInput
            onPressIn={()=>{router.push('/search')}}

            className='border border-[#CDD0D5] px-4 py-2 rounded-lg '
            onChangeText={(value)=>{setSearch(value)}}
            value={search}
            placeholder="search products here"
            autoCapitalize='words'
          />
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
             <Banner />
          </View>
         
          <View className='px-4 mt-3 gap-y-3'>
            {/* <View className='px-1 flex flex-row items-center justify-between'>
              <SoraText style={{fontSize:18,color:'black'}}>
                Categories
              </SoraText>

              <TouchableOpacity onPress={()=>{router.push('/categories')}} className='flex flex-row items-center justify-center gap-x-3'>
                <SansText style={{fontSize:14,color:'#3626A7',fontWeight:'600'}}>
                  See all
                </SansText>
                <FontAwesome name="chevron-right" size={11} color="#3626A7" className='mt-1' />
              </TouchableOpacity>
            </View> */}

            {/* <FlatList
              data={DATA}
              renderItem={({item}) => 
                <View className='border border-gray-200 w-fit px-3 py-1.5 rounded-xl bg-[#FAFAFA]'>
                  <SansText style={{fontSize:14, color:'black', fontWeight:'400'}}>
                    {item.title}
                  </SansText>
                </View>
              }
              ItemSeparatorComponent={()=><View className='p-1'></View>}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            /> */}

            <View className='px-1 flex flex-row items-center justify-between'>
              <SoraText style={{fontSize:18,color:'black'}}>
                Top Deals
              </SoraText>

              <TouchableOpacity onPress={()=>{router.push('/products')}} className='flex flex-row items-center justify-center gap-x-3'>
                <SansText style={{fontSize:14,color:'#3626A7',fontWeight:'600'}}>
                  See all
                </SansText>
                <FontAwesome name="chevron-right" size={11} color="#3626A7" className='mt-1' />
              </TouchableOpacity>
            </View>

            <Topdeals/>


          </View>

          

        </ScrollView>

        <Overlay fullScreen isVisible={loading} overlayStyle={{backgroundColor:'none'}}>
        
          <Image
            source={require('@/assets/images/loader.gif')}
            style={{}}
            className='w-80 h-80 my-auto mx-auto'
          />

        </Overlay>
        
        <BottomSheet disableKeyboardHandling={true} style={{backgroundColor:'#FFFFFF'}} height={'80%'} ref={sheetRef} hideDragHandle={true} onOpen={()=>hideTabBar()} onClose={()=>showTabBar()}>

          <View className='flex flex-row items-center justify-between px-6 py-6 '>

            <SoraText style={{fontSize:18,color:'#080708',fontWeight:'600'}}>
              Select Mall
            </SoraText>

            <TouchableOpacity onPress={()=> closeBottomSheet()} className=''>
                <CloseIcon/>
            </TouchableOpacity>

          </View>
              

            <Stores close={()=>closeBottomSheet()} />
        </BottomSheet>

        <BottomSheet  disableKeyboardHandling={true} style={{backgroundColor:'#FFFFFF'}} height={'100%'} ref={reviewSheetRef} hideDragHandle={true} onOpen={()=>hideTabBar()} onClose={()=>showTabBar()}>

          <View className='flex flex-row items-center justify-between px-6 py-6 '>

            <SoraText style={{fontSize:18,color:'#080708',fontWeight:'600'}}>
              Reviews
            </SoraText>

            <TouchableOpacity onPress={()=> closeReviewSheet()} className=''>
                <CloseIcon/>
            </TouchableOpacity>

          </View>
              

            <RateProducts open={()=> openReviewSheet()}/>
        </BottomSheet>

      </View>


      


    </SafeAreaView>
    </ImageBackground>
  )
}

export default Index

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