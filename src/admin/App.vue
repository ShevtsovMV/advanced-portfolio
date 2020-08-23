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
              @remove-category-title="emptyCatIsShow = false"
              @approve-category-title="createNewCategory"
              empty 
            />
          </li>
          <li class="item" v-for="(category, index) in categories" :key="category.id">
            <category 
              :title="category.category"
              :skills="category.skills"
              :categoryIndex="index"
              @approve-category-title="onApproveCategoryTitle"
              @edit-skill="editSkill"
              @remove-skill="removeSkill"
              @add-skill="addSkill"
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
    methods: {
      editSkill(e, categoryIndex) {
        const newObj = {
          "id": e.id,
          "title": e.title,
          "percent": e.percent
        };
        this.categories[categoryIndex].skills.splice(e.id, 1, newObj);
      },
      removeSkill(skillIndex, categoryIndex) {
        this.categories[categoryIndex].skills.splice(skillIndex, 1);
      },
      addSkill(e, categoryIndex) {
        const arr = this.categories[categoryIndex].skills;
        const arrLength = arr.length;
        const lastArrElem = arr[arrLength - 1];
        let newObjId = (arrLength == 0) ? 0 : (lastArrElem.id + 1);
        const newObj = {
          "id": newObjId,
          "title": e.title,
          "percent": e.percent
        };
        this.categories[categoryIndex].skills.push(newObj);

      },
      onApproveCategoryTitle(categoryTitle, categoryIndex) {
        this.categories[categoryIndex].category = categoryTitle;
      },
      createNewCategory(categoryTitle, categoryIndex) {
        const newObj = {
          "id": this.categories[0].id - 1,
          "category": categoryTitle,
          "skills": []
        };
        this.categories.unshift(newObj);
        this.emptyCatIsShow = false;
      }
    },
    created() {
      this.categories = require("./data/skills.json");
    },
    mounted() {

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