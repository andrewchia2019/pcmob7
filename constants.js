export const API_URL = "https://finalproject.iheartboardgame.repl.co";
export const API = {
  LOGIN: `/login`,
  WHOAMI: `/whoami`,
  NEW_USER: `/newuser`,
  RECIPES: `/recipes`,
  CREATE_RECIPE: `/recipes/create`,
  RECIPE_DETAIL: (recipeId) => `/recipes/${recipeId}`,
  FAVORITED_RECIPES: "/favorited-recipes",
  TOGGLE_FAVORITE: (recipeId) => `/recipes/${recipeId}/toggle-favorite`,
};

export const SCREENS = {
  HOME: "Home",
  RECIPE_LIST: "RecipeList",
  RECIPE_DETAIL: "RecipeDetail",
  NEW_RECIPE: "NewRecipe",
};
