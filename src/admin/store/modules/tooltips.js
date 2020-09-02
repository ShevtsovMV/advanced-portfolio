export default {
  namespaced: true,
  state: {
    isShown: false,
    text: "",
    type: "success",
  },
  mutations: {
    SET_TOOLTIP: (state, tooltip) => {
      state.isShown = tooltip.isShown;
      state.text = tooltip.text;
      state.type = tooltip.type;
    },
  },
  actions: {
    show(store, tooltip) {
      let timeout = null;
      store.commit("SET_TOOLTIP", {
        isShown: true,
        text: tooltip.text,
        type: tooltip.type,
      });

      if(timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        store.dispatch("hide");
      }, 4000);
    },
    hide(store) {
      store.commit("SET_TOOLTIP", {
        ...store.state,
        isShown: false,
      });
    },
  },
}