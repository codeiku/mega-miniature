import { createRouter, createWebHistory } from "vue-router";
import Data from "@/views/Data.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/data",
    },
    {
      path: "/data",
      name: "data",
      component: Data,
    },
    {
      path: "/process",
      name: "process",
      component: () => import("@/views/Process.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/Dashboard.vue"),
    },
    {
      path: "/conformance",
      name: "conformance",
      component: () => import("@/views/Conformance.vue"),
    },
    {
      path: "/explore",
      name: "explore",
      component: () => import("@/views/Explore.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/Settings.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/Admin.vue"),
    },
    {
      path: "/interactive",
      name: "interactive",
      component: () => import("@/views/Interactive.vue"),
    },
    {
      path: "/dataset-admin",
      name: "dataset-admin",
      component: () => import("@/views/DatasetAdmin.vue"),
    },
  ],
});

export default router;
