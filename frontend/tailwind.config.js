/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B0618",  
        secondary: "#140C2A",
        surface: "#2A1450",  
        card: "#3B1D6B",     
        cardHover: "#4C2490",
        accent: "#6C3FC9",   
        accentLight: "#6629f5",
        glowBlue: "#3B82F6",
        textPrimary: "#FFFFFF",
        textSecondary: "#B9A3FF",
        muted: "#8B7BBF",
        positive: "#22C55E",
        negative: "#EF4444",
      },

      backgroundImage: {
        'radial-dark':
          'radial-gradient(circle at bottom, #2e186d 0%, #0B0618 70%)',
        'purple-glow':
          'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(0,0,0,0) 70%)',
      },

      boxShadow: {
        purpleGlow: '0 0 10px rgba(139,92,246,0.35)',
        blueGlow: '0 0 60px rgba(59,130,246,0.45)',
      }
    },
  },
  plugins: [],
}