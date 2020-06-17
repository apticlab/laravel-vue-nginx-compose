import Login from "@/components/Login";
import Logout from "@/components/Logout";

import Main from "@/views/Main";
import RouterView from "@/views/RouterView";

import Dashboard from "@/views/Dashboard";

import { getProfile } from "../utils/auth.js";

const roleRedirect = {
  superadmin: "/dashboard"
};

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/",
    name: "root",
    meta: {
      requiresAuth: true
    },
    component: Main,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
          label: "Dashboard",
          icon: "hi-dashboard",
          roles: ["superadmin"]
        }
      },
      {
        name: "logout",
        path: "/logout",
        component: Logout
      },
      {
        path: "",
        redirect: to => {
          let user = getProfile();

          if (!user) {
            return "/login";
          }

          return roleRedirect[user.role.code] || "/dashboard";
        }
      }
    ]
  }
];

export { routes };
