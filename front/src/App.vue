<template>
  <nav-component :isConnected="isConnected" @changePage="changePage" @setIsConnected="setIsConnected"></nav-component>
  <login-component v-if="page === 'login' && !isConnected" @changePage="changePage" @setIsConnected="setIsConnected"/>
  <register-component v-else-if="page === 'register' && !isConnected" @changePage="changePage" @setIsConnected="setIsConnected"/>
  <liste-component v-else-if="page === 'listes' && isConnected" @changePage="changePage"/>
  <profile-component v-else-if="page === 'profile' && isConnected"></profile-component>
</template>

<script>

import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'
import ProfileComponent from './components/ProfileComponent.vue'
import NavComponent from './components/NavComponent.vue'
import ListeComponent from './components/ListesComponent.vue'



export default {
  name: 'App',
  components: {
    LoginComponent,
    RegisterComponent,
    ListeComponent,
    NavComponent,
    ProfileComponent
  },

  methods: {
    setIsConnected(value) {
      this.isConnected = value;
    },
    changePage(value) {
      this.page = value;
    }
    
  },

  data: () => ({
    isConnected: localStorage.getItem("token") != null,
    page: localStorage.getItem("token") != null ? "listes" : "login"
  })
}
</script>

<style>
</style>
