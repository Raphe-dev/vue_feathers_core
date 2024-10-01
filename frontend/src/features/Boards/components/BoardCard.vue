<script setup lang="ts"></script>

<template>
  <q-card class="board-card">
    <img
      src="https://cdn.quasar.dev/img/mountains.jpg"
      class="board-card__img"
    />
    <q-card-section class="q-pa-sm row justify-between items-center">
      <div>created at</div>
      <q-btn
        round
        padding="xs"
        color="red"
        icon="delete"
      />
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.board-card {
  max-width: 256px;
  height: 256px;

  &__img {
    object-fit: cover;
    height: 80%;
  }
}
</style>
