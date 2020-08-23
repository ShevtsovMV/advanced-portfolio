<template>
  <div class="app-container">
    <headline title="Панель администрирования">
      <user />
    </headline>
    <navigation />
    <div class="page-content">
      <div class="container-admin">
        <div class="header">
          <div class="title">Блок «Обо мне»</div>
          <iconed-button 
            type="iconed" 
            v-if="emptyCatIsShow === false"
            title="Добавить группу" 
            @click="emptyCatIsShow = true" 
          />
        </div>
      </div>
      <div class="container-page-content">
        <ul class="skills">
          <li class="item" v-if="emptyCatIsShow">
            <category 
              @remove="emptyCatIsShow = false"
              empty 
            />
          </li>
          <li class="item" v-for="category in categories" :key="category.id">
            <category 
              :title="category.category"
              :skills="category.skills"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import headline from "./components/headline/headline";
  import user from "./components/user/user";
  import navigation from "./components/navigation/navigation";
  import button from "./components/button/button";
  import category from "./components/category/category";

  export default {
    components: {
      headline,
      user,
      navigation,
      iconedButton: button,
      category
    },
    data() {
      return {
        categories: [],
        emptyCatIsShow: false
      };
    },
    created() {
      this.categories = require("./data/skills.json");
    }
  };
</script>

<style lang="postcss">
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
  @import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
</style>

<style lang="postcss" scoped src="./app.pcss"></style>