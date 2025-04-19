import { ButtonLink } from "@/components/ButtonLink";
import { LinkFlashcard } from "@/components/LinkFlashcard";
import { ScrollViewContainer } from "@/components/ScrollViewContainer";
import { Typography } from "@/components/Typography";
import { App } from "@/constants/App";
import { Colors } from "@/constants/Colors";
import { useGetStorage } from "@/hooks/useGetStorage";
import { ICollection } from "@/types/app.types";
import { Image, StyleSheet, View } from "react-native";

export default function Collections() {
  const { data } = useGetStorage<Array<ICollection>>({
    key: App.keyStorage.collections,
  });

  const isShowMessageEmptyCollection = data === null || data?.length === 0;

  return (
    <View style={styles.wrapper}>
      <ScrollViewContainer paddingTop={50}>
        <Typography variant="h2">Collections</Typography>
        <Typography variant="description">
          Start building your knowledge library. Add a question, write the
          answer, and organize your flashcards by topic. The more you create,
          the more you'll retain!
        </Typography>

        {isShowMessageEmptyCollection && (
          <View>
            <Image
              style={styles.backgroundImage}
              source={require("@/assets/images/empty-collection.png")}
            />
            <Typography variant="description" style={styles.textCenter}>
              Looks like your collection is empty.{App.breakLine}Start by
              creating your first one!
            </Typography>
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
    backgroundColor: Colors.light.backgroundColor,
    height: 100,
  },
});
