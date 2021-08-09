import { Recipes } from "@/components/SearchResults.interfaces";
import { createStore } from "vuex";
import { EdamanAPIModule } from "./edaman";

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
      window.sessionStorage.setItem("recipies", JSON.stringify(state.selectedRecipes));
    },
    REMOVE_RECIPE(state, index) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.selectedRecipes = state.selectedRecipes.filter(
        (recipes: Recipes, currentIndex: number) => {
          return index !== currentIndex;
        }
      );
      window.sessionStorage.setItem("recipies", JSON.stringify(state.selectedRecipes));
    },
    SET_SELECTED_RECIPES(state, recipes) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.selectedRecipes = recipes;
      window.sessionStorage.setItem("recipies", JSON.stringify(recipes));
    },
  },
  actions: {},
  modules: { edamanAPIModule: EdamanAPIModule },
});
