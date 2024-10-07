export default [
  {
    path: "/auth",
    component: () => import("@f/global/layouts/MainLayout.vue"),
    children: [
      {
        name: "auth-login",
        path: "/auth/login",
        component: () => import("@f/auth/components/LoginView.vue"),
      },
      {
        name: "auth-signup",
        path: "/auth/signup",
        redirect: "/auth/login",
        component: () => import("@f/auth/components/SignupView.vue"),
      },
    ],
  },
  {
    path: "/users",
    component: () => import("@f/global/layouts/MainLayout.vue"),
    children: [
      {
        name: "user-list",
        path: "/users/",
        component: () => import("@f/auth/components/UserListView.vue"),
      },
    ],
  },
];
