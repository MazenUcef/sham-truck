import { getFontFamily } from '@/constants/fonts';
import React, { ReactNode } from 'react';
import { ActivityIndicator, GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
  accessibilityLabel?: string;
}

const PRIMARY_COLOR = '#0077B6';
const SECONDARY_COLOR = '#F9844A';
const BORDER_COLOR = '#A5A7AA';

const HEIGHTS: Record<ButtonSize, number> = {
  sm: 40,
  md: 46,
  lg: 56,
};

const FONT_SIZES: Record<ButtonSize, number> = {
  sm: 12,
  md: 13,
  lg: 14,
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  fullWidth = true,
  accessibilityLabel,
}) => {
  const backgroundColor =
    variant === 'primary' ? PRIMARY_COLOR :
      variant === 'secondary' ? SECONDARY_COLOR :
        variant === 'outline' || variant === 'ghost' ? 'transparent' : PRIMARY_COLOR;

  const textColor =
    variant === 'outline' || variant === 'ghost' ? '#0F172A' : 'white';

  const borderWidth = variant === 'outline' ? 1 : 0;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel || title}
      style={[
        styles.base,
        { height: HEIGHTS[size] },
        { backgroundColor },
        { borderWidth, borderColor: BORDER_COLOR },
        fullWidth ? styles.fullWidth : undefined,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
          <Text
            style={[
              styles.text,
              { fontFamily: getFontFamily('bold'), fontSize: FONT_SIZES[size], color: textColor },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: BORDER_COLOR,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.65,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

export default Button;

