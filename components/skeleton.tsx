import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { StatusBar } from 'expo-status-bar';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import React, { useRef, useState } from 'react';
// import { useNavigation,useRouter } from 'expo-router';
// import { SansText, SoraText } from '@/components/StyledText';
// import { useProductStore } from '@/store/useProduct';
// import AddToCart from '@/components/addToCart';
import { Skeleton } from '@rneui/themed';




const SkeletonLoader = () => {


// const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className='flex flex-col items-center justify-center gap-y-6'>

      <View className='flex flex-row items-center justify-center gap-x-3'>
        <View className='w-[45%] flex flex-col items-center justify-center gap-y-1'>
          <Skeleton className='w-full h-full rounded-xl' style={{borderRadius:15}} height={140} animation="wave"/>
          {/* <Image
            source={require('@/assets/images/loader.gif')}
            style={{}}
            className='w-full h-32 my-auto rounded-xl mx-auto bg-gray-400'
          /> */}

          <View className='flex flex-row gap-x-1'>

            <View className='flex w-[70%] flex-col items-center justify-center gap-y-1'>
              <View className='w-full flex items-center justify-center px-2'>
                <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>
              </View>

              <View className='w-full flex items-center justify-center px-2'>
                <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>
              </View>
            </View>

            <View className='w-[25%]'>
              <Skeleton circle className='w-full' height={28} />
            </View>
            
          </View>
          
        </View>

        <View className='w-[45%] flex flex-col items-center justify-center gap-y-1'>
          <Skeleton className='w-full h-full rounded-xl' style={{borderRadius:15}} height={140} animation="wave"/>
          {/* <Image
            source={require('@/assets/images/loader.gif')}
            style={{}}
            className='w-full h-32 my-auto rounded-xl mx-auto bg-gray-400'
          /> */}

          <View className='flex flex-row gap-x-1'>

            <View className='flex w-[70%] flex-col items-center justify-center gap-y-1'>
              <View className='w-full flex items-center justify-center px-2'>
                <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>
              </View>

              <View className='w-full flex items-center justify-center px-2'>
                <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>
              </View>
            </View>

            <View className='w-[25%]'>
              <Skeleton circle className='w-full' height={28} />
            </View>
            
          </View>
          
        </View>

      </View>


      {/* column 2 */}

      <View className='flex flex-row items-center justify-center gap-x-3'>
        <View className='w-[45%] flex flex-col items-center justify-center gap-y-1'>
          <Skeleton className='w-full h-full rounded-xl' style={{borderRadius:15}} height={140} animation="wave"/>
          {/* <Image
            source={require('@/assets/images/loader.gif')}
            style={{}}
            className='w-full h-32 my-auto rounded-xl mx-auto bg-gray-400'
          /> */}

          <View className='flex flex-row gap-x-1'>

            <View className='flex w-[70%] flex-col items-center justify-center gap-y-1'>
              <View className='w-full flex items-center justify-center px-2'>
                <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>
              </View>

              <View className='w-full flex items-center justify-center px-2'>
                <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>
              </View>
            </View>

            <View className='w-[25%]'>
              <Skeleton circle className='w-full' height={28} />
            </View>
            
          </View>
          
        </View>

        <View className='w-[45%] flex flex-col items-center justify-center gap-y-1'>
          <Skeleton className='w-full h-full rounded-xl' style={{borderRadius:15}} height={140} animation="wave"/>
          {/* <Image
            source={require('@/assets/images/loader.gif')}
            style={{}}
            className='w-full h-32 my-auto rounded-xl mx-auto bg-gray-400'
          /> */}

          <View className='flex flex-row gap-x-1'>

            <View className='flex w-[70%] flex-col items-center justify-center gap-y-1'>
              <View className='w-full flex items-center justify-center px-2'>
                <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>
              </View>

              <View className='w-full flex items-center justify-center px-2'>
                <Skeleton className='w-full rounded-xl' style={{borderRadius:15}} height={10} animation="wave"/>
              </View>
            </View>

            <View className='w-[25%]'>
              <Skeleton circle className='w-full' height={28} />
            </View>
            
          </View>
          
        </View>

      </View>

    </View>
  );
};

export default SkeletonLoader