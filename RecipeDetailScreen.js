import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import {
  useNavigation,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import { API_URL, API } from "./constants";

const RecipeDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const isFocus = useIsFocused();

  useEffect(() => {
    // Fetch the recipe details from the API
    axios
      .get(`${API_URL}${API.RECIPE_DETAIL(recipeId)}`)
      .then((response) => setRecipe(response.data))
      .catch((error) => console.error("Error fetching recipe details:", error));
  }, [recipeId, isFocus]);

  const handleEdit = () => {
    navigation.navigate("EditRecipe", { recipeId });
  };

  const handleToggleFavorite = () => {
    // Toggle the favorite status locally
    const updatedRecipe = { ...recipe, isFavorite: !recipe.isFavorite };
    setRecipe(updatedRecipe);

    // Update the favorite status on the server
    axios
      .post(`${API_URL}${API.TOGGLE_FAVORITE(recipeId)}`)
      .then((response) => {
        console.log("Favorite status updated successfully");
      })
      .catch((error) =>
        console.error("Error updating favorite status:", error)
      );
  };

  return (
    <View style={styles.container}>
      {recipe ? (
        <View style={styles.recipeCard}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <Text style={styles.recipeIngredients}>{recipe.ingredients}</Text>
          <Text style={styles.recipeInstructions}>{recipe.instructions}</Text>
          <Text style={styles.likesDislikesText}>Likes: {recipe.likes}</Text>
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              { backgroundColor: recipe.isFavorite ? "#FFD700" : "#e0e0e0" },
            ]}
            onPress={handleToggleFavorite}
          >
            <Text>☆</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit Recipe</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  recipeIngredients: {
    fontSize: 16,
    marginBottom: 8,
  },
  recipeInstructions: {
    fontSize: 16,
    marginBottom: 8,
  },
  likesDislikesText: {
    fontSize: 16,
    marginBottom: 8,
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
  editButton: {
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RecipeDetailScreen;
