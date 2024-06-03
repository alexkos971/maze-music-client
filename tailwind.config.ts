import type { Config } from 'tailwindcss';
import {THEME_COLORS} from './src/utils/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hocs/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {    
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        primary: ['var(--font-primary)'],
        secondary: ['var(--font-secondary)']      
      },
      zIndex: theme => ({
        "1": "1"
      }),
      width: theme => ({
        'screen': '100dvw'
      }),
      padding: theme => ({
        'container': 'var(--container-padding)',
        'col': 'var(--col-padding)'
      }),
      margin: theme => ({
        'container': 'var(--container-padding)',
        'col': 'var(--col-padding)'
      }),
      height: theme => ({
        'screen': '100dvh'
      }),
      colors: THEME_COLORS
    }
  },
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [
    function ({ addVariant }: { addVariant: any }) {
        addVariant('child', '& > *');
        addVariant('child-[selector]', '& > [selector]');
        addVariant('child-img', '& > svg, & > img');
        addVariant('child-hover', '& > *:hover');
    }
  ],
}
export default config
