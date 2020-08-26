<template>
  <div class="headline-component">
    <div class="container-admin container-headline">
      <slot />
      <div class="title">{{title}}</div>
      <div class="buttons">
        <button class="btn" type="button">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Панель администрирования"
    }
  }
}
</script>

<style lang="postcss" scoped src="./headline.pcss"></style>