const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				dark: '#1f2937',
				'vintage-aqua': '#74bda8',
				'vintage-red': '#cc6b49',
				'vintage-yellow': '#d2a24c',
				'vintage-brown': '#6f5643'
			}
		}
	},

	plugins: [require('@tailwindcss/forms')]
};

module.exports = config;
