export default {
  namespaced: true,
  actions: {
    async add(store, skill) {
      try {
        const response = await this.$axios.post("/skills", skill);
        store.commit("categories/ADD_SKILL", response.data, { root: true });
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
    async remove(store, skillToRemove) {
      try {
        const response = await this.$axios.delete(`/skills/${skillToRemove.id}`);
        store.commit("categories/REMOVE_SKILL", skillToRemove, { root: true });
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
    async edit(store, skillToEdit) {
      try {
        const response = await this.$axios.post(`/skills/${skillToEdit.id}`, skillToEdit);
        store.commit("categories/EDIT_SKILL", response.data.skill, { root: true });
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
  },
}