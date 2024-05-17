import Vue from "vue";
import store from "../store";
import VueRouter from "vue-router";
import SideMenu from "../layouts/SideMenu";
import Dashboard from "../views/Dashboard";
import Login from "../views/Login";
import ErrorPage from "../views/ErrorPage";
import Tabulator from "../views/Tabulator";
import Download_luncher from '../views/Download_luncher';
import Support from '../views/Support';
import Shop from '../views/Shop';
import Donate from '../views/Donate';
import Settings from '../views/Settings';
import Roulette from '../views/Roulette';
import Log from '../views/Log';
import Terms from '../views/Terms';
import Privacy from '../views/Privacy';
import Register from '../views/Register';
import Maintanence from '../views/Maintanence';

Vue.use(VueRouter);
 
const routes = [
  {
    path: "/",
    component: SideMenu,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {title: 'zennos - dashboard'}
      },
      {
        path: "download_launcher",
        name: "Download-Launcher",
        component: Download_luncher,
        meta: {title: 'zennos - download'}
      },
      {
        path: "leaderboards",
        name: "Rankings",
        component: Tabulator,
        meta: {title: 'zennos - leaderboards'}
      },
      {
        path: "support",
        name: "Support",
        component: Support,
        meta: {title: 'zennos - support'}
      },
      {
        path: "profile",
        name: "Profile",
        component: Dashboard,
        meta: {title: 'zennos - profile'}
      },
      {
        path: "shop",
        name: "Shop",
        component: Shop,
        meta: {title: 'zennos - shop'}
      },
      {
        path: "donate",
        name: "Donate",
        component: Donate,
        meta: {title: 'zennos - donate'}
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
        meta: {title: 'zennos - settings'}
      },
      {
        path: "wheel",
        name: "Roulette",
        component: Roulette,
        meta: {title: 'zennos - Roulette'}
      },
      {
        path: "log",
        name: "Logs",
        component: Log,
        meta: {title: 'zennos - logs'}
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {title: 'zennos - login'}
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {title: 'zennos - register'}
  },
  {
    path: "/terms_service",
    name: "terms",
    component: Terms,
    meta: {title: 'zennos - terms'}
  },
  {
    path: "/maintanence",
    name: "maintanence",
    component: Maintanence,
    meta: {title: 'zennos - maintanence'}
  },
  {
    path: "/privacy_policy",
    name: "privacy",
    component: Privacy,
    meta: {title: 'zennos - privacy'}
  },
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage
  },
  {
    path: "/*",
    component: ErrorPage
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'zennos';
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.main.authToken == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
