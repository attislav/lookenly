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
        primary: siteConfig.brand.colors.primary,        // #000000 - Black
        secondary: siteConfig.brand.colors.secondary,    // #f5f5f4 - Off-white
        accent: siteConfig.brand.colors.accent,          // #f59e0b - Gold
        'bg-custom': siteConfig.brand.colors.background, // #fafaf9 - Light beige
        'text-dark': siteConfig.brand.colors.text,       // #171717 - Dark text
        'text-secondary': siteConfig.brand.colors.textSecondary, // #e5e5e5 - Light gray (for footer on dark bg)
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
