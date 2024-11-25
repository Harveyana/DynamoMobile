import { FlatList,Pressable,  Modal, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,Button, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons, MaterialIcons  } from '@expo/vector-icons';
// import { Image } from 'expo-image';

import AddToCart from '@/components/addToCart';
import { useNavigation,useRouter } from 'expo-router';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from 'react-native-ui-datepicker';


import { SansText, SoraText } from '@/components/StyledText';
import Banner from '@/components/banner';
import React, { useCallback, useMemo, useRef,useState, useEffect } from 'react';
import CloseIcon from './icons/closeIcon';

import CategoryCard from '@/components/categoryCard';
import dayjs from 'dayjs'


type props = {
  OnUpdate: (payload:{minPrice:string,maxPrice:string}) => void;

}



const FilterByPrice = ({OnUpdate}:props) => {
  
  const [selectedRange, setSelectedRange] = useState<{minPrice:string,maxPrice:string}>({minPrice:'0', maxPrice:'5000'});


    useEffect(() => {
      OnUpdate(selectedRange)
    }, [selectedRange]);
  
  

  return (
    <SafeAreaView className='bg-white'>
          
        {/* <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        > */}

            <View className='w-full flex items-start justify-between gap-y-3'>
                  <SoraText style={{fontSize:16,color:'#080708'}}>
                    Price Range
                  </SoraText>


                  <View className='w-full items-start justify-between pt-1 flex flex-row'>

                    <View className='w-[46%] flex flex-row items-center justify-between border border-[#CDD0D5]  rounded-lg px-3'>
                      <SansText style={{fontSize:15,color:'black',fontWeight:'500'}}>
                        ₦
                      </SansText>
                      <TextInput
                        keyboardType="number-pad"
                        className='w-[85%] py-2 rounded-lg'
                        onChangeText={(value) => setSelectedRange((prev)=>{  return { minPrice: value, maxPrice: prev.maxPrice }})}
                        value={selectedRange.minPrice}
                        placeholder="Min Price"
                      />
                    </View>

                    <View className='w-[46%] flex flex-row items-center justify-between border border-[#CDD0D5]  rounded-lg px-3'>
                      <SansText style={{fontSize:15,color:'black',fontWeight:'500'}}>
                        ₦
                      </SansText>
                      <TextInput
                        keyboardType="number-pad"
                        className='w-[85%] py-2  rounded-lg'
                        onChangeText={(value) => setSelectedRange((prev)=>{  return { minPrice: prev.minPrice, maxPrice: value }})}
                        value={selectedRange.maxPrice}
                        placeholder="Max Price"
                      />

                    </View>
                    
                    
                  </View>

            </View>
          

        {/* </ScrollView> */}



    </SafeAreaView>
  )
}

export default FilterByPrice
