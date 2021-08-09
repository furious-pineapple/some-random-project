<template>
  <div class="hello">
    <h1>Here are your saved recipes!</h1>
  </div>
  <el-row :gutter="20">
    <el-col :span="14" :offset="5">
      <div v-for="(recipe, index) in recipes" :key="index">
        <search-results :recipe="recipe">
          <ul class="tgif-recipe-instructions">
            <li v-for="({ text }, index) in recipe.ingredients" :key="index">
              {{ text }}
            </li>
          </ul>
          <div>
            <el-button @click="removeRecipe(index)" type="danger" plain
              >Remove from History
            </el-button>
          </div>
        </search-results>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapMutations, mapState } from "vuex";
import SearchResults from "./SearchResults.vue";

@Options({
  components: {
    SearchResults,
  },
  computed: {
    ...mapState({
      recipes: "selectedRecipes",
    }),
  },
  methods: {
    removeRecipe(index: number) {
      this.removeSelectedRecipes(index);
    },
    ...mapMutations({
      removeSelectedRecipes: "REMOVE_RECIPE",
    }),
  },
})
export default class SelectedRecipes extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
li {
  text-align: left;
}
a {
  color: #42b983;
}
</style>
