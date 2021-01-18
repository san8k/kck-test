<template>
  <div class="tabs">
    <div
      v-for="item in tabs"
      :key="item.id"
      class="tab"
      :class="{ 'tab--is-active': item.id === activeTab }"
      @click="$emit('changeTab', item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    tabs: Array,
    activeTab: String
  }
};
</script>
