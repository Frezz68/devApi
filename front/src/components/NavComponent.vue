<template>
  Navbar :
  <button v-on:click="goToLogin" v-if="!isConnected">Login</button>
  <button v-on:click="goToRegister" v-if="!isConnected">Register</button>
  <button v-on:click="goToAccueil" v-if="isConnected">Accueil</button>
  <button v-on:click="goToProfil" v-if="isConnected">Profil</button>
  <button v-on:click="logout" v-if="isConnected">Logout</button>
</template>

<script>
export default {
  name: "NavComponent",
  props: ["isConnected"],

  methods: {
    async goToAccueil() {
      this.$emit("changePage", "listes");
    },

    async goToProfil() {
      this.$emit("changePage", "profile");
    },

    async logout() {
      localStorage.removeItem("token");
      this.$emit("setIsConnected", false);
      this.$emit("changePage", "login");
    },

    async goToLogin() {
      this.$emit("changePage", "login");
    },

    async goToRegister() {
      this.$emit("changePage", "register");
    }
  }
}
</script>

<style>

.button {
  background-color: #7f26d3;
  color: #333;
  font-weight: bold;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
}

.button:hover {
  background-color: #7f26d3;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.5);
}
</style>