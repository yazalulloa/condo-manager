/**    "tw-elements": "1.1.0" */

/** @type {import('tailwindcss').Config} */

module.exports = {
  // darkMode: 'class',
  darkMode: 'media',
  content: [
    "./src/main/resources/**/*.{html,js,ts}",
    "./frontend/**/*.{html,js,ts,css}",
  ],
  plugins: [
    require("@tailwindcss/typography"),
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
      height: {
        '95per': '95%',
      },
      maxWidth: {
        '1/5': '20%',
        '1/4': '25%',
        '1/2': '50%',
        '3/5': '60%',
        '3/4': '75%',
        '9/10': '90%',
        '95per': '95%',
      },
      maxHeight: {
        '1/5': '20%',
        '1/4': '25%',
        '1/2': '50%',
        '3/5': '60%',
        '3/4': '75%',
        '9/10': '90%',
        '95per': '95%',
      },
      minWidth: {
        '1/5': '20%',
        '1/4': '25%',
        '1/2': '50%',
        '3/5': '60%',
        '3/4': '75%',
        '9/10': '90%',
        '95per': '95%',
      },
      zIndex: {
        '11': '11',
      },
      gridTemplateColumns: {
        "two-3-1": "3fr 1fr",
      }
    },
  },
  daisyui: {
    // themes: ["business", "dracula", "cmyk"],
    themes: [
      {
        "business": {
          ...require("daisyui/src/theming/themes")["business"],
          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        }
      }
    ],
    // themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    // darkTheme: "business", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },

}

