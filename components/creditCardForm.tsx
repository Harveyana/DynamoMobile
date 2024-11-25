import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useCallback, useMemo, useEffect ,useState } from 'react';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import { SansText, SoraText } from '@/components/StyledText';
import { useAuthStore } from '@/store/useAuth';
import PlusIcon from './icons/plusIcon';
import VisaIcon from './icons/visaIcon';
import MasterCardIcon from './icons/masterCardIcon';
import {debounce} from 'lodash';


interface Variant {
    name: string;
    value: string;
    price: number
}
// Define the product type

type props = {
    submitCard: (
      cardHolderName:string, 
      cardNumber:number, 
      expiryDate:string, 
      cvv:number, 
      brand:string, 
      cardType:string
    )=>boolean | any
}
  

const creditCardForm = ({submitCard}:props) => {

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [date, setDate] = useState('')
  const [cvv, setCVV] = useState('')
  const [brand, setBrand] = useState('')
  const [type, setType] = useState('')

  const [loading, setLoading] = useState(false)
  const verifyCard = useAuthStore((state:any) => state.verifyCard)

  const handleChange = async (text:string) => {
      setNumber(text);
      debounceCall(parseInt(text));
  };

  const debounceCall = useCallback(
    debounce((cardnumber:number) => {
      initVerify(cardnumber);
    }, 500),
    [],
  );

  const AddCard = async() =>{
    if(!name || !number || !date || !cvv || !brand || !type) return

    const submitted = submitCard(
      name,
      parseInt(number),
      date,
      parseInt(cvv),
      brand,
      type
    )
    if(submitted){
      setName('')
      setNumber('')
      setDate('')
      setCVV('')

    }
  }

  const initVerify = async (cardNumber:number) => {
    try {
      setLoading(true)
      const result = await verifyCard(cardNumber);
      if (result?.success) {
         setType(result?.data.card_type)
        return setBrand(result?.data.brand);
      }
    } catch (error) {
      console.error('Error verifying:', error);
    }finally {
      setLoading(false)
    }
  };

  // useEffect(() => {
  //    setQuantity(item.cart_Quantity);
  // }, []);


  // if(!item){
  //   return (
  //       <View>
  //           No Data
  //       </View>
  //   )
  // }


  return (

    <View className='w-full rounded-2xl flex flex-col items-center justify-center py-3 gap-y-4'>
                  

      <View className='flex flex-col items-start justify-center gap-y-2'>
          
        <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
          Cardholder Name
        </SansText>
        <View className='pt-1 flex flex-row gap-x-2'>
          <TextInput
              className='border border-[#E4E5E7] px-4 py-2 rounded-xl w-full'
              onChangeText={(value)=>{setName(value)}}
              value={name}
              placeholder="Obiajulu Anayo"
          />
            
        </View>

      </View>


      <View className='flex flex-col items-start justify-center gap-y-2'>
          
        <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
          Card Number
        </SansText>
        
        <View className='w-full flex flex-row items-center justify-between gap-x-2 border border-[#E4E5E7] rounded-xl'>
            <TextInput
                className='px-4 py-2 rounded-xl w-[80%]'
                onChangeText={(value)=>{handleChange(value)}}
                value={number}
                placeholder="27882"
                inputMode='numeric'
            />

            <View className='mx-auto'>
              {loading ? <ActivityIndicator/>

              : <View className='mx-auto'>
                {brand == 'visa' && <VisaIcon />}
                {brand == 'mastercard' && <MasterCardIcon />}
              </View>}
            </View>
            

        </View>

      </View>


      <View className='flex flex-col items-start justify-center gap-y-2'>
          
        <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
          Expiry Date
        </SansText>
        
        <View className='pt-1 flex flex-row gap-x-2'>
            <TextInput
                className='border border-[#E4E5E7] px-4 py-2 rounded-xl w-full'
                onChangeText={(value)=>{setDate(value)}}
                value={date}
                placeholder="01/27"
            />
              
        </View>

      </View>


      <View className='flex flex-col items-start justify-center gap-y-2'>
          
        <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
          CVV
        </SansText>
        
        <View className='pt-1 flex flex-row gap-x-2'>
            <TextInput
                className='border border-[#E4E5E7] px-4 py-2 rounded-xl w-full'
                onChangeText={(value)=>{setCVV(value)}}
                value={cvv}
                inputMode='numeric'
                placeholder="762"
            />
              
        </View>

      </View>


      <TouchableOpacity onPress={(()=>{AddCard()})} className='w-full bg-[#FF2E42] mt-8 flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
        <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
          Add Card
        </SansText>
      </TouchableOpacity>


    </View>
    
  )
}

export default creditCardForm

