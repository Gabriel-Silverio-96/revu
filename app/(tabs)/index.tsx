import { Image, StyleSheet, View } from "react-native";

import { ButtonLink } from "@/components/ButtonLink";
import { ScrollViewContainer } from "@/components/ScrollViewContainer";
import { Typography } from "@/components/Typography";
import { App } from "@/constants/App";

export default function HomeScreen() {
  return (
    <ScrollViewContainer>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            style={styles.logo}
            source={require("@/assets/images/revu-logo.png")}
          />
        </View>
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
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 70,
  },
  backgroundImage: {
    height: 346,
    width: 346,
  },
  title: {
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
