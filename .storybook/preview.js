import { addParameters } from "@storybook/vue";
import "./main.pcss";

addParameters({
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#ffffff'
      },
      {
        name: 'grey',
        value: '#8395a7'
      },
    ],
  },
  darkMode: {
    current: "dark",
  },
});
