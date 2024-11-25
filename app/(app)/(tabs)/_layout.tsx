
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons, Feather } from '@expo/vector-icons'
import { StyleSheet,StatusBar,ScrollView,TextInput,TouchableOpacity,Image, View} from 'react-native';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import {HomeTab, HomeTab2 } from '@/components/homeTabIcon';
import CloseIcon from '@/components/icons/closeIcon';

import 'react-native-gesture-handler'
import Svg, { Path,Rect,Circle } from "react-native-svg"
import { WalletTab, WalletTab2 } from '@/components/walletTabIcon';
import { OrdersTab, OrdersTab2 } from '@/components/ordersTabIcon';
import { AccountTab, AccountTab2 } from '@/components/accountTabIcon';
import QayaIcon from '@/components/icons/qayaIcon';



// function TabBarIcon(props?: {
//     name?: React.ComponentProps<typeof Feather>['name'];
//     Ioniconame?: React.ComponentProps<typeof Ionicons>['name'];
//     color: string;
//     size: number;
//     type?:string
//   }) {
//     if(props?.type == 'ionicons'){
//       return <Ionicons style={{ marginBottom: -3 }} name={props.Ioniconame} size={props.size} color={props.color} />;
//     }
//     return <Feather style={{ marginBottom: -3 }} {...props} />;
// }



export default function TabLayout() {
  
    return (
      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarActiveTintColor: '#FF2E42',
          tabBarInactiveTintColor: '#686767',
          headerShown:false,

        //   tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle:{
            // position:'relative',
            backgroundColor: '#FAFAFA',
            height:70,
            paddingBottom:10,
            paddingTop:10
            // flexDirection:'row',
            // alignItems:'center',
            // rowGap:70
            // padding:15,
          }
        }}>

        <Tabs.Screen
          name="home"
          options={{
            headerShown:false,
            title: 'Home',
            // tabBarStyle:{
            //     paddingVertical:20
            // },
            tabBarIcon: ({ color,focused }) =>(focused ? <HomeTab/> : <HomeTab2/>)
          }}
        />
  
        <Tabs.Screen
          name="wallet"
          options={{
            title: 'Wallet',
            tabBarIcon: ({ color,focused }) => focused ? <WalletTab/> : <WalletTab2/>          
          }}
        />

        <Tabs.Screen
          name="scan"
          options={{
            title: 'Scan',
            tabBarLabel:'hello',
            tabBarLabelStyle:{
                display:'none'
            },
            tabBarIcon: ({ color,focused }) => <QayaIcon/>          
          }}
        />
  
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Orders',
            tabBarIcon: ({ color,focused }) => focused ? <OrdersTab/> : <OrdersTab2/>
          }}
        />
        
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color,focused }) => focused ? <AccountTab/> : <AccountTab2/>
          }}
        />
        
      </Tabs>
    );
  }


