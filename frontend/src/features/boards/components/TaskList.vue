<script setup lang="ts">
import { uid } from "uid";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { state } from "@/modules/store";
import { Board, Column } from "@f/boards/types";
import { formatTimeSince } from "@f/utils/date";

const input = ref();
const route = useRoute();
const newTasklistOpen = ref(false);
const newTaskContent = ref("");

const list = defineModel<Column>({ required: true });
const board = computed<Board>(() => state.boards[route.params.id.toString()]);
const since = computed<string>(() => formatTimeSince(new Date(list.value.createdAt || Date.now())));

const addTaskList = (): void => {
  const id: string = uid();
  list.value.tasks[id] = {
    id: id,
    order: Object.keys(list.value.tasks).length + 1,
    content: newTaskContent.value,
  };
  newTaskContent.value = "";
  input.value.focus();
};

const deleteTaskList = (): void => {
  delete board.value.columns[list.value.id];
};
</script>

<template>
  <q-card
    class="tasklist"
    :style="`backgroundColor: ${list.color || ''}`"
  >
    <q-card-section class="q-pa-sm">
      <div class="row items-center justify-between">
        <div class="text-subtitle1 auto-invert">
          {{ list.name }}
        </div>

        <q-btn
          round
          size="sm"
          flat
        >
          <q-icon
            style="color: red"
            name="settings"
          />
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
                :style="`backgroundColor: ${list.color || ''}`"
              >
                <q-item-section avatar>
                  <q-icon
                    color="primary"
                    name="palette"
                  />
                </q-item-section>

                <q-item-section :style="`backgroundColor: ${list.color || ''}`">
                  <q-item-label />

                  <q-item-label
                    class="auto-invert"
                    caption
                  >
                    {{ list.color || `Background Color` }}
                  </q-item-label>
                </q-item-section>

                <q-popup-proxy>
                  <q-color v-model="list.color" />
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
        v-for="{ id, content } in list.tasks"
        :key="id"
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
            v-model="newTaskContent"
            required
            autofocus
            label="Card content"
            filled
          />
          <q-btn
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
  flex: 1;
}

.popup {
  width: 250px;
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
