import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons, MaterialIcons  } from '@expo/vector-icons';
// import { Image } from 'expo-image';
import CartIcon from '@/components/icons/cartIcon';
import BellIcon from '@/components/icons/bellIcon';

import AddToCart from '@/components/addToCart';
import { useNavigation,useRouter } from 'expo-router';

import {debounce} from 'lodash';
import { SansText, SoraText } from '@/components/StyledText';
import Banner from '@/components/banner';
import React, { useCallback, useMemo, useRef,useState, useEffect } from 'react';
// import { retrieveCart,formatNumber,clearCart } from '@/constants/cartStorage';
import { retrieveHistory, addHistory,clearHistoryList,removeHistory } from '@/constants/historyStorage';

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { useProductStore } from '@/store/useProduct';
import CloseIcon, { CloseIcon2 } from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import MenuIcon from '@/components/icons/menuIcon';
import CategoryCard from '@/components/categoryCard';
import EmptyStores from '@/components/icons/emptyStores';
import PopularProducts from '@/components/popularProducts';




const Search = () => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [Products, setProducts] = useState<any[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const sheetRef = useRef<BottomSheetMethods>(null);

  const searchProducts = useProductStore((state:any) => state.searchProducts)
  const StoreId = useProductStore((state:any) => state.Store_id)
  // const loading = useProductStore((state:any) => state.loading)

  const router = useRouter()

  const handleChange = async (text:string) => {
      setSearch(text);
      debounceCall(text);
  };

  const debounceCall = useCallback(
    debounce((text:string) => {
      fetchProducts(text);
    }, 500),
    [],
  );

  const fetchProducts = async (keyword:string) => {
    
    const history = await retrieveHistory();
    console.log('of course history',history)
    try {
      setLoading(true)
      
      console.log('StoreId:', StoreId);
      if (!StoreId) return;
      const result = await searchProducts(StoreId,keyword);
      console.log('Fetched Products:', result);
      if (result?.success) {
        // Toast.show(deals?.msg,toastConfig)
        if(result?.products && result?.products.length){
          await addHistory(keyword)
        }
        return setProducts([...result?.products]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }finally {
      setLoading(false)
    }
  };

  const loadHistory = async () => {
    const history = await retrieveHistory();
    console.log('this is history',history)
    setHistory(history);
    // updateSummary()
  };

  const deleteHistory = async(history:string)=>{
    await removeHistory(history)
    loadHistory()
  }

  useEffect(() => {
    loadHistory();
  }, []);


  const products = [
    {
      id: 1,
      title: "Product 1",
      price: 20.99,
      supplier: "Supplier A"
    },
    {
      id: 2,
      title: "Product 2",
      price: 15.49,
      supplier: "Supplier B"
    }
    // Add more products as needed
  ];
  

  return (
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      {/* header */}
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

        <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
          Search
        </SoraText>

      </View>

      {/* body */}
      <View className='bg-white flex-1 rounded-t-3xl pt-6 gap-y-5'>
        <View className='px-6 flex flex-row gap-x-2'>
          <View className='w-full relative rounded-lg'>

            <TextInput
              className='border border-[#CDD0D5] px-4 py-2 rounded-lg w-full'
              onChangeText={(value)=>{handleChange(value)}}
              value={search}
              placeholder="search categories"
              autoCapitalize='words'
            />
            { search !=='' && <TouchableOpacity onPress={()=>{setProducts([]);setSearch('')}} className='absolute flex right-3 mt-[2px] my-auto '>
              <CloseIcon/>
            </TouchableOpacity>}

          </View>
          
        </View>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className='px-6 gap-y-6'>

            { search == '' && <>
            
            {history.length ? <View className='px-1 flex flex-col items-start'>
                <SoraText style={{fontSize:16,color:'black'}}>
                  Lastest search
                </SoraText>

                <FlatList
                  className='w-full'
                      data={history}
                      numColumns={1}
                      renderItem={({item}) => (
                        <View className='flex flex-row items-center justify-between py-2'>
                          <View className='flex flex-row items-center justify-center gap-x-3'>
                            <MaterialIcons name="access-time" size={24} color="#BABABA" />
                            <SansText style={{fontSize:14,color:'#686767',fontWeight:'600'}}>
                              {item}
                            </SansText>
                          </View>

                          <TouchableOpacity onPress={()=>deleteHistory(item)} className=''>
                            <Ionicons name="close-sharp" size={24} color="black" />
                          </TouchableOpacity>
                        </View>
                      )}
                      // ItemSeparatorComponent={()=><View className='mx-2'></View>}
                    contentContainerStyle={[{columnGap:16,marginTop:4 }]}
                />

              </View>: <></>}
              
              <PopularProducts/>
            
            </>}


            { search !=='' && <View>

              { loading && <ActivityIndicator size="large" />}

              { Products.length && !loading  ? <>
                <View className='px-1 flex flex-col items-start'>
                  <SoraText style={{fontSize:16,color:'black'}}>
                    Results
                  </SoraText>

                  <FlatList
                    className='w-full'
                        data={Products}
                        numColumns={1}
                        renderItem={({item}) => (
                          <TouchableOpacity onPress={() => router.push({ pathname: '/product', params: { productId: item.id } })} className='flex flex-row items-center justify-start gap-3 py-2'>
                            <View className='w-24 border border-[#E5E5E5] flex flex-row rounded-xl justify-center items-center bg-transparent'>
                              <Image
                                className='rounded-xl w-full h-24'
                                style={[{aspectRatio:1,resizeMode:'cover'}]}
                                source={{uri:item.images[0].url}}
                              />
                            </View>
                            <View className='flex flex-col items-start justify-center gap-x-3'>
                              <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                                {item.name} 
                              </SansText>
                              <SoraText style={{fontSize:16,color:'#080708',fontWeight:'600'}}>
                                ₦{item.price}
                              </SoraText>
                              { item.Sales_price > 1 && <SansText numberOfLines={1} style={{fontSize:8,color:'#686767',fontWeight:'400'}} className='line-through bg-[#F8F4F4] p-1 rounded-lg'>
                                ₦{item.Sales_price}
                              </SansText>}
                            </View>

                          </TouchableOpacity>
                        )}
                      contentContainerStyle={[{columnGap:16,marginTop:4 }]}
                  />

                </View>
            
                </>: 

                <View className='px-6 items-center justify-center rounded-t-3xl py-6 gap-y-8'>

                  <View className='w-full flex flex-col items-center justify-center mb-16'>

                    <EmptyStores />

                    <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
                      No Product Found
                    </SoraText>

                  </View>

                </View>
              }
            
            </View>}
            
            


            

          </View>

          

        </ScrollView>
        

      </View>




    </SafeAreaView>
  )
}

export default Search