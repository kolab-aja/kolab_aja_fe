/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { createApp } from "vue";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import { registerPlugins } from "@/plugins";
import CKEditor from "@ckeditor/ckeditor5-vue";

// Styles
import "@mdi/font/css/materialdesignicons.css";
import './styles/global.scss';

// Components
import App from "./App.vue";

// Create App
const app = createApp(App);

// Use Plugins
const pinia = createPinia();
app.use(pinia);
app.use(vuetify);
app.use(CKEditor);
registerPlugins(app);

// Mount App
app.mount("#app");
