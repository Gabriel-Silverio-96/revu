import * as Crypto from "expo-crypto";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

import type {
  HandleChangeValue,
  ICollection,
  IFlashcard,
} from "@/types/app.types";
import { defineEditField } from "@/hooks/useCollection/utils/define-edit-field";
import { generateCollection } from "@/hooks/useCollection/utils/generate-collection";
import { isEmptyFields } from "@/hooks/useCollection/utils/is-empty-fields";
import { App } from "@/constants/App";
import { editCollectionById } from "@/hooks/useCollection/utils/edit-collection-by-id";
import { parseData } from "@/hooks/useCollection/utils/parse-data/parse-data";

interface UseCollection {
  initialState?: ICollection | undefined;
}

export interface UseCollectionReturn {
  collection: ICollection;
  setCollection: React.Dispatch<React.SetStateAction<ICollection>>;
  handleAddFlashcard: () => void;
  handleChangeValue: (params: HandleChangeValue) => void;
  handleDeleteQuestion: (id: string) => void;
  handleSave: () => Promise<void>;
  handleEditSave: (id: string | string[]) => Promise<void>;
  handleDeleteCollection: (id: string | string[]) => Promise<void>;
}

/**
 * Custom React hook for managing a flashcard collection.
 *
 * This hook handles creating, editing, saving, and deleting flashcard collections,
 * as well as adding and removing individual flashcards within a collection.
 */
export function useCollection({
  initialState,
}: UseCollection = {}): UseCollectionReturn {
  const router = useRouter();
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

      const collections = await parseData();
      const updatedCollections = [...collections, collection];

      await AsyncStorage.setItem(
        App.keyStorage.collections,
        JSON.stringify(updatedCollections)
      );

      Alert.alert("Success", "Collection saved successfully!", [
        {
          text: "Ok",
          onPress: () => {
            router.push("/collections");
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to save collection");
    }
  }, [collection]);

  const handleEditSave = useCallback(
    async (id: string | string[]) => {
      try {
        if (isEmptyFields(collection)) {
          Alert.alert(
            "Error",
            "Please fill in the name, question, and answer fields."
          );
          return;
        }

        const collections = await parseData();
        const updatedCollections = editCollectionById({
          data: collections,
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

  const handleDeleteCollection = useCallback(async (id: string | string[]) => {
    const collections = await parseData();
    if (collections) {
      Alert.alert("Delete collection", "Would you like to remove it?", [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const deletedCollection = collections.filter(
                (collection) => collection.id !== id
              );

              await AsyncStorage.setItem(
                App.keyStorage.collections,
                JSON.stringify(deletedCollection)
              );

              router.push("/collections");
            } catch (error) {
              Alert.alert("Error", "Failed to delete collection");
            }
          },
        },
      ]);
    }
  }, []);

  return {
    collection,
    setCollection,
    handleAddFlashcard,
    handleChangeValue,
    handleDeleteQuestion,
    handleSave,
    handleEditSave,
    handleDeleteCollection,
  };
}
