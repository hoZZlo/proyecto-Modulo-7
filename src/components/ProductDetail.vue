<template>
  <v-dialog :value="true" max-width="600" @input="$emit('cerrar')">
    <v-card>
      <v-btn icon absolute top right style="top:8px;right:8px" @click="$emit('cerrar')">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-img
        :src="producto.image"
        height="250"
        contain
        class="grey lighten-4"
      />

      <v-card-title class="text-h6">{{ producto.title }}</v-card-title>

      <v-card-subtitle>
        <v-chip small color="secondary" text-color="white">
          {{ producto.category }}
        </v-chip>
      </v-card-subtitle>

      <v-card-text>
        <p class="body-1">{{ producto.description }}</p>
        <div class="d-flex align-center justify-space-between mt-3">
          <span class="text-h5 primary--text font-weight-bold">
            ${{ producto.price }}
          </span>
          <div class="d-flex align-center" v-if="producto.rating">
            <v-rating
              :value="producto.rating.rate"
              color="amber"
              dense
              half-increments
              readonly
              size="20"
            />
            <span class="ml-1 caption grey--text">
              ({{ producto.rating.count }} reseñas)
            </span>
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-btn
          :color="esFavorito ? 'red' : 'primary'"
          outlined
          @click="toggleFavorito"
        >
          <v-icon left>{{ esFavorito ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
          {{ esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
        </v-btn>
        <v-spacer />
        <v-btn text @click="$emit('cerrar')">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: {
    producto: {
      type: Object,
      required: true
    }
  },
  computed: {
    esFavorito() {
      return this.$store.getters['favoritos/esFavorito'](this.producto.id)
    }
  },
  methods: {
    toggleFavorito() {
      this.$store.dispatch('favoritos/toggleFavorito', this.producto)
    }
  }
}
</script>
