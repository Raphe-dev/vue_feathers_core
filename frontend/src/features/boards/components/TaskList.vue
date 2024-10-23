<script setup lang="ts">
import type { ServiceInstance } from "feathers-pinia";
import type { Columns as ColumnsType } from "project-template-backend/lib/services/columns/columns.schema";
import type { Tasks as TasksType } from "project-template-backend/lib/services/tasks/tasks.schema";

import { computed, ref } from "vue";

import { useFeathersService } from "@/feathers-client";
import { formatTimeSince } from "@f/utils/date";

const column = defineModel<ServiceInstance<ColumnsType>>({ required: true });

const Tasks = useFeathersService("tasks");
Tasks.find({ query: { column_id: column.value._id } });

const tasks = computed<ServiceInstance<TasksType>[]>(
  () => Tasks.findInStore({ query: { column_id: column.value._id } }).data,
);

const input = ref();

const newTasklistOpen = ref(false);
const newTask = ref(Tasks.new({ column_id: column.value._id }));
const resetNewTask = (): void => (newTask.value = Tasks.new({ column_id: column.value._id }));

const since = computed<string>(() => formatTimeSince(new Date(Date.now())));

const addTaskList = (): void => {
  newTask.value.order = tasks.value.length + 1;
  newTask.value.createInStore();
  newTask.value.save();
  resetNewTask();
  input.value.focus();
};

const deleteTaskList = (): void => {
  column.value.remove();
};
</script>

<template>
  <q-card
    class="tasklist"
    :style="`backgroundColor: ${column.color || ''}`"
  >
    <q-card-section class="q-pa-sm">
      <div class="row items-center justify-between">
        <div class="text-subtitle1 auto-invert">
          {{ column.name }}
        </div>

        <q-btn
          round
          size="sm"
          flat
        >
          <q-icon name="settings" />
        </q-btn>
        <q-popup-proxy>
          <q-card class="q-pa-sm popup">
            <q-card-section class="no-padding">
              <q-item>
                <q-avatar
                  color="primary"
                  size="xl"
                />
                <div class="column q-pl-md">
                  <b>Owner</b>
                  <div>{{ since }}</div>
                </div>
              </q-item>
              <q-item
                clickable
                :style="`backgroundColor: ${column.color || ''}`"
              >
                <q-item-section avatar>
                  <q-icon
                    color="primary"
                    name="palette"
                  />
                </q-item-section>

                <q-item-section :style="`backgroundColor: ${column.color || ''}`">
                  <q-item-label />

                  <q-item-label
                    class="auto-invert"
                    caption
                  >
                    {{ column.color || `Background Color` }}
                  </q-item-label>
                </q-item-section>

                <q-popup-proxy>
                  <q-color
                    v-model="column.color"
                    @change="column.save()"
                  />
                </q-popup-proxy>
              </q-item>

              <q-item
                clickable
                @click="deleteTaskList"
              >
                <q-item-section avatar>
                  <q-icon
                    color="red"
                    name="delete"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-bold text-red"> DELETE CARD </q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </q-popup-proxy>
      </div>
    </q-card-section>

    <q-card-section class="q-gutter-sm">
      <q-card
        v-for="{ _id, content } in tasks"
        :key="`task-${_id}`"
        class="q-pa-xs"
      >
        {{ content }}
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
            v-model="newTask.content"
            required
            autofocus
            label="Card content"
            filled
          />
          <q-btn
            :loading="newTask.isSavePending"
            color="primary"
            type="submit"
            label="Submit"
          />
        </q-form>
      </q-item-section>
    </q-item>

    <q-item
      v-else
      clickable
      @click.stop="newTasklistOpen = true"
    >
      <q-item-section avatar>
        <q-icon
          color="primary"
          name="add"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label
          caption
          class="auto-invert"
        >
          New card
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<style scoped lang="scss">
.tasklist {
  height: max-content;
  min-width: 234px;
}

.popup {
  width: 250px;
  background: white !important;
}

.auto-invert {
  transition: 0s ease;
  height: inherit;
  background: inherit;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent !important;
  filter: invert(1) grayscale(1) contrast(9);
}

*:has(.auto-invert) {
  background: inherit;
}

.q-item {
  transition: 0s ease;
}
</style>
