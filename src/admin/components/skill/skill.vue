<template>
  <div class="skill-component" v-if="currentSkill.editmode === false">
    <div class="title">{{skill.title}}</div>
    <div class="percent">{{skill.percent}}</div>
    <div class="buttons">
      <icon class="btn" symbol="pencil" @click="onEditSkill" grayscale />
      <icon class="btn" symbol="trash" @click="$emit('remove', currentSkill)" grayscale />
    </div>
  </div>

  <div class="skill-component" v-else>
    <div class="title">
      <app-input 
        :errorMessage="validation.firstError('currentSkill.title')"
        noSidePaddings 
        v-model="currentSkill.title" 
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
    <div class="buttons">
      <icon class="btn" symbol="tick" @click="onApproveSkill" />
      <icon class="btn" symbol="cross" @click="currentSkill.editmode = false" />
    </div>
  </div>
</template>

<script>
import input from "../input/input";
import icon from "../icon/icon";
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
    skill: {
      type: Object,
      default: () => {},
      required: true
    },
  },
  data() {
    return {
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
        category: this.skill.category,
        editmode: false,
      },
      errorMessage: ""
    };
  },
  components: {
    appInput: input,
    icon
  },
  methods: {
    async onApproveSkill() {
      if ((await this.$validate()) === false) return;
      if (this.currentSkill.title === this.skill.title && this.currentSkill.percent === this.skill.percent) {
        this.currentSkill.editmode = false;
        return;
      }
      this.$emit('approve', this.currentSkill);
    },
    onEditSkill() {
      this.currentSkill.title = this.skill.title;
      this.currentSkill.percent = this.skill.percent;
      this.validation.reset();
      this.currentSkill.editmode = true;
    },
  }
}
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>