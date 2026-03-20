import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ProductList from '@/components/ProductList.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

function crearStore({ cargando = false, error = null, productos = [] } = {}) {
  return new Vuex.Store({
    modules: {
      productos: {
        namespaced: true,
        state: { cargando, error, lista: productos },
        getters: {
          productosFiltrados: (state) => state.lista
        },
        actions: {
          fetchProductos: jest.fn()
        }
      },
      filtros: {
        namespaced: true,
        state: { categoriaActiva: 'todas', textoBusqueda: '' }
      },
      favoritos: {
        namespaced: true,
        state: { lista: [] },
        getters: {
          esFavorito: () => () => false
        }
      }
    }
  })
}

const stubs = {
  ProductCard: { template: '<div class="product-card-stub" />' },
  ProductDetail: { template: '<div />' },
  'v-row': { template: '<div><slot /></div>' },
  'v-col': { template: '<div><slot /></div>' },
  'v-alert': { template: '<div data-testid="error-alert"><slot /></div>' },
  'v-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>' },
  'v-icon': { template: '<i />' },
  'v-progress-circular': { template: '<div class="loading" />' }
}

describe('ProductList.vue', () => {
  it('muestra el spinner cuando está cargando', () => {
    const store = crearStore({ cargando: true })
    const wrapper = shallowMount(ProductList, { localVue, store, stubs })

    expect(wrapper.find('.loading').exists()).toBe(true)
  })

  it('muestra el mensaje de error cuando falla la API', () => {
    const store = crearStore({ error: 'Error de conexión' })
    const wrapper = shallowMount(ProductList, {
      localVue,
      store,
      stubs: {
        ...stubs,
        'v-alert': {
          template: '<div data-testid="error-alert"><slot /></div>'
        }
      }
    })

    const alerta = wrapper.find('[data-testid="error-alert"]')
    expect(alerta.exists()).toBe(true)
  })

  it('muestra los productos cuando la carga fue exitosa', () => {
    const productos = [
      { id: 1, title: 'P1', price: 10, category: 'cat1', image: '', description: '', rating: { rate: 3, count: 10 } },
      { id: 2, title: 'P2', price: 20, category: 'cat2', image: '', description: '', rating: { rate: 4, count: 20 } }
    ]
    const store = crearStore({ productos })
    const wrapper = shallowMount(ProductList, { localVue, store, stubs })

    const cards = wrapper.findAll('.product-card-stub')
    expect(cards.length).toBe(2)
  })

  it('muestra mensaje cuando no hay productos', () => {
    const store = crearStore({ productos: [] })
    const wrapper = shallowMount(ProductList, { localVue, store, stubs })

    expect(wrapper.text()).toContain('No hay productos para mostrar')
  })
})
