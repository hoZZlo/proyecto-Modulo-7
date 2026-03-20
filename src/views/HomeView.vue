<template>
  <v-container fluid class="pa-6">
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold primary--text">Catálogo de Productos</h1>
      <p class="body-1 grey--text mt-1">Explorá nuestra selección de productos</p>
    </div>

    <FilterBar />
    <ProductList />
  </v-container>
</template>

<script>
import FilterBar from '../components/FilterBar.vue'
import ProductList from '../components/ProductList.vue'

export default {
  name: 'HomeView',
  components: { FilterBar, ProductList },
  mounted() {
    // Lección 1 y 2: ciclo de vida + fetch de API
    this.$store.dispatch('productos/fetchProductos')
  }
}
</script>
