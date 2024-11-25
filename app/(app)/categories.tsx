import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
import React, { useCallback, useMemo, useRef,useState } from 'react';

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import MenuIcon from '@/components/icons/menuIcon';
import CategoryCard from '@/components/categoryCard';





const Categories = () => {
  const [search, setSearch] = useState('')
  const [dropDown, setDropDown] = useState(false)
  
  const sheetRef = useRef<BottomSheetMethods>(null);

  const router = useRouter()


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
    },
    {
      id: 3,
      title: "Product 3",
      price: 30.00,
      supplier: "Supplier C"
    },
    {
      id: 4,
      title: "Product 4",
      price: 10.99,
      supplier: "Supplier A"
    },
    // Add more products as needed
  ];
  

  return (
    // <ImageBackground source={require('@/assets/images/bgHome.png')} style={styles.image}>
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      {/* header */}
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

        <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
           Categories
        </SoraText>

      </View>

      {/* body */}
      <View className='bg-white flex-1 rounded-t-3xl pt-6 gap-y-5'>
        <View className='px-6 pt-1 flex flex-row gap-x-2'>
          <TextInput
            className='border border-[#CDD0D5] px-4 py-2 rounded-lg w-full'
            onChangeText={(value)=>{setSearch(value)}}
            value={search}
            placeholder="search categories"
            autoCapitalize='words'
          />
          
        </View>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className='px-6'>

            <FlatList
             className=''
                data={products}
                numColumns={1}
                renderItem={({item}) => (
                   <CategoryCard />
                )}
                // ItemSeparatorComponent={()=><View className='mx-2'></View>}
                contentContainerStyle={[{columnGap:16,marginTop:4 }]}
            />


          </View>

          

        </ScrollView>

      </View>




    </SafeAreaView>
    // </ImageBackground>
  )
}

export default Categories

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