import { HandleChangeValue, ICollection, IFlashcard } from "@/types/app.types";
import * as Crypto from "expo-crypto";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { defineEditField } from "@/hooks/useCollection/utils/define-edit-field";
import { generateCollection } from "@/hooks/useCollection/utils/generate-collection";
import { isEmptyFields } from "@/hooks/useCollection/utils/is-empty-fields";
import { App } from "@/constants/App";
import { editCollectionById } from "@/hooks/useCollection/utils/edit-collection-by-id";

interface useCollection {
  initialState?: ICollection | undefined;
}

export function useCollection({ initialState }: useCollection = {}) {
  const [collection, setCollection] = useState<ICollection>(
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
      if (isEmptyFields(collection)) {
        Alert.alert(
          "Error",
          "Please fill in the name, question, and answer fields."
        );
        return;
      }

      const existingData = await AsyncStorage.getItem(
        App.keyStorage.collections
      );
      const parsedData: ICollection[] = existingData
        ? JSON.parse(existingData)
        : [];

      const updatedCollections = [...parsedData, collection];
      await AsyncStorage.setItem(
        App.keyStorage.collections,
        JSON.stringify(updatedCollections)
      );

      Alert.alert("Success", "Collection saved successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save collection");
    }
  }, [collection]);

  const handleSaveEdit = useCallback(
    async (id: string | string[]) => {
      try {
        if (isEmptyFields(collection)) {
          Alert.alert(
            "Error",
            "Please fill in the name, question, and answer fields."
          );
          return;
        }

        const existingData = await AsyncStorage.getItem(
          App.keyStorage.collections
        );

        const parsedData: ICollection[] = existingData
          ? JSON.parse(existingData)
          : [];

        const updatedCollections = editCollectionById({
          data: parsedData,
          id,
          value: collection,
        });

        await AsyncStorage.setItem(
          App.keyStorage.collections,
          JSON.stringify(updatedCollections)
        );

        Alert.alert("Success", "Collection edited successfully!");
      } catch (error) {
        Alert.alert("Error", "Failed to edit collection");
      }
    },
    [collection]
  );

  return {
    collection,
    setCollection,
    handleAddFlashcard,
    handleChangeValue,
    handleDeleteQuestion,
    handleSave,
    handleSaveEdit,
  };
}
