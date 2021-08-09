import qs from "qs";
import axios from "axios";
import { Recipes } from "@/components/SearchResults.interfaces";
import { Module } from "vuex";

export interface EdamanAPI {
  isLoading: boolean;
  hasError: boolean;
  recipes: Recipes[];
}

export interface EdamanState {
  [key: string]: Recipes | undefined;
}

export const EdamanAPIModule: Module<EdamanAPI, EdamanState> = {
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
    SUCCESSFUL_REQUEST(state, loadedRecipes) {
      state.isLoading = false;
      state.recipes = loadedRecipes;
    },
  },
  actions: {
    async loadRecipes({ commit }, params) {
      commit("LOADING_RECIPES");
      try {
        const { data: { hits } = [] } = await axios.get(
          "https://api.edamam.com/search",
          {
            params,
            paramsSerializer: (params) => {
              return qs.stringify(params, { arrayFormat: "repeat" });
            },
          }
        );
        commit("SUCCESSFUL_REQUEST", hits);
      } catch (err) {
        commit("FAILED_REQUEST");
      }
    },
  },
};
