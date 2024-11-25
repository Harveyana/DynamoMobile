import { create } from 'zustand'
import axios,{AxiosError} from 'axios';

// import { LargeSecureStore } from '@/lib/storage'
// import * as Keychain from 'react-native-keychain';
import * as SecureStore from "expo-secure-store";
import axiosInstance from '@/constants/axiosInstance';


interface userRegister {

    firstName:string;
    lastName:string;
    email:string;
    password:string;
    phoneNumber:string
}

interface Product {
  id:string;
  storeId:string;
  name:string;
  SKU:string;
  price:number;
  Description:string; 
  salesStartDate:string;
  salesEndDate:string;
  Sale_Status:string;
  Sales_price:number;    
  createdAt:string;
  Quantity:number;
  cart_Quantity:number;    
  Expiry_date:string;
  images:string[];
  categories:string[];
}

interface orderProduct {
  id:string;
  storeId:string;
  name:string;
  SKU:string;
  price:number;
  Variants:Variant[];
  cart_Quantity:number;    
  images:string[];
  categories:string[];
}


interface Variant {
  name: string;
  value: string;
  price: number
}

interface cartProduct {
  id:string;
  storeId:string;
  price:number;
  quantity:number;
  variants:Variant[];
}





export const useProductStore = create((set) => ({
  loading: false,
  Store_id: '',
  Store_Name: '',
  totalCart: 0,
  key: 0,
  cart:[],
 

  register: async (userDetails: userRegister) => {

    try {
        set({loading:true})
        const url = '/api/account/register';
        const response = await axiosInstance.post(url,{
            firstName:userDetails.firstName,
            lastName:userDetails.lastName,
            phoneNumber:userDetails.phoneNumber,
            email:userDetails.email,
            password:userDetails.password
        });

        if (response.status !== 200) {
        console.log(response);
         return null
        }

        
        console.log(response.data);
        // console.log(response.data.session.access_token);

        await SecureStore.setItemAsync("token",response.data.token);

        // const email = await SecureStore.getItemAsync("email");

        // console.log("this is email",email)

        set({isAuthenticated: true})

        return response.data
        
    } catch (error) {

      console.log(error)

    }finally{

        set({loading:false})

    }
    
  },

  getProduct: async (productId:string) => {

         set({loading:true})
         
        try {
          const url = '/products/fetchProduct';
          
          const response = await axiosInstance.get(url, {
            params: {
              productId,
            },
            withCredentials: true
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

  getProductReviews: async (productId:string,limit?:number) => {

    // set({loading:true})
    
   try {
     const url = `/products/review/${productId}`;
     
     const response = await axiosInstance.get(url, {
       params: {
        limit
       },
       withCredentials: true
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
  //  set({loading:false})
  }
  

  },

  getProductSToReview: async () => {

    // set({loading:true})
    
  try {
    const url = '/products/ready-to-review';
    
    const response = await axiosInstance.get(url);
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
  //  set({loading:false})
  }


  },

  submitReview: async (productId:string,rating:number, feedback:string) => {

    try {
        set({loading:true})
        const url = `/products/review/${productId}`;
        const response = await axiosInstance.post(url,{rating, feedback});
        
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

  addToCart: async (product:cartProduct) => {

    try {
        set({loading:true})
        const url = '/products/cart/add';
        const response = await axiosInstance.post(url,{product});
        
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

  removeFromCart: async (product:cartProduct) => {

    try {
        set({loading:true})
        const url = '/products/cart/remove';
        const response = await axiosInstance.post(url,{product});
        
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

  increaseQuantity: async (product:cartProduct) => {

    try {
        set({loading:true})
        const url = '/products/cart/increase';
        const response = await axiosInstance.post(url,{product});
        
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

  reduceQuantity: async (product:cartProduct) => {

    try {
        set({loading:true})
        const url = '/products/cart/reduce';
        const response = await axiosInstance.post(url,{product});
        
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

  getCart: async (storeId:string) => {

    // set({loading:true})

    try {

        const url = '/products/cart';
        const response = await axiosInstance.get(url, {
          params: {
            storeId: storeId
          },
          withCredentials: true
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
      // set({loading:false})
    }

  },


  getPopularProducts: async (limit:string, storeId:string) => {

    // set({loading:true})
    
   try {
     const url = '/products/popular';
     
     const response = await axiosInstance.get(url, {
       params: {
        limit, 
        storeId
       },
       withCredentials: true
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
  //  set({loading:false})
  }
  

   

   


  },


  getDeals: async (storeId:string,limit?:number) => {

    // set({loading:true})

    try {

        const url = '/products/fetchDeals';
        
        const response = await axiosInstance.get(url, {
          params: {
            storeId: storeId,
            limit: limit
          },
          withCredentials: true
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
      // set({loading:false})
    }

  },

  getTransactions: async (limit?:number) => {

    // set({loading:true})

    try {

        const url = '/user/transactions';
        
        const response = await axiosInstance.get(url, {
          params: {
            limit: limit
          },
          withCredentials: true
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
      // set({loading:false})
    }

  },

  getStores: async (longitude:number,latitude:number) => {
    // set({loading:true})

     try {

        const url = '/fetchStores';
        
        const response = await axiosInstance.get(url, {
          params: {
            // longitude,
            // latitude
          },
          withCredentials: true
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
      // set({loading:false})
     }
       

    
  },

  getWalletBalance: async () => {
    set({loading:true})

     try {

        const url = '/user/wallet/balance';
        
        const response = await axiosInstance.get(url);

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

  createOrder: async (storeId:string) => {
    set({loading:true})

     try {

       console.log({
        storeId,
      })

        const url = '/orders/create';
        
        const response = await axiosInstance.post(url, {
          storeId
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

  updateOrder: async (orderId:string,method:string) => {
    set({loading:true})

     try {

        const url = '/orders/update';
        
        const response = await axiosInstance.post(url,{
          orderId,
          method
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

  updateWallet: async (amount:string, transactionId:string) => {
    set({loading:true})

     try {

        const url = '/user/wallet/fund';
        
        const response = await axiosInstance.post(url, {
          amount,
          transactionId
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

  getOrder: async (orderId:string) => {
    set({loading:true})

     try {

        const url = '/orders/fetchOrder';
        
        const response = await axiosInstance.get(url, {
          params: {
            orderId
          }
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

     } finally{
      set({loading:false})
    }
      
  },

  getOrders: async (cursor?:string,limit?:number) => {
    set({loading:true})

     try {

        const url = '/orders/fetchOrders';
        
        const response = await axiosInstance.get(url, {
          params: {
            cursor,
            limit
          }
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

     } finally{
      set({loading:false})
    }
      
  },

  getSummary: async (cart:Product[]) => {

        if (!Array.isArray(cart)) {
          set({loading:false})
          return null
        }
    
        const total = cart.reduce((acc, product) => {
          return acc + product.price * product.cart_Quantity;
        }, 0);
    
        console.log(total)
    
        return total
  },

  searchProducts: async (storeId:string,search:string) => {

    // set({loading:true})

    try {

        const url = '/products/search';
        
        const response = await axiosInstance.get(url, {
          params: {
            storeId: storeId,
            search: search
          },
          withCredentials: true
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
      // set({loading:false})
    }

  },

  filterProducts: async (
    storeId:string,
    limit:number,
    category:string,
    startDate:string,
    endDate:string,
    minPrice: number,
    maxPrice: number

  ) => {

    set({loading:true})

    try {

        const url = '/products/filter';
        
        const response = await axiosInstance.get(url, {
          params: {
            storeId: storeId,
            limit: limit,
            category: category,
            date_from : startDate,
            date_to: endDate,
            min_price: minPrice, 
            max_price: maxPrice
          },
          withCredentials: true
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

  filterTransactions: async (
    limit:number,
    type:string,
    status:string,
    startDate:string,
    endDate:string
  ) => {

    // set({loading:true})

    try {

        const url = '/user/transactions/filter';
        
        const response = await axiosInstance.get(url, {
          params: {
            limit: limit,
            type: type,
            status: status,
            date_from : startDate,
            date_to: endDate
          },
          withCredentials: true
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
      // set({loading:false})
    }

  },

  getNotifications: async (limit?:number) => {
    // set({loading:true})

     try {

        const url = '/user/notification';
        
        const response = await axiosInstance.get(url, {
          params: {
            limit
          }
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

     } finally{
      // set({loading:false})
    }
      
  },

  getAdverts: async () => {
    // set({loading:true})

     try {

        const url = '/adverts';
        
        const response = await axiosInstance.get(url);
         
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

     } finally{
      // set({loading:false})
    }
      
  },

  filterNotifications: async (
    limit:number,
    type:string,
    startDate:string,
    endDate:string
  ) => {

    // set({loading:true})

    try {

        const url = '/user/notification/filter';
        
        const response = await axiosInstance.get(url, {
          params: {
            limit: limit,
            type: type,
            date_from : startDate,
            date_to: endDate

          },
          withCredentials: true
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
      // set({loading:false})
    }

  },
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
}))

