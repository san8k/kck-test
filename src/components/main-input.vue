<template>
  <div
    class="input-container"
    :class="{ error: errorMessage, 'input-container--half': half }"
  >
    <p class="input-label" :class="{ disabled: disabled }">
      {{ label }}
    </p>
    <slot>
      <!-- input or textarea -->
    </slot>
    <div class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainInput',
  props: {
    label: String,
    errorMessage: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    half: {
      type: Boolean,
      default: false
    }
  }
};
</script>
