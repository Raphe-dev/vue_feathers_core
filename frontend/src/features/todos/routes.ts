export default [
  {
    path: "/todos",
    component: () => import("@f/global/layouts/MainLayout.vue"),
    meta: { public: true },
    children: [
      {
        name: "todo-index",
        path: "",
        component: () => import("./components/TodosIndex.vue"),
      },
    ],
  },
];
