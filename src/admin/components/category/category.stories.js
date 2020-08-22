import category from "./category.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onRemove: action("onRemove"),
  onRemoveSkill: action("onRemoveSkill"),
  onEditSkill: action("onEditSkill"),
};

export default {
  title: "category",
  component: { category },
};

const skills = [
  {"id": 0, "title": "HTML5", "percent": 60},
  {"id": 0, "title": "CSS", "percent": 40},
];

export const defaultView = () => ({
  components: { category },
  data() {
    return {
      title: "Frontend",
      skills
    };
  },
  template: `
    <category 
      :title="title"
      :skills="skills"
      @remove="onRemove"
      @remove-skill="onRemoveSkill"
      @edit-skill="onEditSkill"
    />
  `,
  methods
});

defaultView.story = {
  name: "Стандартный вид",
};