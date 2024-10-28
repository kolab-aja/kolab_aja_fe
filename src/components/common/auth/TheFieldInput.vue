<template>
  <div class="form-input">
    <label :for="id" class="label">{{ label }}</label>
    <div class="input-container">
      <template v-if="type === 'select'">
        <div class="select-wrapper" @focus="isDropdownOpen = true" @blur="isDropdownOpen = false">
          <div
            class="input select-input"
            @click="toggleDropdown"
            tabindex="0"
            @keydown.down.prevent="navigateDropdown(1)"
            @keydown.up.prevent="navigateDropdown(-1)"
            @keydown.enter.prevent="selectItem(activeIndex)"
          >
            <span>{{ modelValue || placeholder }}</span>
            <v-icon class="dropdown-icon">{{ isDropdownOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </div>
          <transition name="slide">
            <ul v-show="isDropdownOpen" class="dropdown-menu" @click.outside="closeDropdown">
              <li
                v-for="(item, index) in items"
                :key="item"
                :class="{ 'dropdown-item': true, 'active': index === activeIndex }"
                @mousedown.prevent="preventMouseDown"
                @mouseup="selectItem(index)"
              >
                {{ item }}
              </li>
            </ul>
          </transition>
        </div>
      </template>
      <template v-else>
        <input
          :type="inputType"
          :id="id"
          :placeholder="computedPlaceholder"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          @focus="handleFocus"
          @blur="handleBlur"
          class="input"
        />
        <slot name="append-icon"></slot>
      </template>
    </div>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number, null],
      required: true,
    },
    errorMessage: String,
    items: {
      type: Array,
      default: () => [],
    },
    dynamicPlaceholder: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      showPassword: false,
      isDropdownOpen: false,
      activeIndex: -1,
      isFocus: false
    };
  },
  computed: {
    inputType() {
      return this.type === 'password' && !this.showPassword ? 'password' : 'text';
    },
    computedPlaceholder() {
      return this.isFocus && this.dynamicPlaceholder ? this.dynamicPlaceholder : this.placeholder;
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    navigateDropdown(direction) {
      if (!this.isDropdownOpen) return;
      const itemsCount = this.items.length;
      this.activeIndex = (this.activeIndex + direction + itemsCount) % itemsCount;
    },
    selectItem(index) {
      if (index >= 0 && index < this.items.length) {
        this.$emit('update:modelValue', this.items[index]);
        this.$nextTick(() => {
          this.isDropdownOpen = false;
        });
      }
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    preventMouseDown(event) {
      event.preventDefault();
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
    handleFocus() {
      this.isFocus = true;
    },
    handleBlur() {
      this.isFocus = false;
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style scoped>
.form-input {
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

.input-container {
  position: relative;
}

.input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #5c6ac4;
}

.append-icon {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
}

.error-message {
  color: #f44336;
  font-size: 14px;
  margin-top: 4px;
}

.select-wrapper {
  position: relative;
}

.select-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: white;
  cursor: pointer;
}

.dropdown-icon {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #333;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown-menu.show {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-item {
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dropdown-item:hover {
  background-color: #9f93da;
  color: white;
}

.input-container:focus-within .dropdown-menu {
  opacity: 1;
  transform: translateY(0);
}

.active {
  background-color: #8A76D4;
  color: white;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
