import { Button } from "@/components/Button";
import { FormCreateFlashcard } from "@/components/FormCreateFlashcard";
import { ScrollViewContainer } from "@/components/ScrollViewContainer";
import { TextInput } from "@/components/TextInput";
import { Typography } from "@/components/Typography";
import { App } from "@/constants/App";
import { useCollection } from "@/hooks/useCollection";
import { useGetStorage } from "@/hooks/useGetStorage";
import { findById } from "@/utils/find-by-id";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function EditCollection() {
  const { id } = useLocalSearchParams();
  const { data } = useGetStorage({ key: App.keyStorage.collections });
  const {
    collection,
    setCollection,
    handleAddFlashcard,
    handleChangeValue,
    handleDeleteQuestion,
    handleEditSave,
  } = useCollection();

  useEffect(() => {
    if (data) {
      const initialState = findById({ data, id });
      setCollection(initialState);
    }
  }, [data, id]);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "" });
  }, []);

  const isHiddenForSingleFlashcard = collection.flashcards.length > 1;

  return (
    <View style={styles.wrapper}>
      <ScrollViewContainer>
        <Typography variant="h2">Edit flashcards</Typography>
        <Typography variant="description">
          Make changes to your flashcards here. You can update the question,
          answer, or delete the card entirely. Don't forget to save when you're
          done!
        </Typography>

        <Typography variant="description">Name of collection</Typography>
        <TextInput
          style={{ marginBottom: 15 }}
          value={collection.name}
          onChangeText={(text) =>
            setCollection((prev) => ({ ...prev, name: text }))
          }
        />

        <Typography variant="h2">Questions</Typography>
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
      </ScrollViewContainer>

      <View style={styles.buttonBackground}>
        <View style={styles.fixedButtonContainer}>
          <Button onPress={() => handleEditSave(id)}>Save</Button>
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
