import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useEffect ,useState } from 'react';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import { SansText, SoraText } from '@/components/StyledText';
import MinusIcon from './icons/minusIcon';
import VisaIcon from '@/components/icons/visaIcon';
import MasterCardIcon from '@/components/icons/masterCardIcon';
import { useNavigation,useRouter } from 'expo-router';


type props = {
    // item: Product, 
    // onIncreaseQuantity: () => void;
    // onDecreaseQuantity: () => void;
    // remove: (id: string)=>void
}
  

const AllCards = ({}:props) => {
  const [quantity, setQuantity] = useState(0)

  const router = useRouter()

  // useEffect(() => {
  //    setQuantity(item.cart_Quantity);
  // }, []);


  return (
    <View className=' bg-white flex-1 flex-col items-start pt-12 px-6 rounded-t-3xl'>

          <TouchableOpacity onPress={()=>(router.push('/(app)/cards'))} className='w-full my-2 '>
              <View className='relative bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-5'>
                    
                <View className='w-full flex flex-row items-center justify-start gap-x-2'>

                  <VisaIcon/>

                  <View className='flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                     Card (***8967)
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                     Debit
                    </SansText>

                  </View>

                </View>

                <SansText numberOfLines={1} style={{fontSize:8,color:'#38C793',fontWeight:'400'}} className='absolute top-0 right-0 bg-[#EDFAF5] p-1 px-3 rounded-tr-2xl'>Preferred</SansText>

                <TouchableOpacity className=''>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='' />
                </TouchableOpacity>

              </View>

          </TouchableOpacity>

          <TouchableOpacity onPress={()=>(router.push('/(app)/cards'))} className='w-full my-2 '>
              <View className='relative bg-transparent border border-[#E5E5E5] rounded-2xl flex flex-row items-center justify-between py-3 px-5'>
                    
                <View className='w-full flex flex-row items-center justify-start gap-x-2'>

                  <MasterCardIcon/>

                  <View className='flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                     Card (***8967)
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                     Debit
                    </SansText>

                  </View>

                </View>

                <SansText numberOfLines={1} style={{fontSize:8,color:'#38C793',fontWeight:'400'}} className='absolute top-0 right-0 bg-[#EDFAF5] p-1 px-3 rounded-tr-2xl'>Preferred</SansText>

                <TouchableOpacity className=''>
                    <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='' />
                </TouchableOpacity>

              </View>

          </TouchableOpacity>

      </View>
  )
}

export default AllCards

