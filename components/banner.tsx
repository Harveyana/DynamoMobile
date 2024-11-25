import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
// import Slider from "react-native-hook-image-slider"
import Slideshow from 'react-native-image-slider-show';
import { useProductStore } from '@/store/useProduct';
import React, { useCallback, useMemo, useRef,useState, useEffect } from 'react';


export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.73)





const Banner = () => {
  const [Adverts, setAdverts] = useState<any[]>([]);

  const getAdverts = useProductStore((state:any) => state.getAdverts)
  const [position, setPosition] = useState(1);
  const intervalRef = useRef(null);


  useEffect(() => { 

    const fetchAdverts = async () => {
      try {
        const results = await getAdverts();
        console.log(results)
        if(results?.success){
          const ads = results.adverts.map((advert:any)=>{
            return {url:advert.imgUrl}
          })
          return setAdverts(ads)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdverts();
  }, []); 

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPosition((prevPosition) =>
        prevPosition === Adverts.length ? 0 : prevPosition + 1
      );
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, [Adverts]);

// containerStyle

  // const images = [
  //   {url:'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'},
  //   {url:'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80'},
  //   {url:'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80'},
  //   {url:'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80'}
  // ]

  return (
    <>
    
    {/* // <View className="w-full flex flex-row px-2 relative rounded-xl "> */}

      {/* <Slider slides={images} autoPlay={3} /> */}
      <View style={{borderRadius:22}} className="w-full px-2">
        <Slideshow 
        arrowSize={0}
        dataSource={Adverts}
        position={position}
        height={120}
        containerStyle={{borderRadius:55}}
        />
      </View>
      
      
      {/* <View className='flex-1 w-full h-full rounded-xl'>
        <Slider
         imageHeight={180}
          images={['https://images.unsplash.com/photo-1586023492125-27b2c045efd7','https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb','https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6']}
        />
      </View> */}
      
    {/* </View> */}

    </>
    
  )
}

export default Banner