import React, { useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { SansText, SoraText } from '@/components/StyledText';
import EyeIcon from '@/components/icons/eyeIcon';


interface PasswordInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
  }

const PasswordInput = ({ value, onChangeText, placeholder }:PasswordInputProps) => {
//   const showPasswordRef = useRef(true);

//   const toggleShowPassword = () => {
//     showPasswordRef.current = !showPasswordRef.current;
//   };

const [showPassword, setShowPassword] = useState<boolean>(false); 
  
    // Function to toggle the password visibility state 
  const toggleShowPassword = () => { 
    setShowPassword(!showPassword); 
  }; 

  return (
    <View className='flex flex-col items-start justify-center gap-y-2'>
      <SansText style={{ fontSize: 16, color: '#080708', fontWeight: '400' }}>
        Enter Password
      </SansText>
      <View className='border border-[#E4E5E7] rounded-xl w-full flex flex-row items-center justify-between'>
        <TextInput
          className='w-[85%] px-4 py-2 rounded-xl'
          onChangeText={onChangeText}
                      value={value}
                      secureTextEntry={showPassword}
                      placeholder="hello@alignui.com"
                      autoCapitalize={'none'}
        />
        <TouchableOpacity onPress={()=> toggleShowPassword()} className='mx-3'>
          <EyeIcon/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordInput;