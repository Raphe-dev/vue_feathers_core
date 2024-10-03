<script setup lang="ts">
import { computed, ref } from "vue";
import draggable from "vuedraggable";

import store from "@/modules/store";
const props = defineProps(["board", "list", "listKey"]);

const input = ref();
const newTasklistOpen = ref(false);
const newTaskContent = ref("");

const list = computed(() => {
  return store.state.boards[props.board.id].taskLists[props.listKey];
});

const listItems = ref(Object.values(list.value.tasks || {}));

const addTaskList = () => {
  const tasks = Object.keys(list.value.tasks);
  const id = tasks.length ? tasks.length + 1 : 1;
  list.value.tasks[id] = {
    id: id,
    order: id,
    content: newTaskContent.value,
  };
  newTaskContent.value = "";
  input.value.focus();
  listItems.value = Object.values(list.value.tasks);
};

const handleColorChange = (color) => {
  const list = props.board.taskLists[props.listKey];
  list.color = color;
  console.log(props.list);
};

const deleteTaskList = () => {
  const board = props.board;
  delete board.taskLists[props.listKey];
};
</script>

<template>
  <q-card
    v-click-outside="(newTasklistOpen = false)"
    class="tasklist"
    :style="`backgroundColor: ${props.list.color || ''}`"
  >
    <q-card-section class="q-pa-sm">
      <div class="row items-center justify-between">
        <div class="text-subtitle1">
          {{ props.list.name }}
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
                    <div>{{ props.list.createdAt }}</div>
                  </div>
                </q-item>
                <q-item
                  clickable
                  :style="`backgroundColor: ${props.list.color || ''}`"
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
                      {{ props.list.color || `Background Color` }}
                    </q-item-label>
                  </q-item-section>

                  <q-popup-proxy>
                    <q-color
                      :default-value="props.list.color"
                      @change="handleColorChange"
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
        </q-btn>
      </div>
    </q-card-section>

    <q-card-section>
      <draggable
        v-model="listItems"
        item-key="id"
        group="tasks"
        class="q-gutter-sm"
      >
        <template #item="{ element }">
          <q-card class="q-pa-xs">
            {{ element.content }}
          </q-card>
        </template>
      </draggable>
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
      @click.stop="newTasklistOpen = true"
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
  height: max-content;
  min-width: 234px;
}

.popup {
  width: 250px;
}
</style>
