<script setup lang="js">
import { RouterView } from 'vue-router'
import { useUser } from './composables/useUser'
import { onMounted } from 'vue'


onMounted(() => {
  getUserFromLocalStorage()
})

const {getUserFromLocalStorage } = useUser()
</script>

<template>
  <RouterView />
</template>

<style scoped></style>