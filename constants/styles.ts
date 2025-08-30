import { FONT_SIZES, getFontFamily } from './fonts';

export const GlobalStyles = {
  // Typography styles
  text: {
    regular: {
      fontFamily: getFontFamily('regular'),
      fontSize: FONT_SIZES.base,
    },
    medium: {
      fontFamily: getFontFamily('medium'),
      fontSize: FONT_SIZES.base,
    },
    semiBold: {
      fontFamily: getFontFamily('semiBold'),
      fontSize: FONT_SIZES.base,
    },
    bold: {
      fontFamily: getFontFamily('bold'),
      fontSize: FONT_SIZES.base,
    },
    extraBold: {
      fontFamily: getFontFamily('extraBold'),
      fontSize: FONT_SIZES.base,
    },
  },

  // Heading styles
  heading: {
    h1: {
      fontFamily: getFontFamily('bold'),
      fontSize: FONT_SIZES['4xl'],
    },
    h2: {
      fontFamily: getFontFamily('bold'),
      fontSize: FONT_SIZES['3xl'],
    },
    h3: {
      fontFamily: getFontFamily('semiBold'),
      fontSize: FONT_SIZES['2xl'],
    },
    h4: {
      fontFamily: getFontFamily('semiBold'),
      fontSize: FONT_SIZES.xl,
    },
    h5: {
      fontFamily: getFontFamily('medium'),
      fontSize: FONT_SIZES.lg,
    },
    h6: {
      fontFamily: getFontFamily('medium'),
      fontSize: FONT_SIZES.base,
    },
  },

  // Button text styles
  button: {
    primary: {
      fontFamily: getFontFamily('semiBold'),
      fontSize: FONT_SIZES.sm,
    },
    secondary: {
      fontFamily: getFontFamily('medium'),
      fontSize: FONT_SIZES.sm,
    },
  },

  // Caption and small text styles
  caption: {
    small: {
      fontFamily: getFontFamily('regular'),
      fontSize: FONT_SIZES.xs,
    },
    medium: {
      fontFamily: getFontFamily('medium'),
      fontSize: FONT_SIZES.sm,
    },
  },
} as const;

// Default text style for the entire app
export const defaultTextStyle = {
  fontFamily: getFontFamily('regular'),
  fontSize: FONT_SIZES.base,
};
