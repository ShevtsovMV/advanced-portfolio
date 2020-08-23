<template>
  <card>
    <edit-line 
      slot="title" 
      v-model="categoryTitle" 
      :editModeByDefault="empty" 
      @remove="$emit('remove-category-title', $event)"
      @approve="$emit('approve-category-title', $event, categoryIndex)"
    />
    <template slot="content">
      <ul class="skills" v-if="empty === false">
        <li class="item" v-for="(skill, index) in skills" :key="skill.id">
          <skill 
            :skill="skill" 
            :skillIndex="index"
            @remove="$emit('remove-skill', $event, categoryIndex)"
            @approve="$emit('edit-skill', $event, categoryIndex)"
          />
        </li>
      </ul>
      <div class="bottom-line">
        <skill-add-line 
          :blocked="empty" 
          @add-skill="$emit('add-skill', $event, categoryIndex)"
        />
      </div>
    </template>
  </card>
</template>

<script>
import card from "../Card/card";
import editLine from "../editLine/editLine";
import skill from "../skill/skill";
import skillAddLine from "../skillAddLine/skillAddLine";

export default {
  components: {
    card,
    editLine,
    skill,
    skillAddLine
  },
  props: {
    empty: Boolean,
    title: {
      type: String,
      default: ""
    },
    skills: {
      type: Array,
      default: () => []
    },
    categoryIndex: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      categoryTitle: this.title,
    }
  },
}
</script>

<style lang="postcss" scoped src="./category.pcss"></style>