/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	  ],
	theme: {
	  extend: {
		keyframes: {
		  "accordion-down": {
			from: { height: "0" },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: "0" },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		},
		backgroundImage: {
		  'ticketImage': "url('https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633481/ticket-bg-image_jsukrq.png')",
		  'add-image': "url('https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633488/add-image_vbp00z.png')"
		},
		colors: {
		  "deep-blue": "#5B5959",
		  "primary": "#FF6932",
		  "black": "#000000",
		  "base-white": "#F5F5F5",
		  "white": "#FFFFFF",
		  "light-black": "#14141A"
		}
	  },
	},
	plugins: [
	  require('@tailwindcss/forms')
	],
  }
  
  