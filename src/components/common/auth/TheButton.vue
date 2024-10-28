<template>
  <button :class="buttonClass" :style="props.otherStyle" @click="handleClick" :type="props.type">
    <slot></slot>
  </button>
</template>

<script setup>

import { computed } from 'vue';

const props = defineProps({
  customType: {
    type: String,
    default: 'primary',
    required: false,
    validator(value, props) {
      return ['primary', 'success', 'danger', 'warning', 'info', 'register', 'creative-register', 'sign-in', 'sign-up' ].includes(value)
    }
  },
  type: {
    type: String,
    default: 'button',
    required: false
  },
  otherStyle: {
        type: Object,
        required: false,
        default: () => ({})
    }
})

const emit = defineEmits(['emits-click'])

const buttonClass = computed (() => {
  return `btn btn--${props.customType}`;
})

const handleClick = () => {
    emit('emits-click')
}

</script>

<style scoped>
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn:hover {
  transform: scale(1.02);
}

.btn:active {
  transform: scale(0.98);
}

/* Primary button */
.btn--primary {
  background: linear-gradient(to bottom, #8A76D4, #8A76D4);
  font-size: large;
  font-weight: bold;
  padding: 15px 40px;
  border-radius: 100px;
}

.btn--primary:hover, .btn--primary:active {
  background: linear-gradient(to bottom, #7A66C4, #7A66C4);
}

/* Success button */
.btn--success {
  background: linear-gradient(to bottom, #4CAF50, #43A047);
}

.btn--success:hover, .btn--success:active {
  background: linear-gradient(to bottom, #3C9F40, #329637);
}

/* Danger button */
.btn--danger {
  background: linear-gradient(to bottom, #F44336, #E53935);
}

.btn--danger:hover, .btn--danger:active {
  background: linear-gradient(to bottom, #E43326, #D42925);
}

/* Warning button */
.btn--warning {
  background: linear-gradient(to bottom, #FFEB3B, #FDD835);
  color: black;
}

.btn--warning:hover, .btn--warning:active {
  background: linear-gradient(to bottom, #EEDB2B, #EDD125);
}

/* Info button */
.btn--info {
  background: linear-gradient(to bottom, #00ACC1, #0097A7);
}

.btn--info:hover, .btn--info:active {
  background: linear-gradient(to bottom, #009BB1, #008897);
}

/* Register button */
.btn--register {
  background: linear-gradient(to bottom, #8E87F6, #E187F5);
  font-size: large;
  font-weight: bold;
  padding: 15px 40px;
  border-radius: 100px;
}

.btn--register:hover, .btn--register:active {
  background: linear-gradient(to bottom, #7E77D6, #D177E5);
}

/* Creative Register button */
.btn--creative-register {
  background: linear-gradient(to bottom, #FD9326, #FD9326);
  font-size: large;
  font-weight: bold;
  padding: 15px 40px;
  border-radius: 100px;
}

.btn--creative-register:hover, .btn--creative-register:active {
  background: linear-gradient(to bottom, #ED8326, #ED8326);
}

/* Sign In button */
.btn--sign-in {
  cursor: pointer;
  color: black;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.3s ease;
}

/* Sign Up button */
.btn--sign-up {
  background: #221943;
  border-radius: 100px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

@media (max-width: 768px) {
	.btn {
		padding: 8px 16px;
		font-size: 14px;
		border-radius: 50px;
	}
}

@media (max-width: 480px) {
	.btn {
		padding: 6px 12px;
		font-size: 12px;
		border-radius: 25px;
	}
}
</style>
