import { Button } from "@/components/Button";
import { FormFlashcard } from "@/components/FormFlashcard";
import { ScrollViewContainer } from "@/components/ScrollViewContainer";
import { TextInput } from "@/components/TextInput";
import { Typography } from "@/components/Typography";
import { App } from "@/constants/App";
import { Colors } from "@/constants/Colors";
import { useCollection } from "@/hooks/useCollection";
import { useGetStorage } from "@/hooks/useGetStorage";
import { ICollection } from "@/types/app.types";
import { findById } from "@/utils/find-by-id";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";

export default function EditCollection() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { data } = useGetStorage<Array<ICollection>>({
    key: App.keyStorage.collections,
  });

  const {
    collection,
    setCollection,
    handleAddFlashcard,
    handleChangeValue,
    handleDeleteQuestion,
    handleEditSave,
    handleDeleteCollection,
  } = useCollection();

  useEffect(() => {
    if (data) {
      const initialState = findById({ data, id });
      setCollection(initialState);
    }
  }, [data, id]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: "" });
  }, []);

  const isHiddenForSingleFlashcard = collection.flashcards.length > 1;

  return (
    <View style={styles.wrapper}>
      <ScrollViewContainer>
        <View style={styles.header}>
          <Typography variant="h2">Edit flashcards</Typography>
          <TouchableHighlight onPress={() => handleDeleteCollection(id)}>
            <Typography variant="description" style={styles.delete}>
              Delete
            </Typography>
          </TouchableHighlight>
        </View>
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
        <FormFlashcard
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
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 24,
    right: 24,
  },
  buttonBackground: {
    backgroundColor: Colors.light.backgroundColor,
    height: 100,
  },
  delete: {
    color: Colors.common.red,
    marginTop: 8,
  },
});
