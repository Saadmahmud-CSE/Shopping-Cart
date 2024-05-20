/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
import { Container } from "postcss"
export default {
  content: [
    "./*.html",
  ],
  theme: {
    container: {
      center:true,
      padding:"20px",
    },
    extend: {},
  },
  plugins: [daisyui],
}

