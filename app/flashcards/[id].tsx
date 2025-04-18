import { Button } from "@/components/Button";
import { ScrollViewContainer } from "@/components/ScrollViewContainer";
import { useGetStorage } from "@/hooks/useGetStorage";
import { ICollection } from "@/types/app.types";
import { findById } from "@/utils/find-by-id";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Flashcards() {
  const { id } = useLocalSearchParams();
  const { data } = useGetStorage<Array<ICollection>>({ key: "collections" });

  const [isShowAnswer, setShowAnswer] = useState(false);
  const [active, setActive] = useState(0);

  const collection: ICollection = findById({ data, id });

  const handleNext = () => {
    setShowAnswer(false);
    setActive((prevState) => prevState + 1);
  };

  const handleBack = () => {
    setShowAnswer(false);
    setActive((prevState) => prevState - 1);
  };

  const handleToogleShowAnswer = () => setShowAnswer((prevState) => !prevState);

  if (!collection) return <Text>Loading</Text>;

  const currentFlashcard = collection.flashcards[active];

  const defineCardStyle = isShowAnswer
    ? [styles.card, styles.openCard]
    : [styles.card];

  return (
    <View style={styles.wrapper}>
      <ScrollViewContainer>
        <Text style={[styles.title, styles.mainTitle]}>{collection.name}</Text>
        <View style={defineCardStyle}>
          <Text style={styles.title}>{currentFlashcard?.question}</Text>
          {isShowAnswer && (
            <Text style={styles.description}>{currentFlashcard?.answer}</Text>
          )}
        </View>
        <Button
          variant="outlined"
          style={{ marginTop: 50 }}
          onPress={handleToogleShowAnswer}
        >
          {isShowAnswer ? "Hidden answer" : "Show answer"}
        </Button>
      </ScrollViewContainer>

      <View style={styles.fixedButtonContainer}>
        <Button variant="outlined" onPress={handleBack} disabled={active === 0}>
          Back
        </Button>
        <Button
          onPress={handleNext}
          disabled={collection.flashcards.length === active + 1}
        >
          Next
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "relative",
  },

  mainTitle: {
    marginBottom: 15,
  },

  // Card
  card: {
    backgroundColor: "#FFE7CF",
    padding: 25,
    height: 200,
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 10,
  },

  openCard: {
    height: 350,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  description: {
    fontSize: 16,
  },

  ///

  fixedButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 24,
    right: 24,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
