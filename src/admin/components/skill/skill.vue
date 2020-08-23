<template>
  <div class="skill-component" v-if="editmode === false">
    <div class="title">{{skill.title}}</div>
    <div class="percent">{{skill.percent}}</div>
    <div class="buttons">
      <icon class="btn" symbol="pencil" @click="onEditSkill" grayscale />
      <icon class="btn" symbol="trash" @click="$emit('remove', skillIndex)" grayscale />
    </div>
  </div>

  <div class="skill-component" v-else>
    <div class="title">
      <app-input 
        :errorMessage="errorMessage"
        noSidePaddings 
        v-model="currentSkill.title" 
      />
    </div>
    <div class="percent">
      <app-input v-model="currentSkill.percent" type="number" min="0" max="100" maxlength="3" />
    </div>
    <div class="buttons">
      <icon class="btn" symbol="tick" @click="onApproveSkill" />
      <icon class="btn" symbol="cross" @click="editmode = false" />
    </div>
  </div>
</template>

<script>
import input from "../input/input";
import icon from "../icon/icon";

export default {
  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true
    },
    skillIndex: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      editmode: false,
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
      },
      errorMessage: ""
    };
  },
  components: {
    appInput: input,
    icon
  },
  methods: {
    onApproveSkill() {
      if (this.currentSkill.title.trim() !== "" && this.currentSkill.percent !== "") {
        this.$emit('approve', this.currentSkill);
        this.editmode = false;
      } else {
        this.errorMessage = "Не все поля заполнены";
      }
    },
    onEditSkill() {
      this.editmode = true;
      this.errorMessage = "";
    },
  }
}
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>