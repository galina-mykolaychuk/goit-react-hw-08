// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Шлях до компонентів
  ],
  theme: {
    extend: {},
  },
  plugins: [import("daisyui")], // daisyUI як плагін
};
