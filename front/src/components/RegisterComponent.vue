<template>
  <div class="register">
    <h1>Register</h1>
    <input v-model="email" placeholder="email" type="email">
    <input v-model="password" placeholder="password" type="password">
    <label>terms and conddition:<input v-model="termsAndCondition" type="checkbox"></label>
    <button v-on:click="registerBtnClick">register</button>
    <span>{{error}}</span>
    <button v-on:click="goToLogin">Se connecter</button>
  </div>
</template>

<script>

import {ServiceUtilisateur} from "../../public/js/service/ServiceUtilisateur";

export default {
  name: "RegisterComponent",
  data: () => ({
    email: "",
    password: "",
    termsAndCondition: false,
    error: ""
  }),
  methods: {
    async goToLogin() {
      this.$emit("changePage", "login");
    },

    async registerBtnClick() {
      if(this.email.trim() !== "" && this.password.trim() !== "") {
        ServiceUtilisateur.register(this.email, this.password, this.termsAndCondition)
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
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cccccc;
  border-radius: 20px;
  padding: 20px;
}

.register input[type="email"], .register input[type="password"] {
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
}

.register label {
  margin: 10px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.register button {
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #7f26d3;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}
</style>