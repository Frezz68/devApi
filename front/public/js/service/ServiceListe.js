import { Service } from "./Service";

export const ServiceListe = {
    getAll: () => {
        return Service.callWithAuthNoBody("http://localhost:8080/api/v1/lists", "GET");
    },
    create: (title) => {
        const data = JSON.stringify({title: title});
        return Service.callWithAuth("http://localhost:8080/api/v1/lists", data, "POST");
    },
    modify: (title, id) => {
        const url = "http://localhost:8080/api/v1/lists/" + id;
        const data = JSON.stringify({title: title});
        return Service.callWithAuth(url, data, "PUT")
    },
    delete: (id) => {
        const url = "http://localhost:8080/api/v1/lists/" + id;
        return Service.callWithAuthNoBody(url, "DELETE");
    }
}