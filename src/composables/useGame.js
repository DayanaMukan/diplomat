import { reactive, ref } from 'vue'

import {getDocs, addDoc, collection} from 'firebase/firestore'
import { db  } from '@/firebases'
import {  } from 'firebase/storage'
import {  } from 'firebase/auth'


export function useGame() {
  const loading = reactive({
    game: false,
    newGame: false,
  })

  const newGame = ref({
    player1: '',
    player2: '',
    playerField1: '',
    playerField2: ''
  })

  const fullGame = ref({
    player1: '',
    player2: '',
    playerField1: '',
    playerField2: '',
    currentPlayer: ' '
  })

  async function loadGame() {
    loading.value.game = true
    try {
      const querySnapshot = await getDocs(collection(db, 'game'))
      fullGame.value = querySnapshot.docs.map((doc) => doc.data())
      loading.value.game = false
    } catch (error) {
      console.error(error)
    }
  }


  // await addDoc(collection(db, 'contents'), newContent.value)
  async function createGame() {
    loading.value.newGame = true
    try {
        if (newGame.value) {
          await addDoc(collection(db, 'game'), newGame.value)
          loading.value.newGame = false
        }
      } catch (error) {
        console.error(error)
      }
  }

  return {
    createGame,loadGame
  }
}
