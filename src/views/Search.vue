<template>
  <div>
    <h1>Search for your next favorite recipe!</h1>
  </div>
  <search-bar @search-recipes="getRecipes"></search-bar>
  <el-row :gutter="20">
    <el-col :span="14" :offset="5">
      <div v-for="(recipe, index) in filteredRecipes" :key="index">
        <search-results :recipe="recipe">
          <div>
            <el-button @click="addToHistory(recipe)" type="primary" plain
              >Add to history</el-button
            >
          </div>
        </search-results>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SearchBar from "@/components/SearchBar.vue";
import { SearchParam } from "@/components/SearchBar.interface";
import SearchResults from "@/components/SearchResults.vue";
import { Recipes } from "@/components/SearchResults.interfaces";
import { mapActions, mapMutations, mapState } from "vuex";

@Options({
  components: {
    SearchBar,
    SearchResults,
  },
  methods: {
    // NOTE: Could probaly just call this function on the event directly.
    getRecipes(searchParam: SearchParam): void {
      this.loadRecipes(searchParam);
    },
    addToHistory(recipe: Recipes): void {
      this.addNewRecipe(recipe);
      this.$message({
        message: "Congratulations! This recipe was added",
        type: "success",
      });
    },
    ...mapActions({ loadRecipes: "SpoonacularAPIModule/loadRecipes" }),
    ...mapMutations({ addNewRecipe: "ADD_NEW_RECIPE" }),
  },
  computed: {
    ...mapState({
      recipes: (state: any) => state.SpoonacularAPIModule.recipes,
      selectedRecipes: (state: any) => state.selectedRecipes,
    }),
    filteredRecipes(): void {
      // Nutrition facts are stored in an array but the index for the index for the specific nutrient
      // is usually the same. We store the index so that we can avoid having to iterate over the array
      // TODO: update function to keep track of the index of each nutrient to reduce the amount of loops
      const nutritionIndexs = {
        Calories: undefined,
        Carbohydrates: undefined,
        Protein: undefined,
      };

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
  },
})
export default class Home extends Vue {}
</script>
