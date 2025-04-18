import { Button } from "@/components/Button";
import { FormCreateFlashcard } from "@/components/FormCreateFlashcard";
import { ScrollViewContainer } from "@/components/ScrollViewContainer";
import { TextInput } from "@/components/TextInput";
import { Typography } from "@/components/Typography";
import { useCollection } from "@/hooks/useCollection";
import { StyleSheet, View } from "react-native";

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
        <Typography variant="h2">Create a flashcards</Typography>
        <Typography variant="description">
          Start creating your flashcards. Add questions, write clear answers,
          and group them into collections.
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
