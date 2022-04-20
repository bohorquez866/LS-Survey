import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

import Login from "@/Views/Login.vue";
import Register from "@/Views/Register.vue";
import Dashboard from "@/Views/Dashboard.vue";
import Surveys from "@/Views/Surveys.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import AuthLayout from "@/components/AuthLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        { path: "Dashboard", name: "Dashboard", component: Dashboard },
        { path: "/surveys", name: "Surveys", component: Surveys },
      ],
    },

    {
      path: "/auth",
      name: "Auth",
      redirect: "Login",
      meta: { isGuest: true },
      component: AuthLayout,
      children: [
        {
          path: "/login",
          name: "Login",
          component: Login,
        },

        {
          path: "/register",
          name: "Register",
          component: Register,
        },
      ],
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
