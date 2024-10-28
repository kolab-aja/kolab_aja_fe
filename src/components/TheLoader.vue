<template>
  <div v-if="loading" class="loader">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  position: relative;
  width: 60px;
  height: 60px;
  animation: sk-rotate 2s infinite linear;
}

.double-bounce1, .double-bounce2 {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.6;
  border: 5px solid;
  border-color: #8E87F6 transparent #E187F5 transparent;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  animation-delay: -1s;
}

@keyframes sk-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-bounce {
  0%, 100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
