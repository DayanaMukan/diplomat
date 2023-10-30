<template>
  <div>
    <h1>Текущая игра</h1>
    <div class="game-board">
      <div v-for="(row, rowIndex) in gameData.field" :key="rowIndex" class="row">
        <div
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          class="cell"
          :class="{ 'ship': cell === 'ship' }"
          @click="shoot(rowIndex, cellIndex)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';

const gameId = 'gameId';

const gameData = ref({
  field: [],
});

async function fetchData() {
  const gameQuery = query(collection(db, 'games'), where('id', '==', gameId));
  const querySnapshot = await getDocs(gameQuery);
  if (!querySnapshot.empty) {
    gameData.value = querySnapshot.docs[0].data();
  }
}

function shoot(rowIndex, cellIndex) {
  if (gameData.value.field[rowIndex][cellIndex] !== 'shot') {
    gameData.value.field[rowIndex][cellIndex] = 'shot';
    saveGameData(gameData.value);
  }
}

async function saveGameData(data) {
  const gameRef = doc(db, 'games', gameId);
  try {
    await updateDoc(gameRef, data);
  } catch (error) {
    console.error('Ошибка при сохранении данных игры:', error);
  }
}

onMounted(() => {
  fetchData();
});
</script>

  
  <style scoped>
  .game-board {
  display: grid;
  grid-template-columns: repeat(10, 40px); 
  grid-template-rows: repeat(10, 40px); 
}
.cell {
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  cursor: pointer;
}
.ship {
  background-color: #007bff; 
}
  </style>
  