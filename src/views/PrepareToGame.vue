<template>
  <div>
    <div class="game-board">
      <div v-for="(row, rowIndex) in gameBoard" :key="rowIndex" class="row">
        <div
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          class="cell"
          @click="toggleCell(rowIndex, cellIndex)"
          :class="{ 'ship': cell === 'ship', 'selected': cell === 'selected' }"
        ></div>
      </div>
    </div>
    <button @click="saveShips">Сохранить корабли</button>
   
  </div>
</template>

<script>
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebases';

export default {
  data() {
    return {
      gameBoard: Array.from({ length: 10 }, () => Array(10).fill(null)),
      ships: [],
      savedShips: [],
     
    };
  },
  methods: {
    toggleCell(rowIndex, cellIndex) {
      if (this.ships.length < 5) {
        if (this.gameBoard[rowIndex][cellIndex] === 'ship') {
          this.gameBoard[rowIndex][cellIndex] = null;
        } else {
          this.gameBoard[rowIndex][cellIndex] = 'ship';
        }
      }
    },
    async saveShips() {
      const shipsCollection = collection(db, 'ships');
      const shipsData = [];

      for (let rowIndex = 0; rowIndex < this.gameBoard.length; rowIndex++) {
        for (let cellIndex = 0; cellIndex < this.gameBoard[rowIndex].length; cellIndex++) {
          if (this.gameBoard[rowIndex][cellIndex] === 'ship') {
            shipsData.push({ x: rowIndex, y: cellIndex });
          }
        }
      }
      try {
        for (let index = 0; index < shipsData.length; index++) {
          const shipData = {
            id: index,
            x: shipsData[index].x,
            y: shipsData[index].y,
          };
          await addDoc(shipsCollection, shipData);
        }

        this.savedShips = [...this.savedShips, ...shipsData];

        this.resetGameBoard();
      } catch (error) {
        console.error('Ошибка при сохранении кораблей:', error);
      }
    },
    resetGameBoard() {
      for (let rowIndex = 0; rowIndex < this.gameBoard.length; rowIndex++) {
        for (let cellIndex = 0; cellIndex < this.gameBoard[rowIndex].length; cellIndex++) {
          this.gameBoard[rowIndex][cellIndex] = null;
        }
      }
    },
  },
};
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
selected {
  background-color: #007bff;
}
</style>
