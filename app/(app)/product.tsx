import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Feather, FontAwesome,Ionicons } from '@expo/vector-icons';
import Slider from "react-native-hook-image-slider"

// import { Image } from 'expo-image';
import CartIcon from '@/components/icons/cartIcon';
import BellIcon from '@/components/icons/bellIcon';

import AddToCart from '@/components/addToCart';
import { useNavigation,useRouter, useLocalSearchParams } from 'expo-router';



import { SansBold, SansText, SoraText } from '@/components/StyledText';
import Banner from '@/components/banner';
import React, { useCallback, useEffect, useRef,useState } from 'react';

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import CloseIcon from '@/components/icons/closeIcon';
import BackIcon from '@/components/icons/backIcon';
import MenuIcon from '@/components/icons/menuIcon';
import ImageCarousel from '@/components/imageCarousel';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Rating } from '@kolking/react-native-rating';
import { useProductStore } from '@/store/useProduct';
import { Skeleton } from '@rneui/themed';
import { addProductToCart } from '@/constants/cartStorage';
import Toast from 'react-native-root-toast';
import useToast from '@/constants/useToast';
import Variants from '@/components/variants';
import { useAuthStore } from '@/store/useAuth';
import ProductReviews from '@/components/productReviews';
import { UseCart } from '@/constants/useCart';




interface Product {
  id:string;
  storeId:string;
  name:string;
  SKU:string;
  price:number;
  Description:string; 
  salesStartDate:string;
  salesEndDate:string;
  Sale_Status:string;
  Sales_price:number;    
  createdAt:string;
  Quantity:number;     
  Expiry_date:string;
  images:string[];
  categories:string[];
}



const Product = () => {
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product|null|any>(null)
  const [selectedVariants, setSelectedVariants] = useState<{ name: string; value: string; price: number }[]>([]);
  const [price, setPrice] = useState<number>(0)
  const [key, setKey] = useState(1);


  const sheetRef = useRef<BottomSheetMethods>(null);

  const router = useRouter()
  const { productId } = useLocalSearchParams();
  const getProduct = useProductStore((state:any) => state.getProduct)
  const addToCart = useProductStore((state:any) => state.addToCart)
  const cartkey = useProductStore((state:any) => state.key)
  const user = useAuthStore((state:any) => state.user)


  const showToast = useToast()
  const { cart, total, error, isLoading,refresh } = UseCart();

  useEffect(() => { 

    const fetchProduct = async () => {
      try {
        const data = await getProduct(productId)
         
        if(data?.success){
          console.log('categories',data?.product.categories)
          const subImages = data.product.images.map((image:any)=>{
            return image.url
          })
          data.product.images = subImages
          setProduct(data.product)
          return setPrice(data.product.Sale_Status === 'ACTIVE'? data.product.Sales_price : data.product.price)
        }else{
          return showToast(data?.msg,false)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []); 

  const handleVariantSelection = (name: string, value: string, variantPrice: number) => {
    // Update selected variants
    setSelectedVariants((prev) => {
      // Update selected variants
      const newVariants = prev.filter((variant) => variant.name !== name);
      newVariants.push({ name, value, price: variantPrice });
  
      // Calculate the new total price based on the updated variants
      const selectedOptionsPrice = newVariants.reduce((acc, variant) => acc + variant.price, 0);
      if (product) {
        setPrice(product.price + selectedOptionsPrice);
      }
  
      return newVariants;

    });

    setKey(prevKey => prevKey + 1);
    
  };


  const handleAddProduct = async () => {
    if(product){
      await addToCart({
        id: product.id,
        storeId: product.storeId,
        name: product.name,
        // SKU: product.SKU,
        price: price,
        variants: selectedVariants,
        quantity: quantity,
        images: product.images,
        // categories: product.categories
      });
      
      refresh()
      return showToast('Added to cart',true)
    }
    // const cart = await retrieveCart();
    // setCart(cart);
  };
  

   if(!product){
    return (

      <SafeAreaView className='flex-1 bg-[#fffff]'>
        <View className='w-full flex flex-col items-center justify-center gap-y-4'>
            <View style={{marginTop: hp('8%'),marginBottom:hp('1%')}} className='w-full relative flex-row items-center justify-between px-6'>

              <TouchableOpacity onPress={()=>(router.back())} className='flex flex-col gap-y-1'>
                <BackIcon/>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{router.push('/cart')}}  className='bg-white rounded-full p-1.5'>
                  <CartIcon/>
              </TouchableOpacity>

            </View>

            <View className='w-full flex flex-col px-6 gap-y-2'>

              <Skeleton className='w-full h-full rounded-xl' style={{borderRadius:15}} height={240} animation="wave"/>

              <Skeleton className='w-[30%] rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>

              <View className='w-[50%] flex flex-col items-start justify-start gap-y-2'>
                <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>

                <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>

                <View className='w-[25%] flex flex-row gap-x-2'>
                  <Skeleton circle className='w-full' height={28} />
                  <Skeleton circle className='w-full' height={28} />
                </View>

              </View>

              <Skeleton className='w-full h-full rounded-xl' style={{borderRadius:15}} height={140} animation="wave"/>

            </View>

          
            <View className='w-full flex flex-col items-center justify-center px-6 gap-y-2'>
              <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>

              <Skeleton className='w-[30%] rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>


            </View>

        </View>

      </SafeAreaView>
    )
   }


  return (
    <SafeAreaView className='flex-1 bg-[#fffff]'>
      {/* header */}
      <StatusBar style="auto" backgroundColor='black' />

      {product.images && <View className='flex-1 absolute mt-8'>
        <Slider
          images={product.images}
        />
      </View>}

      <View style={{marginTop: hp('8%'),marginBottom:hp('1%')}} className='relative flex-row items-center justify-between px-6'>

        <TouchableOpacity onPress={()=>(router.back())} className='flex flex-col gap-y-1'>
          <BackIcon/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{router.push('/cart')}}  className='bg-white rounded-full p-1.5'>
            <CartIcon/>
        </TouchableOpacity>

      </View>

      



      {/* body */}
      <View style={{marginTop: hp('30%'),marginBottom:hp('1%')}} className='bg-white flex-1 rounded-t-3xl pt-6 gap-y-5'>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >

          <View className='flex flex-col items-start justify-start px-6'>
            <SansBold numberOfLines={1} style={{fontSize:18,color:'#080708'}}>
              {product.name}
            </SansBold>
            {/* {product.categories && <SansText numberOfLines={1} style={{fontSize:16,color:'#A18D8E',fontWeight:'400'}} className=''>{product.categories[0]}</SansText>} */}

            {product.categories.map((category:any) => (
              <View className='flex' key={category.id}>
                <SansText numberOfLines={1} style={{fontSize:16,color:'#A18D8E',fontWeight:'400'}} className=''>{category.name}</SansText>
              </View>
            ))}

            <View className='flex flex-row items-center justify-start'>
              <SoraText numberOfLines={1} style={{fontSize:25,color:'black',fontWeight:600}}>₦{price}</SoraText>
              {product.Sale_Status === 'ACTIVE' && <SansText numberOfLines={1} style={{fontSize:10,color:'#686767',fontWeight:'400'}} className='line-through bg-[#F8F4F4] p-1 rounded-lg'>₦{product.price}</SansText>}
            </View>

            <TouchableOpacity onPress={()=>sheetRef.current?.open()} className='flex flex-row items-start justify-start gap-x-2 mt-3'>
              <Rating size={20} rating={product.averageRating ? product.averageRating : 0 } disabled />
              <SansText numberOfLines={1} style={{fontSize:18,color:'#483D3D',fontWeight:'400'}} className=''>{product.averageRating ? product.averageRating : 0 } ({product.totalReviews})</SansText>
            </TouchableOpacity>

            <SansText style={{fontSize:14,color:'#686767',fontWeight:'400'}} className='mt-3'>
            {product.Description}
            </SansText>
          </View>


          <Variants key={key} variants={product?.variants} selectedVariants={selectedVariants} onVariantSelect={(name,value,price)=>handleVariantSelection(name,value,price)}/>
          

        </ScrollView>

        <View className=' flex flex-row items-center justify-center px-8 gap-x-4  py-4 mt-auto shadow-inner shadow-lg'>

          <View className='w-[40%] p-3 flex flex-row items-center justify-between rounded-2xl border border-[#E5E5E5]'>

            <TouchableOpacity onPress={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}>
               <Feather name="minus" size={22} color="black" /> 
            </TouchableOpacity>

            <SansText style={{fontSize:16,color:'#686767',fontWeight:'400'}} className=''>
               {quantity}
            </SansText>

            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
               <Feather name="plus" size={22} color="black" />
            </TouchableOpacity>

          </View>

          <Pressable onPress={()=>handleAddProduct()} className='w-[60%] bg-[#FF2E42] flex items-center justify-center py-4 px-4 rounded-2xl'>
              <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                Add to Cart
              </SansText>
          </Pressable>



        </View>
        
        <BottomSheet ref={sheetRef} height={'80%'} style={{backgroundColor:'#FFFFFF'}} hideDragHandle={true}	>
            <View style={{marginTop: hp('5%')}} className='flex relative flex-row items-center justify-between px-6'>

              <SoraText style={{fontSize:18,color:'black',fontWeight:'600'}}>
                Reviews
              </SoraText>

              <TouchableOpacity onPress={()=>(sheetRef.current?.close())} className='flex flex-col gap-y-1'>
                <CloseIcon/>
              </TouchableOpacity>

            </View>

            <View className=' px-6 mt-5' >

              <ProductReviews productId={product.id} />


            </View>
        </BottomSheet>

      </View>




    </SafeAreaView>
    // <View></View>
  )
}

export default Product