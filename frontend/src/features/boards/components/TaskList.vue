<script setup lang="ts">
import { uid } from "uid";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { state } from "@/modules/store";

const route = useRoute();
const newTasklistOpen = ref(false);
const newTaskContent = ref("");

const list = defineModel();
const board = computed(() => state.boards[route.params.id]);

const addTaskList = (): void => {
  const id: string = uid();
  list.value.tasks[id] = {
    id: id,
    order: id,
    content: newTaskContent.value,
  };
  newTaskContent.value = "";
};

const deleteTaskList = (): void => {
  delete board.value.taskLists[list.value.id];
};
</script>

<template>
  <q-card
    class="tasklist"
    :style="`backgroundColor: ${list.color || ''}`"
  >
    <q-card-section class="q-pa-sm">
      <div class="row items-center justify-between">
        <div class="text-subtitle1">
          {{ list.name }}
        </div>

        <q-btn
          round
          size="sm"
          flat
          icon="settings"
        >
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
                    <div>{{ list.createdAt }}</div>
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

                  <q-item-section>
                    <q-item-label />
                    <q-item-label caption>
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
        </q-btn>
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
        <q-item-label caption>New card</q-item-label>
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
}
</style>
