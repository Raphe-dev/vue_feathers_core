<script setup lang="ts">
import { state } from "@/modules/store";

const props = defineProps({ board: Object });

const deleteBoard = () => {
  delete state.boards[props.board.id];
};
</script>

<template>
  <q-card
    class="board-card"
    @click="$router.push({ name: 'boards-show', params: { id: props.board.id } })"
  >
    <img
      :src="props.board.backgroundImage"
      :alt="`${props.board.name}-cover-img`"
      class="board-card__img"
    />
    <div class="board-card__name">{{ props.board.name }}</div>
    <q-card-section class="q-pa-sm row justify-between items-center">
      <div class="row items-center q-gutter-sm">
        <q-avatar
          size="md"
          color="primary"
        />
        <span>created at {{ props.board.createdAt }}</span>
      </div>
      <q-btn
        round
        padding="xs"
        color="red"
        icon="delete"
        @click="deleteBoard"
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
