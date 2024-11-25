import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import Svg, { Path,Rect,Circle } from "react-native-svg"
import { SansBold, SansText, SoraText } from '@/components/StyledText';
import React, { useCallback, useEffect, useRef,useState } from 'react';


interface Variant {
    id: number;
    name: string;
    options: { value: string; price: number }[];
  }

  interface VariantsProps {
    key: number;
    selectedVariants: { name: string; value: string; price: number }[]; 
    variants: Variant[];
    onVariantSelect: (name: string, value: string, price: number) => void;
  }


export default function Variants({onVariantSelect, variants, selectedVariants, key}:VariantsProps) {


  const Variants = [
    {
      id:1,
      name:'size',
      options:[
        {
          value:'10kg',
          price: 200
        },
        {
          value:'20kg',
          price: 200
        },
        {
          value:'30kg',
          price: 200
        },
        {
          value:'40kg',
          price: 200
        },
      ]
    },
    {
      id:2,
      name:'color',
      options:[
        {
          value:'Black',
          price: 250
        },
        {
          value:'Red',
          price: 250
        },
        {
          value:'Blue',
          price: 250
        },
        {
          value:'White',
          price: 250
        },
      ]
    }
  ]



  const variantSelected = (value: string) => {
    return selectedVariants.some(obj => obj.value === value);
  }; //   // Use findIndex to efficiently find the existing item
  //   const existingIndex = selection.findIndex(obj => obj.name === name);
  
  //   if (existingIndex !== -1) {
  //     // If the item exists, remove it using splice
  //     setSelection(prevSelection => {
  //       prevSelection.splice(existingIndex, 1);
  //       prevSelection.push({ name, value });
  //       return prevSelection;
  //     });
  //   } else {
  //     // If the item doesn't exist, add it
  //     setSelection(prevSelection => {
  //       prevSelection.push({ name, value });
  //       return prevSelection;
  //     });
  //   }
  
  //   onVariantSelect(name, value, price);
  //   console.log(selection);
  // };

   useEffect(() => {
    // Your re-render logic here
    console.log('Component re-rendered after selection update');
   }, [key]);


  
    return (

      <View className='flex w-full'>

        <View >
          {variants.map((variant,index) => (
            <View key={variant.id} className='w-full flex flex-row items-center justify-center pl-4 pr-3 gap-x-3 mt-4'>

              <SansText style={{fontSize:16, color:'black', fontWeight:'700'}}>
                {variant.name}:
              </SansText>

              <FlatList
                  data={variant.options}
                  renderItem={({item}) => 
                        <TouchableOpacity style={{ backgroundColor: variantSelected(item.value) ? '#FFF2F2' :'#fffff'}} onPress={() => onVariantSelect(variant.name, item.value, item.price)} className='border border-gray-200 w-fit px-3 py-5 rounded-full'>
                          <SansText style={{fontSize:14, color:'#483D3D', fontWeight:'400'}}>
                            {item.value}
                          </SansText>
                        </TouchableOpacity>
                  }
                  ItemSeparatorComponent={()=><View className='p-1'></View>}
                  keyExtractor={item => item.value}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
              />


            </View>
          ))}
        </View>

     
        {/* <FlatList
          className=''
              data={Variants}
              renderItem={({item}) => (
                
                  <View className='w-full flex flex-row items-center justify-center pl-4 pr-3 gap-x-3 mt-6'>

                    <SansText style={{fontSize:16, color:'black', fontWeight:'700'}}>
                      {item.name}:
                    </SansText>

                    <FlatList
                      data={item.options}
                      renderItem={({item}) => 
                        <TouchableOpacity className='border border-gray-200 w-fit px-3 py-5 rounded-full bg-white'>
                          <SansText style={{fontSize:14, color:'#483D3D', fontWeight:'400'}}>
                            {item.value}
                          </SansText>
                        </TouchableOpacity>
                      }
                      ItemSeparatorComponent={()=><View className='p-1'></View>}
                      keyExtractor={item => item.value}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    />

                  </View>
              )}
          contentContainerStyle={[{columnGap:16,marginTop:4 }]}
        /> */}


{/* style={{backgroundColor:item.title == value? '#fff2f4':'#FAFAFA' }} */}

      </View>
    );
}