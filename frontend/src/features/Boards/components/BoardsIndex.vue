<script setup lang="ts">
import { computed, reactive, ref } from "vue";

import store from "@/modules/store";

import BoardCard from "./BoardCard.vue";

const boards = computed(() => {
  return store.state.boards;
});

const addBoardOpen = ref(false);

const openAddBoard = () => {
  console.log("click");
  addBoardOpen.value = true;
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
        <q-card-section class="no-padding"> Add a board... </q-card-section>
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

  transition: min-height 0.2s ease;

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
