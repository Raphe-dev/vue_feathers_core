<script setup lang="ts">
import { uid } from "uid";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import { state } from "@/modules/store";
import { Board } from "@f/boards/types";

import TaskListComponent from "./TaskList.vue";

const router = useRouter();

const props = defineProps<{ id: string }>();

const board = computed<Board>(() => state.boards[props.id]);

const addListOpen = ref<boolean>(false);

let newListName = ref<string>("");

const createNewList = (): void => {
  const id: string = uid();
  board.value.columns[id] = {
    id: id,
    name: newListName.value,
    tasks: {},
    createdAt: Date.now(),
    color: "#fff",
  };
  newListName.value = "";
};
</script>

<template>
  <q-page
    :style="{ backgroundImage: `url(${board.backgroundImage})` }"
    class="bg-cover column flex-start text-center"
    @click="addListOpen = false"
  >
    <div
      class="bar q-pa-md cursor-pointer"
      @click="router.push({ name: 'boards-index' })"
    >
      {{ board.name }}
    </div>

    <div class="row q-gutter-md q-pa-md">
      <task-list-component
        v-for="(list, key) in board.columns"
        :key="key"
        v-model="board.columns[key]"
      />

      <q-card
        :flat="!addListOpen"
        class="add-list flex flex-center justify-center"
        :class="{ '-active': addListOpen }"
        @click.stop="addListOpen = true"
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
                autofocus
                label="List name"
                filled
              />
              <q-btn
                type="submit"
                color="primary"
                size="md"
                label="submit"
              />
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
  background-color: #9e9e9e80;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.25rem;
}

.bg-cover {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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
