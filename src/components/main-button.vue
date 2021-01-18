<template>
  <button
    class="main-button"
    :class="{ disabled: disabled }"
    @click="$emit('on-click')"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'MainButton',
  props: {
    label: String,
    disabled: Boolean
  }
};
</script>
