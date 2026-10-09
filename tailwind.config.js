/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        brand: {
          purple: "#5B21B6",
          deepPurple: "#3B0F7C",
          lilac: "#A78BFA",
          lilacSoft: "#EDE9FE",
          blue: "#2563EB",
          blueDeep: "#1E3A8A",
          crimson: "#DC143C",
          crimsonSoft: "#FCE7EC",
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Manrope"', "system-ui", "sans-serif"],
        display: ['"Manrope"', '"Inter"', "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #3B0F7C 0%, #5B21B6 30%, #2563EB 70%, #DC143C 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, #EDE9FE 0%, #DBEAFE 50%, #FCE7EC 100%)",
        "lilac-crimson": "linear-gradient(120deg, #A78BFA 0%, #DC143C 100%)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.7s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};
