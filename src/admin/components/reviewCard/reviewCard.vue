<template>
  <card>
    <div class="slot-title" slot="title">
      <div class="pic">
        <img class="image" :src="cover"/>
      </div>
      <div class="info">
        <div class="author">{{review.author}}</div>
        <div class="occ">{{review.occ}}</div>
      </div>
    </div>
    <div class="slot-content" slot="content">
      <div class="text">
        <p>{{review.text}}</p>
      </div>
      <div class="btns">
        <icon class="btn" symbol="pencil" title="Править" grayscale @click="$emit('edit-review', review)"></icon>
        <icon class="btn" symbol="trash" title="Удалить" grayscale @click="$emit('delete-review', review.id)"></icon>
      </div>
    </div>
  </card>
</template>

<script>
import card from "../Card";
import icon from "../icon";
export default {
  components: { card, icon },
  props: {
    review: Object,
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.review.photo}`
    }
  },
  methods: {
    
  },
};
</script>

<style scoped lang="postcss" src="./reviewCard.pcss"></style>