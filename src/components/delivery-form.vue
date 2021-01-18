<template>
  <div class="delivery-form">
    <div class="delivery-form__row">
      <main-input label="ФИО" :error-message="validation.name" :half="true">
        <input
          class="input-field"
          placeholder="Только кириллица"
          v-model="values.name"
          @blur="requiredFieldsStatus.name = true"
        />
      </main-input>
      <main-input
        label="Телефон"
        :error-message="validation.phone"
        :half="true"
      >
        <input
          class="input-field"
          placeholder="+7 (___) ___-__-__"
          v-model="values.phone"
          v-mask="'+7 (###) ###-##-##'"
          @blur="requiredFieldsStatus.phone = true"
        />
      </main-input>
    </div>
    <div class="delivery-form__row">
      <main-input label="Адрес доставки" :error-message="validation.address">
        <input
          class="input-field"
          placeholder="Город, улица, дом"
          v-model="values.address"
          @blur="requiredFieldsStatus.address = true"
        />
      </main-input>
    </div>
    <div class="delivery-form__row delivery-form__row--mb40">
      <main-input label="Комментарий" :error-message="validation.comment">
        <textarea
          class="input-field input-field--textarea"
          v-model="values.comment"
          @blur="requiredFieldsStatus.comment = true"
        />
      </main-input>
    </div>
    <div
      class="delivery-form__row delivery-form__row--reverse delivery-form__row--mb0"
    >
      <main-button label="Отправить" :disabled="!isValid" @on-click="send" />
    </div>
  </div>
</template>

<script>
import MainInput from './main-input.vue';
import MainButton from './main-button.vue';

export default {
  name: 'DeliveryForm',

  components: {
    MainInput,
    MainButton
  },

  data: () => ({
    values: {
      name: '',
      phone: '',
      address: '',
      comment: ''
    },
    requiredFieldsStatus: {
      name: false,
      phone: false,
      address: false,
      comment: false
    }
  }),

  computed: {
    validation() {
      const errors = {};

      if (this.requiredFieldsStatus.name) {
        const letters = this.values.name.replace(/[\s-]/g, '');
        if (!letters || !letters.length) {
          errors.name = 'Обязательное поле';
        } else {
          const hasOnlyCyrillic = /^[А-Яа-яЁё -]*$/i.test(this.values.name);
          if (!hasOnlyCyrillic) {
            errors.name = 'Только кириллица, пробел, тире';
          }
        }
      }

      if (this.requiredFieldsStatus.phone) {
        if (
          this.values.phone &&
          (this.values.phone.length < 11 ||
            this.values.phone.match(/\d/g).length !== 11)
        ) {
          errors.phone = 'Введите корректный телефон';
        } else if (!this.values.phone) {
          errors.phone = 'Обязательное поле';
        }
      }

      if (this.requiredFieldsStatus.address) {
        if (!this.values.address) {
          errors.address = 'Обязательное поле';
        }
      }

      if (this.requiredFieldsStatus.comment && !this.values.comment) {
        errors.comment = 'Обязательное поле';
      }

      return errors;
    },

    isValid() {
      return (
        Object.values(this.values).every(value => !!value.length) &&
        Object.values(this.validation).every(value => !value)
      );
    }
  },

  methods: {
    send() {
      console.log('send delivery request => data:', this.values);
    }
  }
};
</script>
