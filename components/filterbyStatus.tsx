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
import DateIcon from './icons/dateicon';

import CategoryCard from '@/components/categoryCard';
import dayjs from 'dayjs'


type props = {
  OnUpdate: (type:string) => void;

}

const FilterByStatus = ({OnUpdate}:props) => {
  
  const [checked, setChecked] = useState('SUCCESSFUL');  
    
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
                    Success 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="SUCCESSFUL'"
                    status={ checked === 'SUCCESSFUL' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('SUCCESSFUL')}
                  />

                </View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                    Pending 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="PENDING'"
                    status={ checked === 'PENDING' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('PENDING')}
                  />

                </View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                    Failed 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="FAILED'"
                    status={ checked === 'FAILED' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('FAILED')}
                  />

                </View>


              </View>

            </View>



          </View>

          

        {/* </ScrollView> */}



    </SafeAreaView>
  )
}

export default FilterByStatus
