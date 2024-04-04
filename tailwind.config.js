/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class',
  darkMode: 'media',
  content: [
    "./src/main/resources/**/*.{html,js,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "../node_modules/tw-elements/dist/js/tw-elements.umd.min.js"
  ],
  plugins: [
    require("tw-elements/dist/plugin.cjs"),
    require("daisyui")
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'tablet': '960px',
    },
    extend: {
      maxWidth: {
        '1/4': '25%',
        '1/2': '300px',
        '3/4': '75%',
        '9/10': '90%',
      },
      maxHeight: {
        '1/4': '25%',
        '1/2': '300px',
        '3/4': '75%',
        '9/10': '90%',
      },
      minWidth: {
        '1/5': '20%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '3/5': '60%',
      },
      zIndex: {
        '11': '11',
      }
    },
  },
  daisyui: {
    themes: ["cupcake", "dracula", "cmyk"],
    // themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dracula", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },

}

