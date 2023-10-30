<template>
  <div>
    <h1>Login</h1>
    <button @click="loginWithGoogle" v-if="!isLoggedIn">Login with Google</button>
    <div v-else>
      <PrepareToGame />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useUser } from '../composables/useUser'; 
import PrepareToGame from './PrepareToGame.vue'; 

export default {
  components: {
    PrepareToGame, 
  },
  setup() {
    const { googleRegister, user } = useUser(); 
    const isLoggedIn = ref(false);

    const loginWithGoogle = async () => {
      try {
        await googleRegister(); 
        if (user.value) {
          isLoggedIn.value = true; 
        }
      } catch (error) {
        console.error('Ошибка входа:', error);
      }
    };

    return {
      loginWithGoogle,
      isLoggedIn,
    };
  },
};
</script>
