<template>
  <div class="profil">
    <span class="error">{{error}}</span>
    <div v-if="!isEditing">
      <span>votre email: {{this.profil.email}}</span><br/>
      <span>le comptes est : {{this.profil.settings.is_email_validated ? "valide" : "non valide"}}</span><br/>
      <span>crée le : {{this.profil.createdAt}}</span><br/>
      <button v-on:click="setEditing(true)">Modifier</button>
    </div>
    <div v-if="isEditing">
      <input v-model="this.edited.email" placeholder="nouveau email"><br/>
      <input v-model="this.edited.password" placeholder="nouveau password" type="password"><br/>
      <button v-on:click="editProfil">Confirmé</button>
      <button v-on:click="setEditing(false)">Annuler</button>
    </div>
  </div>
</template>

<script>
import {ServiceUtilisateur} from "../../public/js/service/ServiceUtilisateur";

export default {
  name: "ProfileComponent",
  data: () => ({
    profil: {settings: {is_email_validated: false}},
    error: "",
    isEditing: false,
    edited: {email: "", password: ""}
  }),
  methods: {
    setEditing(value) {
      this.isEditing = value;
    },
    setProfil() {
      ServiceUtilisateur.getInfo()
      .then(async (response) => {
        if(response.status === 200) {
          this.profile = await response.json();
        } else {
          this.error = response.body;
        }
      });
    },
    editProfil() {
      ServiceUtilisateur.updateInfo(this.edited.email, this.edited.password)
      .then(async (response) => {
        if(response.status === 200) {
          this.setProfil();
          this.setEditing(false);
        } else {
          this.error = await response.json();
        }
      });
    }
  },
  mounted() {
    this.setProfil();
  }
}
</script>

<style>
.profil {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.profil span {
  font-size: 16px;
  color: #333;
}

.error {
  color: red;
  font-weight: bold;
}

.profil input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 10px;
}

.profil button {
  padding: 10px;
  background-color: #7f26d3;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 10px;
}

.profil button:hover {
  background-color: #621da3;
}
</style>