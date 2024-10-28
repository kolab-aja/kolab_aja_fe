/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles/main.sass";

// Composables
import { createVuetify } from "vuetify";

import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { VDateInput } from 'vuetify/labs/VDateInput'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
	theme: {
		themes: {
			light: {
				colors: {
					primary: "#46377D",
					secondary: "#5CBBF6",
					lightPrimary: "#8A76D4",
					white: "#fff",
					primaryTosca: "#5BFFF0",
					darkPurple: "#221943",
					primaryRed: "#CF455E",
					lightGray: "#B6BBC4"
				},
			},
		},
	},
	components: {
		VNumberInput,
		VDateInput,
	},
});
