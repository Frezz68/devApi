import { Service } from "./Service";

export const ServiceTask = {
    getAll: async () => {
        return Service.callWithAuthNoBody('http://localhost:8080/api/v1/tasks', "GET");
    },
    create: async (title, description, listeId) => {
        const data = JSON.stringify({title: title, description: description, done: false, list: listeId});
        return Service.callWithAuth("http://localhost:8080/api/v1/tasks", data, "POST");
    },
    modify: async (id, title, description, isDone, listeId) => {
        const data = JSON.stringify({title: title, description: description, done: isDone, list: listeId});
        const url = "http://localhost:8080/api/v1/tasks/" + id;
        return Service.callWithAuth(url, data, "PUT");
    },
    delete: async (id) => {
        const url = "http://localhost:8080/api/v1/tasks/" + id;
        return Service.callWithAuthNoBody(url, "DELETE");
    }
}