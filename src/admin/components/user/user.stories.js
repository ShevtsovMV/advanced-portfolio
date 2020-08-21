import user from "./user.vue";


export default {
  title: "user",
  parameters: {
    backgrounds: {
      default: 'darkBlue',
      values: [
        { name: 'darkBlue', value: '#43436B' },
      ],
    },
  },
  component: { user },
};

export const defaultView = () => ({
  components: { user },
  template: `
    <user />
  `,
});