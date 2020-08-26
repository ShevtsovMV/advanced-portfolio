import category from "./category.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onRemoveCategoryTitle: action("onRemoveCategoryTitle"),
  onApproveCategoryTitle: action("onApproveCategoryTitle"),
  onRemoveSkill: action("onRemoveSkill"),
  onEditSkill: action("onEditSkill"),
  onAddSkill: action("onAddSkill"),
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
      @remove-category-title="onRemoveCategoryTitle"
      @approve-category-title="onApproveCategoryTitle"
      @remove-skill="onRemoveSkill"
      @edit-skill="onEditSkill"
      @add-skill="onAddSkill"
    />
  `,
  methods
});

defaultView.story = {
  name: "Стандартный вид",
};