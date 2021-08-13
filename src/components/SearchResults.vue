<template>
  <div id="tgif-recipes" v-if="recipe">
    <div class="tgif-recipe-image">
      <img :src="recipe.image" :alt="recipe.title" />
    </div>
    <div class="tgif-recipe-description">
      <p>Name: {{ recipe.title }}</p>
      <!-- TODO: See if there is a way to format props before we get here -->
      <p>Calories: {{ recipe.Calories?.toFixed(0) }}</p>
      <p>Carbs: {{ recipe.Carbohydrates?.toFixed(0) }}</p>
      <p>Protein: {{ recipe.Protein?.toFixed(0) }}</p>
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