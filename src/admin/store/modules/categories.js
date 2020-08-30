export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => (state.data = categories),
    ADD_CATEGORY: (state, category) => state.data.unshift(category),
    REMOVE_CATEGORY: (state, categoryId) => {
      state.data = state.data.filter(category => category.id !== categoryId);
    },
    EDIT_TITLE: (state, categoryToEdit) => {
      state.data = state.data.map(category => {
        if (category.id === categoryToEdit.category.id) {
          category.category = categoryToEdit.category.category;
        }
        return category;
      });
    },
    ADD_SKILL: (state, newSkill) => {
      state.data = state.data.map(category => {
        if (category.id === newSkill.category) {
          category.skills.push(newSkill);
        }
        return category;
      });
    },
    REMOVE_SKILL: (state, skillToRemove) => {
      state.data = state.data.map(category => {
        if (category.id === skillToRemove.category) {
          category.skills = category.skills.filter(skill => skill.id !== skillToRemove.id);
        }
        return category;
      });
    },
    EDIT_SKILL: (state, skillToEdit) => {
      const editSkillInCategory = category => {
        category.skills = category.skills.map(skill => {
          return skill.id === skillToEdit.id ? skillToEdit : skill;
        });
      };
      const findCategory = category => {
        if (category.id === skillToEdit.category) {
          editSkillInCategory(category);
        }

        return category;
      };
      state.data = state.data.map(findCategory);
    },
  },
  actions: {
    async create(store, title) {
      try {
        const response = await this.$axios.post("/categories", { title });
        store.commit("ADD_CATEGORY", {
          ...response.data,
          skills: []
        });
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
    async fetch(store) {
      try {
        const response = await this.$axios.get("/categories/373");
        store.commit("SET_CATEGORIES", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async edit(store, {categoryTitle, categoryId}) {
      try {
        const response = await this.$axios.post(`/categories/${categoryId}`, {title: categoryTitle});
        store.commit("EDIT_TITLE", response.data);
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
    async remove(store, categoryId) {
      try {
        const response = await this.$axios.delete(`/categories/${categoryId}`);
        store.commit("REMOVE_CATEGORY", categoryId);
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
  },
}