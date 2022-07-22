module.exports = {
  mode: "jit",
  purge: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx", "./src/layouts/**/*.tsx"],
  darkMode: false,
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: "#7e22ce",
        light: "white",
        seconday: "red",
        active: "#7e22ce",
        inactive: "yellow",
        disabled: "grey",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
