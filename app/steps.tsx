import { ActivityIndicator,Dimensions,FlatList, Pressable, ImageBackground, TouchableOpacity, SafeAreaView, StyleSheet, Text,Platform,Image, View,Animated } from 'react-native'
import React from 'react'
import {SansBold,SansText,SoraText} from '@/components/StyledText'
import { useNavigation,useRouter } from 'expo-router';

// import Animated from 'react-native-reanimated'


const { width, height } = Dimensions.get('window');
const SPACING = -5;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;


const Steps = () => {
  const router = useRouter()

  const DATA = [
    { key: 'empty-left',id: 'section0'},
    {
      id: 'section1',
      title: 'First Item',
      img: require('@/assets/images/slide1.png')
    },
    {
      id: 'section2',
      title: 'Second Item',
      img: require('@/assets/images/slide2.png')
    },
    {
      id: 'section3',
      title: 'Third Item',
      img: require('@/assets/images/slide3.png')
    },
    { key: 'empty-right', id: 'section4'}
  ];

  const getBackgroundColor = (id) => {
    switch (id) {
      case 'section1':
        return '#FF2E42';
      case 'section2':
        return '#3627a7';
      case 'section3':
        return '#f9db6d';
      default:
        return '#FF2E42';
    }
  };

  const [color, setColor] = React.useState('green');
  const [section, setSection] = React.useState('section1');

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

  const onViewCallBack = React.useCallback((viewableItems:any)=> {
    console.log('Visible items are', viewableItems);
      // Use viewable items in state or as intended
    console.log(viewableItems.viewableItems[0].key)  
    // 
    setColor(getBackgroundColor(viewableItems.viewableItems[0].key))
    setSection(viewableItems.viewableItems[0].key)
  }, [])

  

  return (
    <View style={[{ backgroundColor: color, duration: 500 }]} className='flex-1 flex  flex-col items-start justify-start border border-black pt-12'>

        {/* <View className='items-center justify-center'> */}

          <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={DATA}
            keyExtractor={(item) => item.id}
            horizontal
            bounces={false}
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.68}

            onViewableItemsChanged={onViewCallBack}
            viewabilityConfig={viewConfigRef.current}
            
            renderToHardwareTextureAndroid
            contentContainerStyle={{ alignItems: 'start'}}
            snapToInterval={ITEM_SIZE}
            snapToAlignment='start'
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              if (!item.title) {
                return <View style={{ width: EMPTY_ITEM_SIZE }} />;
              }

              const inputRange = [
                (index - 2) * ITEM_SIZE,
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
              ];

              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [100, 60, 100],
                extrapolate: 'clamp'
              });

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8], // Adjust as needed
                extrapolate: 'clamp'
              });

              
              return (
                <View style={{ width: ITEM_SIZE }}>
                  <Animated.View
                    style={{
                      marginHorizontal: SPACING,
                      // padding: SPACING,
                      alignItems: 'center',
                      transform: [{ translateY },{ scale }],
                      backgroundColor: 'white',
                      borderRadius: 34,
                    }}
                  >
                    <Animated.Image
                      source={item.img}
                      style={styles.posterImage}
                    />
                    
                  </Animated.View>
                </View>
              );
            }}
          />

        {/* section1*/}

        {section == 'section1' || section == 'section0' ? <View className='w-full px-10 gap-y-8 relative items-center justify-center '>
          {/* <ActivityIndicator size="large" color="black" /> */}

          <View className=''>
            <SansBold className="text-center" style={{fontSize:24,color:'white'}}>
              Skip the{' '}
              <SansBold  style={{fontSize:24,color:'#F9DB6D',}}>
                queue,
              </SansBold>
              {' '}not the shopping.
            </SansBold>

            <SansText className="text-center" style={{fontSize:16,color:'#FFFFFF',fontWeight:'400'}}>
              Qaya gets you through queue faster.
            </SansText>

          </View>

          <View className='w-full flex flex-col gap-y-5 items-center justify-center mb-14'>
            <Pressable onPress={()=>(router.push('/signUp'))} className='bg-white w-full flex items-center justify-center py-4 px-4 rounded-2xl'>
                <SansText style={{fontSize:18,color:'#FF2E42',fontWeight:'500'}}>
                  Sign Up
                </SansText>
            </Pressable>

            <Pressable onPress={()=>(router.push('/signIn'))} className='border border-white w-full flex items-center justify-center py-4 px-4 rounded-2xl'>
                <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                  Login
                </SansText>
            </Pressable>
          </View>
        </View>

        : section == 'section2' ? <View className='w-full px-8 gap-y-8 relative items-center justify-center '>
          {/* <ActivityIndicator size="large" color="black" /> */}

          <View className='gap-y-3'>
            <SansBold className="text-center" style={{fontSize:24,color:'white'}}>
              Pay for items In two clicks
            </SansBold>

            <SansText className='text-center' style={{fontSize:16,color:'#FFFFFF',fontWeight:'400'}}>
              Make seamless payments with your wallet balance or card
            </SansText>

          </View>

          <View className='w-full flex flex-col gap-y-5 items-center justify-center mb-14'>
            <Pressable onPress={()=>(router.push('/signUp'))} className='bg-white w-full flex items-center justify-center py-4 px-4 rounded-2xl'>
                <SansText style={{fontSize:18,color:'#3627a7',fontWeight:'500'}}>
                  Sign Up
                </SansText>
            </Pressable>

            <Pressable onPress={()=>(router.push('/signIn'))} className='border border-white w-full flex items-center justify-center py-4 px-4 rounded-2xl'>
                <SansText style={{fontSize:18,color:'white',fontWeight:'500'}}>
                  Login
                </SansText>
            </Pressable>
          </View>
        </View>

        : <View className='w-full px-8 gap-y-8 relative items-center justify-center '>
          {/* <ActivityIndicator size="large" color="black" /> */}

          <View className='gap-y-3'>
            <SansBold className="text-center" style={{fontSize:24,color:'#080708'}}>
              Shop Smarter, Not Harder
            </SansBold>

            <SansText className='text-center' style={{fontSize:16,color:'#080708',fontWeight:'400'}}>
              Enjoy seamless checkout from malls with out cutting edge technology.
            </SansText>

          </View>

          <View className='w-full flex flex-col gap-y-5 items-center justify-center mb-14'>
            
            <Pressable onPress={()=>(router.push('/signUp'))} className='bg-white w-full flex items-center justify-center py-4 px-4 rounded-2xl'>
                <SansText style={{fontSize:18,color:'#080708',fontWeight:'500'}}>
                  Sign Up
                </SansText>
            </Pressable>

            <Pressable onPress={()=>(router.push('/signIn'))} className='border border-white w-full flex items-center justify-center py-4 px-4 rounded-2xl'>
                <SansText style={{fontSize:18,color:'#080708',fontWeight:'500'}}>
                  Login
                </SansText>
            </Pressable>
          </View>
        </View>}
        
    </View>
    
  )
}

export default Steps

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },

  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
  },
});