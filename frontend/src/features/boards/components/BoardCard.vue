<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import { state } from "@/modules/store";
import { Board } from "@f/boards/types";
import { formatTimeSince } from "@f/utils/date";
const router = useRouter();

const board = defineModel<Board>({ required: true });

const since = computed<string>(() => formatTimeSince(new Date(board.value.createdAt)));
</script>

<template>
  <q-card
    v-ripple.early="{ color: 'grey-1' }"
    transition-hide="slide-right"
    class="board-card"
    @click="router.push({ name: 'boards-show', params: { id: board.id } })"
  >
    <img
      :src="board.backgroundImage"
      :alt="`${board.name}-cover-img`"
      class="board-card__img"
    />
    <div class="board-card__name">{{ board.name }}</div>
    <q-card-section class="q-pa-sm row justify-between items-center">
      <div class="row items-center q-gutter-sm">
        <q-avatar
          size="md"
          color="primary"
        />
        <span>{{ since }}</span>
      </div>
      <q-btn
        round
        padding="xs"
        color="red"
        icon="delete"
        @click.stop="() => delete state.boards[board.id]"
      />
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.board-card {
  min-width: 200px;
  height: 256px;

  &__img {
    object-fit: cover;
    height: 80%;
  }

  &__name {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 1.5rem;
    color: white;
  }
}
</style>
