<template>
  <v-footer app color="primary" dark padless>
    <v-col class="text-center py-2" cols="12">
      <span class="caption">
        Vue Product Showcase &copy; {{ currentYear }} — Proyecto Módulo 7
      </span>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>
