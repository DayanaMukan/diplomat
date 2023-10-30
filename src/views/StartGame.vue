<template>
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
