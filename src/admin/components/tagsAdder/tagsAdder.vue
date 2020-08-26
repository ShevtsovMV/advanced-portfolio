<template>
  <div class="tags-adder-component">
    <app-input
      title="Добавление тега"
      v-model="currentTags"
      @input="$emit('change', currentTags)"
    />
    <ul class="tags">
      <li 
        class="tag"
        v-for="(tag, index) in tagsArray"
        :key="`${tag}${index}`"
        
      >
        <tag 
          interactive 
          :title="tag" 
          @click="removeTag(tag)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import input from "../input/input";
import tag from "../tag/tag";


export default {
  components: {
    appInput: input,
    tag
  },
  props: {
    tags: {
      type: String,
      default: ""
    }
  },
  model: {
    prop: "tags",
    event: "change"
  },
   data() {
    return {
      currentTags: this.tags
    };
  },
  computed: {
    tagsArray() {
      return this.getArrayFromString(this.currentTags);
    }
  },
  methods: {
    removeTag(tag) {
      const tags = [...this.tagsArray];
      const tagIndex = tags.indexOf(tag);

      if (tagIndex < 0) return;
      
      tags.splice(tagIndex, 1);
      this.currentTags = tags.join(", ");

      this.$emit('change', this.currentTags);
    },
    getArrayFromString(currentString) {
      const arr = currentString.trim().split(',');
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].trim() == "") {
          arr.splice(i, 1);
          i--
        }
      }
      return arr;
    }
  }
}
</script>

<style lang="postcss" scoped src="./tagsAdder.pcss"></style>