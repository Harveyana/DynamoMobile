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

import FilterByDate from './filterbyDate';

import FilterByNotificationType from './filterbyNotificationType';


type props = {
  OnUpdate: (payload:{
    type?:string,
    status?:string,
    startDate?:string,
    endDate?:string
  }) => void;

}


const NotificationFilter = ({OnUpdate}:props) => {
  
  const [dateRange, setDateRange] = useState<{startDate:any,endDate:any}|null>({endDate: "2024-10-07T03:53:54.941Z", startDate: "2024-09-07T03:53:54.941Z"});
  const [status, setStatus] = useState('')
  const [type, setType] = useState('TOPUP')
 
  const router = useRouter()

   const submitEntry = ()=>{
    OnUpdate({
      type,
      // status,
      startDate: dateRange?.startDate,
      endDate: dateRange?.endDate
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

              <FilterByNotificationType OnUpdate={(type:string)=> setType(type) }/>
              <FilterByDate OnUpdate={(payload)=> setDateRange(payload) }/>

              <TouchableOpacity onPress={()=>(submitEntry())} className='mt-16 w-full bg-[#FF2E42] flex items-center justify-center py-4 px-4 rounded-2xl'>
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

export default NotificationFilter