import { FONT_SIZES, getFontFamily } from '@/constants/fonts';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

export type FontWeightKey = 'extraLight' | 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold' | 'black';
export type TextVariant = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export interface ThemedTextProps extends TextProps {
  weight?: FontWeightKey;
  variant?: TextVariant;
  style?: StyleProp<TextStyle>;
}

const sizeMap: Record<TextVariant, number> = {
  xs: FONT_SIZES.xs,
  sm: FONT_SIZES.sm,
  base: FONT_SIZES.base,
  lg: FONT_SIZES.lg,
  xl: FONT_SIZES.xl,
  '2xl': FONT_SIZES['2xl'],
  '3xl': FONT_SIZES['3xl'],
  '4xl': FONT_SIZES['4xl'],
};

export const ThemedText: React.FC<ThemedTextProps> = ({
  weight = 'regular',
  variant = 'base',
  style,
  children,
  ...rest
}) => {
  return (
    <Text
      {...rest}
      style={[
        styles.base,
        { fontFamily: getFontFamily(weight), fontSize: sizeMap[variant] },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: '#0F172A',
  },
});

export default ThemedText;
