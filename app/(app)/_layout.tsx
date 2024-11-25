import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import CustomHeader from '@/components/customHeader';
import { ImageBackground } from 'react-native';
import usePushNotification from '@/constants/usePushNotification'

export default function RootLayoutNav() {

  const { expoPushToken, notification } = usePushNotification()

  console.log('this is the push token', expoPushToken)
    return (
        <Stack>
          {/* <Stack.Screen 
            name="home"
            options={{
             headerShown:false
            }} 
          /> */}
          <Stack.Screen name="products" options={{ presentation: 'modal',headerShown:false }} />
          <Stack.Screen name="product" options={{ presentation: 'modal',headerShown:false }} />

          <Stack.Screen name="fundWallet" options={{ presentation: 'modal',headerShown:false }} />
          <Stack.Screen name="notifications" options={{headerShown:false }} />
          <Stack.Screen name="transactions" options={{ presentation: 'modal',headerShown:false }} />
          <Stack.Screen name="categories" options={{ presentation: 'modal',headerShown:false }} />
          <Stack.Screen name="search" options={{ presentation: 'modal',headerShown:false }} />
          <Stack.Screen name="filter" options={{ presentation: 'modal',headerShown:false }} />
          <Stack.Screen name="cart" options={{ presentation: 'modal',headerShown:false }} />
          <Stack.Screen name="profile" options={{ headerShown:false }} />
          <Stack.Screen name="deleteAccount" options={{ headerShown:false }} />
          <Stack.Screen name="security" options={{ headerShown:false }} />
          <Stack.Screen name="changePassWord" options={{ headerShown:false }} />
          <Stack.Screen name="biometrics" options={{ headerShown:false }} />
          <Stack.Screen name="cards" options={{ headerShown:false }} />
          <Stack.Screen name="addCard" options={{ headerShown:false }} />
          <Stack.Screen name="support" options={{ headerShown:false }} />
          <Stack.Screen name="order" options={{headerShown:false }} />
          <Stack.Screen name="(tabs)" options={{headerShown:false }} />
          {/* <Stack.Screen name="home" options={{headerShown:false }} /> */}

        </Stack>
    );
  }