<template>
  <div class="app-container">
    <router-view name="header" />
    <router-view />
  </div>
</template>



<style lang="postcss">
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
  @import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");

  .app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container-page-content {
  margin: 0 auto;
  width: 95%;

  @include phones {
    width: 100%;
  }
}

.page-content {
  flex: 1;
  background: url("../images/bg/admin.png") center center / cover no-repeat;
  padding: 54px 0 30px;

  @include phones {
    padding: 30px 0;
  }
}
</style>

<style lang="postcss" scoped src="./app.pcss"></style>