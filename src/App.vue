<template>
  <v-app :dark="darkMode">
    <AppHeader @toggle-theme="toggleTheme" />

    <v-main>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      darkMode: false
    }
  },
  methods: {
    toggleTheme() {
      this.darkMode = !this.darkMode
      this.$vuetify.theme.dark = this.darkMode
    }
  }
}
</script>
