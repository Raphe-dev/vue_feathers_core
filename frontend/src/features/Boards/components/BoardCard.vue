<script setup lang="ts">
import store from "@/modules/store";

const props = defineProps(["board"]);

const deleteBoard = () => {
  delete store.state.boards[props.board.id];
};
</script>

<template>
  <q-card
    class="board-card"
    @click="$router.push({ name: 'boards-show', params: { id: props.board.id } })"
  >
    <img
      src="https://cdn.quasar.dev/img/mountains.jpg"
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
