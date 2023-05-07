/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chPurple: "hsl(259, 100%, 65%)",
        chLightRed: "hsl(0, 100%, 67%)",
        chOffWhite: "hsl(0, 0%, 100%)",
        chLightGrey: "hsl(0, 0%, 86%)",
        chSmokeyGrey: "hsl(0, 1%, 44%)",
        chOffBlack: "hsl(0,0%, 8%)",
      },
    },
  },
  plugins: [],
};
