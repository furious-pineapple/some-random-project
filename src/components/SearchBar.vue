<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <el-alert
        v-if="hasError"
        title="Error: Unable to retrieve recipes.  Please try again later"
        type="error"
        class="tgif-error-message"
      >
      </el-alert>
      <el-form
        :model="form"
        label-width="120px"
        @submit.prevent="searchRecipes"
      >
        <el-form-item :required="true" label="Recipe:">
          <el-input
            v-model="form.query"
            placeholder="Chicken, beef, lamb, etc..."
            name="recipe"
          ></el-input>
        </el-form-item>
        <el-form-item label="Diet Type:">
          <el-select
            class="tgif-search-input"
            name="diet"
            placeholder="Please select diet type"
            v-model="form.diet"
            :multiple="true"
          >
            <el-option label="Gluten Free" value="Gluten Free"></el-option>
            <el-option label="Ketogenic" value="low-carb"></el-option>
            <el-option label="Vegetarian" value="Vegetarian"></el-option>
            <el-option label="Vegan" value="Vegan"></el-option>
            <el-option label="Pescetarian" value="Pescetarian"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Cuisine Type:">
          <el-select
            class="tgif-search-input"
            name="cuisineType"
            placeholder="Please select cuisine type"
            v-model="form.cuisine"
            :multiple="true"
          >
            <el-option label="African" value="African"></el-option>
            <el-option label="American" value="American"></el-option>
            <el-option label="British" value="British"></el-option>
            <el-option label="Caribbean" value="Caribbean"></el-option>
            <el-option label="Chinese" value="Chinese"></el-option>
            <el-option
              label="Eastern Europe"
              value="Eastern Europe"
            ></el-option>
            <el-option label="French" value="French"></el-option>
            <el-option label="Greek" value="Greek"></el-option>
            <el-option label="Indian" value="Indian"></el-option>
            <el-option label="Italian" value="Italian"></el-option>
            <el-option label="Japanese" value="Japanese"></el-option>
            <el-option label="Kosher" value="Kosher"></el-option>
            <el-option label="Korean" value="Korean"></el-option>
            <el-option label="Mediterranean" value="Mediterranean"></el-option>
            <el-option label="Mexican" value="Mexican"></el-option>
            <el-option
              label="Middle Eastern"
              value="Middle Eastern"
            ></el-option>
            <el-option label="Nordic" value="Nordic"></el-option>
            <el-option label="Spanish" value="Spanish"></el-option>
            <el-option label="Thai" value="Thai"></el-option>
            <el-option label="Vietnamese" value="Vietnamese"></el-option>
          </el-select>
        </el-form-item>
        <el-button
          class="tgif-submit-button"
          type="default"
          native-type="submit"
          :loading="isLoading"
          >Search</el-button
        >
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapState } from "vuex";

@Options({
  // Note: API docs can be found here
  // https://spoonacular.com/food-api/docs
  data() {
    return {
      form: {
        query: "",
        diet: "",
        cuisine: "",
      },
    };
  },
  methods: {
    searchRecipes() {
      // TODO: See if something in view can help format this for me
      const diet = this.form.diet.join ? this.form.diet.join(",") : "";
      const cuisine = this.form.cuisine.join ? this.form.cuisine.join(",") : "";
      // TODO: Proper way to declear stuff emitted
      this.$emit("searchRecipes", {
        query: this.form.query,
        diet,
        cuisine,
      });
    },
  },
  computed: {
    ...mapState({
      isLoading: (state: any) => state.SpoonacularAPIModule.isLoading,
      hasError: (state: any) => state.SpoonacularAPIModule.hasError,
    }),
  },
})
export default class SearchBar extends Vue {
  isLoading!: false;
}
</script>
<style scoped>
.tgif-search-input {
  width: 100%;
}

.tgif-error-message {
  margin-bottom: 25px;
}

.tgif-submit-button {
  margin-bottom: 20px;
}
</style>
