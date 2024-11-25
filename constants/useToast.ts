import { useCallback } from 'react';
import Toast from 'react-native-root-toast';

const useToast = () => {
    const showToast = useCallback((message: string, success: boolean, config = {}) => {
      const toastConfig = {
        duration: Toast.durations.LONG,
        position: 70,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        textColor: '#FFFFFF', 
        backgroundColor: success ? '#40916C' : '#C9252D', // Change background based on success
        ...config, // Merge any custom configurations
        borderRadius: 20
      };
  
      Toast.show(message, toastConfig);
    }, []);
  
    return showToast;
  };

export default useToast;