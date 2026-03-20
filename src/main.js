import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify: new Vuetify({
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#2E7D32',
          secondary: '#66BB6A',
          accent: '#A5D6A7',
          error: '#D32F2F',
        },
        dark: {
          primary: '#66BB6A',
          secondary: '#2E7D32',
          accent: '#1B5E20',
          error: '#EF9A9A',
        }
      }
    }
  }),
  render: h => h(App)
}).$mount('#app')
