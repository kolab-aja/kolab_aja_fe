<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheCard',
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin: 20px 0;
  border: 2px solid #c2b8e3;
  transition: box-shadow 0.3s ease;
  box-sizing: border-box;
}

.card:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

.card-header {
  padding: 40px 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-weight: bold;
  font-size: 1.2em;
  color: #333;
}

.card-body {
  padding: 16px;
  color: #666;
  line-height: 1.6;
}
</style>
