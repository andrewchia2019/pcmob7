// navigation.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeListScreen from "./RecipeListScreen";
import RecipeDetailScreen from "./RecipeDetailScreen";
import EditRecipeScreen from "./EditRecipeScreen";
import NewRecipeScreen from "./NewRecipeScreen";
import FavoritedRecipesScreen from "./FavoritedRecipesScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RecipeStack = () => (
  <Stack.Navigator initialRouteName="RecipeList">
    <Stack.Screen name="RecipeList" component={RecipeListScreen} />
    <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    <Stack.Screen name="EditRecipe" component={EditRecipeScreen} />
    <Stack.Screen name="NewRecipe" component={NewRecipeScreen} />
  </Stack.Navigator>
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Recipes" component={RecipeStack} />
        <Tab.Screen name="Favorited" component={FavoritedRecipesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
