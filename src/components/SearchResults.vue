<template>
  <el-card
    class="tgif-u-padding-bottom"
    :body-style="{ padding: '0px' }"
    shadow="hover"
  >
    <template #header>
      <span>{{ recipe.title }}</span>
    </template>
    <img :src="recipe.image" :alt="recipe.title" class="image" />
    <div style="tgif-u-padding-bottom">
      <div class="bottom">
        <p>Calories: {{ recipe.Calories?.toFixed(0) }}</p>
        <p>Carbs: {{ recipe.Carbohydrates?.toFixed(0) }}</p>
        <p>Protein: {{ recipe.Protein?.toFixed(0) }}</p>
        <slot></slot>
      </div>
    </div>
  </el-card>
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
.tgif-u-padding-bottom {
  margin-bottom: 20px;
}
</style>
