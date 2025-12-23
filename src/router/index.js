import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    icon:'mdi-home'
  },
  {
    name: "About",
    path: "/about",
    component: () => import("@/views/About.vue"),
    icon:'mdi-information'
  },
  {
    name: "Blank",
    path: "/blank",
    component: () => import("@/views/Blank.vue"),
    icon:'mdi-xmpp'
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // <-- THIS IS THE FIX
  routes,
});

export default router;