/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#F05A3B';
const tintColorDark = '#F7F1EA';

export const Colors = {
  light: {
    text: '#2B2622',
    background: '#F7F1EA',
    tint: tintColorLight,
    icon: '#6F6862',
    tabIconDefault: '#6F6862',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F1EAE1',
    background: '#14120F',
    tint: tintColorDark,
    icon: '#C2B8AF',
    tabIconDefault: '#C2B8AF',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'Avenir Next',
    serif: 'Bodoni 72',
    rounded: 'Avenir Next Condensed',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'sans-serif-condensed',
    serif: 'serif',
    rounded: 'sans-serif-medium',
    mono: 'monospace',
  },
  web: {
    sans: "'Trebuchet MS', 'Gill Sans', 'Segoe UI', sans-serif",
    serif: "'Georgia', 'Times New Roman', serif",
    rounded: "'Avenir Next', 'Trebuchet MS', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
