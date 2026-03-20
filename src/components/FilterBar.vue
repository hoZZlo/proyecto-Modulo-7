<template>
  <v-card flat class="mb-6 pa-4">
    <v-row align="center" justify="space-between">
      <v-col cols="12" sm="5">
        <v-text-field
          v-model="busqueda"
          label="Buscar producto..."
          prepend-inner-icon="mdi-magnify"
          outlined
          dense
          clearable
          hide-details
          @input="actualizarBusqueda"
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-select
          v-model="categoriaSeleccionada"
          :items="categoriasOpciones"
          label="Filtrar por categoría"
          prepend-inner-icon="mdi-filter"
          outlined
          dense
          hide-details
          @change="actualizarCategoria"
        />
      </v-col>

      <v-col cols="12" sm="3" class="text-right">
        <span class="caption grey--text">
          {{ totalProductos }} producto{{ totalProductos !== 1 ? 's' : '' }}
        </span>
        <v-btn text x-small color="grey" @click="limpiarFiltros" class="ml-2">
          Limpiar
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'FilterBar',
  data() {
    return {
      busqueda: '',
      categoriaSeleccionada: 'todas'
    }
  },
  computed: {
    ...mapState('filtros', ['categoriaActiva', 'textoBusqueda']),
    ...mapGetters('productos', ['productosFiltrados', 'categorias']),
    totalProductos() {
      return this.productosFiltrados.length
    },
    categoriasOpciones() {
      return [
        { text: 'Todas', value: 'todas' },
        ...this.categorias.map(c => ({ text: c, value: c }))
      ]
    }
  },
  methods: {
    ...mapActions('filtros', ['setCategoria', 'setBusqueda', 'limpiarFiltros']),
    actualizarCategoria(val) {
      this.setCategoria(val)
    },
    actualizarBusqueda(val) {
      this.setBusqueda(val || '')
    },
    limpiarFiltros() {
      this.busqueda = ''
      this.categoriaSeleccionada = 'todas'
      this.$store.dispatch('filtros/limpiarFiltros')
    }
  },
  watch: {
    categoriaActiva(val) {
      this.categoriaSeleccionada = val
    },
    textoBusqueda(val) {
      this.busqueda = val
    }
  }
}
</script>
