/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* walnut-transparent */
        input: "var(--color-input)", /* walnut-transparent */
        ring: "var(--color-ring)", /* honey-gold */
        background: "var(--color-background)", /* cream-canvas */
        foreground: "var(--color-foreground)", /* rich-brown */
        primary: {
          DEFAULT: "var(--color-primary)", /* walnut-brown */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* forest-green */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* warm-brown */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* sage-brown */
          foreground: "var(--color-muted-foreground)", /* medium-brown */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* honey-gold */
          foreground: "var(--color-accent-foreground)", /* rich-brown */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* rich-brown */
        },
        card: {
          DEFAULT: "var(--color-card)", /* white */
          foreground: "var(--color-card-foreground)", /* rich-brown */
        },
        success: {
          DEFAULT: "var(--color-success)", /* natural-green */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber-caution */
          foreground: "var(--color-warning-foreground)", /* rich-brown */
        },
        error: {
          DEFAULT: "var(--color-error)", /* warm-brown */
          foreground: "var(--color-error-foreground)", /* white */
        },
        surface: "var(--color-surface)", /* warm-beige */
        trust: {
          DEFAULT: "var(--color-trust)", /* sage-brown */
          foreground: "var(--color-trust-foreground)", /* white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        headline: ['Crimson Text', 'serif'],
        body: ['Inter', 'sans-serif'],
        cta: ['Inter', 'sans-serif'],
        accent: ['Crimson Text', 'serif'],
      },
      fontSize: {
        'headline-xl': ['3.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-lg': ['2.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-md': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-sm': ['1.5rem', { lineHeight: '1.4', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'cta-lg': ['1.125rem', { lineHeight: '1.5', fontWeight: '600' }],
        'cta-md': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],
        'cta-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '600' }],
      },
      spacing: {
        '13': '3.25rem',
        '21': '5.25rem',
        '34': '8.5rem',
        '55': '13.75rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(107, 79, 58, 0.1)',
        'soft-lg': '0 8px 30px rgba(107, 79, 58, 0.15)',
        'natural': '0 2px 8px rgba(107, 79, 58, 0.08), 0 8px 24px rgba(107, 79, 58, 0.06)',
        'premium': '0 2px 8px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(107, 79, 58, 0.08), 0 16px 48px rgba(107, 79, 58, 0.04)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-subtle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
      },
      transitionTimingFunction: {
        'natural': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '300': '300ms',
        '400': '400ms',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}