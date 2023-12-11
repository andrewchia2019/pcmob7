import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { API_URL, API } from "./constants";

const RecipeListScreen = () => {
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, [isFocus]);

  const fetchRecipes = () => {
    axios
      .get(`${API_URL}/recipes`)
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("Error fetching recipes:", error));
  };

  const handleDeleteRecipe = (recipeId) => {
    axios
      .delete(`${API_URL}/recipes/${recipeId}`)
      .then(() => {
        console.log("Recipe deleted successfully");
        fetchRecipes();
      })
      .catch((error) => console.error("Error deleting recipe:", error));
  };

  const handleLikeRecipe = (recipeId) => {
    axios
      .post(`${API_URL}/recipes/${recipeId}/like`)
      .then(() => {
        console.log("Recipe liked successfully");
        fetchRecipes();
      })
      .catch((error) => console.error("Error liking recipe:", error));
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeCard}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RecipeDetail", { recipeId: item.id })
        }
      >
        <Text style={styles.recipeTitle}>{item.title}</Text>
      </TouchableOpacity>
      <View style={styles.likeDislikeContainer}>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => handleLikeRecipe(item.id)}
        >
          <Icon name="thumbs-up" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteRecipe(item.id)}
      >
        <Icon name="trash" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipeItem}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("NewRecipe")}
      >
        <Text style={styles.addButtonText}>Add New Recipe</Text>
      </TouchableOpacity>
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
    marginHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  likeDislikeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeButton: {
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },

  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RecipeListScreen;
