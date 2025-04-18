import { App } from "@/constants/App";
import { ButtonLink } from "@/components/ButtonLink";
import { LinkFlashcard } from "@/components/LinkFlashcard";
import { ScrollViewContainer } from "@/components/ScrollViewContainer";
import { useGetStorage } from "@/hooks/useGetStorage";
import { Image, StyleSheet, Text, View } from "react-native";

interface IFlashcards {
  id: string;
  question: string;
  answer: string;
}

interface ICollection {
  id: string;
  name: string;
  flashcards: Array<IFlashcards>;
}

export default function Collections() {
  const { data } = useGetStorage<Array<ICollection>>({ key: "collections" });

  const isShowMessageEmptyCollection = data === null;

  return (
    <View style={styles.wrapper}>
      <ScrollViewContainer paddingTop={5}>
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
              Looks like your collection is empty.{App.breakLine}Start by
              creating your first one!
            </Text>
          </View>
        )}

        {data?.map(({ id, name }) => (
          <LinkFlashcard key={id} id={id}>
            {name}
          </LinkFlashcard>
        ))}
      </ScrollViewContainer>

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
