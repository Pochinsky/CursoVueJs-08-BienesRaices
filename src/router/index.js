import { createRouter, createWebHistory } from "vue-router";
import { useFirebaseAuth } from "vuefire";
import { onAuthStateChanged } from "firebase/auth";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin/AdminLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "/admin/propiedades",
          name: "properties",
          component: () => import("../views/admin/AdminView.vue"),
        },
        {
          path: "/admin/nueva-propiedad",
          name: "new-property",
          component: () => import("../views/admin/NewPropertyView.vue"),
        },
        {
          path: "/admin/editar-propiedad/:id",
          name: "edit-property",
          component: () => import("../views/admin/EditPropertyView.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth);
  if (requiresAuth) {
    try {
      await authenticateUser();
      next();
    } catch (error) {
      console.log(error);
      next({ name: "login" });
    }
  } else next();
});

function authenticateUser() {
  const auth = useFirebaseAuth();
  return new Promise((resolve, reject) => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      unsuscribe();
      if (user) resolve(user);
      else reject();
    });
  });
}

export default router;
