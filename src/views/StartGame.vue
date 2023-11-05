<template>
  <h1>jhjhb</h1>
  <button @click="startGame">Начать игру</button>
</template>

<script setup>
import { collection, addDoc } from 'firebase/firestore';

const gameCollection = collection('game');

const startGame = async () => {
  const gameData = {
    player1: 'Игрок 1',
    player2: 'Игрок 2',
  };

  try {
    await addDoc(gameCollection, gameData);
    console.log('Игра началась!');
  } catch (error) {
    console.error('Ошибка при начале игры:', error);
  }
};
</script>
<style scoped>
 button{
  color: aqua;
 }
 h1{
  color: aquamarine;
 }
</style>
