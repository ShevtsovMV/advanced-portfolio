export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_REVIEW(state, newReview) {
      state.data.push(newReview);
    },
    SET_REVIEWS(state, reviews) {
      state.data = reviews
    },
    UPDATE_REVIEW (state, updateReview) {
      state.data = state.data.map(review => {
        return review.id === updateReview.review.id ? updateReview.review : review;
      })
    },
    DELETE_REVIEW (state, reviewToDelete) {
      state.data = state.data.filter(review => {
        if (review.id !== reviewToDelete) {
          return review;
        }
      })
    },
  },
  actions: {
    async add({ commit }, review) {
      const newReview = {...review};
      delete newReview.preview;
      const formData = new FormData();
      
      Object.keys(newReview).forEach(item => {
        formData.append(item, newReview[item]);
      })

      try {
        const { data } = await this.$axios.post("/reviews", formData);
        commit("ADD_REVIEW", data);
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
    async update ({ commit }, review) {
      const updateReview = {...review};
      delete updateReview.preview;
      const formData = new FormData();
      
      Object.keys(updateReview).forEach(item => {
        formData.append(item, updateReview[item]);
      })

      try {
        const { data } = await this.$axios.post(`/reviews/${updateReview.id}`, formData);
        commit("UPDATE_REVIEW", data);
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
    async fetch({commit}) {
      try {
        const user = await this.$axios.get("/user");
        const userId = user.data.user.id;
        const { data } = await this.$axios.get(`/reviews/${userId}`);
        commit("SET_REVIEWS", data);
      } catch (error) {
        console.log("error");
      }
    },
    async delete (context, reviewToDelete) {
      try {
        await this.$axios.delete(`/reviews/${reviewToDelete}`);
        context.commit('DELETE_REVIEW', reviewToDelete);
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
  },
};