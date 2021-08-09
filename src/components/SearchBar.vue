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
        <el-form-item required="true" label="Recipe:">
          <el-input
            v-model="form.query"
            placeholder="Please enter recipte"
            name="recipe"
          ></el-input>
        </el-form-item>
        <el-form-item label="Diet Type:">
          <el-select
            class="tgif-search-input"
            name="diet"
            placeholder="Select"
            v-model="form.diet"
            :multiple="true"
          >
            <el-option label="High Protien" value="high-protien"></el-option>
            <el-option label="Low Carb" value="low-carb"></el-option>
            <el-option label="Low Fat" value="low-fat"></el-option>
            <el-option label="Low Sodium" value="low-sodium"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Cuisine Type:">
          <el-select
            class="tgif-search-input"
            name="cuisineType"
            placeholder="Select"
            v-model="form.cuisineType"
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
  // Note: API docs can be found here:  https://developer.edamam.com/edamam-docs-recipe-api
  data() {
    return {
      form: {
        query: "",
        diet: "",
        cuisineType: "",
      },
    };
  },
  methods: {
    searchRecipes() {
      this.$emit("searchRecipes", {
        query: this.form.query,
        diet: this.form.diet,
        cuisineType: this.form.cuisineType,
      });
    },
  },
  computed: {
    ...mapState({
      isLoading: (state: any) => state.edamanAPIModule.isLoading,
      hasError: (state: any) => state.edamanAPIModule.hasError,
    }),
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

.tgif-search-input {
  width: 100%;
}

.tgif-form-group {
  display: block;
}

.tgif-error-message {
  margin-bottom: 25px;
}

.tgif-submit-button {
  margin-bottom: 20px;
}
</style>
