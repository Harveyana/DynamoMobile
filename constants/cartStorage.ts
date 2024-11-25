import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the key for storing the cart in AsyncStorage
const CART_KEY = 'user_cart';

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
const getCart = async (): Promise<Product[]> => {
  try {
    const cart = await AsyncStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error getting cart from AsyncStorage', error);
    return [];
  }
};

// Save the updated cart to AsyncStorage
const saveCart = async (cart: Product[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to AsyncStorage', error);
  }
};

// Add a product to the cart
export const addProductToCart = async (product: Product): Promise<void> => {
    const cart = await getCart();
    const productIndex = cart.findIndex((item) => item.id === product.id);
  
    if (productIndex === -1) {
      // If product does not exist in the cart, add it with initial quantity
      cart.push(product);
    } else {
      // If product exists in the cart, increase its quantity
      cart[productIndex].cart_Quantity += 1;
    }
  
    await saveCart(cart);
  };

// Remove a product from the cart
export const removeProductFromCart = async (productId: string): Promise<void> => {
  let cart = await getCart();
  cart = cart.filter(product => product.id !== productId);
  await saveCart(cart);
};

// Clear the cart
export const clearCart = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error('Error clearing cart in AsyncStorage', error);
  }
};

// Retrieve the cart
export const retrieveCart = async (): Promise<Product[]> => {
  return await getCart();
};


 // Increase the quantity of a product in the cart
 export const increaseProductQuantity = async (productId: string): Promise<void> => {
    const cart = await getCart();
    const productIndex = cart.findIndex((item) => item.id === productId);
  
    if (productIndex !== -1) {
      cart[productIndex].cart_Quantity += 1;
      await saveCart(cart);
    }
  };

  
  // Decrease the quantity of a product in the cart
  export const decreaseProductQuantity = async (productId: string): Promise<void> => {
    const cart = await getCart();
    const productIndex = cart.findIndex((item) => item.id === productId);
  
    if (productIndex !== -1) {
      if (cart[productIndex].cart_Quantity > 1) {
        cart[productIndex].cart_Quantity -= 1;
        await saveCart(cart);
      } else {
        // Remove product if quantity is 1
        await removeProductFromCart(productId);
      }
    }
  };


  export const formatNumber = (number: number): string => {
    return new Intl.NumberFormat('en-US').format(number);
  };

