/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Restaurant Color Palette
        background: "#FEFDF9", // Warm off-white
        foreground: "#2C1810", // Rich dark brown
        
        // Warm neutrals
        cream: {
          50: "#FEFDF9",
          100: "#FDF9F0",
          200: "#F7F0E1",
          300: "#F0E6D2",
          400: "#E8D5B7",
          500: "#D4B896",
        },
        
        // Warm accent colors
        amber: {
          50: "#FFF8E7",
          100: "#FFECB3",
          400: "#FFC947",
          500: "#F59E0B", // Golden yellow
          600: "#D97706",
        },
        
        terracotta: {
          50: "#FDF2F0",
          100: "#FCE4E0",
          400: "#F87171",
          500: "#DC6844", // Muted red/orange
          600: "#C55A32",
        },
        
        sage: {
          50: "#F7F8F7",
          100: "#EEF0EE",
          500: "#8B9A8B", // Muted green
          600: "#6B7B6B",
        },
        
        // Updated primary to warm orange
        primary: {
          DEFAULT: "#DC6844",
          50: "#FDF2F0",
          100: "#FCE4E0",
          500: "#DC6844",
          600: "#C55A32",
          foreground: "#FEFDF9",
        },
        
        secondary: {
          DEFAULT: "#F0E6D2",
          foreground: "#2C1810",
        },
        
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#2C1810",
        },
        
        muted: {
          DEFAULT: "#F7F0E1",
          foreground: "#6B5B4F",
        },
        
        accent: {
          DEFAULT: "#F59E0B",
          foreground: "#FEFDF9",
        },
        
        border: "#E8D5B7",
        input: "#F7F0E1",
        ring: "#DC6844",
      },
      
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
        xl: "20px",
        "2xl": "24px",
      },
      
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
      },
      
      boxShadow: {
        'elegant': '0 4px 20px rgba(44, 24, 16, 0.08)',
        'card': '0 2px 12px rgba(44, 24, 16, 0.06)',
        'button': '0 2px 8px rgba(220, 104, 68, 0.2)',
      },
    },
  },
  plugins: [],
}
