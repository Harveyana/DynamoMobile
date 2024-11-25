import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useRef,useState } from 'react';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import { SansText, SoraText } from '@/components/StyledText';



const CategoryCard = () => {
  const [dropDown, setDropDown] = useState(false)

  return (
    <TouchableOpacity onPress={()=>(dropDown ? setDropDown(false):setDropDown(true))} className='w-full my-2 rounded-xl border border-[#C5C1C1]'>
        <View className=' bg-transparent rounded-xl flex flex-row items-center justify-between py-4 px-6'>
            <SansText numberOfLines={1} style={{fontSize:14,color:'#686767',fontWeight:'400'}}>Food and Drinks</SansText>

            <TouchableOpacity className=''>
                {!dropDown ? <FontAwesome name="chevron-right" size={11} color="#C5C1C1" className='' />
                : <FontAwesome name="chevron-down" size={11} color="#C5C1C1" className='' />}
            </TouchableOpacity>

        </View>

        {dropDown ? <View className=' bg-transparent rounded-xl flex flex-col items-start justify-between gap-y-3 pb-6 px-6'>

        <TouchableOpacity className=''>
            <SansText numberOfLines={1} style={{fontSize:14,color:'#686767',fontWeight:'400'}}>Soft drinks</SansText>
        </TouchableOpacity>

        <TouchableOpacity className=''>
            <SansText numberOfLines={1} style={{fontSize:14,color:'#686767',fontWeight:'400'}}>Soft drinks</SansText>
        </TouchableOpacity>

        <TouchableOpacity className=''>
            <SansText numberOfLines={1} style={{fontSize:14,color:'#686767',fontWeight:'400'}}>Soft drinks</SansText>
        </TouchableOpacity>

        </View>:<></>}

    </TouchableOpacity>
  )
}

export default CategoryCard

