import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'white': '#fff',
      'black' : '#000',
      'black-36': '#393E46',
      'black-06': '#0F1626',
      'green-05': '#00ADB5',
      'green-a3': '#AAD8D3',
      'red-fc': '#F44C4C',
      'yellow-fa': '#F4E15A',
      'gray-de': '#DEDEDE',
      'gray-4a': '#4A4A4A',
      'gray-40': '#404040',
      'gray-f5': '#F5F5F5',
      'gray-7a': '#7C7C7A',
      'gray-c4': '#C4C4C4',
      'gray-ee': '#EEEEEE',
      'gray-8e': '#8E8E8E',
      'gray-f8': '#F4F6F8',
      'gray-e5': '#E5E5E5'
    }, 
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
      width: theme => ({
        'screen': '100dvw'
      }),
      height: theme => ({
        'screen': '100dvh'
      }),
    },
  },
  plugins: [],
}
export default config
