<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h3>Menu</h3>
    </div>
    <div class="filter-group">
      <fieldset>
        <legend>Filter 1</legend>
        <label>
          <input type="checkbox" value="Option 1">
          Option 1
        </label>
        <label>
          <input type="checkbox" value="Option 2">
          Option 2
        </label>
      </fieldset>
      <fieldset>
        <legend>Filter 2</legend>
        <label>
          <input type="checkbox" value="Option 3">
          Option 3
        </label>
        <label>
          <input type="checkbox" value="Option 4">
          Option 4
        </label>
      </fieldset>
    </div>
  </aside>
</template>

<script>
export default {
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  color: #000000;
  z-index: 1000;
  padding: 30px;
  transition: all 0.3s ease;
  border-radius: 20px;
  border: 1px solid #c2b8e3;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 1.5rem;
}

.filter-group {
  margin-top: 20px;
}

.filter-group fieldset {
  border: none;
  margin-bottom: 20px;
}

.filter-group legend {
  font-weight: bold;
  color: #000000;
}

.filter-group label {
  display: block;
  color: #000000;
  margin-bottom: 10px;
}

.filter-group input[type="checkbox"] {
  margin-right: 10px;
}
</style>
