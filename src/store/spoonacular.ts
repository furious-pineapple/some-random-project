import axios from "axios";
import { apiKey } from "../../api-keys";
import { Recipes } from "@/components/SearchResults.interfaces";
import { Module } from "vuex";
import { SearchParam } from "@/components/SearchBar.interface";

export interface SpoonacularAPI {
  isLoading: boolean;
  hasError: boolean;
  recipes: Recipes[];
}

export interface SpoonacularState {
  [key: string]: Recipes | undefined;
}

export const SpoonacularAPIModule: Module<SpoonacularAPI, SpoonacularState> = {
  namespaced: true,
  state: {
    isLoading: false,
    hasError: false,
    recipes: [],
  },
  mutations: {
    LOADING_RECIPES(state) {
      state.isLoading = true;
      state.hasError = false;
      state.recipes = [];
    },
    FAILED_REQUEST(state) {
      state.hasError = true;
      state.isLoading = false;
    },
    SUCCESSFUL_REQUEST(state, { results = [] }) {
      state.isLoading = false;
      state.recipes = results;
    },
  },
  actions: {
    async loadRecipes({ commit }, params: SearchParam) {
      commit("LOADING_RECIPES");
      try {
        const { data } = await axios.get(
          "https://api.spoonacular.com/recipes/complexSearch",
          {
            params: { ...params, apiKey, addRecipeNutrition: true },
          }
        );
        commit("SUCCESSFUL_REQUEST", data);
      } catch (err) {
        commit("FAILED_REQUEST");
      }
    },
  },
};
