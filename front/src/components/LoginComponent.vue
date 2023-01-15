<template>
  <div class="login">
    <h1>Login</h1>
    <input v-model="email" placeholder="email" type="email">
    <input v-model="password" placeholder="password" type="password">
    <button v-on:click="loginBtnClick">login</button>
    <span class="error">{{error}}</span>
    <button v-on:click="goToRegister">S'inscrire</button>
  </div>
</template>

<script>

import {ServiceUtilisateur} from "../../public/js/service/ServiceUtilisateur";

export default {
  name: 'LoginComponent',
  data: () => ({
    email: "",
    password: "",
    error: ""
  }),
  methods: {
    async goToRegister() {
      this.$emit("changePage", "register");
    },

    async loginBtnClick(){
      if(this.email.trim() !== "" && this.password.trim() !== "") {
        ServiceUtilisateur.login(this.email, this.password)
        .then(async (response) => {
          const result = await response.json();
          if(response.status === 200) {
            localStorage.setItem("token", result.message)
            this.$emit("setIsConnected", true);
            this.$emit("changePage", "listes");
          } else {
            this.error = result.message;
          }
        });
      }
    }
  }
}
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cccccc;
  border-radius: 20px;
  padding: 20px;
}

.login input {
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
}

.login button {
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #7f26d3;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

.login button:hover {
  background-color: #621da3;
}

.error {
  color: red;
  font-weight: bold;
}
</style>