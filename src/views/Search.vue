<template>
  <div>
    <h1>Search for your next favorite recipe!</h1>
  </div>
  <search-bar @search-recipes="getRecipes" />
  <search-results-row
    v-for="(recipesRow, index) in chunkedRecipes"
    :key="index"
    :recipes="recipesRow"
  />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SearchBar from "@/components/SearchBar.vue";
import { SearchParam } from "@/components/SearchBar.interface";
import SearchResultsRow from "@/components/SearchResultsRow.vue";
import { Recipes } from "@/components/SearchResults.interfaces";
import { mapActions, mapState } from "vuex";

@Options({
  components: {
    SearchBar,
    SearchResultsRow,
  },
  methods: {
    // NOTE: Could probaly just call this function on the event directly.
    getRecipes(searchParam: SearchParam): void {
      this.loadRecipes(searchParam);
    },
    ...mapActions({ loadRecipes: "SpoonacularAPIModule/loadRecipes" }),
  },
  computed: {
    ...mapState({
      recipes: (state: any) => state.SpoonacularAPIModule.recipes,
      selectedRecipes: (state: any) => state.selectedRecipes,
    }),
    filteredRecipes(): Recipes {
      // Nutrition facts are stored in an array but the index for the index for the specific nutrient
      // is usually the same. We store the index so that we can avoid having to iterate over the array
      // TODO: update function to keep track of the index of each nutrient to reduce the amount of loops
      // const nutritionIndexs = {
      //   Calories: undefined,
      //   Carbohydrates: undefined,
      //   Protein: undefined,
      // };

      return this.recipes.map(({ id, title, image, nutrition }: Recipes) => {
        const { nutrients } = nutrition;
        const info: { [key: string]: number | null } = {
          Calories: null,
          Carbohydrates: null,
          Protein: null,
        };
        nutrients.forEach(({ name, amount }) => {
          if (info[name] === null) {
            info[name] = amount;
          }
        });
        return {
          id,
          title,
          image,
          ...info,
        };
      });
    },

    // NOTE: We are creating a 2D array to simplify styling the rows.  We only want to have 4 recipes, max, per row
    //       and created search-results-row knowing it cannot take more than 4.  Rather than buliding the logic into
    //       search-results-row, I decided to create the 2d array that chunks the recipes together.
    chunkedRecipes(): Recipes[] {
      const recipeChunks = [];
      let i = 0;
      while (i < this.filteredRecipes.length) {
        recipeChunks.push(this.filteredRecipes.slice(i, 4 + i));
        i += 4;
      }
      return recipeChunks;
    },
  },
})
export default class Home extends Vue {}
</script>
