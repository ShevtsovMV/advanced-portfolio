<template>
  <div class="skill-component" v-if="editmode === false">
    <div class="title">{{skill.title}}</div>
    <div class="percent">{{skill.percent}}</div>
    <div class="buttons">
      <icon class="btn" symbol="pencil" @click="editmode = true" grayscale />
      <icon class="btn" symbol="trash" @click="$emit('remove', skill.id)" grayscale />
    </div>
  </div>

  <div class="skill-component" v-else>
    <div class="title">
      <app-input noSidePaddings v-model="currentSkill.title" />
    </div>
    <div class="percent">
      <app-input v-model="currentSkill.percent" type="number" min="0" max="100" maxlength="3" />
    </div>
    <div class="buttons">
      <icon class="btn" symbol="tick" @click="$emit('approve', currentSkill)" />
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
    }
  },
  data() {
    return {
      editmode: false,
      currentSkill: {
        id: 0,
        title: this.skill.title,
        percent: this.skill.percent
      }
    };
  },
  components: {
    appInput: input,
    icon
  }
}
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>