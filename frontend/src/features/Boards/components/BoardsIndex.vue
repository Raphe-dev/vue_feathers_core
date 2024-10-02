<script setup lang="ts">
import { uid } from "uid";
import { computed, reactive, ref } from "vue";

import store from "@/modules/store";

import BoardCard from "./BoardCard.vue";

const boards = computed(() => {
  return store.state.boards;
});

const addBoardOpen = ref(false);
const newBoardName = ref("");
const newBoardBackgroundImage = ref("https://cdn.quasar.dev/img/mountains.jpg");

const openAddBoard = () => {
  addBoardOpen.value = true;
};

const createNewBoard = () => {
  const id = uid();
  store.state.boards[id] = {
    id: id,
    name: newBoardName.value,
    backgroundImage: newBoardBackgroundImage.value,
    createdAt: Date.now(),
    taskLists: {},
  };
  newBoardName.value = "";
  newBoardBackgroundImage.value = "https://cdn.quasar.dev/img/mountains.jpg";
};
</script>

<template>
  <q-page
    padding
    class="flex flex-start text-center"
    @click="addBoardOpen = false"
  >
    <div class="row q-gutter-md">
      <board-card
        v-for="(board, key) in boards"
        :key="key"
        :board="board"
        class="col"
      />

      <q-card
        flat
        class="add-board flex flex-center justify-center"
        :class="{ '-active': addBoardOpen }"
        @click.stop="openAddBoard"
      >
        <q-card-section class="no-padding">
          <template v-if="!addBoardOpen">Add a board...</template>
          <template v-else>
            <q-form
              class="q-gutter-md column"
              @submit="createNewBoard"
            >
              <q-input
                v-model="newBoardName"
                label="Board name"
                filled
              />
              <q-input
                v-model="newBoardBackgroundImage"
                label="Background Image"
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
.add-board {
  max-height: 2rem;
  min-height: 2rem;
  padding: 0.5rem 1rem;
  background-color: $grey-6;
  color: white;
  overflow: hidden;
  transition: min-height 0.2s ease;

  &:hover {
    cursor: pointer;
    background-color: $grey-7;
  }

  &.-active {
    background-color: $grey-2;
    color: black;
    min-height: 13rem;
  }
}
</style>
