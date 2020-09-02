<template>
  <div :class="['skill-add-line-component', {blocked: blocked}]">
    <div class="title">
      <app-input 
        v-model="currentSkill.title" 
        :errorMessage="validation.firstError('currentSkill.title')"
        placeholder="Новый навык" 
      />
    </div>
    <div class="percent">
      <app-input 
      v-model="currentSkill.percent"
      :errorMessage="validation.firstError('currentSkill.percent')"
      type="number" 
      min="0" max="100" maxlength="3" 
      />
    </div>
    <div class="button">
      <round-button type="round"  @click="handleClick" />
    </div>
  </div>
</template>

<script>
import input from "../input";
import button from "../button";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "currentSkill.title": value => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "currentSkill.percent": value => {
      return Validator.value(value).integer("Введите число").between(0, 100, "Число должно быть между 0 и 100").required("Не может быть пустым");
    },
  },
  props: {
    blocked: Boolean
  },
  data() {
    return {
      currentSkill: {
        title: "",
        percent: ""
      },
      errorMessage: ""
    };
  },
  components: {
    appInput: input,
    roundButton: button,
  },
  methods: {
    async handleClick() {
      if ((await this.$validate()) === false) return;
      
      this.$emit('add-skill', this.currentSkill);
    },
  }
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>