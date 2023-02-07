import {createRouter, createWebHistory} from 'vue-router'
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Data from "./components/Data.vue";
import Register from "./components/Register.vue";
import FilmDetails from "@/components/FilmDetails.vue";
import createFilm from "@/components/createFilm.vue";

const routes = [
    { path: '/', name: "Home", component: Home },
    { path: '/login', name: "Login", component: Login },
    { path: '/data', name: "Data", component: Data },
    { path: '/register', name: "Register", component: Register },
    { path: '/filmDetails/:filmId', component: FilmDetails },
    { path: '/createFilm', component: createFilm },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;