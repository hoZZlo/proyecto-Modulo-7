export default {
  namespaced: true,
  state: () => ({
    lista: []
  }),
  getters: {
    esFavorito: (state) => (id) => {
      return state.lista.some(p => p.id === id)
    },
    totalFavoritos(state) {
      return state.lista.length
    }
  },
  mutations: {
    AGREGAR(state, producto) {
      state.lista.push(producto)
    },
    QUITAR(state, id) {
      state.lista = state.lista.filter(p => p.id !== id)
    }
  },
  actions: {
    toggleFavorito({ state, commit }, producto) {
      const existe = state.lista.some(p => p.id === producto.id)
      if (existe) {
        commit('QUITAR', producto.id)
      } else {
        commit('AGREGAR', producto)
      }
    }
  }
}
