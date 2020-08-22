import skillAddLine from "./skillAddLine";

export default {
  title: "skillAddLine",
  components: {skillAddLine}
};

export const defaultView = () => ({
  components: {skillAddLine},
  template: `
    <skill-add-line /> 
  `
});

defaultView.story = {
  name: "Стандартный вид"
};