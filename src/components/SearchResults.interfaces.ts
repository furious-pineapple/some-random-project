export interface Recipes {
  id: number;
  title: string;
  image: string;
  nutrition: Nutrition;
}

export interface Nutrition {
  ingredients: Ingredient[];
  nutrients: Nutrient[];
}

export interface Ingredient {
  amount: number;
  id: number;
  name: string;
  unit: string;
  nutrients: Nutrient;
}

export interface Nutrient {
  amount: number;
  name: string;
  unit: string;
  title: string;
  percentOfDailyNeeds?: number;
}