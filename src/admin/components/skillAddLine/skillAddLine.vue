<template>
  <div :class="['skill-add-line-component', {blocked: blocked}]">
    <div class="title">
      <app-input 
        v-model="currentSkill.title" 
        :errorMessage="errorMessage"
        placeholder="Новый навык" 
      />
    </div>
    <div class="percent">
      <app-input v-model="currentSkill.percent" type="number" min="0" max="100" maxlength="3" />
    </div>
    <div class="button">
      <round-button type="round"  @click="onApprove" />
    </div>
  </div>
</template>

<script>
import input from "../input";
import button from "../button";

export default {
  props: {
    blocked: Boolean
  },
  data() {
    return {
      currentSkill: {
        id: 0,
        title: "",
        percent: 0
      },
      errorMessage: ""
    };
  },
  components: {
    appInput: input,
    roundButton: button,
  },
  methods: {
    onApprove() {
      if (this.currentSkill.title.trim() !== "" && this.currentSkill.percent !== "") {
        this.$emit('add-skill', this.currentSkill);
        this.errorMessage = "";
      } else {
        this.errorMessage = "Не все поля заполнены";
      }
    },
  }
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>