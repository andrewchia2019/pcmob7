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

const FavoritedRecipesScreen = () => {
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);

  useEffect(() => {
    fetchFavoritedRecipes();
  }, [isFocus]);

  const fetchFavoritedRecipes = () => {
    axios
      .get(`${API_URL}${API.FAVORITED_RECIPES}`)
      .then((response) => setFavoritedRecipes(response.data))
      .catch((error) =>
        console.error("Error fetching favorited recipes:", error)
      );
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeCard}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RecipeDetail", { recipeId: item.id })
        }
      >
        <Text style={styles.recipeTitle}>{item.title}</Text>
        {item.is_favorite && <Icon name="star" size={20} color="gold" />}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritedRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipeItem}
      />
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
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  // Add other styles as needed
});

export default FavoritedRecipesScreen;
