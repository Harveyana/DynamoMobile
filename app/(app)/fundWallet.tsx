import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,Pressable ,View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons, MaterialIcons  } from '@expo/vector-icons';
// import { Image } from 'expo-image';
import CartIcon from '@/components/icons/cartIcon';
import BellIcon from '@/components/icons/bellIcon';

import AddToCart from '@/components/addToCart';
import { useNavigation,useRouter } from 'expo-router';
import  { Paystack , paystackProps}  from 'react-native-paystack-webview';



import { SansText, SoraText } from '@/components/StyledText';
import Banner from '@/components/banner';
import React, { useCallback, useMemo, useRef,useState } from 'react';
import Toast from 'react-native-root-toast';
import { useAuthStore } from '@/store/useAuth';
import { useProductStore } from '@/store/useProduct';


import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import MenuIcon from '@/components/icons/menuIcon';
import CategoryCard from '@/components/categoryCard';
import WalletIcon from '@/components/icons/walletIcon';
import CardIcon from '@/components/icons/cardIcon';
import useToast from '@/constants/useToast';



const FundWallet = () => {
  const [amount, setAmount] = useState('')
  const [view, setView] = useState('input')
  const showToast = useToast()
  const sheetRef = useRef<BottomSheetMethods>(null);

  const router = useRouter()
 
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  const updateWallet = useProductStore((state:any) => state.updateWallet)
  // const balance = useAuthStore((state:any)=> state.walletBalance)

  const initBalance = async(transId:string)=>{
    const result = await updateWallet(parseInt(amount),transId)
    if(result.success){
      console.log(result.wallet)
      return useAuthStore.setState({user: result.user})
    }else{
      return showToast(result?.msg,false);
    }


  }

  const ThirdPartyPayment = ()=>{
    sheetRef.current?.close()
    paystackWebViewRef.current?.startTransaction()

  }


  const initFundWallet = ()=>{
    if(!amount || parseInt(amount) < 200 ){
      return showToast('Deposit Amount must be above N200',false)
    }
    sheetRef.current?.open()
  }
  

  return (
    <>
    
    
     { view == 'input' && <SafeAreaView className='flex-1 bg-[#fffff]'>
      <View style={{marginTop: hp('8%'),marginBottom:hp('4%')}} className='relative flex-row items-center justify-center px-6'>

        <TouchableOpacity onPress={()=>(router.back())} className='absolute left-6 flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
          Fund Wallet
        </SoraText>

      </View>

      <View className='bg-white flex-1 rounded-t-3xl pt-6 gap-y-5'>
  
          <View className='w-full h-full flex items-center relative px-6 gap-y-4 flex flex-col'>

            <View className='flex flex-col items-start justify-center gap-y-2'>
                  
                  <SansText style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
                    Enter Amount
                  </SansText>
                  
                  <View className='pt-1 flex flex-row gap-x-2'>
                      <TextInput
                          className='border border-[#E4E5E7] px-4 py-2 rounded-xl w-full'
                          onChangeText={(value)=>{setAmount(value)}}
                          inputMode='numeric'
                          value={amount}
                          placeholder="5,000"
                      />
                        
                  </View>
  
            </View>

            <TouchableOpacity onPress={() => initFundWallet()}  className='absolute bottom-16 w-full bg-[#FF2E42] flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
                <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                  Add Funds
                </SansText>
            </TouchableOpacity>
            


          </View>



          <Paystack
            paystackKey="pk_test_db9973cb80c3b6b6a52824a8a30dd5e53c8390e8"
            billingEmail="harvey@helloqaya.com"
            amount={parseInt(amount)}
            // refNumber={order?.id}
            channels={["bank","card","ussd","bank_transfer","qr","mobile_money"]}
            onCancel={(e) => {
              // handle response here
              console.log(e)
            }}
            onSuccess={async(res) => {
              // handle response here
              console.log(res)
              const result = await initBalance(res.transactionRef?.reference)
              console.log(result)
              setView('success')

            }}
            ref={paystackWebViewRef}
          />


                  

      </View>

      <BottomSheet height={hp('40%')} ref={sheetRef} hideDragHandle={true}	>

        <View className='px-6 my-6 gap-y-8'>

          <View className='flex flex-row items-center justify-between'>

            <SoraText style={{fontSize:18,color:'#080708',fontWeight:'600'}}>
              Payment
            </SoraText>
            <TouchableOpacity onPress={()=>sheetRef.current?.close()} className=''>
              <CloseIcon/>
            </TouchableOpacity>

          </View>

          <View className='gap-y-4' >
              
              <TouchableOpacity onPress={()=> ThirdPartyPayment()} className='w-full p-4 rounded-2xl border border-[#C5C1C1]'>

                <View className='flex flex-row items-center gap-x-3 justify-start'>

                  <WalletIcon/>
                  <View className=' bg-transparent rounded-xl flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      Third Party Payment
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      pay with paystack
                    </SansText>
                  </View>
                  <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='ml-auto' />
                </View>
                    
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{}}  className='w-full p-4 rounded-2xl border border-[#C5C1C1]'>

                <View className='flex flex-row items-center gap-x-3 justify-start'>

                  <CardIcon/>
                  <View className=' bg-transparent rounded-xl flex flex-col items-start justify-center'>
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      Card (***8967)(unavailable)
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      pay with your preferred card
                    </SansText>
                  </View>
                  <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='ml-auto' />
                </View>
                    
              </TouchableOpacity>


          </View>



        </View>
              
      </BottomSheet>


      </SafeAreaView>}


      {view == 'success' && <SafeAreaView className='flex-1 bg-[#fffff]'>


        <View className='px-6 bg-white  flex-1 items-start justify-center rounded-t-3xl py-6 gap-y-8'>

          <View className='w-full flex flex-col items-center justify-center mb-16'>

            <Image
              source={require('@/assets/images/mark.png')}
              style={{resizeMode:'cover'}}
              className='mb-3'
            />

            <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
              Wallet Funded Successfully
            </SoraText>

            <SansText className='text-center mt-2' style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Your N{amount} is now available in your wallet</SansText>
          </View>

          <Pressable onPress={()=>router.push('/(tabs)/wallet')} className=' absolute bottom-12 left-6 w-full bg-[#FF2E42] mx-auto flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
            <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
              Close
            </SansText>
          </Pressable>

        </View>

      </SafeAreaView>}
    
    </>

   
  )
}

export default FundWallet
