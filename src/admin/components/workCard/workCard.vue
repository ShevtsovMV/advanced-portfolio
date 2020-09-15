<template>
  <card simple>
    <div class="works-wrapper">
      <div class="pic">
        <img class="image" :src="cover"/>
        <div class="tag">
          <tags-list :tags="work.techs"/>
        </div>
      </div>
      <div class="data">
        <div class="title">{{work.title}}</div>
        <div class="text">
          <p>{{work.description}}</p>
        </div>
        <a :href="work.link" class="link" target="_blank">{{work.link}}</a>
        <div class="btns">
          <icon class="btn" symbol="pencil" title="Править" grayscale @click="$emit('edit-work', work)"></icon>
          <icon class="btn" symbol="trash" title="Удалить" grayscale @click="$emit('delete-work', work.id)"></icon>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import card from "../Card";
import icon from "../icon";
import tagsList from "../tagsList";
export default {
  components: { card, icon, tagsList },
  props: {
    work: Object,
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.work.photo}`
    }
  },
  methods: {
    
  },
};
</script>

<style scoped lang="postcss" src="./workCard.pcss"></style>