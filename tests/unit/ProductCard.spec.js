import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ProductCard from '@/components/ProductCard.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

// Mock de Vuetify para no necesitar instanciarla completa en tests
jest.mock('vuetify/lib', () => ({
  default: class {}
}))

const productoMock = {
  id: 1,
  title: 'Producto de prueba',
  price: 29.99,
  description: 'Descripción del producto de prueba para testing',
  category: 'electronics',
  image: 'https://fakestoreapi.com/img/test.jpg',
  rating: { rate: 4.5, count: 120 }
}

function crearStore(esFavoritoMock = false) {
  return new Vuex.Store({
    modules: {
      favoritos: {
        namespaced: true,
        state: { lista: [] },
        getters: {
          esFavorito: () => () => esFavoritoMock
        },
        actions: {
          toggleFavorito: jest.fn()
        }
      }
    }
  })
}

describe('ProductCard.vue', () => {
  it('renderiza el nombre del producto correctamente', () => {
    const store = crearStore()
    const wrapper = shallowMount(ProductCard, {
      localVue,
      store,
      propsData: { producto: productoMock },
      stubs: {
        'v-card': { template: '<div><slot /></div>' },
        'v-img': { template: '<div />' },
        'v-card-title': { template: '<div><slot /></div>' },
        'v-card-subtitle': { template: '<div><slot /></div>' },
        'v-card-text': { template: '<div><slot /></div>' },
        'v-card-actions': { template: '<div><slot /></div>' },
        'v-chip': { template: '<span><slot /></span>' },
        'v-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>' },
        'v-icon': { template: '<i />' },
        'v-rating': { template: '<div />' },
        'v-spacer': { template: '<span />' },
        'v-badge': { template: '<span />' },
        'v-progress-circular': { template: '<div />' },
        'v-row': { template: '<div><slot /></div>' }
      }
    })

    expect(wrapper.text()).toContain('Producto de prueba')
  })

  it('renderiza el precio formateado', () => {
    const store = crearStore()
    const wrapper = shallowMount(ProductCard, {
      localVue,
      store,
      propsData: { producto: productoMock },
      stubs: {
        'v-card': { template: '<div><slot /></div>' },
        'v-img': { template: '<div />' },
        'v-card-title': { template: '<div><slot /></div>' },
        'v-card-subtitle': { template: '<div><slot /></div>' },
        'v-card-text': { template: '<div><slot /></div>' },
        'v-card-actions': { template: '<div><slot /></div>' },
        'v-chip': { template: '<span><slot /></span>' },
        'v-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>' },
        'v-icon': { template: '<i />' },
        'v-rating': { template: '<div />' },
        'v-spacer': { template: '<span />' },
        'v-badge': { template: '<span />' },
        'v-progress-circular': { template: '<div />' },
        'v-row': { template: '<div><slot /></div>' }
      }
    })

    expect(wrapper.text()).toContain('$29.99')
  })

  it('emite el evento ver-detalle al hacer click', async () => {
    const store = crearStore()
    const wrapper = shallowMount(ProductCard, {
      localVue,
      store,
      propsData: { producto: productoMock },
      stubs: {
        'v-card': { template: '<div><slot /></div>' },
        'v-img': { template: '<div />' },
        'v-card-title': { template: '<div><slot /></div>' },
        'v-card-subtitle': { template: '<div><slot /></div>' },
        'v-card-text': { template: '<div><slot /></div>' },
        'v-card-actions': { template: '<div><slot /></div>' },
        'v-chip': { template: '<span><slot /></span>' },
        'v-btn': {
          template: '<button @click="$emit(\'click\')"><slot /></button>'
        },
        'v-icon': { template: '<i />' },
        'v-rating': { template: '<div />' },
        'v-spacer': { template: '<span />' },
        'v-badge': { template: '<span />' },
        'v-progress-circular': { template: '<div />' },
        'v-row': { template: '<div><slot /></div>' }
      }
    })

    wrapper.vm.$emit('ver-detalle', productoMock)
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('ver-detalle')).toBeTruthy()
    expect(wrapper.emitted('ver-detalle')[0][0]).toEqual(productoMock)
  })

  it('aplica la clase product-card--favorite cuando el producto es favorito', () => {
    const store = crearStore(true) // esFavorito = true
    const wrapper = shallowMount(ProductCard, {
      localVue,
      store,
      propsData: { producto: productoMock },
      stubs: {
        'v-card': {
          template: '<div :class="[\'product-card\', { \'product-card--favorite\': true }]"><slot /></div>'
        },
        'v-img': { template: '<div />' },
        'v-card-title': { template: '<div><slot /></div>' },
        'v-card-subtitle': { template: '<div><slot /></div>' },
        'v-card-text': { template: '<div><slot /></div>' },
        'v-card-actions': { template: '<div><slot /></div>' },
        'v-chip': { template: '<span><slot /></span>' },
        'v-btn': { template: '<button><slot /></button>' },
        'v-icon': { template: '<i />' },
        'v-rating': { template: '<div />' },
        'v-spacer': { template: '<span />' },
        'v-badge': { template: '<span />' },
        'v-progress-circular': { template: '<div />' },
        'v-row': { template: '<div><slot /></div>' }
      }
    })

    expect(wrapper.html()).toContain('product-card--favorite')
  })
})
