<template>
  <div class="headline-component">
    <div class="container-admin container-headline">
      <slot />
      <div class="title">{{title}}</div>
      <div class="buttons">
        <button class="btn" type="button" @click="logout">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: "Панель администрирования"
    }
  },
  methods: {
    ...mapActions({
      logout: "user/logout"
    }),
  }
}
</script>

<style lang="postcss" scoped src="./headline.pcss"></style>