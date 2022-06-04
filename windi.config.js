import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";

export default defineConfig({
  extract: {
    include: ["src/**/*.{vue,html,jsx,tsx}"],
    exclude: ["node_modules", ".git"],
  },
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      maxWidth: {
        mobile: "18rem",
      },
      colors: {
        dominant: "#FAF9F5",
        secondary: "#392A23",
        gold: {
          100: "#FFF8E4",
          500: "#FFC928",
        },
        peach: {
          100: "#FEE6DD",
          300: "#FFC2B1",
          500: "#FD8B7C",
        },
        "aqua-blue": "#00F3D7",
        success: "#51E583",
        fail: "#FF6847",
      },
    },
  },
  plugins: [
    require("windicss/plugin/aspect-ratio"),
    require("windicss/plugin/line-clamp"),
  ],
});
