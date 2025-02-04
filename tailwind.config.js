// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   darkMode: "class", // Enable dark mode with class strategy
//   theme: {
//     extend: {
//       colors: {
//         // Light mode colors
//         primary: {
//           50: "#f0f9ff",
//           100: "#e0f2fe",
//           200: "#bae6fd",
//           300: "#7dd3fc",
//           400: "#38bdf8",
//           500: "#0ea5e9",
//           600: "#0284c7",
//           700: "#0369a1",
//           800: "#075985",
//           900: "#0c4a6e",
//         },
//         // Dark mode specific colors
//         dark: {
//           "bg-primary": "#d81324",
//           "bg-secondary": "#2d2d2d",
//           "text-primary": "#ffffff",
//           "text-secondary": "#a3a3a3",
//         },
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode with class strategy
  theme: {
    extend: {
      fontFamily: {
        heading: ["Montserrat", "sans-serif"], // Font for headings
        body: ["Open Sans", "sans-serif"], // Font for content
      },
      colors: {
        // Light mode colors
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        // Dark mode colors
        dark: {
          bgPrimary: "#d81324", // Primary background in dark mode
          bgSecondary: "#2d2d2d", // Secondary background in dark mode
          textPrimary: "#ffffff", // Primary text in dark mode
          textSecondary: "#a3a3a3", // Secondary text in dark mode
        },
      },
    },
  },
  plugins: [],
};
