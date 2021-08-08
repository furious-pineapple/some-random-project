<template>
  <div id="tgif-recipes" v-if="recipe">
    <div class="tgif-recipe-image">
      <img :src="recipe.image" :alt="recipe.label" />
    </div>
    <div class="tgif-recipe-description">
      <p>Source: {{ recipe.source }}</p>
      <p>Calories: {{ recipe.calories.toFixed(0) }}</p>
      <p>Total Time (min): {{ recipe.totalTime }}</p>
    </div>
    <div class="tgif-recipe-read-more">
      <el-button @click="addToHistory(recipe)" type="primary" plain
        >Add to history</el-button
      >
    </div>
  </div>
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
  methods: {
    addToHistory(recipe: Recipes) {
      // TODO: Make sure we retrieve existing value before we push something new
      const newRecipe: Recipes = {
        calories: recipe.calories,
        totalTime: recipe.totalTime,
        url: recipe.url,
        source: recipe.source,
        ingredients: recipe.ingredients,
        image: recipe.image,
      };
      window.sessionStorage.setItem("recipies", JSON.stringify([newRecipe]));
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
