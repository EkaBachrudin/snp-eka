import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'worksans': ['"Work Sans"', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        'black': '900', // Work Sans Black
        'bold': '700', // Work Sans Bold
        'extrabold': '800', // Work Sans ExtraBold
        'extralight': '200', // Work Sans ExtraLight
        'light': '300', // Work Sans Light
        'medium': '500', // Work Sans Medium
        'regular': '400', // Work Sans Regular
        'semibold': '600', // Work Sans SemiBold
        'thin': '100', // Work Sans Thin
      },
      fontSize: {
        "f-8": "8px",
        "f-10": "10px",
        "f-11": "11px",
        "f-12": "12px",
        "f-13": "13px",
        "f-14": "14px",
        "f-15": "15px",
        "f-16": "16px",
        "f-17": "17px",
        "f-18": "18px",
        "f-19": "19px",
        "f-20": "20px",
        "f-24": "24px",
        "f-28": "28px",
        "f-32": "32px",
        "f-40": "40px",
        "f-56": "56px",
        "f-72": "72px"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
