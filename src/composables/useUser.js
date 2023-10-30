import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  setDoc
} from 'firebase/firestore'
import { db /*storage */} from '@/firebases'
import { /*getStorage, uploadBytes, getDownloadURL*/ } from 'firebase/storage'
import { ref, computed, watch } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const user = ref()
const userList = ref([])

const loading = ref({
  user: false,
  userList: false
})

const userToObject = computed(() => {
  if (user.value) {
    return {
      uid: user.value.uid,
      email: user.value.email,
      displayName: user.value.displayName,
      photoURL: user.value.photoURL,
      favourites: user.value.favourites ?? [],
      status: user.value.status ?? 'user',
      reviews: user.value.reviews ?? []
    }
  }
  return null
})


export const useUser = () => {
  const auth = getAuth()

  function googleRegister() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        user.value = userCredential.user

        await addUserToMainDatabase()

        await getFromMainDatabase()

        addToLocalStorage()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function addUserToMainDatabase() {
    loading.value.user = true;
    try {
      if (userToObject.value) {
        await getAllUsers();
        if (!checkUserInDatabase()) {
          const usersCollection = collection(db, 'users');

          const userData = {
            uid: userToObject.value.uid,
            displayName: userToObject.value.displayName,
            email: userToObject.value.email,

          };
  
          await addDoc(usersCollection, userData);
        } else {
          console.error('User already in database');
        }
      }
      loading.value.user = false;
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllUsers() {
    loading.value.userList = true
    try {
      const querySnapshot = await getDocs(collection(db, 'users'))
      querySnapshot.forEach((doc) => {
        userList.value.push(doc.data())
      })
      loading.value.userList = false
    } catch (error) {
      console.error(error)
    }
  }

 
  function checkUserInDatabase() {
    return userList.value.some((item) => item.uid === userToObject.value?.uid)
  }


  async function getFromMainDatabase() {
    await getAllUsers()
    user.value = userList.value.find((item) => item.uid === user.value?.uid)
  }
 
  async function updateUserInDatabase() {
    if (user.value) {
      try {
        const userDocRef = doc(db, 'users', user.value.uid)
        const existingUserDoc = await getDoc(userDocRef)
        if (existingUserDoc.exists()) {
          const userData = existingUserDoc.data()
          const updatedData = {
            ...userData,
            ...user.value
          }
          await setDoc(userDocRef, updatedData)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  function addToLocalStorage() {
    if (user.value) {
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  function getUserFromLocalStorage() {
    const userFromLocalStorage = localStorage.getItem('user')
    if (userFromLocalStorage) {
      user.value = JSON.parse(userFromLocalStorage)
    }
  }

  function removeFromLocalStorage() {
    localStorage.removeItem('user')
  }


  function googleLogout() {
    auth.signOut()
    user.value = null

    removeFromLocalStorage()
  }

  watch(user, async (newValue) => {
    if (newValue.value) {
      await updateUserInDatabase()
    }
  })

  return {
    user,
    loading,
    googleRegister,
    googleLogout,
    getAllUsers,
    userToObject,
    userList,
    addToLocalStorage,
    getUserFromLocalStorage,
    removeFromLocalStorage
  }
}