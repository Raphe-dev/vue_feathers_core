<script setup lang="ts">
import { uid } from "uid";
import { ref } from "vue";
import { useRoute } from "vue-router";

import store from "@/modules/store";

import TaskList from "./TaskList.vue";

const route = useRoute();

const id = route.params.id;

const board = store.state.boards[id];

const addListOpen = ref(false);
const openAddList = () => {
  addListOpen.value = true;
};

const newListName = ref("");

const createNewList = () => {
  const id = uid();
  board.taskLists[id] = {
    id: id,
    name: newListName.value,
  };
  newListName.value = "";
};
</script>

<template>
  <q-page
    class="column flex-start text-center"
    @click="addListOpen = false"
  >
    <div
      class="bar q-pa-md cursor-pointer"
      @click="$router.push({ name: 'boards-index' })"
    >
      {{ board.name }}
    </div>

    <div class="row q-gutter-md q-pa-md">
      <task-list
        v-for="(list, key) in board.taskLists"
        :key="key"
        :list="list"
        :board="board"
      />

      <q-card
        flat
        class="add-list flex flex-center justify-center"
        :class="{ '-active': addListOpen }"
        @click.stop="openAddList"
      >
        <q-card-section class="no-padding">
          <template v-if="!addListOpen">Add a list...</template>
          <template v-else>
            <q-form
              class="q-gutter-md column"
              @submit="createNewList"
            >
              <q-input
                v-model="newListName"
                required
                label="List name"
                filled
              />
              <q-btn
                type="submit"
                color="primary"
                size="md"
              >
                Submit
              </q-btn>
            </q-form>
          </template>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.bar {
  height: 3rem;
  background-color: $grey-6;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.25rem;
}

.add-list {
  max-height: 2rem;
  min-height: 2rem;
  padding: 0.5rem 1rem;
  background-color: $grey-6;
  color: white;
  overflow: hidden;
  transition: all 0.2s ease;
  width: 234px;

  &:hover {
    cursor: pointer;
    background-color: $grey-7;
  }

  &.-active {
    background-color: $grey-2;
    color: black;
    min-height: 10rem;
  }
}
</style>
