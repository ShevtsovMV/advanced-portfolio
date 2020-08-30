<template>
  <div class="about-page-component">
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
      <pre>{{categories}}</pre>
      <div class="container-page-content">
        <ul class="skills">
          <li class="item" v-if="emptyCatIsShow">
            <category 
              @remove-category-title="emptyCatIsShow = false"
              @approve-category-title="createCategory"
              empty 
            />
          </li>
          <li class="item" v-for="(category) in categories" :key="category.id">
            <category 
              :title="category.category"
              :skills="category.skills"
              :categoryId="category.id"
              @approve-category-title="editCategoryTitle"
              @remove-category-title="removeCategory"
              @edit-skill="editSkill"
              @remove-skill="removeSkill"
              @add-skill="addSkill($event, category.id)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import button from "../../components/button/button";
  import category from "../../components/category/category";
  import { mapActions, mapState } from "vuex";

  export default {
    components: {
      iconedButton: button,
      category
    },
    data() {
      return {
        emptyCatIsShow: false
      };
    },
    computed: {
      ...mapState("categories", {
        categories: state => state.data
      }),
    },
    methods: {
      ...mapActions({
        createCategoryAction: "categories/create",
        editCategoryTitleAction: "categories/edit",
        removeCategoryAction: "categories/remove",
        fetchCategoryAction: "categories/fetch",
        addSkillAction: "skills/add",
        removeSkillAction: "skills/remove",
        editSkillAction: "skills/edit",
      }),
      async editSkill(skill) {
        await this.editSkillAction(skill);
        skill.editmode = false;
      },
      removeSkill(skill) {
        this.removeSkillAction(skill);
      },
      async addSkill(skill, categoryId) {
        const newSkill = {
          ...skill,
          category: categoryId
        };
        await this.addSkillAction(newSkill);
        skill.title = "";
        skill.percent = "";
      },
      editCategoryTitle(categoryTitle, categoryId) {
        this.editCategoryTitleAction({categoryTitle, categoryId});
      },
      async createCategory(categoryTitle) {
        try {
          await this.createCategoryAction(categoryTitle);
          this.emptyCatIsShow = false;
        } catch (error) {
          console.log(error.message);
        }
      },
      removeCategory(e, categoryId) {
        this.removeCategoryAction(categoryId);
      },
    },
    created() {
      this.fetchCategoryAction();
    },
    mounted() {

    }
  };
</script>

<style lang="postcss" scoped src="./about.pcss"></style>