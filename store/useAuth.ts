import { create } from 'zustand'
import axios,{AxiosError} from 'axios';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';


// import { useRouter } from 'expo-router';

// import { LargeSecureStore } from '@/lib/storage'
// import * as Keychain from 'react-native-keychain';
import * as SecureStore from "expo-secure-store";
import axiosInstance from '@/constants/axiosInstance';
import navigationService from '@/constants/navigationService';
import ChangePassword from '@/app/(app)/changePassWord';


interface userRegister {

    firstName:string;
    lastName:string;
    email:string;
    password:string;
    phoneNumber:string
}
interface loginDetails {
  email:string;
  password:string;
}



export const useAuthStore = create(
  persist(
    (set, get) => ({

  loading: false,
  OtpVerified: 'none',
  isAuthenticated: false,
  user: null,
  walletBalance: 0,


  register: async (userDetails: userRegister) => {

    try {
        set({loading:true})
        const url = '/register';
        const response = await axiosInstance.post(url,{
            firstName:userDetails.firstName,
            lastName:userDetails.lastName,
            phoneNumber:userDetails.phoneNumber,
            email:userDetails.email,
            password:userDetails.password
        });
        
        console.log(response.data);
        // await SecureStore.setItemAsync("token",response.data.token);

        // set({isAuthenticated: true})
        if(response.data.success){
          set({user: response.data.user})
        }
        return response.data
        
    } catch (error: any | AxiosError) {

      console.log(error)
        if (axios.isAxiosError(error))  {
          // Access to config, request, and response
          console.log(error.response?.data)
          return error.response?.data

        } else {
          // Just a stock error
          console.error('Error:', error.message);
        }

    }finally{

        set({loading:false})

    }
    
  },

  subscribe: async (token:string) => {

    try {
        // set({loading:true})
        const url = '/user/subscribe';
        const response = await axiosInstance.post(url,{token: token});
        
        console.log(response.data);

        // if(response.data.success){
        //   set({user: response.data.user})
        // }

        return response.data
        
    } catch (error: any | AxiosError) {

      console.log(error)
        if (axios.isAxiosError(error))  {
          // Access to config, request, and response
          console.log(error.response?.data)
          return error.response?.data

        } else {
          // Just a stock error
          console.error('Error:', error.message);
        }

    }finally{

      // set({loading:false})

    }
    
  },

  recoverAccount: async (email:string) => {

    try {
        set({loading:true})
        const url = '/forgot-password';
        const response = await axiosInstance.post(url,{email:email});
        
        console.log(response.data);

        if(response.data.success){
          set({user: response.data.user})
        }

        return response.data
        
    } catch (error: any | AxiosError) {

      console.log(error)
        if (axios.isAxiosError(error))  {
          // Access to config, request, and response
          console.log(error.response?.data)
          return error.response?.data

        } else {
          // Just a stock error
          console.error('Error:', error.message);
        }

    }finally{

      set({loading:false})

    }
    
  },

  deleteAccount: async (password:string,reason:string) => {

    try {
        set({loading:true})
        const url = '/user/account/delete';
        const response = await axiosInstance.post(url,{password,reason});
        
        console.log(response.data);

        if(response.data.success){
          set({user: response.data.user})
        }

        return response.data
        
    } catch (error: any | AxiosError) {

      console.log(error)
        if (axios.isAxiosError(error))  {
          // Access to config, request, and response
          console.log(error.response?.data)
          return error.response?.data

        } else {
          // Just a stock error
          console.error('Error:', error.message);
        }

    }finally{

      set({loading:false})

    }
    
  },

  updatePassWord: async (payload:{userId:string, password:string}) => {

    try {
        set({loading:true})
        const url = '/update-password';
        const response = await axiosInstance.post(url, payload);
        
        console.log(response.data);

        return response.data
        
    } catch (error: any | AxiosError) {

      console.log(error)
        if (axios.isAxiosError(error))  {
          // Access to config, request, and response
          console.log(error.response?.data)
          return error.response?.data

        } else {
          // Just a stock error
          console.error('Error:', error.message);
        }

    }finally{

        set({loading:false})

    }
    
  },

  ChangePassWord: async (payload:{currentPassword:string, newPassword:string}) => {

    try {
        set({loading:true})
        const url = '/user/change-password';
        const response = await axiosInstance.post(url, payload);
        
        console.log(response.data);

        return response.data
        
    } catch (error: any | AxiosError) {

      console.log(error)
        if (axios.isAxiosError(error))  {
          // Access to config, request, and response
          console.log(error.response?.data)
          return error.response?.data

        } else {
          // Just a stock error
          console.error('Error:', error.message);
        }

    }finally{

        set({loading:false})

    }
    
  },

  updateProfile: async (payload:{firstName:string, lastName:string, email:string, photoUrl:string, phoneNumber:string}) => {

    try {
        set({loading:true})
        const url = '/user/update-profile';
        const response = await axiosInstance.post(url, payload);
        
        console.log(response.data);

        return response.data
        
    } catch (error: any | AxiosError) {

      console.log(error)
        if (axios.isAxiosError(error))  {
          // Access to config, request, and response
          console.log(error.response?.data)
          return error.response?.data

        } else {
          // Just a stock error
          console.error('Error:', error.message);
        }

    }finally{

        set({loading:false})

    }
    
  },

  verifyOTP: async (otp: string, email:string) => {

    try {
        set({loading:true})
        const url = '/verify-Otp';
        const response = await axiosInstance.post(url,{
            code:otp,
            email:email
        });
        
        console.log(response.data);

        return response.data
        
    } catch (error: any | AxiosError) {

      console.log(error)
        if (axios.isAxiosError(error))  {
          // Access to config, request, and response
          console.log(error.response?.data)
          return error.response?.data

        } else {
          // Just a stock error
          console.error('Error:', error.message);
        }

    }finally{

        set({loading:false})

    }
    
  },

  resendOTP: async (email:string) => {

    try {
        set({loading:true})
        const url = '/resent-otp';
        const response = await axiosInstance.post(url,{
          email:email
        });
        
        console.log(response.data);

        return response.data
        
    } catch (error: any | AxiosError) {

      console.log(error)
        if (axios.isAxiosError(error))  {
          // Access to config, request, and response
          console.log(error.response?.data)
          return error.response?.data

        } else {
          // Just a stock error
          console.error('Error:', error.message);
        }

    }finally{

        set({loading:false})

    }
    
  },


  loginUser: async (userDetails: loginDetails) => {

    try {
        set({loading:true})
        const url = '/login';
        const response = await axiosInstance.post(url,{
            email:userDetails.email,
            password:userDetails.password
        });

        console.log(response.data);

        if(response.data.token){
          console.log('actual token',response.data.token)
          set({user: response.data.user})
          set({walletBalance: response.data.user.wallet.balance})
          await SecureStore.deleteItemAsync('token');
          await SecureStore.setItemAsync("token",response.data.token);
          const savedToken = await SecureStore.getItemAsync('token');
          set({isAuthenticated: true})
          console.log('saved token', savedToken)
        }
    
        return response.data

    } catch (error: any | AxiosError) {

      console.log(error)
        if (axios.isAxiosError(error))  {
          // Access to config, request, and response
          console.log(error.response?.data)
          return error.response?.data

        } else {
          // Just a stock error
          console.error('Error:', error.message);
        }

    }finally{

      set({loading:false})

    }
    
  },

  sendVerification: async (email:string,OTP:number) => {

    try {
        const url = '/api/account/sendOTP';
        const response = await axiosInstance.post(url,{
            email:email,
            OTP:OTP
        });

        if (response.status !== 200) {
        console.log(response);
         return false
        }

        console.log(response.data);

        return true
        
    } catch (error) {

      console.log(error)

    }
    
  },

  verifyCard: async (cardNumber:number) => {

    try {
        // set({loading:true})
        const url = '/user/card/verify';
        const response = await axiosInstance.post(url,{cardNumber: cardNumber});
        
        console.log(response.data);

        // if(response.data.success){
        //   set({user: response.data.user})
        // }

        return response.data
        
    } catch (error: any | AxiosError) {

      console.log(error)
        if (axios.isAxiosError(error))  {
          // Access to config, request, and response
          console.log(error.response?.data)
          return error.response?.data

        } else {
          // Just a stock error
          console.error('Error:', error.message);
        }

    }finally{

      // set({loading:false})

    }
    
  },

  addCard: async (payload:{
    cardHolderName:string, 
    cardNumber:number, 
    expiryDate:string, 
    cvv:number, 
    brand:string, 
    cardType:string}) => {

    try {
        // set({loading:true})
        const url = '/user/card/add';
        const response = await axiosInstance.post(url, payload);
        
        console.log(response.data);

        // if(response.data.success){
        //   set({user: response.data.user})
        // }

        return response.data
        
    } catch (error: any | AxiosError) {

      console.log(error)
        if (axios.isAxiosError(error))  {
          // Access to config, request, and response
          console.log(error.response?.data)
          return error.response?.data

        } else {
          // Just a stock error
          console.error('Error:', error.message);
        }

    }finally{

      // set({loading:false})

    }
    
  },

  logOut: async () => {

    try {

      await SecureStore.deleteItemAsync("token")

      set({isAuthenticated: false})

      // router.replace('/signIn')
      navigationService.replace('/signIn','')

      return true
        
    } catch (error) {

      console.log(error)

    }
    
  },


    }),
    {
      name: 'auth-state', // Choose a descriptive name for your persisted state
      storage: createJSONStorage(() => AsyncStorage), // Use SecureStore for secure storage
    }
  )
);

