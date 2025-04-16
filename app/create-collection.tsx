import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Crypto from "expo-crypto";
import {
  FormCreateFlashcard,
  HandleChangeValue,
} from "@/components/FormCreateFlashcard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICollections, IFlashcard } from "@/types/app.types";

const generateCollection = () => ({
  id: Crypto.randomUUID(),
  name: "",
  flashcards: [
    {
      id: Crypto.randomUUID(),
      question: "",
      answer: "",
    },
  ],
});

export default function CreateCollection() {
  const [collection, setCollection] = useState<ICollections>(
    generateCollection()
  );

  const handleAddFlashcard = () => {
    const newFlashcard: IFlashcard = {
      id: Crypto.randomUUID(),
      question: "",
      answer: "",
    };

    setCollection((prev) => ({
      ...prev,
      flashcards: [...prev.flashcards, newFlashcard],
    }));
  };

  const handleChangeValue = ({ id, field, value }: HandleChangeValue) => {
    setCollection((prev) => ({
      ...prev,
      flashcards: prev.flashcards.map((card) =>
        card.id === id ? { ...card, [field]: value } : card
      ),
    }));
  };

  const handleDeleteQuestion = (id: string) => {
    const flashcards = collection.flashcards.filter(
      (flashcard) => flashcard.id !== id
    );

    setCollection((prev) => ({ ...prev, flashcards }));
  };

  const handleSave = async () => {
    try {
      const existingData = await AsyncStorage.getItem("collections");
      const parsedData: ICollections[] = existingData
        ? JSON.parse(existingData)
        : [];

      const updatedCollections = [...parsedData, collection];
      await AsyncStorage.setItem(
        "collections",
        JSON.stringify(updatedCollections)
      );

      Alert.alert("Success", "Collection saved successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save collection");
    }
  };

  const isHiddenForSingleFlashcard = collection.flashcards.length > 1;

  return (
    <View style={styles.wrapper}>
      <ScrollView
        scrollEventThrottle={16}
        decelerationRate="fast" // or 'normal', try also 0 if needed
        overScrollMode="never" // removes glow effect on Android
        bounces={false} // iOS only
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Create a flashcards</Text>
        <Text style={styles.description}>
          Start creating your flashcards. Add questions, write clear answers,
          and group them into collections.
        </Text>

        <Text style={styles.description}>Name of collection</Text>
        <TextInput
          value={collection.name}
          onChangeText={(text) =>
            setCollection((prev) => ({ ...prev, name: text }))
          }
        />

        <Text style={styles.title}>Questions</Text>
        <FormCreateFlashcard
          handleDeleteQuestion={handleDeleteQuestion}
          handleChangeValue={handleChangeValue}
          hiddenDelete={isHiddenForSingleFlashcard}
          flashcards={collection.flashcards}
        />

        <View style={{ marginTop: 30 }}>
          <Button variant="outlined" onPress={handleAddFlashcard}>
            Add
          </Button>
        </View>
      </ScrollView>

      <View style={styles.buttonBackground}>
        <View style={styles.fixedButtonContainer}>
          <Button onPress={handleSave}>Save</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "relative",
  },
  container: {
    paddingTop: 50,
    paddingBottom: 100,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    color: "#A1A1A1",
    fontSize: 13,
    marginTop: 15,
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 24,
    right: 24,
  },
  buttonBackground: {
    backgroundColor: "#FFF",
    height: 100,
  },
});
