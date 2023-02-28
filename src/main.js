import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {createRouter, createWebHistory} from 'vue-router'


import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'


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




const app = createApp(App);


app.use(router)

app.use(VueAxios, axios);


app.mount('#app');

