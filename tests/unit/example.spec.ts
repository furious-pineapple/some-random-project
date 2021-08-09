import { shallowMount } from "@vue/test-utils";
import SelectedRecipes from "@/components/SelectedRecipes.vue";

describe("SelectedRecipes.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(SelectedRecipes, {
      props: { msg },
    });
    // expect(wrapper.text()).toMatch(msg);
  });
});
