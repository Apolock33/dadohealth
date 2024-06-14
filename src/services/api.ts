import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3333"
});

const generateFirebaseId = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let idFirebase = '';
    for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        idFirebase += caracteres.charAt(randomIndex);
    }
    return idFirebase;
}

export { generateFirebaseId };
export default api;