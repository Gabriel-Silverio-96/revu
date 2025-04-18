import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ScrollViewContainer } from "@/components/ScrollViewContainer";
import { Typography } from "@/components/Typography";
import { App } from "@/constants/App";
import { useGetStorage } from "@/hooks/useGetStorage";
import { ICollection } from "@/types/app.types";
import { findById } from "@/utils/find-by-id";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Flashcards() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { data } = useGetStorage<Array<ICollection>>({
    key: App.keyStorage.collections,
  });

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Flashcard" });
  }, []);

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

  return (
    <View style={styles.wrapper}>
      <ScrollViewContainer>
        <Typography variant="h2" style={styles.title}>
          {collection.name}
        </Typography>

        <Card
          open={isShowAnswer}
          title={currentFlashcard?.question}
          describe={currentFlashcard?.answer}
        />

        <Button
          variant="outlined"
          style={{ marginTop: 50 }}
          onPress={handleToogleShowAnswer}
        >
          {isShowAnswer ? "Hidden answer" : "Show answer"}
        </Button>
      </ScrollViewContainer>

      <View style={styles.fixedButtonContainer}>
        <Button
          variant="outlined"
          onPress={handleBack}
          disabled={active === 0}
          style={styles.button}
        >
          Back
        </Button>
        <Button
          onPress={handleNext}
          disabled={collection.flashcards.length === active + 1}
          style={styles.button}
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

  title: {
    marginBottom: 15,
  },

  button: {
    width: 100,
  },

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
