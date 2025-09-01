import { getFontFamily } from '@/constants/fonts';
import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import ThemedText from './ThemedText';

export type FontWeightKey = 'extraLight' | 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold' | 'black';

export interface ThemedTextInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  weight?: FontWeightKey;
  errorText?: string;
}

export const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  containerStyle,
  leftIcon,
  rightIcon,
  weight = 'regular',
  errorText,
  style,
  editable = true,
  placeholderTextColor = '#878A8E',
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle, !editable && styles.disabledContainer]}>
      {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}
      <TextInput
        {...rest}
        editable={editable}
        placeholderTextColor={placeholderTextColor}
        style={[
          styles.input,
          { fontFamily: getFontFamily(weight) },
          style,
        ]}
      />
      {rightIcon ? <View style={styles.iconRight}>{rightIcon}</View> : null}
      {!!errorText && (
        <ThemedText style={styles.errorText} numberOfLines={2}>
          {errorText}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
  },
  disabledContainer: {
    opacity: 0.6,
  },
  input: {
    height: 46,
    borderRadius: 8,
    backgroundColor: '#F4F4F4CC',
    paddingHorizontal: 10,
    color: '#0F172A',
  },
  iconLeft: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  iconRight: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  errorText: {
    marginTop: 4,
    color: 'red',
    fontSize: 10,
    fontFamily: getFontFamily('regular'),
    textAlign: 'right',
  },
});

export default ThemedTextInput;
