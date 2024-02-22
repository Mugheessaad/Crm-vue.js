/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
// import { registerPlugins } from '@/plugins'

// // Components
// import App from './App.vue'


// // Composables
// import { createApp } from 'vue'

// const app = createApp(App)

// registerPlugins(app)

// app.mount('#app')





/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Vue and Vuex
import { createApp } from 'vue';
import Vuex from 'vuex'; // Import Vuex
import store from './store'; // Import your Vuex store instance

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

const app = createApp(App);

// Use Vuex
app.use(Vuex);
app.use(store); // Attach the Vuex store instance

registerPlugins(app);

app.mount('#app');
