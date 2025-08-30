export const FONTS = {
  // Cairo Font Family (Default)
  CAIRO_REGULAR: 'Cairo-Regular',
  CAIRO_MEDIUM: 'Cairo-Medium',
  CAIRO_BOLD: 'Cairo-Bold',
  CAIRO_SEMIBOLD: 'Cairo-SemiBold',
  CAIRO_LIGHT: 'Cairo-Light',
  CAIRO_EXTRALIGHT: 'Cairo-ExtraLight',
  CAIRO_BLACK: 'Cairo-Black',
  CAIRO_EXTRABOLD: 'Cairo-ExtraBold',

  // Legacy fonts
  SPACE_MONO: 'SpaceMono',
} as const;

// Default font family
export const DEFAULT_FONT = FONTS.CAIRO_REGULAR;

export const FONT_WEIGHTS = {
  extraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

// Helper function to get font family based on weight
export const getFontFamily = (weight: keyof typeof FONT_WEIGHTS = 'regular') => {
  const fontMap = {
    extraLight: FONTS.CAIRO_EXTRALIGHT,
    light: FONTS.CAIRO_LIGHT,
    regular: FONTS.CAIRO_REGULAR,
    medium: FONTS.CAIRO_MEDIUM,
    semiBold: FONTS.CAIRO_SEMIBOLD,
    bold: FONTS.CAIRO_BOLD,
    extraBold: FONTS.CAIRO_EXTRABOLD,
    black: FONTS.CAIRO_BLACK,
  };
  return fontMap[weight];
};
