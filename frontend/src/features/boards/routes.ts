export default [
  {
    path: "/boards",
    component: () => import("@f/global/layouts/MainLayout.vue"),
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
        props: true,
        component: () => import("./components/BoardsShow.vue"),
      },
    ],
  },
];
