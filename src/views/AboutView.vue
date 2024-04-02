<script lang="ts">
export default {
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    fetch('api/items')
        .then(response => response.json())
        .then(data => this.items = data);
  },
};
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul>
      <li v-for="item in items">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
