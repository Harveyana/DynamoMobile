import * as SecureStore from 'expo-secure-store';

// Function to log the user out
export const logout = async() => {
  try {
    await SecureStore.deleteItemAsync('token');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
