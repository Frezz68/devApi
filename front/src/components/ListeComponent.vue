<template>
  <div class="liste-component">
    <div class="horizontale size80">
      <h2 v-if="!isEdit">{{liste.title}}</h2>
      <input v-if="isEdit" v-model="title" placeholder="Titre de la liste">
      <div class="horizontale">
        <button v-if="!isEdit" v-on:click="setEditing(true)">Modifier</button>
        <button v-if="!isEdit" v-on:click="deleteList(liste._id)">Supprimer</button>
        <button v-if="isEdit" v-on:click="updateList(liste._id)">Modifier</button>
        <button v-if="isEdit" v-on:click="setEditing(false)">Annuler</button>
      </div>
    </div>
    <p>Créée le: {{liste.createdAt}}</p>
    <p>Modifiée le: {{liste.updatedAt}}</p>
    <div class="tasks-container">
      <div v-for="task in tasks.filter(aTask => aTask.list === liste._id)" :key="task._id" class="task-child">
        <TaskComponent :task="task" :tasks="tasks" @setTasks="setTasks"></TaskComponent>
      </div>
      <div class="task-child create">
        <input placeholder="Titre" v-model="this.newTaskTitle" />
        <input placeholder="Description" v-model="this.newTaskDescription"/>
        <button v-on:click="createTask(liste._id)">Ajout</button>
      </div>
    </div>
  </div>
</template>

<script>

import TaskComponent from '../components/TaskComponent.vue'
import {ServiceTask} from "../../public/js/service/ServiceTask";
import {ServiceListe} from "../../public/js/service/ServiceListe";

export default {
  name: "ListeComponent",
  components: {TaskComponent},
  props: ["liste", "tasks", "listes"],
  emits: ["setTasks", "setTasksWithApi", "setListes"],
  data: () => ({
    isEdit: false,
    title: "",
    newTaskTitle: "",
    newTaskDescription: ""
  }),
  methods: {
    updateList(listeId) {
      ServiceListe.modify(this.title, listeId)
      .then(async (response) => {
        if(response.status === 200) {
          this.setEditing(false);
          for(let aList of this.listes) {
            if(aList._id === this.liste._id) {
              aList.title = this.title;
            }
          }

          this.$emit("setTasks", this.tasks);
        } else {
          const result = await response.json();
          this.error = result.message;
        }
      });
    },
    setEditing(value) {
      this.isEdit = value;
    },
    deleteList(listId) {
      ServiceListe.delete(listId)
      .then(async (response) => {
        if(response.status === 200) {
          this.$emit("setListes", this.listes.filter(aList => aList._id !== listId));
        } else {
          const result = await response.json();
          this.error = result.message;
        }
      });
    },
    setTasks(tasks) {
      this.$emit("setTasks", tasks);
    },
    createTask(listeId) {
      ServiceTask.create(this.newTaskTitle, this.newTaskDescription, listeId)
      .then(async (response) => {
          if(response.status === 201) {
            this.$emit("setTasksWithApi");
            this.newTaskTitle = "";
            this.newTaskDescription = "";
          } else {
            const result = await response.json();
            this.error = result.message;
          }
        });
    }
  },
  mounted() {
    this.title = this.liste.title;
  }
}
</script>

<style>
.size80 {
  width: 80%;
}

.liste-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
}

.liste-component h2 {
  margin: 10px 0;
}

.liste-component input {
  padding: 10px;
  width: 80%;
  margin: 10px 0;
  border: 1px solid #ccc;
}

.liste-component .horizontale {
  display: flex;
  justify-content: space-between;
}

.liste-component button {
  padding: 10px 20px;
  background-color: #7f26d3;
  color: white;
  border: none;
  cursor: pointer;
}

.liste-component button:hover {
  background-color: #621da3;
}

.liste-component p {
  margin: 10px 0;
}

.horizontale {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}

.tasks-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.task-child {
  width: auto;
  max-width: 20%;
}

.create {
  border: solid 1px #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 10px;
}

</style>