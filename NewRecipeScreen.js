import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_URL, API } from "./constants";

const NewRecipeScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSave = () => {
    const newRecipe = { title, ingredients, instructions };
    axios
      .post(API_URL + API.CREATE_RECIPE, newRecipe)
      .then((response) => {
        console.log("Recipe saved successfully:", response.data);
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error saving recipe:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Recipe</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Recipe</Text>
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
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  imagePickerButton: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 10,
  },
  imagePickerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 4,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#2ecc71",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default NewRecipeScreen;
