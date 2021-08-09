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

interface EdamanQueryParam {
  q: string;
  diet?: string[];
  cuisineType?: string[];
  app_id: string;
  app_key: string;
}

@Options({
  components: {
    SearchBar,
    SearchResults,
  },
  data() {
    return {
      isLoading: false,
      hasError: "",
    };
  },
  methods: {
    async getRecipes(searchParam: SearchParam): Promise<void> {
      this.loadRecipes(this.formatQueryParam(searchParam));
    },
    formatQueryParam(searchParam: SearchParam): EdamanQueryParam {
      // Leaving key in and will disabled on Wednesday (August 11th)
      const params: EdamanQueryParam = {
        q: searchParam.query,
        app_id: "ad1e7256",
        app_key: "60c00bff0d5dbc1f749565708ecb8ef2",
      };
      // NOTE: API does not work if diet is an empty string and Axios does not
      // remove query param if it's empty ... I really thought it did.  Open to making this cleaner
      //  but ok with current solution.
      if (searchParam.diet) {
        params.diet = searchParam.diet;
      }
      if (searchParam.cuisineType) {
        params.cuisineType = searchParam.cuisineType;
      }
      return params;
    },
    addToHistory(recipe: Recipes) {
      this.addNewRecipe(recipe);
      this.$message({
        message: "Congratulations! This recipe was added",
        type: "success",
      });
    },
    ...mapActions({ loadRecipes: "edamanAPIModule/loadRecipes" }),
    ...mapMutations({ addNewRecipe: "ADD_NEW_RECIPE" }),
  },
  computed: {
    ...mapState({
      recipes: (state: any) => state.edamanAPIModule.recipes,
      selectedRecipes: (state: any) => state.selectedRecipes,
    }),
    filteredRecipes() {
      return this.recipes.map(
        ({
          recipe: {
            image,
            source,
            url,
            ingredients,
            calories,
            totalTime,
            label,
          },
        }: {
          recipe: Recipes;
        }) => {
          return {
            image,
            source,
            url,
            ingredients,
            calories,
            totalTime,
            label,
          };
        }
      );
    },
  },
})
export default class Home extends Vue {}
</script>
