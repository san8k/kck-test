<template>
  <section class="delivery">
    <h1 class="delivery__title">Выберите способ доставки</h1>
    <div class="delivery__content delivery__content--desktop">
      <tabs :tabs="tabsList" :activeTab="contentType" @changeTab="changeTab" />
      <component :is="currentTabContent"></component>
    </div>
    <div class="delivery__content delivery__content--mobile">
      <div
        v-for="(tab, i) in tabsList"
        :key="tab.id"
        class="delivery-mobile-block"
        :class="{ 'delivery-mobile-block--is-opened': contentType === tab.id }"
      >
        <div
          class="delivery-mobile-block__header"
          :class="{
            'delivery-mobile-block__header--is-collapsed':
              contentType !== tab.id && i !== tabsList.length - 1
          }"
          @click="changeTab(tab)"
        >
          <p class="delivery-mobile-block__title">{{ tab.name }}</p>
          <svg
            class="delivery-mobile-block__arrow"
            xmlns="http://www.w3.org/2000/svg"
            width="10px"
            height="6px"
          >
            <path
              fill-rule="evenodd"
              fill="#8288a2"
              d="M0.007,4.664 L3.559,1.351 L3.559,1.351 L5.000,0.007 L6.441,1.351 L6.441,1.351 L9.993,4.664
              L8.552,6.008 L5.000,2.696 L1.448,6.008 L0.007,4.664 Z"
            />
          </svg>
        </div>
        <div class="delivery-mobile-block__body">
          <component :is="getMobileTabContent(tab.id)"></component>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import tabs from '@/components/tabs.vue';
import deliveryForm from '@/components/delivery-form.vue';
import pickupMap from '@/components/pickup-map.vue';

export default {
  name: 'Delivery',
  components: {
    tabs,
    deliveryForm,
    pickupMap
  },

  data: () => ({
    contentType: 'delivery',

    tabsList: [
      { id: 'delivery', name: 'Доставка' },
      { id: 'pickup', name: 'Самовывоз' }
    ],

    CONTENT_MAP: {
      delivery: deliveryForm,
      pickup: pickupMap
    }
  }),

  computed: {
    currentTabContent() {
      return this.CONTENT_MAP[this.contentType];
    }
  },

  methods: {
    changeTab(tab) {
      this.contentType = tab.id;
    },

    getMobileTabContent(tabType) {
      return this.CONTENT_MAP[tabType];
    }
  }
};
</script>
