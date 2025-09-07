import EyeIcon from '@/assets/icons/Auth/EyeIcon';
import LockIcon from '@/assets/icons/Auth/LockIcon';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ThemedTextInput, { ThemedTextInputProps } from './ThemedTextInput';

export interface PasswordInputProps extends Omit<ThemedTextInputProps, 'leftIcon' | 'rightIcon'> {
  placeholder?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder = 'Enter password',
  style,
  containerStyle,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ThemedTextInput
      {...rest}
      placeholder={placeholder}
      secureTextEntry={!isPasswordVisible}
      leftIcon={
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
          <EyeIcon />
        </TouchableOpacity>
      }
      rightIcon={
        <LockIcon />
      }
      style={[styles.passwordInput, style]}
      containerStyle={[styles.passwordContainer, containerStyle]}
    />
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingLeft: 50, // Space for left icon (eye)
    paddingRight: 50, // Space for right icon (lock)
  },
  iconButton: {
    padding: 5,
  },
});

export default PasswordInput;
