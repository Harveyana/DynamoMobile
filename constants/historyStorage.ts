import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the key for storing the cart in AsyncStorage
const CART_KEY = 'user_cart';
const HISTORY_KEY = 'HISTORY';
const MAX_HISTORY_ITEMS = 4;


interface Variant {
    name: string;
    value: string;
    price: number
}
// Define the product type
interface Product {
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

// Get the current cart from AsyncStorage
// const getCart = async (): Promise<Product[]> => {
//   try {
//     const cart = await AsyncStorage.getItem(CART_KEY);
//     return cart ? JSON.parse(cart) : [];
//   } catch (error) {
//     console.error('Error getting cart from AsyncStorage', error);
//     return [];
//   }
// };

// const getHistory = async (): Promise<string[]> => {
//   try {
//     const history = await AsyncStorage.getItem(HISTORY_KEY);
//     console.log('which history',history)
//     return history ? JSON.parse(history) : [];

//   } catch (error) {
//     console.error('Error getting history from AsyncStorage', error);
//     return [];
//   }
// };

const getHistory = async (): Promise<string[]> => {
  try {
    const historyString = await AsyncStorage.getItem(HISTORY_KEY);
    console.log('history string ',historyString )
    if (historyString) {
      const history = JSON.parse(historyString);
      console.log('which of History:', history);
      return history.length ? history :[];
    } else {
      console.log('No history found.');
      return [];
    }
  } catch (error) {
    console.error('Error getting history from AsyncStorage:', error);
    return [];
  }
};

// Save the updated cart to AsyncStorage
const saveHistory = async (history: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving history to AsyncStorage', error);
  }
};

// Add a product to the cart
export const addHistory = async (history: string): Promise<void> => {
    if(!history.trim()) return 
    const historyList = await getHistory();
    const historyIndex = historyList.findIndex((item) => item === history);
  
    if (historyIndex === -1) {
      // If product does not exist in the cart, add it with initial quantity
      historyList.unshift(history);
      console.log('saved history search')
    }
    // If the list exceeds the maximum length, remove the oldest item (last element)
    if (historyList.length > MAX_HISTORY_ITEMS) {
      historyList.pop();
    }
  
    await saveHistory(historyList);
  };

// Remove a product from the cart
export const removeHistory = async (history: string): Promise<void> => {
  let historyList = await getHistory();
  historyList = historyList.filter(item => item !== history);
  await saveHistory(historyList);
};

// Clear the cart
export const clearHistoryList = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history in AsyncStorage', error);
  }
};

// Retrieve the cart
export const retrieveHistory = async (): Promise<string[]> => {
  return await getHistory();
};


  // export const formatNumber = (number: number): string => {
  //   return new Intl.NumberFormat('en-US').format(number);
  // };

