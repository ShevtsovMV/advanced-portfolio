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
        showTooltip: "tooltips/show",
      }),
      async editSkill(skill) {
        try {
          await this.editSkillAction(skill);
          skill.editmode = false;
          this.showTooltip({
          text: "Навык изменен",
          type: "success",
        });
        } catch (error) {
          this.showTooltip({
          text: error.message,
          type: "error",
        });
        }
      },
      async removeSkill(skill) {
        try {
          await this.removeSkillAction(skill);
          this.showTooltip({
          text: "Навык удален",
          type: "success",
        });
        } catch (error) {
          this.showTooltip({
          text: error.message,
          type: "error",
        });
        }
      },
      async addSkill(skill, categoryId) {
        const newSkill = {
          ...skill,
          category: categoryId
        };
        try {
          await this.addSkillAction(newSkill);
          skill.title = "";
          skill.percent = "";
          this.showTooltip({
          text: "Навык добавлен",
          type: "success",
        });
        } catch (error) {
          this.showTooltip({
          text: error.message,
          type: "error",
        });
        }
      },
      async editCategoryTitle(categoryTitle, categoryId) {
        try {
          await this.editCategoryTitleAction({categoryTitle, categoryId});
          this.showTooltip({
          text: "Заголовок категории изменен",
          type: "success",
        });
        } catch (error) {
          this.showTooltip({
          text: error.message,
          type: "error",
        });
        }
      },
      async createCategory(categoryTitle) {
        try {
          await this.createCategoryAction(categoryTitle);
          this.emptyCatIsShow = false;
          this.showTooltip({
          text: "Новая категория создана",
          type: "success",
        });
        } catch (error) {
          this.showTooltip({
          text: error.message,
          type: "error",
        });
        }
      },
      async removeCategory(e, categoryId) {
        try {
          await this.removeCategoryAction(categoryId);
          this.showTooltip({
          text: "Категория удалена",
          type: "success",
        });
        } catch (error) {
          this.showTooltip({
          text: error.message,
          type: "error",
        });
        }
      },
    },
    created() {
      this.fetchCategoryAction();
    },
  };
</script>

<style lang="postcss" scoped src="./about.pcss"></style>