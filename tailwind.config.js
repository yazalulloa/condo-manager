/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./src/main/resources/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "../node_modules/tw-elements/dist/js/tw-elements.umd.min.js"
  ],
  plugins: [
    require("tw-elements/dist/plugin.cjs"),
    require("daisyui")
  ],
  theme: {
    extend: {
      maxWidth: {
        '1/4': '25%',
        '1/2': '300px',
        '3/4': '75%',
      },
      maxHeight: {
        '1/4': '25%',
        '1/2': '300px',
        '3/4': '75%',
        '90per': '90%',
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

