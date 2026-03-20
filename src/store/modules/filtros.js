export default {
  namespaced: true,
  state: () => ({
    categoriaActiva: 'todas',
    textoBusqueda: ''
  }),
  getters: {
    hayFiltrosActivos(state) {
      return state.categoriaActiva !== 'todas' || state.textoBusqueda !== ''
    }
  },
  mutations: {
    SET_CATEGORIA(state, categoria) {
      state.categoriaActiva = categoria
    },
    SET_BUSQUEDA(state, texto) {
      state.textoBusqueda = texto
    }
  },
  actions: {
    setCategoria({ commit }, categoria) {
      commit('SET_CATEGORIA', categoria)
    },
    setBusqueda({ commit }, texto) {
      commit('SET_BUSQUEDA', texto)
    },
    limpiarFiltros({ commit }) {
      commit('SET_CATEGORIA', 'todas')
      commit('SET_BUSQUEDA', '')
    }
  }
}
