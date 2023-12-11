import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_URL, API } from "./constants";

const EditRecipeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipeId } = route.params;
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    // Fetch the recipe details when the component mounts
    axios
      .get(`${API_URL}${API.RECIPE_DETAIL(recipeId)}`)
      .then((response) => {
        const { title, ingredients, instructions } = response.data;
        setTitle(title);
        setIngredients(ingredients);
        setInstructions(instructions);
      })
      .catch((error) => {
        console.error("Error fetching recipe details:", error);
      });
  }, [recipeId]);

  const handleSave = () => {
    const updatedRecipe = { title, ingredients, instructions };
    axios
      .put(`${API_URL}${API.RECIPE_DETAIL(recipeId)}`, updatedRecipe)
      .then((response) => {
        console.log("Recipe updated successfully:", response.data);
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error updating recipe:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Recipe</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default EditRecipeScreen;
