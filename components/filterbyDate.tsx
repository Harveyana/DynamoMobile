import { FlatList,Pressable,  Modal, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,Button, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome,Ionicons, MaterialIcons  } from '@expo/vector-icons';
// import { Image } from 'expo-image';

import AddToCart from '@/components/addToCart';
import { useNavigation,useRouter } from 'expo-router';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from 'react-native-ui-datepicker';


import { SansText, SoraText } from '@/components/StyledText';
import Banner from '@/components/banner';
import React, { useCallback, useMemo, useRef,useState, useEffect } from 'react';
import CloseIcon from './icons/closeIcon';
// 
import DateIcon from './icons/dateIcon';
import CategoryCard from '@/components/categoryCard';
import dayjs from 'dayjs'


type props = {
  OnUpdate: (payload:{startDate:any,endDate:any}) => void;
}



const FilterByDate = ({OnUpdate}:props) => {
  
  const [checked, setChecked] = useState('last30days');
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const [selectedRange, setSelectedRange] = useState<{startDate:any,endDate:any}>({endDate: "2024-09-25T02:38:44.128Z", startDate: "2024-09-18T02:38:44.128Z"});
  const [date, setDate] = useState(dayjs());

  
    const handleRangeSelection = (days:number,state:string) => {
      const currentDate = dayjs();
      const startDate = currentDate.subtract(days, 'day');
      const endDate = currentDate;

      console.log({ startDate, endDate })

      setChecked(state)
      setSelectedRange({ startDate, endDate });
    };

    useEffect(() => {
      OnUpdate(selectedRange)
      setShowStartDate(false)
      setShowEndDate(false)
    }, [selectedRange]);
  
  

  return (
    <SafeAreaView className=' bg-white'>
          
        {/* <ScrollView 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        > */}
          <View className='flex flex-col gap-y-3'>


            <View className='px-1 flex flex-col items-start'>
              <SoraText style={{fontSize:16,color:'#080708'}}>
                Filter by date
              </SoraText>

              <View className='flex flex-col gap-y-1'>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                    Today 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="first"
                    status={ checked === 'today' ? 'checked' : 'unchecked' }
                    onPress={() => handleRangeSelection(0,'today')}
                  />

                </View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                    Last 7 days 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="first"
                    status={ checked === 'last7days' ? 'checked' : 'unchecked' }
                    onPress={() => handleRangeSelection(7,'last7days')}
                  />

                </View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                    Last 30 days 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="first"
                    status={ checked === 'last30days' ? 'checked' : 'unchecked' }
                    onPress={() => handleRangeSelection(30,'last30days')}
                  />

                </View>

                <View className='w-full flex flex-row items-center justify-between'>
                  <SansText style={{fontSize:14,color:'#080708',fontWeight:'600'}}>
                    Custom Range 
                  </SansText>

                  <RadioButton
                    color='#f92e43'
                    uncheckedColor='#e4e4e4'
                    value="first"
                    status={ checked === 'custom' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('custom')}
                  />
                  

                </View>


              </View>

            </View>

            { checked === 'custom' && <View className='w-full flex items-start justify-between gap-y-3'>

                  <View className='w-full items-start justify-between pt-1 flex flex-row'>

                    <TouchableOpacity onPress={()=>(setShowStartDate(!showStartDate))} className='w-[46%] rounded-lg border border-[#CDD0D5] flex flex-row items-center justify-between px-2'>
                      <SansText className=' px-4 py-3 rounded-lg ' 
                        style={{fontSize:15,color:'black',fontWeight:'500'}}>
                      {dayjs(selectedRange?.startDate).format('DD-MM-YYYY')} 
                      </SansText>
                      <DateIcon />
                    </TouchableOpacity>
                      
                    <TouchableOpacity onPress={()=>(setShowEndDate(!showEndDate))} className='w-[46%] rounded-lg border border-[#CDD0D5] flex flex-row items-center justify-between px-2'>
                      <SansText style={{fontSize:15,color:'black',fontWeight:'500'}} 
                      className=' px-4 py-3 rounded-lg'>
                      {dayjs(selectedRange?.endDate).format('DD-MM-YYYY')}
                      </SansText>
                      <DateIcon />
                    </TouchableOpacity>

                  </View>

                  <View className='' style={styles.centeredView}>

                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={showStartDate}
                      onRequestClose={() => {
                        setShowStartDate(!showStartDate);
                      }}>
                      <View className='flex items-center justify-center bg-black/30' style={{ flex: 1, marginTop: 22, }}>
                        <View className=' flex flex-col items-center justify-center bg-white rounded-3xl px-[25px] m-[20px]'>
                          <View className='w-full flex-row items-center justify-between my-4'>
                            <SoraText style={{fontSize:16,color:'#080708',fontWeight:'600'}}>
                              Start Date
                            </SoraText>
                            <TouchableOpacity onPress={()=>(setShowStartDate(!showStartDate))} className='flex flex-col gap-y-1'>
                              <CloseIcon />
                            </TouchableOpacity>
                          </View>
                        <DateTimePicker
                          mode="single"
                          selectedItemColor='#FF2E42'
                          selectedRangeBackgroundColor='#FFF0F1'
                          // dayContainerStyle={{backgroundColor:'#FF2E42'}}
                          selectedTextStyle={{color:'white'}}
                          date={date}
                          // onChange={({startDate, endDate})=>{console.log({startDate, endDate})}}
                          onChange={(params) => setSelectedRange((prev)=>{  return { startDate: params.date, endDate: prev.endDate }})}
                        />
                    
                        </View>
                      </View>
                    </Modal>

                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={showEndDate}
                      onRequestClose={() => {
                        setShowEndDate(!showEndDate);
                      }}>
                      <View className='flex items-center justify-center bg-black/30' style={{ flex: 1, marginTop: 22, }}>
                        <View className='z-20 flex flex-col items-center justify-center bg-white rounded-3xl px-[25px] m-[20px]'>
                          <View className='w-full flex-row items-center justify-between my-4'>
                            <SoraText style={{fontSize:16,color:'#080708',fontWeight:'600'}}>
                              End Date
                            </SoraText>
                            <TouchableOpacity onPress={()=>(setShowEndDate(!showEndDate))} className='flex flex-col gap-y-1'>
                              <CloseIcon />
                            </TouchableOpacity>
                          </View>
                          <DateTimePicker
                            mode="single"
                            selectedItemColor='#FF2E42'
                            selectedRangeBackgroundColor='#FFF0F1'
                            // dayContainerStyle={{backgroundColor:'#FF2E42'}}
                            selectedTextStyle={{color:'white'}}
                            date={date}
                            // onChange={(params) => console.log(params.date)}
                            onChange={(params) => setSelectedRange((prev)=>{  return { startDate: prev.startDate, endDate: params.date }})}
                          />
                    
                        </View>
                      </View>
                    </Modal>

                  </View>
                  


            </View>}

          </View>

          

        {/* </ScrollView> */}



    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black',
    opacity: 0.7
  },
  modalView: {
    margin: 20,
    // backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default FilterByDate
