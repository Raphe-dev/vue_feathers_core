<script setup lang="ts">
import { ref } from "vue";

import store from "@/modules/store";

const props = defineProps(["board", "list", "listKey"]);

const input = ref();
const newTasklistOpen = ref(false);
const newTaskContent = ref("");

const addTaskList = () => {
  const list = props.board.taskLists[props.listKey];
  const id = Object.keys(list.tasks).length + 1;
  list.tasks[id] = {
    id: id,
    order: id,
    content: newTaskContent.value,
  };
  newTaskContent.value = "";
  input.value.focus();
};
</script>

<template>
  <q-card
    class="tasklist"
    :style="`backgroundColor: ${props.list.color || ''}`"
  >
    <q-card-section class="q-pa-sm">
      <div class="row items-center justify-between">
        <div class="text-subtitle1 q">
          {{ props.list.name }}
        </div>

        <q-btn
          round
          size="sm"
          flat
          icon="settings"
        />
      </div>
    </q-card-section>

    <q-card-section class="column q-gutter-sm">
      <q-card
        v-for="task in props.list.tasks"
        :key="task.id"
        class="q-pa-xs"
      >
        {{ task.content }}
      </q-card>
    </q-card-section>

    <q-item v-if="newTasklistOpen">
      <q-item-section>
        <q-form
          class="column q-gutter-sm"
          @submit="addTaskList"
        >
          <q-input
            ref="input"
            v-model="newTaskContent"
            autofocus
            tabindex="0"
            label="Card content"
            filled
          />
          <q-btn
            color="primary"
            type="submit"
          >
            Submit
          </q-btn>
        </q-form>
      </q-item-section>
    </q-item>

    <q-item
      v-else
      clickable
      @click="newTasklistOpen = true"
    >
      <q-item-section avatar>
        <q-icon
          color="primary"
          name="add"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label />
        <q-item-label caption>New card</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<style scoped lang="scss">
.tasklist {
  height: auto;
  min-width: 234px;
}
</style>
