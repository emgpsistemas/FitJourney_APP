/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        overlay: 'rgba(33, 37, 41, 0.4)',
      },
      fontFamily: {
        openlight: 'OpenSans_300Light',
        opennormal: 'OpenSans_400Regular',
        openmedium: 'OpenSans_500Medium',
        opensemibold: 'OpenSans_600SemiBold',
        openBold: 'OpenSans_700Bold',
        openextrabold: 'OpenSans_800ExtraBold',
      },
    },
  },
  plugins: [],
};
