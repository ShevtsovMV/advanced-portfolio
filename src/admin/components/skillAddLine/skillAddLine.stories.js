import skillAddLine from "./skillAddLine";
import { action } from "@storybook/addon-actions";

const methods = {
  onAddSkill: action("onAddSkill"),
};

export default {
  title: "skillAddLine",
  components: {skillAddLine}
};

export const defaultView = () => ({
  components: {skillAddLine},
  template: `
    <skill-add-line @add-skill="onAddSkill" /> 
  `,
  methods
});

defaultView.story = {
  name: "Стандартный вид"
};