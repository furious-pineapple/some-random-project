<template>
  <div id="tgif-recipes" v-if="recipe">
    <div class="tgif-recipe-image">
      <img :src="recipe.image" :alt="recipe.label" />
    </div>
    <div class="tgif-recipe-description">
      <p>Name: {{ recipe.label }}</p>
      <p>Calories: {{ recipe.calories?.toFixed(0) }}</p>
      <p>Total Time (min): {{ recipe.totalTime }}</p>
      <p>Source: {{ recipe.source }}</p>
    </div>
    <slot></slot>
  </div>
  <el-divider></el-divider>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Recipes } from "./SearchResults.interfaces";

@Options({
  props: {
    recipe: {
      type: Object,
      default: {},
    },
  },
})
export default class SearchResults extends Vue {
  recipe!: Recipes;
}
</script>

<style scoped>
#tgif-recipes {
  display: flex;
  justify-content: space-between;
}

.tgif-recipe-image img {
  width: 200px;
  height: auto;
}
</style>
