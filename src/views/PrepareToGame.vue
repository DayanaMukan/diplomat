<template>
  <div class="center">
    <div class="p-grid game-board">
      <div v-for="(row, rowIndex) in gameBoard" :key="rowIndex" class="p-col-1 row">
        <div
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          class="p-col-1 cell"
          @click="toggleCell(rowIndex, cellIndex)"
          :class="{ 'p-button p-button-danger': cell === 'ship', 'p-button p-button-success': cell === 'selected' }"
        ></div>
      </div>
    </div>
  </div>
  <div class="but_center">
    <Button ref="saveButton" @click="saveShips" :class="saveButtonClass" :disabled="ships.length !== 10">
      {{ shipsSaved ? 'Корабли сохранились' : 'Сохранить корабли' }}
    </Button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useShips } from '@/composables/useShips';

export default {
  setup() {
    const { addShip } = useShips();
    const gameBoard = ref(Array.from({ length: 10 }, () => Array(10).fill(null)));
    const ships = ref([]);
    const savedShips = ref([]);
    const shipsSaved = ref(false);

    const toggleCell = (rowIndex, cellIndex) => {
      if (ships.value.length < 10) {
        const cellValue = gameBoard.value[rowIndex][cellIndex];
        if (cellValue === 'ship') {
          gameBoard.value[rowIndex][cellIndex] = null;
          ships.value = ships.value.filter(ship => !(ship.x === rowIndex && ship.y === cellIndex));
        } else {
          gameBoard.value[rowIndex][cellIndex] = 'ship';
          ships.value.push({ x: rowIndex, y: cellIndex });
        }
      }
    };

    const resetGameBoard = () => {
      gameBoard.value.forEach(row => {
        row.fill(null);
      });
      ships.value = [];
      shipsSaved.value = false;
    };

    const saveButtonClass = computed(() => ({
      'p-button': true,
      'p-button-disabled': ships.value.length !== 10
    }));

    const saveShips = async () => {
      if (ships.value.length === 10) {
        ships.value.forEach(async (shipData) => {
          await addShip(shipData);
        });
        savedShips.value = [...savedShips.value, ...ships.value];
        resetGameBoard();
        shipsSaved.value = true; // Переменная shipsSaved устанавливается после нажатия на кнопку
      }
    };

    return {
      gameBoard,
      ships,
      savedShips,
      shipsSaved,
      toggleCell,
      saveButtonClass,
      saveShips,
    };
  },
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.game-board {
  display: grid;
  grid-template-columns: repeat(10, 40px);
  grid-template-rows: repeat(10, 40px);
  gap: 1px;
}
.cell {
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  cursor: pointer;
}
.p-button-danger {
  background-image: url('../assets/ship.png');
  background-size: cover;
  background-color: transparent;
}
.but_center {
  display: flex;
  justify-content: center;
  padding-bottom: 100px;
}
</style>
