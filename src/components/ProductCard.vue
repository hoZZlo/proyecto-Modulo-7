<template>
  <v-card
    class="product-card"
    :class="{ 'product-card--favorite': esFavorito }"
    elevation="2"
    hover
  >
    <v-img
      :src="producto.image"
      :alt="producto.title"
      height="180"
      contain
      class="grey lighten-4 pa-2"
    >
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="primary" />
        </v-row>
      </template>
    </v-img>

    <v-card-title class="subtitle-1 font-weight-bold text-truncate d-block">
      {{ producto.title }}
    </v-card-title>

    <v-card-subtitle>
      <v-chip x-small color="secondary" text-color="white" class="mr-1">
        {{ producto.category }}
      </v-chip>
      <span class="caption grey--text">ID: {{ producto.id }}</span>
    </v-card-subtitle>

    <v-card-text>
      <div class="d-flex align-center justify-space-between">
        <span class="text-h6 primary--text font-weight-bold">
          ${{ producto.price }}
        </span>
        <v-rating
          :value="producto.rating ? producto.rating.rate : 0"
          color="amber"
          background-color="amber lighten-3"
          dense
          half-increments
          readonly
          size="16"
        />
      </div>
      <p class="body-2 mt-2 product-desc">
        {{ producto.description }}
      </p>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        text
        small
        @click="$emit('ver-detalle', producto)"
      >
        <v-icon left small>mdi-eye</v-icon>
        Ver detalle
      </v-btn>
      <v-spacer />
      <v-btn
        icon
        :color="esFavorito ? 'red' : 'grey'"
        @click="toggleFavorito"
      >
        <v-icon>{{ esFavorito ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductCard',
  props: {
    producto: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('favoritos', ['esFavorito']),
    esFavorito() {
      return this.$store.getters['favoritos/esFavorito'](this.producto.id)
    }
  },
  methods: {
    ...mapActions('favoritos', ['toggleFavorito']),
    toggleFavorito() {
      this.$store.dispatch('favoritos/toggleFavorito', this.producto)
    }
  }
}
</script>

<style scoped>
.product-card {
  transition: transform 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-card--favorite {
  border: 2px solid #ef9a9a;
}

.product-desc {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #666;
  min-height: 60px;
}
</style>
