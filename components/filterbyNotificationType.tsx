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



type props = {
  OnUpdate: (type:string) => void;

}

const FilterByNotificationType = ({OnUpdate}:props) => {
  
  const [checked, setChecked] = useState('TOPUP');  
    
    useEffect(() => {
      OnUpdate(checked)
    }, [checked]);
  
  

  return (
    <SafeAreaView className=' bg-white'>
          
        {/* <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        > */}
          <View className='flex flex-col gap-y-3'>


            <View className='px-1 flex flex-col items-start'>
              <SoraText style={{fontSize:16,color:'#080708'}}>
               Filter by Type
              </SoraText>

              <View className='flex flex-col gap-y-1'>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                    Order 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="ORDER'"
                    status={ checked === 'ORDER' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('ORDER')}
                  />

                </View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                    Top Up 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="TOPUP'"
                    status={ checked === 'TOPUP' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('TOPUP')}
                  />

                </View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                    General 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="GENERAL'"
                    status={ checked === 'GENERAL' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('GENERAL')}
                  />

                </View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                    Product 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="PRODUCT'"
                    status={ checked === 'PRODUCT' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('PRODUCT')}
                  />

                </View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                    Store 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="STORE'"
                    status={ checked === 'STORE' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('STORE')}
                  />

                </View>


              </View>

            </View>



          </View>

          

        {/* </ScrollView> */}



    </SafeAreaView>
  )
}

export default FilterByNotificationType
