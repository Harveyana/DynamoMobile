import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect,useState } from 'react';
import {Slot} from "expo-router";
import "../global.css"
import { View } from 'react-native';
import { AuthContextProvider, useAuth } from '../context/authContext';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from '@/store/useAuth';
import navigationService from '@/constants/navigationService';




export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'steps',
};

export const MainLayout = ()=>{
  // const [token, setToken] = useState<string|null>(null)
  const isAuthenticated = useAuthStore((state:any) => state.isAuthenticated)
  // const token = useAuthStore((state:any) => state.token)
  
  const segments = useSegments();
  const router = useRouter()


  useEffect(() => {
    navigationService.setRouter(router);
  }, [router]);
  // useEffect(()=>{
  //   // check if user is authenticated or not 

  //   const initializeAuth = async () => {
  //     const token = await SecureStore.getItemAsync('token');
  //     if (token) {
  //       console.log(token);
  //       useAuthStore.setState({ isAuthenticated: true});
  //     }

  //   };

  //   initializeAuth();
    
  //   const inApp = segments[0]=='(app)';
    
  //   if(isAuthenticated && !inApp){
  //     // redirect to home 
  //     router.replace('/(app)/(tabs)/home');
  //   }else if(!isAuthenticated){
  //     // redirect to signin page
  //     router.replace('/signIn');
  //   }

  // },[isAuthenticated])

  return (
    <View className='flex-1'>
      <Slot />
    </View>
  )
  
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Sora: require('../assets/fonts/Sora-Medium.ttf'),
    Sans: require('../assets/fonts/GeneralSans-Regular.ttf'),
    SansBold: require('../assets/fonts/GeneralSans-Semibold.ttf'),
    ...FontAwesome.font,
  });
  const router = useRouter()
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const initializeAuth = async () => {
    const token = await SecureStore.getItemAsync('token');
    if (!token) {
      console.log('no token');
      router.replace('/steps');
      // router.replace('/signIn');
      // useAuthStore.setState({ isAuthenticated: true});
    }else{
      router.replace('/(app)/(tabs)/home');
    }

  };
  useEffect(() => {
    initializeAuth()
  });


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <GestureHandlerRootView>
    <AuthContextProvider>
      <RootSiblingParent>
        <MainLayout />
      </RootSiblingParent>
    </AuthContextProvider>
    
    // </GestureHandlerRootView>
  )
}




