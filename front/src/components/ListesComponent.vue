<template>
  <div>
    <span>{{error}}</span>
    <div v-for="liste in listes" :key="liste._id" class="list-child">
      <liste-component :liste="liste" :tasks="tasks" :listes="listes" @setTasks="setTasks" @setTasksWithApi="setTasksWithApi" @setListes="setListes"></liste-component>
    </div>

    <div class="list-child">
      <input placeholder="Titre de la liste" v-model="title"/>
      <button v-on:click="this.createList()">Crée liste</button>
    </div>
  </div>
</template>

<script>

import ListeComponent from '../components/ListeComponent.vue'
import {ServiceTask} from "../../public/js/service/ServiceTask";
import {ServiceListe} from "../../public/js/service/ServiceListe";

export default {
  name: "ListesComponent",
  components: {ListeComponent},
  data: () => ({
    listes: [],
    tasks: [],
    error: "",
    title: ""
  }),
  methods: {
    setTasks(tasks) {
      this.tasks = tasks;
    },
    setListes(listes) {
      this.listes = listes;
    },
    setListWithApi() {
      ServiceListe.getAll()
      .then(async (response) => {
        const result = await response.json();
        if(response.status === 200) {
          this.listes = result;
        } else {
          this.error = result.message;
        }
      });
    },
    setTasksWithApi() {
      ServiceTask.getAll()
          .then(async (response) => {
            const result = await response.json();
              if(response.status === 200) {
                this.tasks = result;
              } else {
                this.error = result.message;
              }
      });
    },
    createList() {
      ServiceListe.create(this.title)
      .then(async (response) => {
        if(response.status === 201) {
          this.setListWithApi();
          this.title = "";
        } else {
          const result = await response.json();
          this.error = result.message;
        }
      });
    },
  },
  mounted() {
    this.setListWithApi();
    this.setTasksWithApi();
  }
}
</script>

<style>
.list-child {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  width: 80%;
  margin-left: 10%;
}

.list-child input {
  padding: 10px;
  width: 80%;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}

.list-child button {
  padding: 10px 20px;
  background-color: #7f26d3;
  color: white;
  border: none;
  cursor: pointer;
}

.list-child button:hover {
  background-color: #621da3;
}

.task-child input {
  padding: 10px;
  width: 80%;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}

</style>