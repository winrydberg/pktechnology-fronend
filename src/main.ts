// import './assets/main.css'
import './assets/button.css'

// Import Bootstrap's CSS and JS files
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/bootstrap.min.css';
import './assets/font-awesome/css/font-awesome.min.css';
import './assets/Ionicons/css/ionicons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // This includes Popper.js
import './assets/plugins/AdminLTE.css';
// import PrimeVue from 'primevue/config';
// import Aura from '@primevue/themes/aura';





import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistedState from 'pinia-plugin-persistedstate';

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia();

// app.use(PrimeVue, {
//     theme: {
//         preset: Aura
//     }
// });
pinia.use(piniaPersistedState);


app.use(pinia)
app.use(router)

app.mount('#app')
