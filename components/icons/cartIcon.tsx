import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path } from "react-native-svg"
import { SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useEffect, useRef,useState } from 'react';
import { retrieveCart,formatNumber,clearCart } from '@/constants/cartStorage';
import { useProductStore } from '@/store/useProduct';
import { UseCart } from '@/constants/useCart';




export default function CartIcon() {
  // const [cart, setCart] = useState<any[]>([]);
  const key = useProductStore((state:any) => state.key)
  const getCart = useProductStore((state:any) => state.getCart)
  const generalCart = useProductStore((state:any) => state.cart)
  const storeId = useProductStore((state:any) => state.Store_id)

  const { cart, total, error, isLoading,refresh } = UseCart();

  // useEffect(() => {
  //   // Load the cart when the component mounts
  //   console.log('loaded')
  // }, [generalCart]);

    return (
      <View className='relative'>
        {cart.length ? <SansText className='absolute -top-3 -right-2 bg-[#3626A7] rounded-full px-1.5 py-[1px]  text-white text-[12px]'>
         {cart.length}
        </SansText>:<></>}
        <Svg width="24" height="24" viewBox="0 0 181 170" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M36.2 110.5V34H22.625V21.25H42.9875C44.7877 21.25 46.5141 21.9216 47.787 23.1172C49.0599 24.3127 49.775 25.9342 49.775 27.625V104.125H134.198L147.773 53.125H63.35V40.375H156.474C157.506 40.375 158.524 40.596 159.452 41.021C160.379 41.4461 161.191 42.0641 161.825 42.828C162.46 43.592 162.901 44.4818 163.115 45.4298C163.328 46.3778 163.309 47.3591 163.058 48.2991L146.09 112.049C145.722 113.428 144.874 114.651 143.681 115.526C142.489 116.4 141.019 116.875 139.506 116.875H42.9875C41.1873 116.875 39.4609 116.203 38.188 115.008C36.9151 113.812 36.2 112.191 36.2 110.5V110.5ZM49.775 155.125C46.1747 155.125 42.7218 153.782 40.176 151.391C37.6302 149 36.2 145.757 36.2 142.375C36.2 138.993 37.6302 135.75 40.176 133.359C42.7218 130.968 46.1747 129.625 49.775 129.625C53.3753 129.625 56.8282 130.968 59.374 133.359C61.9198 135.75 63.35 138.993 63.35 142.375C63.35 145.757 61.9198 149 59.374 151.391C56.8282 153.782 53.3753 155.125 49.775 155.125ZM131.225 155.125C127.625 155.125 124.172 153.782 121.626 151.391C119.08 149 117.65 145.757 117.65 142.375C117.65 138.993 119.08 135.75 121.626 133.359C124.172 130.968 127.625 129.625 131.225 129.625C134.825 129.625 138.278 130.968 140.824 133.359C143.37 135.75 144.8 138.993 144.8 142.375C144.8 145.757 143.37 149 140.824 151.391C138.278 153.782 134.825 155.125 131.225 155.125Z" fill="#686767"/>
        </Svg>
      </View>
    );
  }
  