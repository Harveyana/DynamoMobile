import { FlatList, Image, ImageBackground, SafeAreaView,KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';
import CartIcon from '@/components/icons/cartIcon';
import BellIcon from '@/components/icons/bellIcon';

import AddToCart from '@/components/addToCart';
import { useNavigation,useRouter } from 'expo-router';


import { SansText, SoraText } from '@/components/StyledText';
import Banner from '@/components/banner';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import useToast from '@/constants/useToast';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import MenuIcon from '@/components/icons/menuIcon';
import ProductFilter from '@/components/productfilter';
import { useProductStore } from '@/store/useProduct';
import SkeletonLoader from '@/components/skeleton';
import EmptyStores from '@/components/icons/emptyStores';







const Products = () => {
  const [search, setSearch] = useState('')
  
  const sheetRef = useRef<BottomSheetMethods>(null);

  const [Products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true)
  const getDeals = useProductStore((state:any) => state.getDeals)
  const filterProducts = useProductStore((state:any) => state.filterProducts)
  const StoreId = useProductStore((state:any) => state.Store_id)
  // const loading = useProductStore((state:any) => state.loading)

  const showToast = useToast()

  const router = useRouter()


  const getfilteredProducts = async (
    category?:string,
    startDate?:string,
    endDate?:string,
    minPrice?: string,
    maxPrice?: string) => {
    try {
      sheetRef.current?.close()
      console.log('StoreId:', StoreId);
      if (!StoreId) return;
      const results = await filterProducts(
        StoreId,
        20,
       category,
       startDate,
       endDate,
       parseInt(minPrice as string),
       parseInt(maxPrice as string)
      );

      if (results?.success) {
        // showToast(deals?.msg,true)
        return setProducts([...results?.products]);
      }

    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true)
    try {
      console.log('StoreId:', StoreId);
      if (!StoreId) return;
      const deals = await getDeals(StoreId, 20);
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
    }
  };



  
  useEffect(() => {
    fetchProducts();
  }, [StoreId]);
  

  if(loading){

    return (
      <SafeAreaView className='flex-1 bg-[#fffff]'>

        <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

          <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
            <BackIcon/>
          </TouchableOpacity>

          <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
            Products
          </SoraText>

        </View>

        <View className='items-center bg-white flex-1 rounded-t-3xl pt-6 gap-y-5'>

          <View className='px-6 pt-1 flex flex-row gap-x-2'>
            <TextInput
              onPressIn={()=>{router.push('/search')}}
              className='border border-[#CDD0D5] px-4 py-2 rounded-lg w-[84%]'
              onChangeText={(value)=>{setSearch(value)}}
              value={search}
              placeholder="search products here"
              autoCapitalize='words'
            />
            <TouchableOpacity onPress={()=>{sheetRef.current?.open()}} className=''>
              <MenuIcon/>
            </TouchableOpacity>

          </View>
  
          <SkeletonLoader/>
  
        </View>

      </SafeAreaView>
    
    )
  
  }

  if(!Products.length){

    return (
      <SafeAreaView className='flex-1 bg-[#fffff]'>

        <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

          <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
            <BackIcon/>
          </TouchableOpacity>

          <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
            Products
          </SoraText>

        </View>

        <View className='px-6 items-center justify-center rounded-t-3xl py-6 gap-y-8'>

              <View className='w-full flex flex-col items-center justify-center mb-16'>

                <EmptyStores />

                <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
                  No Product Found
                </SoraText>

              </View>

        </View>

      </SafeAreaView>
    
    )
  
  }
  
  

  return (
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      {/* header */}
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

        <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
           Products
        </SoraText>

      </View>

      {/* body */}
      <View className='bg-white flex-1 rounded-t-3xl pt-6 gap-y-5'>
        <View className='px-6 pt-1 flex flex-row gap-x-2'>
          <TextInput
            onPressIn={()=>{router.push('/search')}}
            className='border border-[#CDD0D5] px-4 py-2 rounded-lg w-[84%]'
            onChangeText={(value)=>{setSearch(value)}}
            value={search}
            placeholder="search products here"
            autoCapitalize='words'
          />
          <TouchableOpacity onPress={()=>{sheetRef.current?.open()}} className=''>
            <MenuIcon/>
          </TouchableOpacity>

        </View>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className='px-4'>

            {/* {loading && !Products.length && <SkeletonLoader/>} */}

            <FlatList
                data={Products}
                numColumns={2}
                renderItem={({item}) => (
                        <TouchableOpacity onPress={()=>{router.push({ pathname: '/product', params: { productId: item.id } })}} className='w-[46%] my-2 rounded-xl mx-[2%]'>
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
                                        <SoraText numberOfLines={1} style={{fontSize:14,color:'black'}}>₦{item.price}</SoraText>
                                        {item.Sale_Status == 'ACTIVE' && <SansText numberOfLines={1} style={{fontSize:6,color:'#686767',fontWeight:'400'}} className='line-through bg-[#F8F4F4] p-1 rounded-lg'>₦7,500.89</SansText>}
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


          </View>


    
        </ScrollView>
        
        

      </View>

       
      <BottomSheet disableKeyboardHandling={true} style={{backgroundColor:'#FFFFFF'}} height={'100%'} ref={sheetRef} hideDragHandle={true}	>

        <View style={{marginTop: hp('5%')}} className='flex relative flex-row items-center justify-between px-6'>

          <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
            Filter
          </SoraText>

          <TouchableOpacity onPress={()=>(sheetRef.current?.close())} className='flex flex-col gap-y-1'>
            <CloseIcon/>
          </TouchableOpacity>

        </View>

        <ProductFilter OnUpdate={(payload)=>{
            getfilteredProducts(
              payload.category,
              payload.startDate,
              payload.endDate,
              payload.minPrice,
              payload.maxPrice
            )}} 
        />
        

  
      </BottomSheet>


    </SafeAreaView>
    


    
  )
}

export default Products