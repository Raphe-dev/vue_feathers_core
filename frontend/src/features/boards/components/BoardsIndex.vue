<script setup lang="ts">
import { uid } from "uid";
import { computed, ref } from "vue";

import { state } from "@/modules/store";

import BoardCard from "./BoardCard.vue";

const input = ref();

const addBoardOpen = ref<boolean>(false);
const newBoardName = ref<string>("");
const newBoardBackgroundImage = ref<string>("https://cdn.quasar.dev/img/mountains.jpg");

const boards = computed(() => state.boards);

const createNewBoard = (): void => {
  const id: string = uid();

  state.boards[id] = {
    id: id,
    name: newBoardName.value,
    backgroundImage: newBoardBackgroundImage.value,
    createdAt: Date.now(),
    columns: {},
  };
  newBoardName.value = "";
  newBoardBackgroundImage.value = "https://cdn.quasar.dev/img/mountains.jpg";
  input.value.focus();
};
</script>

<template>
  <q-page
    padding
    class="flex flex-start text-center"
    @click="addBoardOpen = false"
  >
    <div class="row q-col-gutter-md fit">
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div
          v-for="(board, key) in boards"
          :key="key"
          class="col-xs-12 col-sm-6 col-md-3"
        >
          <board-card v-model="boards[key]" />
        </div>
      </transition-group>

      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-card
          :flat="!addBoardOpen"
          class="add-board flex flex-center justify-center"
          :class="{ '-active': addBoardOpen }"
          @click.stop="addBoardOpen = true"
        >
          <q-card-section class="no-padding fit">
            <template v-if="!addBoardOpen">Add a board...</template>
            <template v-else>
              <q-form
                class="q-gutter-md column"
                @submit="createNewBoard"
              >
                <q-input
                  ref="input"
                  v-model="newBoardName"
                  required
                  autofocus
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
                  label="Submit"
                />
              </q-form>
            </template>
          </q-card-section>
        </q-card>
      </div>
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
  transition: all 0.2s ease;

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
