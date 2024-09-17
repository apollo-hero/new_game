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
import Wiki from '../views/Wiki';
import WikiDetail from '../views/WikiDetail';
import Register from '../views/Register';
import Maintanence from '../views/Maintanence';
import ServerSetting from '../views/ServerSetting';

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
        meta: {title: 'Zelda - dashboard'}
      },
      {
        path: "download_launcher",
        name: "Download-Launcher",
        component: Download_luncher,
        meta: {title: 'Zelda - download'}
      },
      {
        path: "leaderboards",
        name: "Rankings",
        component: Tabulator,
        meta: {title: 'Zelda - leaderboards'}
      },
      {
        path: "support",
        name: "Support",
        component: Support,
        meta: {title: 'Zelda - support'}
      },
      {
        path: "profile",
        name: "Profile",
        component: Dashboard,
        meta: {title: 'Zelda - profile'}
      },
      {
        path: "shop",
        name: "Shop",
        component: Shop,
        meta: {title: 'Zelda - shop'}
      },
      {
        path: "donate",
        name: "Donate",
        component: Donate,
        meta: {title: 'Zelda - donate'}
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
        meta: {title: 'Zelda - settings'}
      },
      {
        path: "server-settings",
        name: "Sever-Settings",
        component: ServerSetting,
        meta: {title: 'Zelda - server-settings'}
      },
      {
        path: "wheel",
        name: "Roulette",
        component: Roulette,
        meta: {title: 'Zelda - Roulette'}
      },
      {
        path: "log",
        name: "Logs",
        component: Log,
        meta: {title: 'Zelda - logs'}
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {title: 'Zelda - login'}
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {title: 'Zelda - register'}
  },
  {
    path: "/terms_service",
    name: "terms",
    component: Terms,
    meta: {title: 'Zelda - terms'}
  },
  {
    path: "/maintanence",
    name: "maintanence",
    component: Maintanence,
    meta: {title: 'Zelda - maintanence'}
  },
  {
    path: "/privacy_policy",
    name: "privacy",
    component: Privacy,
    meta: {title: 'Zelda - privacy'}
  },
  {
    path: "/wiki",
    name: "wiki",
    component: Wiki,
    meta: {title: 'Zelda - wiki'}
  },
  {
    path: "/wiki/:id",
    name: "WikiDetail",
    component: WikiDetail, // The component that handles the dynamic wiki page
    meta: {title: 'Zelda - wiki detail'}
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
  document.title = to.meta.title || 'Zelda';
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
