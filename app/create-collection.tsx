import { Button } from "@/components/Button";
import { FormCreateFlashcard } from "@/components/FormCreateFlashcard";
import { ScrollViewContainer } from "@/components/ScrollViewContainer";
import { TextInput } from "@/components/TextInput";
import { useCollection } from "@/hooks/useCollection";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
        <Text style={styles.title}>Create a flashcards</Text>
        <Text style={styles.description}>
          Start creating your flashcards. Add questions, write clear answers,
          and group them into collections.
        </Text>

        <Text style={styles.description}>Name of collection</Text>
        <TextInput
          style={{ marginBottom: 15 }}
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
