<template>
  <v-container fluid class="pa-6">
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold primary--text">
        <v-icon large color="primary" class="mr-2">mdi-heart</v-icon>
        Mis Favoritos
      </h1>
      <p class="body-1 grey--text mt-1">
        Tenés {{ favoritos.length }} producto{{ favoritos.length !== 1 ? 's' : '' }} guardado{{ favoritos.length !== 1 ? 's' : '' }}
      </p>
    </div>

    <div v-if="favoritos.length === 0" class="text-center py-12">
      <v-icon size="80" color="grey lighten-2">mdi-heart-outline</v-icon>
      <p class="mt-4 text-h6 grey--text">Todavía no agregaste favoritos</p>
      <v-btn color="primary" to="/" class="mt-3">
        Ver catálogo
      </v-btn>
    </div>

    <v-row v-else>
      <v-col
        v-for="producto in favoritos"
        :key="producto.id"
        cols="12" sm="6" md="4" lg="3"
      >
        <ProductCard
          :producto="producto"
          @ver-detalle="productoSeleccionado = $event"
        />
      </v-col>
    </v-row>

    <ProductDetail
      v-if="productoSeleccionado"
      :producto="productoSeleccionado"
      @cerrar="productoSeleccionado = null"
    />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from '../components/ProductCard.vue'
import ProductDetail from '../components/ProductDetail.vue'

export default {
  name: 'FavoritosView',
  components: { ProductCard, ProductDetail },
  data() {
    return {
      productoSeleccionado: null
    }
  },
  computed: {
    ...mapState('favoritos', { favoritos: 'lista' })
  }
}
</script>
