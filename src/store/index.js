import Vue from 'vue'
import Vuex from 'vuex'
import productos from './modules/productos'
import filtros from './modules/filtros'
import favoritos from './modules/favoritos'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    productos,
    filtros,
    favoritos
  }
})
