<template>
  <div class="pickup-map">
    <div class="pickup-map__radio-container">
      <main-radio
        v-for="(item, i) in optionsList"
        :key="i"
        :item="item"
        :selected-option-id="selectedOptionId"
        @select="selectOptionId"
      />
    </div>
    <div class="pickup-map__map">
      <yandex-map
        :coords="mapDefaultCoords"
        :show-all-markers="true"
        :zoom="13"
        :settings="settings"
        :controls="['zoomControl']"
        :scroll-zoom="canTouchZoom"
        :key="deviceKey"
      >
        <ymap-marker
          v-for="(marker, i) in optionsList"
          :key="marker.id"
          :coords="coords[i]"
          :marker-id="marker.id"
          :icon="markerIcon"
        />
      </yandex-map>
    </div>
    <div class="pickup-map__button-container">
      <main-button label="Отправить" @on-click="send" />
    </div>
  </div>
</template>

<script>
import MainButton from './main-button.vue';
import MainRadio from './main-radio.vue';
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default {
  name: 'PickupMap',
  components: {
    MainButton,
    MainRadio,
    yandexMap,
    ymapMarker
  },

  data: () => ({
    optionsList: [
      {
        id: 1001,
        name: 'Пункт Выдачи заказов Песчаная улица, дом 13',
        coords: [55.801131, 37.508167]
      },
      {
        id: 1002,
        name: 'Пункт Выдачи заказов Подсосенский переулок, 11',
        coords: [55.757556, 37.651592]
      }
    ],
    selectedOptionId: 1001,
    settings: {
      apiKey: '97fd3aa1-1d77-49b6-8906-701867e3451e',
      lang: 'ru_RU',
      coordorder: 'latlong',
      version: '2.1'
    },
    markerIcon: {
      layout: 'default#image',
      imageHref: '/img/icons/map-marker.svg',
      imageSize: [38, 46],
      imageOffset: [-20, -46],
      cursor: 'default'
    },
    mapDefaultCoords: [55.755814, 37.617635],
    screenWidth: 0,
    canTouchZoom: true,

    deviceKey: 'desktop'
  }),

  computed: {
    coords() {
      return this.optionsList.map(o => o.coords);
    }
  },

  created() {
    this.deviceKey = window.innerWidth > 767 ? 'desktop' : 'mobile';
    this.canTouchZoom = window.innerWidth > 767;
  },

  mounted() {
    window.addEventListener('resize', this.checkScreenWidth);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenWidth);
  },

  methods: {
    checkScreenWidth() {
      // rerender yandex-map component when device screen changed
      if (this.deviceKey === 'desktop' && window.innerWidth < 768) {
        this.deviceKey = 'mobile';
        this.canTouchZoom = false;
      } else if (this.deviceKey === 'mobile' && window.innerWidth > 767) {
        this.deviceKey = 'desktop';
        this.canTouchZoom = true;
      }
    },

    selectOptionId(id) {
      this.selectedOptionId = id;
    },

    send() {
      console.log(`send pickup request => post id: ${this.selectedOptionId}`);
    }
  }
};
</script>

<style scoped></style>
