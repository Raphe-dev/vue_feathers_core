<script setup lang="ts">
import type { ServiceInstance } from "feathers-pinia";
import type { Boards } from "project-template-backend";

import { computed, ref } from "vue";

import { useFeathers } from "@/feathers-client";

import BoardCard from "./BoardCard.vue";

const { api } = useFeathers();

const BoardsService = api.service("boards");

BoardsService.find();

const pageSize = ref(8);
const boards$ = BoardsService.useFind(
  { query: { $limit: pageSize, $skip: pageSize } },
  { paginateOn: "hybrid" },
);
const boards = computed<ServiceInstance<Boards>[]>(() => BoardsService.findInStore({ query: {} }).data);

const onInfinite = async (index, done): Promise<void> => {
  if (boards$.canNext) await boards$.next();
  else if (boards.value.length === boards$.total) done(true);
  done();
};

const newBoard = ref<ServiceInstance<Boards>>(BoardsService.new());
const addBoardOpen = ref<boolean>(false);
const input = ref();
const createNewBoard = (): void => {
  newBoard.value.createInStore();
  newBoard.value.save();
  newBoard.value = BoardsService.new();
  input.value.focus();
};
</script>

<template>
  <q-page
    padding
    class="flex flex-start text-center"
    @click="addBoardOpen = false"
  >
    <q-infinite-scroll
      class="row q-col-gutter-md fit"
      :offset="10"
      @load="onInfinite"
    >
      <template v-if="!boards.length">
        <div
          v-for="i in 8"
          :key="i"
          class="col-xs-12 col-sm-6 col-md-3"
        >
          <q-card>
            <q-skeleton
              square
              height="200px"
            />
            <q-card-section class="row items-center justify-between q-pa-sm">
              <q-avatar><q-skeleton type="QAvatar" /></q-avatar>
              <q-skeleton class="col-6" />
              <q-skeleton
                class="col-2"
                type="QBtn"
                round
              />
            </q-card-section>
          </q-card>
        </div>
      </template>
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div
          v-for="({}, key) in boards"
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
                  v-model="newBoard.name"
                  required
                  autofocus
                  label="Board name"
                  filled
                />
                <q-input
                  v-model="newBoard.backgroundImage"
                  label="Background Image"
                  filled
                />
                <q-btn
                  :loading="newBoard.isSavePending"
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

      <template #loading>
        <div class="justify-center items-center q-my-md fit">
          <div>
            <q-spinner-dots
              color="primary"
              size="40px"
            />
          </div>
        </div>
      </template>
    </q-infinite-scroll>
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
