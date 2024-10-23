<script setup lang="ts">
import type { Boards } from "project-template-backend";

import { ServiceInstance } from "feathers-pinia";
import { computed } from "vue";
import { useRouter } from "vue-router";

import { formatTimeSince } from "@f/utils/date";

const router = useRouter();

const board = defineModel<ServiceInstance<Boards>>({ required: true });

const since = computed<string>(() => {
  // TODO Cast as Number because Typebox type is TNumber, which is not recognized by formatTimeSince
  if (board?.value?.createdDate) return formatTimeSince(board.value.createdDate as number);
  return "Unknown date";
});
</script>

<template>
  <q-card
    v-ripple.early="{ color: 'grey-1' }"
    transition-hide="slide-right"
    class="board-card cursor-pointer"
    @click="router.push({ name: 'boards-show', params: { id: board._id?.toString() } })"
  >
    <q-img
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
        >
          <img
            src="https://picsum.photos/100/100"
            alt="avatar"
          />
        </q-avatar>
        <span>{{ since }}</span>
      </div>
      <q-btn
        :loading="board.isRemovePending"
        round
        padding="xs"
        color="red"
        icon="delete"
        @click.stop="board.remove()"
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
