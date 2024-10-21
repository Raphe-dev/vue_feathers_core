<script setup lang="ts">
import type { ServiceInstance } from "feathers-pinia";
import type { Columns } from "project-template-backend";

import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import { useFeathersService } from "@/feathers-client";

import TaskListComponent from "./TaskList.vue";
const router = useRouter();
const props = defineProps<{ id: string }>();

const BoardsService = useFeathersService("boards");
const ColumnsService = useFeathersService("columns");

BoardsService.find({ query: { _id: props.id } });
ColumnsService.find({ query: { board_id: props.id } });

const board = BoardsService.getFromStore(props.id);

const columns = ColumnsService.useFind({ query: { board_id: props.id } });

const input = ref();
const addListOpen = ref<boolean>(false);
const newColumn = ref<ServiceInstance<Columns>>(ColumnsService.new({ board_id: props.id }));
const resetNewList = (): void => (newColumn.value = ColumnsService.new({ board_id: props.id }));

const createNewList = (): void => {
  newColumn.value.createInStore();
  newColumn.value.save();
  resetNewList();
  input.value.focus();
};
</script>

<template>
  <q-page
    :style="{ backgroundImage: `url(${board?.backgroundImage || ''})` }"
    class="bg-cover column flex-start text-center"
    @click="addListOpen = false"
  >
    <div
      class="bar q-pa-md cursor-pointer"
      @click="router.push({ name: 'boards-index' })"
    >
      {{ board?.name }}
    </div>

    <div class="row q-col-gutter-md q-pa-md">
      <div
        v-for="({}, key) in columns.data"
        :key="key"
        class="col-xs-12 col-sm-6 col-md-3"
      >
        <task-list-component v-model="columns.data[key]" />
      </div>

      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-card
          :flat="!addListOpen"
          class="add-list flex flex-center justify-center"
          :class="{ '-active': addListOpen }"
          @click.stop="addListOpen = true"
        >
          <q-card-section class="no-padding fit">
            <template v-if="!addListOpen">Add a list...</template>
            <template v-else>
              <q-form
                class="q-gutter-md column"
                @submit="createNewList"
              >
                <q-input
                  ref="input"
                  v-model="newColumn.name"
                  required
                  autofocus
                  label="List name"
                  filled
                />
                <q-btn
                  :disabled="newColumn.isSavePending"
                  :loading="newColumn.isSavePending"
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
