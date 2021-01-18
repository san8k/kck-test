<template>
  <div
    class="main-radio"
    @click="emitSelect"
    :class="{
      'main-radio--active': selectedOptionId === item.id,
      'main-radio--disabled': disabled
    }"
  >
    <div class="main-radio__circle"></div>
    <div class="main-radio__text">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainRadio',
  props: {
    selectedOptionId: Number,
    disabled: Boolean,
    item: Object
  },
  data() {
    return {};
  },

  methods: {
    emitSelect() {
      this.$emit('select', this.item.id);
    }
  }
};
</script>
