import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import { useRef, useState } from 'react'
import Slider from "react-native-hook-image-slider"

export const SLIDER_WIDTH = Dimensions.get('window').width * 0.6
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH)



const data = [
  'https://picsum.photos/id/10/200/300',
  "https://picsum.photos/id/10/200/300",
  "https://picsum.photos/id/12/200/300",
]



const ImageCarousel = () => {
  
  return (
    <View className="w-fit bg-[#fffff] mx-auto flex flex-col itmes-center justify-center">
      <View>
      <Slider
        images={data}
      />
    </View>
      
    </View>
  )
}

export default ImageCarousel