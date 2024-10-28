<template>
  <v-fade-transition>
    <v-alert v-if="isVisible" :type="type" dense text dismissible @click="closeAlert">
      {{ message }}
    </v-alert>
  </v-fade-transition>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'TheAlert',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'info', // 'success', 'warning', 'error'
    },
  },
  setup(props) {
    const isVisible = ref(props.show);

    const closeAlert = () => {
      isVisible.value = false;
    };

    return {
      isVisible,
      closeAlert,
    };
  },
};
</script>

<style scoped>
.alert {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  color: white;
}

.alert-info {
  background-color: #17a2b8;
}

.alert-success {
  background-color: #28a745;
}

.alert-warning {
  background-color: #ffc107;
}

.alert-error {
  background-color: #dc3545;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  float: right;
  font-size: 1.2em;
  cursor: pointer;
}
</style>
