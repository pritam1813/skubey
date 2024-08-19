import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "tw-",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: "#3c3e3d",
      primaryHover: "#fdc600",
      secondary: "#ffffff",
      secondaryHover: "#ccf7ff",
      secondaryLight: "#777777",
      backgroundColor: "#f9f9f9",
      borderColor: "#dddddd",
    },
  },
  plugins: [],
};
export default config;
