<template>
  <div class="task-component">
    <p v-if="!isEdit">Titre: {{task.title}}</p>
    <p v-if="!isEdit">Description: {{task.description}}</p>
    <p v-if="!isEdit">Etat: {{task.done ? "Fini" : "Non fini"}}</p>
    <input placeholder="Titre" v-model="title" v-if="isEdit" />
    <input placeholder="Description" v-model="description" v-if="isEdit" />
    <label v-if="isEdit">Est fini: <input placeholder="Etat" v-model="isDone" type="checkbox"/></label>
    <div class="task-icon">
      <button v-on:click="setEditable(true)" v-if="!isEdit">Modifier</button>
      <button v-on:click="deleteTask(task._id)" v-if="!isEdit">Supprimer</button>
      <button v-on:click="editTask()" v-if="isEdit">Sauvegarder</button>
      <button v-on:click="setEditable(false)" v-if="isEdit">Annuler</button>
    </div>
  </div>
</template>

<script>

import {ServiceTask} from "../../public/js/service/ServiceTask";

export default {
  name: "TaskComponent",
  props: ["task", "tasks"],
  data: () => ({
    isEdit: false,
    title: "",
    discription: "",
    isDone: false,
  }),
  methods: {
    editTask() {
      if(this.title.trim() !== "" && this.description.trim() !== "") {
        ServiceTask.modify(this.task._id, this.title, this.description, this.isDone, this.task.list)
        .then(async (response) => {
          if(response.status === 200) {
            this.setEditable(false);
            for(let aTask of this.tasks) {
              if(aTask._id === this.task._id) {
                aTask.title = this.title;
                aTask.description = this.description;
                aTask.done = this.isDone;
              }
            }

            this.$emit("setTasks", this.tasks);
          } else {
            const result = await response.json();
            this.error = result.message;
          }
        });
      }
    },
    setEditable(value) {
      this.isEdit = value;
    },
    deleteTask(id) {
      ServiceTask.delete(id)
      .then(async (response) => {
        if(response.status === 200) {
          this.$emit("setTasks", this.tasks.filter(aTask => aTask._id !== id));
        } else {
          const result = await response.json();
          this.error = result.message;
        }
      });
    },
  },
  mounted() {
    this.title = this.task.title;
    this.description = this.task.description;
    this.isDone = this.task.done;
  }
}
</script>

<style>
.task-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
}

.task-component p {
  margin: 10px 0;
}

.task-component input {
  width: 80%;
  border: 1px solid #ccc;
}

.task-component label{
  width: 80%;
}

.task-component input[type="checkbox"] {
  width: 20%;
}

.task-component .task-icon {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.task-component button {
  background-color: #7f26d3;
  width: 40%;
  margin-left: 5%;
  margin-right: 5%;
  justify-content: center;
  display: flex;
  align-items: center;
  font-size: 0.7em;
  color: white;
  border: none;
}

.task-component button:hover {
  background-color: #621da3;
}
</style>
