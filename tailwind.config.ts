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
      spacing: {
        "1.2": "5px",
        "3.75": "15px",
        "13": "50px",
      },
      margin: {
        "1.2": "5px",
        "3.75": "15px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "offer-pattern": "url('/images/offer.png')",
      },
      boxShadow: {
        service: "0 0px 5px 0 rgba(0, 0, 0, 22%)",
        card: "0 0px 5px 0 rgba(0, 0, 0, 10%)",
      },
      borderRadius: {
        pillcustom: "25px",
        cardcustom: "50px",
      },
      animation: {
        moveIt: "moveIt 3.5s ease-in-out infinite",
        flash: "flash 7s ease-in-out infinite",
        "flash-slow": "flash 10s ease-in-out infinite",
      },
      keyframes: {
        moveIt: {
          "0%, 100%": { transform: "rotate(40deg)" },
          "50%": { transform: "rotate(-40deg)" },
        },
        flash: {
          "0%, 50%, 100%": { opacity: "1" },
          "25%, 75%": { opacity: "0" },
        },
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
    screens: {
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
    },
  },
  plugins: [],
};
export default config;
