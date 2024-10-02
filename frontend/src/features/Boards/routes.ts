export default [
  {
    path: "/boards",
    component: () => import("../Global/layouts/MainLayout.vue"),
    meta: { public: true },
    children: [
      {
        name: "boards-index",
        path: "",
        component: () => import("./components/BoardsIndex.vue"),
      },
      {
        name: "boards-show",
        path: "/boards/:id",
        component: () => import("./components/BoardsShow.vue"),
      },
    ],
  },
];
