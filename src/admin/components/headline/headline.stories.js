import headline from "./headline.vue";


export default {
  title: "headline",
  component: { headline },
};

export const defaultView = () => ({
  components: { headline },
  template: `
    <headline title="Панель администрирования">
      <h4>Контент</h4>
    </headline>
  `,
});