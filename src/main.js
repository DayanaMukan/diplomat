import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { initializeApp } from 'firebase/app'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-dark-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const firebaseConfig = {
    apiKey: "AIzaSyD7-cy0keoioEiOivK6VJZtPm6BMsqVavk",
    authDomain: "diplomaa-50e35.firebaseapp.com",
    projectId: "diplomaa-50e35",
    storageBucket: "diplomaa-50e35.appspot.com",
    messagingSenderId: "489666908037",
    appId: "1:489666908037:web:96764ea6ebedb250f4beec",
    measurementId: "G-JC0PT09Y5M"
  };

  initializeApp(firebaseConfig);
 const app = createApp(App)

app.use(PrimeVue)
app.use(router)

app.mount('#app')
