/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        overlay: 'rgba(33, 37, 41, 0.4)',
      },
      fontFamily: {
        openLight: 'OpenSans_300Light',
        openNormal: 'OpenSans_400Regular',
        openMedium: 'OpenSans_500Medium',
        openSemibold: 'OpenSans_600SemiBold',
        openBold: 'OpenSans_700Bold',
        openExtrabold: 'OpenSans_800ExtraBold',
      },
    },
  },
  plugins: [],
};
