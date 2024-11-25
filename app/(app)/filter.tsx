import { FlatList,Pressable, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,Button, View } from 'react-native'
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





const Filter = () => {
  const [search, setSearch] = useState('')
  const [dropDown, setDropDown] = useState(false)
  
  const [checked, setChecked] = React.useState('first');

  const [dateRange, setDateRange] = useState<{startDate:any,endDate:any}>();
  const [priceRange, setPriceRange] = useState<{minPrice:string,maxPrice:string}>();

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
  

  return (
    // <ImageBackground source={require('@/assets/images/bgHome.png')} style={styles.image}>
    <SafeAreaView className='flex-1 bg-white'>
      {/* header */}
      <View style={{marginTop: hp('10%')}} className='relative flex-row items-center justify-between px-6'>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
          Filter
        </SoraText>

        <TouchableOpacity onPress={()=>(router.back())} className='flex flex-col gap-y-1'>
          <CloseIcon/>
        </TouchableOpacity>

      </View>

      {/* body */}
      <View className='bg-white flex-1 rounded-t-3xl pt-6'>
          
        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className='px-6 gap-y-4'>

            <View className='flex gap-y-3 items-start justify-between'>

              <SoraText style={{fontSize:18,color:'black'}}>
              Filter by categories
              </SoraText>

              <FlatList
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
              />

            </View>

            
            {/* <View className='px-1 flex flex-col items-start'>
              <SoraText style={{fontSize:16,color:'#080708'}}>
                Filter by status
              </SoraText>

              <View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                    Popularity 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="first"
                    status={ checked === 'popularity' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('popularity')}
                  />

                </View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                    Newest 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="first"
                    status={ checked === 'newest' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('newest')}
                  />

                </View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                    Oldest 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="first"
                    status={ checked === 'oldest' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('oldest')}
                  />

                </View>


              </View>

            </View> */}

            <FilterByDate OnUpdate={(payload)=> setDateRange(payload) }/>

            <FilterByPrice OnUpdate={(payload)=> setPriceRange(payload) }/>

            <Pressable className='mt-32 w-full bg-[#FF2E42] flex items-center justify-center py-4 px-4 rounded-2xl'>
              <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                Apply Filter
              </SansText>
            </Pressable>

          </View>

          

        </ScrollView>
        

      </View>




    </SafeAreaView>
    // </ImageBackground>
  )
}

export default Filter

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