import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

import { TextInput } from "@/components/TextInput";
import { Colors } from "@/constants/Colors";
import { HandleChangeValue, IFlashcard } from "@/types/app.types";

interface IFormCreateFlashcard {
  handleDeleteQuestion: (id: string) => void;
  handleChangeValue: (params: HandleChangeValue) => void;
  hiddenDelete: boolean;
  flashcards: Array<IFlashcard>;
}

export function FormFlashcard({
  handleDeleteQuestion,
  handleChangeValue,
  hiddenDelete,
  flashcards,
}: IFormCreateFlashcard) {
  return (
    <>
      {flashcards.map(({ id, question, answer }) => {
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
    color: Colors.light.text,
    fontSize: 13,
    marginTop: 15,
  },

  delete: {
    color: Colors.common.red,
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
