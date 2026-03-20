import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 8000
})

export const productosService = {
  async getAll() {
    const res = await api.get('/products')
    return res.data
  },

  async getById(id) {
    const res = await api.get(`/products/${id}`)
    return res.data
  },

  async getPorCategoria(categoria) {
    const res = await api.get(`/products/category/${categoria}`)
    return res.data
  },

  async getCategorias() {
    const res = await api.get('/products/categories')
    return res.data
  }
}

export default api
