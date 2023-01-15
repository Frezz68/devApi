import { Service } from "./Service";

export const ServiceUtilisateur = {
    login: async (email, password) => {
        const data = JSON.stringify({email: email, password: password});
        return Service.callWithoutAuth("http://localhost:8080/api/v1/users/login", data, "POST");
    },

    register: async (email, password, termsAndConditions) => {
        const data = JSON.stringify({email: email, password: password, terms_and_conditions: termsAndConditions});
        return Service.callWithoutAuth('http://localhost:8080/api/v1/users/register', data, "POST");
    },

    getInfo: async () => {
        return Service.callWithAuthNoBody("http://localhost:8080/api/v1/users/profile", "GET");
    },

    updateInfo: async (email, password) => {
        const data = JSON.stringify({email: email, password: password});
        return Service.callWithAuth("http://localhost:8080/api/v1/users/profile", data, "POST")
    }
}