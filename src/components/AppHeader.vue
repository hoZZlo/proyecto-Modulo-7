<template>
  <v-app-bar app color="primary" dark elevation="2">
    <v-toolbar-title class="font-weight-bold">
      <v-icon left>mdi-store</v-icon>
      Vue Product Showcase
    </v-toolbar-title>

    <v-spacer />

    <v-btn text to="/" exact>
      <v-icon left>mdi-home</v-icon>
      Inicio
    </v-btn>
    <v-btn text to="/favoritos">
      <v-icon left>mdi-heart</v-icon>
      Favoritos
      <v-badge
        v-if="totalFavoritos > 0"
        :content="totalFavoritos"
        color="red"
        overlap
      />
    </v-btn>

    <v-btn icon @click="$emit('toggle-theme')" class="ml-2">
      <v-icon>mdi-brightness-6</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters('favoritos', ['totalFavoritos'])
  }
}
</script>
