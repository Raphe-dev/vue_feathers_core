<script setup lang="ts">
import type { ServiceInstance } from "feathers-pinia";
import type { Boards as BoardsType } from "project-template-backend";

import { computed, ref } from "vue";

import { useFeathersService } from "@/feathers-client";
const Boards = useFeathersService("boards");

Boards.find({ query: { $skip: 1, $limit: 20 } });

const boards = computed(() => Boards.findInStore({}).data);

const newBoardData = ref<ServiceInstance<BoardsType>>(Boards.new());

const initNewBoard = async (): Promise<void> => {
  newBoardData.value = Boards.new();
};

const createNewBoard = async (): Promise<void> => {
  newBoardData.value.createInStore();
  await newBoardData.value.create();
  await initNewBoard();
};

//let data = reactive<any>({});
/*
const fetchData = async (): Promise<void> => {
  let boards = await boardsService.find({});
  let columns = await columnsService.find({ query: { $limit: 100 } });
  let tasks = await tasksService.find({ query: { $limit: 100 } });

  boards = Object.values(boards.data).reduce((obj: any, value: any): object => {
    obj[value._id] = value;
    return obj;
  }, {});

  columns = Object.values(columns.data).reduce((obj: any, value: any): object => {
    obj[value._id] = value;
    return obj;
  }, {});

  tasks = Object.values(tasks.data).reduce((obj: any, value: any): object => {
    obj[value._id] = value;
    return obj;
  }, {});

  Object.assign(data, { boards: boards, columns: columns, tasks: tasks });
};

onMounted(() => {
  fetchData();
});
*/
/*

// *** BOARDS ***

const deleteBoard = async (id: string): Promise<void> => {
  await boardsService.remove(id);
  await fetchData();
};



const updateBoardData = async (id: string): Promise<void> => {
  await boardsService.patch(id, data.boards[id]);
};

const getBoardTasks = (id: string) => {
  let tasks: any[] = [];
  const cols = getBoardColumns(id);

  cols.forEach((col) => {
    const coltasks = getColumnTasks(col._id);
    tasks = [...tasks, ...coltasks];
  });
  return tasks;
};

// *** COLUMNS ***
const newColumnData = ref({ name: "" });

const getBoardColumns = (id: string) => Object.values(data.columns).filter((i) => i.board_id === id);

const createNewColumn = async (board_id: string): Promise<void> => {
  const col = await columnsService.create({ board_id: board_id, name: newColumnData.value.name });
  newColumnData.value.name = "";
  await fetchData();
};

let editColumnForm = ref({ id: null, name: "" });

const updateColumnData = async (id: string): Promise<void> => {
  await columnsService.patch(editColumnForm.value.id.value, {
    name: editColumnForm.value.name,
    board_id: id,
  });
  editColumnForm.value = { id: null, name: "" };
  await fetchData();
};

const deleteColumn = async (id: string): Promise<void> => {
  await columnsService.remove(id);
  await fetchData();
  editColumnForm.value = { id: null, name: "" };
};

// *** TASKS ***

const newTask = ref({ content: "", order: 1, column_id: null });

const createNewTask = async (id): Promise<void> => {
  newTask.value.column_id = id;
  await tasksService.create(newTask.value);
  newTask.value.content = "";
  await fetchData();
};

const getColumnTasks = (id: string) => Object.values(data.tasks).filter((i) => i.column_id === id);

const deleteTask = async (id: string): Promise<void> => {
  await tasksService.remove(id);
  await fetchData();
};

*/
</script>

<template>
  <q-page
    padding
    class="flex flex-start text-center"
  >
    <q-card class="full-width">
      <q-card-section>
        <q-list v-if="!boards.length">
          <q-item
            v-for="i in 5"
            :key="i"
          >
            <q-item-section side>
              <q-skeleton size="32px" />
            </q-item-section>

            <q-item-section>
              <q-skeleton />
            </q-item-section>

            <q-item-section side>
              <q-skeleton
                size="32px"
                type="QBtn"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <q-list>
          <transition-group name="todo-anim">
            <q-item
              v-for="board in boards"
              :key="board._id"
              class="fit"
              separator
              clickable
            >
              <q-item-section side>
                <q-icon name="list_alt" />
              </q-item-section>

              <q-item-section center>
                <div
                  v-if="board.isPatchPending"
                  class="flex justify-center items-center"
                >
                  <q-skeleton width="200px" />
                </div>
                <div v-else>
                  {{ board.name }}

                  <q-popup-edit
                    v-slot="scope"
                    v-model="board.name"
                    @before-hide="board.patch()"
                  >
                    <q-input
                      v-model="scope.value"
                      autofocus
                      @keyup.enter="scope.set"
                    >
                      <template #after>
                        <q-btn
                          flat
                          dense
                          color="negative"
                          icon="cancel"
                          @click.stop.prevent="scope.cancel"
                        />

                        <q-btn
                          flat
                          dense
                          color="positive"
                          icon="check_circle"
                          @click.stop.prevent="scope.set"
                        />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </div>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  :loading="board.isRemovePending"
                  round
                  color="red"
                  dense
                  icon="delete"
                  @click.stop="board.remove()"
                />
              </q-item-section>
            </q-item>
          </transition-group>

          <q-expansion-item
            group="board"
            label="new Board"
            @click="initNewBoard"
          >
            <q-form
              class="q-gutter-lg"
              @submit.prevent="createNewBoard"
            >
              <q-input
                v-model="newBoardData.name"
                :disabled="newBoardData.isCreatePending"
                label="Name"
              />
              <q-input
                v-model="newBoardData.backgroundImage"
                :disabled="newBoardData.isCreatePending"
                label="Background Image"
              />
              <q-btn
                :loading="newBoardData.isCreatePending"
                type="submit"
                color="primary"
                class="w-full"
                label="submit"
              />
            </q-form>
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped lang="scss">
.delete-item {
  &:hover {
    background-color: $red-2;
  }
}

.edit-item {
  &:hover {
    background-color: $green-2;
  }
}

.todo-anim {
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }

  &-enter-from {
    opacity: 0;
    transform: translateX(30px); // Start new item slightly to the right
  }

  &-enter-to {
    opacity: 1;
    transform: translateX(0); // End at the original position
  }

  &-leave-from {
    opacity: 1;
    transform: translateX(0); // Start from the original position
  }

  &-leave-to {
    opacity: 0;
    transform: translateX(-30px); // Slide out to the left
  }
}
</style>
