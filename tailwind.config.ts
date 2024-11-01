import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
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
        "7.5": "30px",
        "13": "50px",
        "25": "100px",
      },
      margin: {
        "1.2": "5px",
        "3.75": "15px",
        "7.5": "30px",
        "25": "100px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        service: "0 0px 5px 0 rgba(0, 0, 0, 22%)",
        card: "0 0px 5px 0 rgba(0, 0, 0, 10%)",
        headerItems: "0 6px 12px rgb(0 0 0 / 18%)",
        header: "0 6px 10px rgb(0 0 0 / 20%)",
        mobileHeader: "0px 5px 12px 0px rgb(0 0 0 / 10%);",
      },
      borderRadius: {
        pillcustom: "25px",
        cardcustom: "50px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        moveIt: "moveIt 3.5s ease-in-out infinite",
        flash: "flash 7s ease-in-out infinite",
        "flash-slow": "flash 10s ease-in-out infinite",
        rightToLeft: "rightToLeft 5s ease-in-out infinite",
        topToBottom: "topToBottom 1s infinite",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        moveIt: {
          "0%, 100%": {
            transform: "rotate(40deg)",
          },
          "50%": {
            transform: "rotate(-40deg)",
          },
        },
        flash: {
          "0%, 50%, 100%": {
            opacity: "1",
          },
          "25%, 75%": {
            opacity: "0",
          },
        },
        rightToLeft: {
          "0%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(-50px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        topToBottom: {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      colors: {
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        primary: "#3c3e3d",
        primaryHover: "#fdc600",
        secondary: "#ffffff",
        secondaryHover: "#ccf7ff",
        secondaryLight: "#777777",
        backgroundColor: "#f9f9f9",
        borderColor: "#dddddd",
        danger: "#F8D7DA",
      },
    },

    screens: {
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
      "3xl": "1500px",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
