import { ButtonLink } from "@/components/ButtonLink";
import { LinkFlashcard } from "@/components/LinkFlashcard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface IFlashcards {
  id: string;
  question: string;
  answer: string;
}

interface ICollections {
  id: string;
  name: string;
  flashcards: Array<IFlashcards>;
}

export default function Collections() {
  const [collections, setCollections] = useState<Array<ICollections>>([]);

  const isShowMessageEmptyCollection = collections?.length === 0;
  const breakLine = "\n";

  useFocusEffect(
    useCallback(() => {
      const loadCollections = async () => {
        try {
          const storedCollections = await AsyncStorage.getItem("collections");

          if (storedCollections !== null) {
            const parsedCollections: Array<ICollections> =
              JSON.parse(storedCollections);

            setCollections(parsedCollections);
            return;
          }

          setCollections([]);
        } catch (error) {
          console.error("Failed to load collections:", error);
        }
      };

      loadCollections();
    }, [])
  );
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Collections</Text>
        <Text style={styles.description}>
          Start building your knowledge library. Add a question, write the
          answer, and organize your flashcards by topic. The more you create,
          the more you'll retain!
        </Text>

        {isShowMessageEmptyCollection && (
          <View>
            <Image
              style={styles.backgroundImage}
              source={require("@/assets/images/empty-collection.png")}
            />
            <Text style={[styles.description, styles.textCenter]}>
              Looks like your collection is empty.{breakLine}Start by creating
              your first one!
            </Text>
          </View>
        )}

        {collections?.map(({ id, name }) => (
          <LinkFlashcard key={id} id={id}>
            {name}
          </LinkFlashcard>
        ))}
      </ScrollView>

      <View style={styles.buttonBackground}>
        <View style={styles.fixedButtonContainer}>
          <ButtonLink href="/create-collection">Create</ButtonLink>
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
  container: {
    paddingTop: 50,
    paddingBottom: 100,
    paddingHorizontal: 24,
  },
  textCenter: {
    textAlign: "center",
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
  backgroundImage: {
    height: 346,
    width: 346,
    alignSelf: "center",
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
