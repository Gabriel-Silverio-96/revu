import { ButtonLink } from "@/components/ButtonLink";
import { Typography } from "@/components/Typography";
import { App } from "@/constants/App";
import { Image, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require("@/assets/images/background-get-started.png")}
      />

      <Typography variant="h1" style={styles.title}>
        Review {App.breakLine}remember and {App.breakLine}repeat
      </Typography>
      <Typography variant="description" style={styles.description}>
        Your daily companion to smarter,{App.breakLine} faster learning.
      </Typography>
      <View style={styles.action}>
        <ButtonLink href="/collections" style={styles.button}>
          Get started
        </ButtonLink>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  backgroundImage: {
    height: 346,
    width: 346,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 45,
  },
  description: {
    textAlign: "center",
  },
  button: {
    width: 174,
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
