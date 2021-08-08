<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <!-- TODO: Replace with el-form -->
      <form @submit.prevent="searchRecipes">
        <div class="tgif-form-group">
          <label class="tgif-form-label" for="recipe">Recipe: </label>
          <el-input
            name="recipe"
            class="tgif-search-input"
            placeholder="Please enter recipte"
            required
            v-model="query"
            :loading="isLoading"
          ></el-input>
        </div>
        <div class="tgif-form-group">
          <label class="tgif-form-label" for="diet">Diet Type:</label>
          <el-select
            class="tgif-search-input"
            name="diet"
            placeholder="Select"
            v-model="diet"
            :multiple="true"
          >
            <el-option label="High Protien" value="high-protien"></el-option>
            <el-option label="Low Carb" value="low-carb"></el-option>
            <el-option label="Low Fat" value="low-fat"></el-option>
            <el-option label="Low Sodium" value="low-sodium"></el-option>
          </el-select>
        </div>

        <div class="tgif-form-group">
          <label class="tgif-form-label" for="diet">Cuisine Type:</label>
          <el-select
            class="tgif-search-input"
            name="cuisineType"
            placeholder="Select"
            v-model="cuisineType"
            :multiple="true"
          >
            <el-option label="American" value="American"></el-option>
            <el-option label="Asian" value="Asian"></el-option>
            <el-option label="British" value="British"></el-option>
            <el-option label="Caribbean" value="Caribbean"></el-option>
            <el-option
              label="Central Europe"
              value="Central Europe"
            ></el-option>
            <el-option label="Chinese" value="Chinese"></el-option>
            <el-option
              label="Eastern Europe"
              value="Eastern Europe"
            ></el-option>
            <el-option label="French" value="French"></el-option>
            <el-option label="Indian" value="Indian"></el-option>
            <el-option label="Italian" value="Italian"></el-option>
            <el-option label="Japanese" value="Japanese"></el-option>
            <el-option label="Kosher" value="Kosher"></el-option>
            <el-option label="Mediterranean" value="Mediterranean"></el-option>
            <el-option label="Mexican" value="Mexican"></el-option>
            <el-option
              label="Middle Eastern"
              value="Middle Eastern"
            ></el-option>
            <el-option label="Nordic" value="Nordic"></el-option>
            <el-option
              label="South American"
              value="South American"
            ></el-option>
            <el-option
              label="South East Asian"
              value="South East Asian"
            ></el-option>
          </el-select>
        </div>
        <el-button type="default" native-type="submit" :loading="isLoading"
          >Search</el-button
        >
      </form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  // Note: API docs can be found here:  https://developer.edamam.com/edamam-docs-recipe-api
  data() {
    return {
      query: "",
      diet: "",
      cuisineType: "",
    };
  },
  methods: {
    searchRecipes() {
      this.$emit("searchRecipes", {
        query: this.query,
        diet: this.diet,
        cuisineType: this.cuisineType,
      });
    },
  },
  props: {
    // TODO: Move this to state managment
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
})
export default class SearchBar extends Vue {
  isLoading!: false;
}
</script>
<style scoped>
.tgif-form-group {
  display: block;
  margin-bottom: 15px;
}

.tgif-form-label {
  width: 100px;
}

.tgif-search-input {
  width: 50%;
}

.tgif-form-group {
  display: block;
}
</style>
