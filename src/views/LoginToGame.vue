<template>
  <div class="center">
    <img src="../assets/ship.png" alt="Корабль" class="ship-animation" v-if="!isLoggedIn"/>
    <button @click="loginWithGoogle" v-if="!isLoggedIn" class="p-button">Вход</button>
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

          this.$router.push('/prepare');
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
<style scoped>
  .center{
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: 100vh; 
  }
  button {
    width: 200px;
    height: 50px;
    font-weight: 500;
    margin-top: 600px;
    position: relative;
  }

  .ship-animation {
    position: absolute;
    margin-left: 80px;
    animation: slideDown 2s ease infinite; 
  }

  @keyframes slideDown {
    0% {
      top: -50px;
    }
    50% {
      top: 10px;
    }
    100% {
      top: -50px;
    }
  }
</style>
