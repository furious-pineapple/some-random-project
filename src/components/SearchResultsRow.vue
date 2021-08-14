<template>
  <el-row justify="space-around">
    <template v-for="(recipe, index) in recipes" :key="index">
      <el-col :lg="4" :md="{ span: 6, offset: 2 }" :sm="10">
        <search-results :recipe="recipe">
          <div>
            <el-button @click="addToHistory(recipe)" type="primary" plain
              >Add to history</el-button
            >
          </div>
        </search-results>
      </el-col>
    </template>
  </el-row>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Recipes } from "@/components/SearchResults.interfaces";
import SearchResults from "@/components/SearchResults.vue";

import { mapMutations } from "vuex";

@Options({
  components: {
    SearchResults,
  },
  props: {
    recipes: {
      type: Array,
      default: [],
    },
  },
  methods: {
    addToHistory(recipe: Recipes): void {
      this.addNewRecipe(recipe);
      this.$message({
        message: "Congratulations! This recipe was added",
        type: "success",
      });
    },
    ...mapMutations({ addNewRecipe: "ADD_NEW_RECIPE" }),
  },
})
export default class SearchResultsRow extends Vue {
  recipe!: Recipes[];
}
</script>
