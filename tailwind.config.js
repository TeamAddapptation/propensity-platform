/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		darkMode: "selector",
		extend: {
			colors: {
				primary: {
					10: "#fafaff",
					50: "#eeeeff",
					100: "#d5d4ff",
					200: "#b9b6ff",
					300: "#9a95ff",
					400: "#7b72f5",
					500: "#5d50e6",
					600: "#2426c5",
					700: "#081aa1",
					800: "#031d7d",
					900: "#001c59",
				},
				tertiary: {
					50: "#eef8ff",
					100: "#def3ff",
					200: "#cdebff",
					300: "#9fcdff",
					400: "#72acff",
					500: "#4788ff",
					600: "#1d65d6",
					700: "#004bac",
					800: "#003e83",
					900: "#002e59",
				},
				secondary: "#7630a1",
			},
		},
	},
	plugins: [],
};
