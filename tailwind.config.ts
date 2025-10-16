import type { Config } from 'tailwindcss'
import { siteConfig } from './config/site.config'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dynamische Farben aus siteConfig
        primary: siteConfig.brand.colors.primary,
        secondary: siteConfig.brand.colors.secondary,
        accent: siteConfig.brand.colors.accent,
        'bg-custom': siteConfig.brand.colors.background,
        'text-primary': siteConfig.brand.colors.text,
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
}
export default config
