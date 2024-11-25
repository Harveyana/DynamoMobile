import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useEffect ,useState } from 'react';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import { SansText, SoraText } from '@/components/StyledText';
import MinusIcon from './icons/minusIcon';
import DeleteIcon from './icons/deleteIcon';
import PlusIcon from './icons/plusIcon';
import { increaseProductQuantity,decreaseProductQuantity,removeProductFromCart,formatNumber } from '@/constants/cartStorage';


interface Variant {
    name: string;
    value: string;
    price: number
}
// Define the product type
interface Product {
    id:string;
    storeId:string;
    name:string;
    price:number;
    variants:Variant[];
    quantity:number;    
    images:string[];
  }


type props = {
    item: Product, 
    onIncreaseQuantity: (product:Product) => void;
    onDecreaseQuantity: (product:Product) => void;
    remove: (product:Product)=>void
}
  

const CartCard = ({item,remove,onIncreaseQuantity,onDecreaseQuantity}:props) => {
  const [quantity, setQuantity] = useState(0)
  // const [cartProduct, setCartProduct] = useState<any|null>(null)

  // useEffect(() => {
  //   setCartProduct(item);
  // }, [key]);

  const increaseQuantity = ()=>{
    onIncreaseQuantity(item)
    // increaseProductQuantity(item.id)
    // setQuantity((prevQuantity)=>prevQuantity+1)
  }

  const decreaseQuantity = async()=>{
    // decreaseProductQuantity(item.id)
    onDecreaseQuantity(item)
    // setQuantity((prevQuantity)=>prevQuantity-1)
  }


  const deleteProduct = async()=>{
    // removeProductFromCart(item.id)
    remove(item)
  }


  if(!item){
    return (
        <View>
            {/* No Data */}
        </View>
    )
  }


  return (
    <>
    
    <View className='relative flex flex-row items-center justify-start gap-3 p-4 rounded-3xl border border-[#E5E5E5] mb-4'>
        <View className='w-24 border border-[#E5E5E5] flex flex-row rounded-xl justify-center items-center bg-transparent'>
        {item && <Image
            className='rounded-xl w-full h-24'
            style={[{aspectRatio:1,resizeMode:'cover'}]}
            source={{uri:item.images[0]}}
        />}
        </View>
        <View className='flex flex-col items-start justify-center gap-x-3'>
        <SansText numberOfLines={1} style={{fontSize:14,color:'#686767',fontWeight:'400'}}>
            {item.name} 
        </SansText>
        <SoraText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
            ₦ {formatNumber(item.product?.price)}
        </SoraText>
        
        <View className=' flex flex-row items-center justify-between gap-x-3 rounded-2xl mt-2'>

            <TouchableOpacity onPress={() => decreaseQuantity()}>
            <MinusIcon/>
            </TouchableOpacity>

            <SansText style={{fontSize:16,color:'#686767',fontWeight:'400'}} className=''>
            {item.quantity}
            </SansText>

            <TouchableOpacity onPress={() => increaseQuantity()}>
            <PlusIcon />
            </TouchableOpacity>

        </View>

        </View>

        <TouchableOpacity onPress={()=>deleteProduct()} className='absolute top-3 right-3'>
        <DeleteIcon />
        </TouchableOpacity>

    </View>
    
    
    </>
   
  )
}

export default CartCard

