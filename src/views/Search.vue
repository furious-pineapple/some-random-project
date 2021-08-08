<template>
  <div>
    <h1>Search for your next favorite recipe!</h1>
  </div>
  <search-bar :isLoading="isLoading" @search-recipes="getRecipes"></search-bar>
  <el-row :gutter="20">
    <el-col :span="14" :offset="5">
      <div v-for="(recipe, index) in recipes" :key="index">
        <search-results :recipe="recipe.recipe"></search-results>
        <el-divider></el-divider>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import axios from "axios";
import qs from "qs";
import { Options, Vue } from "vue-class-component";
import SearchBar from "@/components/SearchBar.vue";
import { SearchParam } from "@/components/SearchBar.interface";
import SearchResults from "@/components/SearchResults.vue";

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
  methods: {
    async getRecipes(searchParam: SearchParam): Promise<void> {
      this.isLoading = true;
      this.hasError = "";
      try {
        const params = this.formatQueryParam(searchParam);
        const { data: { hits } = [] } = await axios.get(
          "https://api.edamam.com/search",
          {
            params,
            paramsSerializer: (params) => {
              return qs.stringify(params);
            },
          }
        );
        this.recipes = hits;
      } catch (err) {
        this.hasError = err.message;
      }
      this.isLoading = false;
    },
    formatQueryParam(searchParam: SearchParam): EdamanQueryParam {
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
  },
  data() {
    return {
      recipes: [],
      isLoading: false,
      hasError: "",
    };
  },
})
export default class Home extends Vue {}
</script>
