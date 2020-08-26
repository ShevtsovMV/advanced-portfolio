import tagsAdder from "./tagsAdder.vue";

export default {
  title: "tagsAdder",
  component: { tagsAdder },
};

export const defaultView = () => ({
  components: { tagsAdder },
  data() {
    return {
      tags: "One, two, three"
    };
  },
  template: `
    <div>
      <tags-adder v-model="tags" />
    </div>
  `,
});

defaultView.story = {
  name: "Стандартный вид",
};