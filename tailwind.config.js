module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: { 
      keyframes: { 
        wiggle: { 
          '0%, 100%': { 
            transform: 'translate(-2px)'
          }, 
          '50%': { 
            transform: 'translate(2px)' 
          },
        } 
      },
      animation: {
        wiggle: 'wiggle 150ms linear 2',
      }
    }
  },
  plugins: [],
}
