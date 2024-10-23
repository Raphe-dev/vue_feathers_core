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
        name: "boards-index-v2",
        path: "v2",
        component: () => import("./components/BoardsIndexV2.vue"),
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
