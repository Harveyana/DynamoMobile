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

import FilterByDate from '@/components/filterbyDate';
import FilterByPrice from '@/components/filterbyPrice';
import FilterByStatus from './filterbyStatus';
import FilterByType from './filterbyType';


type props = {
  OnUpdate: (payload:{
    type?:string,
    status?:string,
    startDate?:string,
    endDate?:string
  }) => void;

}


const TransactionFilter = ({OnUpdate}:props) => {
  
  const [dateRange, setDateRange] = useState<{startDate:any,endDate:any}|null>(null);
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')
 
  const router = useRouter()

   const submitEntry = ()=>{
    OnUpdate({
      type,
      status,
      startDate: dateRange?.startDate,
      endDate: dateRange?.endDate,
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

              <FilterByType OnUpdate={(type:string)=> setType(type) }/>
              <FilterByStatus OnUpdate={(status:string)=> setStatus(status) }/>
              <FilterByDate OnUpdate={(payload)=> setDateRange(payload) }/>

              <TouchableOpacity onPress={()=>(submitEntry())} className='mt-10 w-full bg-[#FF2E42] flex items-center justify-center py-4 px-4 rounded-2xl'>
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

export default TransactionFilter