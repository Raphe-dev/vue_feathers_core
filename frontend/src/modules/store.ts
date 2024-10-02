import { reactive } from "vue";

const state = reactive({
  boards: {
    1: {
      id: 1,
      name: "Board 1",
      backgroundImage: "https://cdn.quasar.dev/img/mountains.jpg",
      createdAt: "2024-01-01T12:00:00Z",
      taskLists: {
        list1: {
          name: "Todo",
          tasks: {
            1: {
              id: 1,
              content: "Task 1",
              order: 1,
            },
            2: {
              id: 2,
              content: "Task 2",
              order: 2,
            },
          },
        },
        list2: {
          name: "In Progress",
          tasks: {
            1: {
              id: 3,
              content: "Task 3",
              order: 1,
            },
            2: {
              id: 4,
              content: "Task 4",
              order: 2,
            },
          },
        },
      },
    },
  },
});

export default {
  state,
};
