<template>
   <div 
    :class="['tag', {interactive: interactive}]"
  >
    <span>{{title}}</span>
    <button 
      v-on="$listeners"
      v-if="interactive" 
      class="remove" 
      type="button">
    </button>
  </div>
</template>

<script>
import icon from "../icon/icon";

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    interactive: {
      type: Boolean,
      default: false
    },
  },
  components: {
    icon
  }
}
</script>

<style lang="postcss" scoped src="./tag.pcss"></style>