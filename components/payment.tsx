import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,ListRenderItem } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';
import CartIcon from '@/components/icons/cartIcon';
import BellIcon from '@/components/icons/bellIcon';

import AddToCart from '@/components/addToCart';
import { useNavigation,useRouter } from 'expo-router';

import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import Toast from 'react-native-root-toast';

import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useEffect, useRef,useState } from 'react';

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import CartCard from '@/components/cartCard';
import WalletIcon from '@/components/icons/walletIcon';
import CardIcon from '@/components/icons/cardIcon';
import { retrieveCart,formatNumber,clearCart } from '@/constants/cartStorage';
import { useProductStore } from '@/store/useProduct';
import { useAuthStore } from '@/store/useAuth';

interface props {
  payWithWallet: () => void;
  payWithTransfer: () => void;
}


export default function Payment({
  payWithWallet,
  payWithTransfer
}:props) {

  const toastConfig = {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 2
  }

  // const [balance, setBalance] = useState(0.00)
  const [currency, setCurrency] = useState('NGN')

  const getBalance = useProductStore((state:any) => state.getWalletBalance)
  const balance = useAuthStore((state:any)=> state.walletBalance)


  useEffect(() => {
    // Load the cart when the component mounts
    const fetchBalance = async () => {
      const data = await getBalance();
      if(data.success){
        setCurrency(data.wallet.currency)
        return useAuthStore.setState({ walletBalance: Number(data.wallet.balance)})
      }else{
        return Toast.show(data?.msg,toastConfig)
      }
      
    };

    fetchBalance();
  }, []);


    return (

          <View className='gap-y-4' >
              
              <TouchableOpacity onPress={()=> payWithWallet()} className='w-full p-4 rounded-2xl border border-[#C5C1C1]'>

                <View className='flex flex-row items-center gap-x-3 justify-start'>

                  <WalletIcon/>
                  <View className=' bg-transparent rounded-xl flex flex-col items-start justify-center'>
        
                    <SoraText numberOfLines={1} style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                      Wallet Balance ({currency} {formatNumber(balance)})
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      pay with the money in your wallet
                    </SansText>
                  </View>
                  <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='ml-auto' />
                </View>
                    
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>payWithTransfer()} className='w-full p-4 rounded-2xl border border-[#C5C1C1]'>

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
                      Card (unavailable for now)
                    </SoraText>
                    <SansText numberOfLines={1} style={{fontSize:12,color:'#686767',fontWeight:'400'}}>
                      pay with your preferred card
                    </SansText>
                  </View>
                  <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='ml-auto' />
                </View>
                    
              </TouchableOpacity>


          </View>
    );
  }