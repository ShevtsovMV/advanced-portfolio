<template>
  <div class="user-component">
    <avatar size="2.7" :src="userPic" />
    <div class="username">Владимир Астаханов</div>
  </div>
</template>

<script>
import avatar from "../avatar";

export default {
  components: {
    avatar
  },
  computed: {
    userPic() {
      return require("../../../images/content/user.jpg").default
    }
  },
  props: {
    
  }
}
</script>

<style lang="postcss" scoped src="./user.pcss"></style>