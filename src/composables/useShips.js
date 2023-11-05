import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebases';

export function useShips() {
  const addShip = async (shipData) => {
    const shipsCollection = collection(db, 'ships');

    try {
      await addDoc(shipsCollection, shipData);
    } catch (error) {
      console.error('Ошибка при сохранении корабля:', error);
    }
  };

  return {
    addShip,
  };
}
