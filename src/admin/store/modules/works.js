export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_WORK(state, newWork) {
      state.data.push(newWork);
    },
    SET_WORKS(state, works) {
      state.data = works
    },
    UPDATE_WORK (state, updateWork) {
      state.data = state.data.map(work => {
        return work.id === updateWork.work.id ? updateWork.work : work;
      })
    },
    DELETE_WORK (state, workToDelete) {
      state.data = state.data.filter(work => {
        if (work.id !== workToDelete) {
          return work;
        }
      })
    },
  },
  actions: {
    async add({ commit }, work) {
      const newWork = {...work};
      delete newWork.preview;
      const formData = new FormData();
      
      Object.keys(newWork).forEach(item => {
        formData.append(item, newWork[item]);
      })

      try {
        const { data } = await this.$axios.post("/works", formData);
        commit("ADD_WORK", data);
      } catch (error) {
        console.log("error");
      }
    },
    async update ({ commit }, work) {
      const updateWork = {...work};
      delete updateWork.preview;
      const formData = new FormData();
      
      Object.keys(updateWork).forEach(item => {
        formData.append(item, updateWork[item]);
      })

      try {
        const { data } = await this.$axios.post(`/works/${updateWork.id}`, formData);
        commit("UPDATE_WORK", data);
      } catch (error) {
        console.log("error");
      }
    },
    async fetch({commit}) {
      try {
        const user = await this.$axios.get("/user");
        const userId = user.data.user.id;
        const { data } = await this.$axios.get(`/works/${userId}`);
        commit("SET_WORKS", data);
      } catch (error) {
        console.log("error");
      }
    },
    async delete (context, workToDelete) {
      try {
        await this.$axios.delete(`/works/${workToDelete}`);
        context.commit('DELETE_WORK', workToDelete);
      } catch (error) {
        console.log("error");
      }
    },
  },
};