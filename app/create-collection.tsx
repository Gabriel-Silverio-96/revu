import { StyleSheet, View } from "react-native";

import { Button } from "@/components/Button";
import { FormFlashcard } from "@/components/FormFlashcard";
import { ScrollViewContainer } from "@/components/ScrollViewContainer";
import { TextInput } from "@/components/TextInput";
import { Typography } from "@/components/Typography";
import { Colors } from "@/constants/Colors";
import { useCollection } from "@/hooks/useCollection";

export default function CreateCollection() {
  const {
    collection,
    setCollection,
    handleAddFlashcard,
    handleChangeValue,
    handleDeleteQuestion,
    handleSave,
  } = useCollection();

  const isHiddenForSingleFlashcard = collection.flashcards.length > 1;

  return (
    <View style={styles.wrapper}>
      <ScrollViewContainer>
        <Typography variant="h2">Create a collection</Typography>
        <Typography variant="description">
          Start creating your flashcards. Add questions, write clear answers,
          and group them into collections.
        </Typography>

        <Typography variant="description">Name</Typography>
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
          <Button onPress={async () => await handleSave()}>Save</Button>
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
    backgroundColor: Colors.light.backgroundColor,
    height: 100,
  },
});
