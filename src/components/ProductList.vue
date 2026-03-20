<template>
  <div class="product-list">
    <!-- Estado: cargando -->
    <div v-if="cargando" class="text-center py-12">
      <v-progress-circular indeterminate color="primary" size="64" />
      <p class="mt-4 grey--text">Cargando productos...</p>
    </div>

    <!-- Estado: error -->
    <v-alert
      v-else-if="error"
      type="error"
      prominent
      border="left"
      class="ma-4"
      data-testid="error-alert"
    >
      <strong>No se pudieron cargar los productos.</strong>
      <br />
      {{ error }}
      <v-btn class="mt-3" outlined small @click="recargar">
        Intentar de nuevo
      </v-btn>
    </v-alert>

    <!-- Estado: sin resultados -->
    <div v-else-if="productos.length === 0" class="text-center py-12">
      <v-icon size="80" color="grey lighten-2">mdi-package-variant-closed</v-icon>
      <p class="mt-4 grey--text text-h6">No hay productos para mostrar</p>
      <p class="caption grey--text">Probá cambiando el filtro de categoría</p>
    </div>

    <!-- Grilla de productos -->
    <v-row v-else>
      <v-col
        v-for="producto in productos"
        :key="producto.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard
          :producto="producto"
          @ver-detalle="abrirDetalle"
        />
      </v-col>
    </v-row>

    <!-- Modal detalle -->
    <ProductDetail
      v-if="productoSeleccionado"
      :producto="productoSeleccionado"
      @cerrar="productoSeleccionado = null"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ProductCard from './ProductCard.vue'
import ProductDetail from './ProductDetail.vue'

export default {
  name: 'ProductList',
  components: { ProductCard, ProductDetail },
  data() {
    return {
      productoSeleccionado: null
    }
  },
  computed: {
    ...mapGetters('productos', ['productosFiltrados']),
    ...mapState('productos', ['cargando', 'error']),
    productos() {
      return this.productosFiltrados
    }
  },
  methods: {
    abrirDetalle(producto) {
      this.productoSeleccionado = producto
    },
    recargar() {
      this.$store.dispatch('productos/fetchProductos')
    }
  }
}
</script>
