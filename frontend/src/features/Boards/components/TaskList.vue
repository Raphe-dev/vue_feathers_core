<script setup lang="ts">
const props = defineProps(["board", "list"]);
</script>

<template>
  <q-card class="tasklist">
    <q-card-section>
      <div class="text-subtitle1 q">{{ props.list.name }}</div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.tasklist {
  min-height: 20rem;
  min-width: 10rem;
}
</style>
