import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
import LibraryView from "../views/LibraryView.vue";
import NewReleaseView from "../views/NewReleaseView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import AlbumView from "../views/AlbumView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/search",
      component: SearchView,
    },
    {
      path: "/library/playlist/:id",
      component: LibraryView,
    },
    {
      path: "/library/album/:id",
      component: AlbumView,
    },
    {
      path: "/library",
      component: NewReleaseView,
    },
    {
      path: "/register",
      component: RegisterView,
    },
    {
      path: "/login",
      component: LoginView,
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (
    !localStorage.getItem("access_token") &&
    to.path !== "/login" &&
    to.path !== "/register"
  ) {
    next("/login");
  } else if (localStorage.getItem("access_token") && to.path === "/login") {
    next("/");
  } else if (localStorage.getItem("access_token") && to.path === "/register") {
    next("/");
  } else {
    next();
  }
});

export default router;
