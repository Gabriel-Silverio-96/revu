import { HandleChangeValue, ICollections, IFlashcard } from "@/types/app.types";
import * as Crypto from "expo-crypto";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { defineEditField } from "@/hooks/useCollection/utils/define-edit-field";
import { generateCollection } from "@/hooks/useCollection/utils/generate-collection";

interface useCollection {
  initialState?: ICollections | undefined;
}

export function useCollection({ initialState }: useCollection = {}) {
  const [collection, setCollection] = useState<ICollections>(
    initialState || generateCollection()
  );

  const handleAddFlashcard = useCallback(() => {
    const newFlashcard: IFlashcard = {
      id: Crypto.randomUUID(),
      question: "",
      answer: "",
    };

    setCollection((prev) => ({
      ...prev,
      flashcards: [...prev.flashcards, newFlashcard],
    }));
  }, [collection]);

  const handleChangeValue = useCallback(
    ({ id, field, value }: HandleChangeValue) => {
      setCollection((prev) => ({
        ...prev,
        flashcards: defineEditField({
          field,
          value,
          id,
          flashcards: prev.flashcards,
        }),
      }));
    },
    [collection]
  );

  const handleDeleteQuestion = useCallback(
    (id: string) => {
      const flashcards = collection.flashcards.filter(
        (flashcard) => flashcard.id !== id
      );

      setCollection((prev) => ({ ...prev, flashcards }));
    },
    [collection]
  );

  const handleSave = useCallback(async () => {
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
  }, [collection]);

  return {
    collection,
    setCollection,
    handleAddFlashcard,
    handleChangeValue,
    handleDeleteQuestion,
    handleSave,
  };
}
