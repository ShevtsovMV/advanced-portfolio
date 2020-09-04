export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    SET_USER: (state, user) => (state.user = user),
    CLEAR_USER: state => (state.user = {}),
  },
  getters: {
    userIsLoggedIn: state => {
      const userObj = state.user;
      const userObjEmpty = Object.keys(userObj).length === 0 && userObj.constructor === Object;

      return userObjEmpty === false;
    },
  },
  actions: {
    logout(store) {
      localStorage.removeItem("token");
      location.reload();
    },
    login(store, user) {
      store.commit("SET_USER", user);
    },
  },
}