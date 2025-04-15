import { TextInput } from "@/components/TextInput";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface HandleChangeValue {
  id: string;
  field: keyof Flashcard;
  value: string;
}

interface IFormCreateFlashcard {
  handleDeleteQuestion: (id: string) => void;
  handleChangeValue: (params: HandleChangeValue) => void;
  hiddenDelete: boolean;
  flashcards: Array<Flashcard>;
}

export function FormCreateFlashcard({
  handleDeleteQuestion,
  handleChangeValue,
  hiddenDelete,
  flashcards,
}: IFormCreateFlashcard) {
  return (
    <>
      {flashcards.map(({ id, question, answer }: any) => {
        return (
          <View key={id}>
            <View style={styles.action}>
              <Text style={styles.description}>Question</Text>

              {hiddenDelete && (
                <TouchableHighlight onPress={() => handleDeleteQuestion(id)}>
                  <Text style={styles.delete}>Delete</Text>
                </TouchableHighlight>
              )}
            </View>

            <TextInput
              value={question}
              onChangeText={(text) =>
                handleChangeValue({ id, field: "question", value: text })
              }
            />

            <Text style={styles.description}>Answer</Text>
            <TextInput
              multiline
              value={answer}
              onChangeText={(text) =>
                handleChangeValue({ id, field: "answer", value: text })
              }
            />
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  description: {
    color: "#A1A1A1",
    fontSize: 13,
    marginTop: 15,
  },
  delete: {
    color: "#FF7C7C",
    fontSize: 13,
    marginTop: 15,
  },
  action: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
