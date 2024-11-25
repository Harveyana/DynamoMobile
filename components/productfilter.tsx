import { FlatList,Pressable, Image, ImageBackground,KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,Button, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons, MaterialIcons  } from '@expo/vector-icons';
// import { Image } from 'expo-image';
import CartIcon from '@/components/icons/cartIcon';
import BellIcon from '@/components/icons/bellIcon';

import AddToCart from '@/components/addToCart';
import { useNavigation,useRouter } from 'expo-router';
import { RadioButton } from 'react-native-paper';



import { SansText, SoraText } from '@/components/StyledText';
import Banner from '@/components/banner';
import React, { useCallback, useMemo, useRef,useState } from 'react';

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import MenuIcon from '@/components/icons/menuIcon';
import CategoryCard from '@/components/categoryCard';
import FilterByDate from '@/components/filterbyDate';
import FilterByPrice from '@/components/filterbyPrice';


type props = {
  OnUpdate: (payload:{
    category?:string,
    startDate?:string,
    endDate?:string,
    minPrice?: string,
    maxPrice?: string
  }) => void;

}


const ProductFilter = ({OnUpdate}:props) => {
  const [search, setSearch] = useState('')
  const [dropDown, setDropDown] = useState(false)
  
  const [dateRange, setDateRange] = useState<{startDate:any,endDate:any}|null>(null);
  const [priceRange, setPriceRange] = useState<{minPrice:string,maxPrice:string}|null>(null);
  const [category, setCategory] = useState('')
 
  const router = useRouter()


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

   const submitEntry = ()=>{
    OnUpdate({
      category,
      startDate: dateRange?.startDate,
      endDate: dateRange?.endDate,
      minPrice: priceRange?.minPrice,
      maxPrice: priceRange?.maxPrice
     })
   }



  return (
    

      <SafeAreaView className='flex' >
          
        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {/* <KeyboardAvoidingView> */}


            <View className='flex flex-col px-6 gap-y-4 bg-white rounded-t-3xl pt-6'>

              <View className='flex gap-y-3 items-start justify-between'>

                <SoraText style={{fontSize:18,color:'black'}}>
                Filter by categories
                </SoraText>

                <FlatList
                  data={DATA}
                  renderItem={({item}) => 
                    <TouchableOpacity onPress={()=>(setCategory(item.title))} style={{ backgroundColor: category == item.title ? '#FFF2F2' :'#FAFAFA'}} className='border border-gray-200 w-fit px-3 py-1.5 rounded-xl bg-[#FAFAFA]'>
                      <SansText style={{fontSize:14, color:'black', fontWeight:'400'}}>
                        {item.title}
                      </SansText>
                    </TouchableOpacity>
                  }
                  ItemSeparatorComponent={()=><View className='p-1'></View>}
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />

              </View>


              <FilterByDate OnUpdate={(payload)=> setDateRange(payload) }/>

              <FilterByPrice OnUpdate={(payload)=> setPriceRange(payload) }/>

              <TouchableOpacity onPress={()=>(submitEntry())} className='mt-20 w-full bg-[#FF2E42] flex items-center justify-center py-4 px-4 rounded-2xl'>
                <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                  Apply Filter
                </SansText>
              </TouchableOpacity>

            </View>


          {/* </KeyboardAvoidingView> */}
          

          

        </ScrollView>
        

      </SafeAreaView>




  )
}

export default ProductFilter