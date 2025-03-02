const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
    darkMode: ["class"],
    darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,ts,jsx, mdx}"],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem'
  	},
  	extend: {
  		fontFamily: {
  			sans: [
  				'Poppins',
  				'sans-serif'
  			],
  			serif: [
  				'Merriweather',
  				'serif'
  			],
  			mono: [
  				'Menlo',
  				'monospace'
  			]
  		},
  		colors: {
				electricBlue: {
					DEFAULT: "#007BFF",
					dark: "#1E88E5",
				},
  			primary50: '#007BFF',
  			primary100: '#A37575',
  			primary200: '#D9B7B7',
  			bgGradient: 'linear(to-br, #2C120D, #6E3B3B)',
  			secondary50: '#FFF5E6',
  			secondary100: '#FFE4CC',
  			secondary200: '#FFC299',
  			customPurple: '#6E3B3B',
  			gray: {
  				DEFAULT: '#E0E0E0'
  			},
  			'gradient-start': '#ff7eb3',
  			'gradient-middle': '#ff758c',
  			'gradient-end': '#ff6f61',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			input: '`0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`'
  		},
  		backgroundImage: {
  			'custom-gradient': 'linear-gradient(to bottom right, #F1C40F, #D4,AC0D)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		borderColor: {
  			gradient: 'conic-gradient(from 0deg, #ff7eb3, #ff758c, #ff6f61)'
  		},
  		keyframes: {
  			shimmer: {
  				from: {
  					backgroundPosition: '0 0'
  				},
  				to: {
  					backgroundPosition: '-200% 0'
  				}
  			},
  			scroll: {
  				to: {
  					transform: 'translate(calc(-50% - 0.5rem))'
  				}
  			},
  			beep: {
  				'0%, 20%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				},
  				'10%': {
  					transform: 'scale(1.15)',
  					opacity: '0.8'
  				},
  				'30%, 100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			shimmer: 'shimmer 2s linear infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			beep: 'beep 1s ease-in-out infinite',
  			'spin-gradient': 'spin 1s linear infinite',
  			scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
