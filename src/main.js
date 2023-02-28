import { createApp } from 'vue'
import App from './App.vue'



//bootstrap
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

//axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// router
import {createRouter, createWebHistory} from 'vue-router'

import SettingsComponent from './components/SettingsComponent.vue'
import IndexComponent from './components/IndexComponent.vue'
const routes = [ 
    {path: '/', name:'homepage', component: IndexComponent},
    {path: '/settings', name:'settings', component: SettingsComponent},
]

const router = createRouter({ 
    history: createWebHistory(),
    routes,
})

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})




const app = createApp(App);


//axios
app.use(VueAxios, axios);

//router
app.use(router)

//vuetify
app.use(vuetify)

app.mount('#app');

