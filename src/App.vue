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

<style>
  body {
  background: linear-gradient(to bottom, #3498db, #0c4884); 
  background-size: cover; 
  background-attachment: fixed;
  color: white; 
  font-family: Arial, sans-serif; 
}
  Button{
      background-color: rgb(0, 0, 0);
      color: rgb(255, 255, 255);
    }

</style>