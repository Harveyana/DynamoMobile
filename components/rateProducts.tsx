import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState,useEffect } from 'react';
import { useNavigation,useRouter } from 'expo-router';
import { SansText, SoraText } from '@/components/StyledText';
import { useProductStore } from '@/store/useProduct';
import getLocation from '@/constants/useLocation';
import { Skeleton } from '@rneui/themed';
import SkeletonLoader from './skeleton';
import { Rating } from '@kolking/react-native-rating';
import { formatDate, truncateString } from '@/constants/utils';
import { useAuthStore } from '@/store/useAuth';
import { formatNumber } from '@/constants/cartStorage';
import useToast from '@/constants/useToast';
import EmptyStores from './icons/emptyStores';
import BackIcon from './icons/backIcon';



interface Props {
  open: () => void;
}


const RateProducts = ({open}:Props) => {

// const { location, errorMsg } = useLocation();
const [Products, setProducts] = useState<any[]>([]);
const [product, setProduct] = useState<any|null>(null);
const [view, setView] = useState('DEFAULT');
const [rating, setRating] = useState(0);
const [feedback, setFeedback] = useState('');

const router = useRouter()
const getProductSToReview = useProductStore((state:any) => state.getProductSToReview)
const submitReview = useProductStore((state:any) => state.submitReview)
const user = useAuthStore((state:any) => state.user)

const StoreId = useProductStore((state:any) => state.Store_id)
const loading = useProductStore((state:any) => state.loading)

const showToast = useToast()

const SelectProduct = async (product:any) => {
  setProduct(product)
  setView('PRODUCT')
};

const SubmitReview = async () => {
  if(rating == 0) return showToast('Please Rate Product',false)
    console.log(product.id,rating,feedback)
  try {
    const data = await submitReview(product.productId,rating,feedback)
     console.log(data)
    if(data?.success){
      return setView('SUCCESS')
    }else{
      return showToast(data.msg,false)
    }
  } catch (error) {
    console.log(error);
  }
};


  
useEffect(() => { 

  const fetchProducts = async () => {
    try {
      const data = await getProductSToReview()
       console.log(data)
      if(data?.success){
        setProducts(data?.productsToReview)
        if(data?.productsToReview.length){ return open()}
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchProducts();
}, []); 


if(view == 'SUCCESS') return (
  <>

      <View className='px-6 bg-white items-start justify-center rounded-t-3xl py-6 gap-y-8'>

        <View className='w-full flex flex-col items-center justify-center mb-16'>

          <Image
            source={require('@/assets/images/mark.png')}
            style={{resizeMode:'cover'}}
            className='mb-3'
          />

          <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
            Review Submitted Successfully
          </SoraText>

          <SansText className='text-center mt-2' style={{fontSize:16,color:'#686767',fontWeight:'400'}}>Your review has been sumitted.</SansText>
        </View>

        <Pressable onPress={()=>{setView('DEFAULT')}} className='w-full bg-[#FF2E42] mx-auto flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
          <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
            Done
          </SansText>
        </Pressable>

      </View>

  
  </>
)

  if(view == 'PRODUCT'){
    return (
       <>
       {/* <SafeAreaView className='flex-1 item-center justify-center bg-[#fffff]'> */}
       

          <View className='px-6 items-center justify-center rounded-t-3xl py-6 gap-y-8'>


            {/* <TouchableOpacity onPress={()=>(router.back())} className='flex flex-col gap-y-1'>
              <BackIcon/>
            </TouchableOpacity> */}


            <View className='w-full flex flex-col items-center justify-center mb-16'>

              <View className='w-32 border border-[#E5E5E5] flex flex-row rounded-xl justify-center items-center bg-transparent'>
                <Image
                  className='rounded-xl w-full h-32'
                  style={[{aspectRatio:1,resizeMode:'cover'}]}
                  source={{uri:product.images[0]}}
                />
              </View>

              { user && <SoraText style={{fontSize:20,color:'#0D0D0D',fontWeight:'600'}}>
                Hello, {user.firstName}
              </SoraText>}

              <SansText className='text-center mt-2' style={{fontSize:16,color:'#686767',fontWeight:'400'}}>
                How was your experience buying this ({product.name})
              </SansText>

                <Rating style={{marginTop:15,marginBottom:15}} size={28} rating={rating} onChange={(rating)=>{setRating(rating)}} />

              <TextInput
                  className='w-full border border-[#E5E5E5] rounded-2xl p-4 mt-4'
                  multiline={true}
                  numberOfLines={10}
                  placeholder='feedback'
                  onChangeText={setFeedback}
                  style={{ height:150, textAlignVertical: 'top',}}
              />

              
              <View className='w-full flex flex-col'>

                <TouchableOpacity onPress={()=>{SubmitReview()}} className='mt-10 w-full bg-[#FF2E42] mx-auto flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
                  <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                  Submit
                  </SansText>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{setView('DEFAULT')}} className='w-full bg-white flex flex-row items-center justify-center gap-x-2 py-4 rounded-2xl'>
                    <SansText style={{fontSize:18,color:'#686767',fontWeight:'600'}}>
                    Back
                    </SansText>
                </TouchableOpacity>

              </View>

            </View>

            



          </View>

        {/* </SafeAreaView> */}

       </>
    )
  }


  return (
    <>
    
    <View className='px-6 flex flex-col py-4 items-start'>
            
            <SoraText className='my-4' style={{fontSize:14,color:'#080708',fontWeight:'500'}}>
              Rate Items In the Order
            </SoraText>

              <FlatList
                className='w-full'
                    data={Products}
                    numColumns={1}
                    renderItem={({item}) => (
                      <View className='relative flex flex-row items-center justify-start gap-3 py-2'>
                        <View className='w-24 border border-[#E5E5E5] flex flex-row rounded-xl justify-center items-center bg-transparent'>
                          <Image
                            className='rounded-xl w-full h-24'
                            style={[{aspectRatio:1,resizeMode:'cover'}]}
                            source={{uri:item.images[0]}}
                          />
                        </View>
                        <View className='flex flex-col items-start justify-center gap-x-3'>
                          <SansText numberOfLines={1} style={{fontSize:16,color:'#080708',fontWeight:'600'}}>
                            {item.name} 
                          </SansText>

                          <SansText style={{fontSize:14,color:'#080708',fontWeight:'500'}}>
                            x {item.cart_Quantity}
                          </SansText>

                          <SoraText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                           ₦{formatNumber(item.price)}
                          </SoraText>
                          
                        </View>

                        <TouchableOpacity  onPress={()=>SelectProduct(item)} className='absolute top-5 right-0'>
                          <SansText className='text-center bg-[#F6F5F5] px-3.5 py-2 rounded-lg' style={{fontSize:12,color:'#686767',fontWeight:'400'}}>Review</SansText>
                        </TouchableOpacity>
                        

                      </View>
                    )}
                    // ItemSeparatorComponent={()=><View className='mx-2'></View>}
                  contentContainerStyle={[{columnGap:16,marginTop:4 }]}
            />

    </View>
        

    </>
  );
};

export default RateProducts