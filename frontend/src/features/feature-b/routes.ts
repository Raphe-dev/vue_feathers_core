export default [
  {
    path: "/features/b",
    component: () => import("@f/global/layouts/MainLayout.vue"),
    children: [
      {
        name: "feature-b",
        path: "/features/b",
        component: () => import("./components/FeatureB.vue"),
      },
    ],
  },
];
