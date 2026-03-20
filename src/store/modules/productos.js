import { productosService } from '../../services/api'

export default {
  namespaced: true,
  state: () => ({
    lista: [],
    cargando: false,
    error: null
  }),
  getters: {
    productosFiltrados(state, getters, rootState) {
      let resultado = [...state.lista]
      const { categoriaActiva, textoBusqueda } = rootState.filtros

      if (categoriaActiva && categoriaActiva !== 'todas') {
        resultado = resultado.filter(p => p.category === categoriaActiva)
      }

      if (textoBusqueda && textoBusqueda.trim() !== '') {
        const texto = textoBusqueda.toLowerCase()
        resultado = resultado.filter(p =>
          p.title.toLowerCase().includes(texto) ||
          p.description.toLowerCase().includes(texto)
        )
      }

      return resultado
    },
    categorias(state) {
      return [...new Set(state.lista.map(p => p.category))]
    },
    totalProductos(state) {
      return state.lista.length
    }
  },
  mutations: {
    SET_PRODUCTOS(state, productos) {
      state.lista = productos
    },
    SET_CARGANDO(state, valor) {
      state.cargando = valor
    },
    SET_ERROR(state, mensaje) {
      state.error = mensaje
    }
  },
  actions: {
    async fetchProductos({ commit }) {
      commit('SET_CARGANDO', true)
      commit('SET_ERROR', null)
      try {
        const data = await productosService.getAll()
        commit('SET_PRODUCTOS', data)
      } catch (err) {
        commit('SET_ERROR', 'No se pudo conectar con el servidor. Verificá tu conexión.')
        console.error('Error al cargar productos:', err)
      } finally {
        commit('SET_CARGANDO', false)
      }
    }
  }
}
