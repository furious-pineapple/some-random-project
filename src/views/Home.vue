<template>
  <SelectedRecipes />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SelectedRecipes from "@/components/SelectedRecipes.vue"; // @ is an alias to /src

@Options({
  components: {
    SelectedRecipes,
  },
})
export default class Home extends Vue {}
</script>
