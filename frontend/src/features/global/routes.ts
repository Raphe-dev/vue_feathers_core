export default [
  {
    path: "/",
    component: () => import("./layouts/MainLayout.vue"),
    children: [
      {
        name: "index",
        path: "",
        component: () => import("@f/global/components/IndexView.vue"),
      },
    ],
  },
];
