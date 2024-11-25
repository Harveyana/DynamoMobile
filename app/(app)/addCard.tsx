import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';

import { useNavigation,useRouter } from 'expo-router';
import useToast from '@/constants/useToast';
import usePushNotification from '@/constants/usePushNotification'



import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useMemo, useRef,useState } from 'react';

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon, { CloseIcon2 } from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import { useAuthStore } from '@/store/useAuth';
import CreditCardForm from '@/components/creditCardForm';



const AddCard = () => {

  // async function sendPushNotification(expoPushToken: string) {
  //   const message = {
  //     to: expoPushToken,
  //     sound: 'default',
  //     title: 'Original Title',
  //     body: 'And here is the body!',
  //     data: { someData: 'goes here' },
  //   };
  
  //   await fetch('https://exp.host/--/api/v2/push/send', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-encoding': 'gzip, deflate',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(message),
  //   });
  // }
  const showToast = useToast()

  const sheetRef = useRef<BottomSheetMethods>(null);
  const navigation = useNavigation();
  const [search, setSearch] = useState('')

  const addCard = useAuthStore((state:any) => state.addCard)

  const addMyCard = async (
    cardHolderName:string, 
    cardNumber:number, 
    expiryDate:string, 
    cvv:number, 
    brand:string, 
    cardType:string) => {
    try {
      // setLoading(true)
      const result = await addCard({
        cardHolderName, 
        cardNumber, 
        expiryDate, 
        cvv, 
        brand, 
        cardType
      })
      if(result?.success) {
        showToast(result?.msg, true);
        return true
      }
    } catch (error) {
      console.error('Error verifying:', error);
      showToast('failed to add card', false);
      return false
    }
  };

  // const showTabBar = () => {
  //   navigation.setOptions({
  //     tabBarStyle: { 
  //       display: 'flex',
  //       backgroundColor: '#FAFAFA',
  //       height:70,
  //       paddingBottom:10,
  //       paddingTop:10
  //     }      
  //   });
  // };

  // const hideTabBar = () => {
  //   navigation.setOptions({
  //     tabBarStyle: { display: 'none' }
  //   });
  // };

  // const openBottomSheet = () => {
  //   hideTabBar()
  //   sheetRef.current?.open();
  // };

  // const closeBottomSheet = () => {
  //   showTabBar()
  //   sheetRef.current?.close();
  // };

  const router = useRouter()

  return (
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      {/* header */}
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

        <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
          Add Card
        </SoraText>

      </View>

      {/* body */}
      <View className='px-6 bg-white flex-1 rounded-t-3xl py-6 gap-y-5'>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >

            <SansText className='my-8' style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
              Please add your card details here. It is safe with us
            </SansText>


          <View className='w-full flex flex-col items-start'>

            {/* inputs */}
            <CreditCardForm submitCard={async(
              cardHolderName, 
              cardNumber, 
              expiryDate, 
              cvv, 
              brand, 
              cardType
              )=> await addMyCard(cardHolderName,cardNumber,expiryDate,cvv,brand,cardType)} 
            />

          
          </View>

          

        </ScrollView>

      </View>




    </SafeAreaView>
  )
}

export default AddCard
