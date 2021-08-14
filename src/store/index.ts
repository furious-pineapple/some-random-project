import { Recipes } from "@/components/SearchResults.interfaces";
import { createStore } from "vuex";
import { SpoonacularAPIModule } from "./spoonacular";

// TODO: Figure out how to property map state so that I we don't have to manually type it

// TODO: Fix how we define state so that we don't need to disable ban-ts-comment
export default createStore({
  state: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    selectedRecipes: [],
  },
  mutations: {
    ADD_NEW_RECIPE(state, recipe) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.selectedRecipes = [...state.selectedRecipes, recipe];
      window.sessionStorage.setItem(
        "recipes",
        JSON.stringify(state.selectedRecipes)
      );
    },
    REMOVE_RECIPE(state, index) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.selectedRecipes = state.selectedRecipes.filter(
        (recipes: Recipes, currentIndex: number) => {
          return index !== currentIndex;
        }
      );
      window.sessionStorage.setItem(
        "recipes",
        JSON.stringify(state.selectedRecipes)
      );
    },
    SET_SELECTED_RECIPES(state, recipes) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.selectedRecipes = recipes;
      window.sessionStorage.setItem("recipes", JSON.stringify(recipes));
    },
  },
  actions: {},
  modules: { SpoonacularAPIModule },
});
