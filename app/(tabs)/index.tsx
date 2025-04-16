import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const breakLine = "\n";

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require("@/assets/images/background-get-started.png")}
      />

      <Text style={styles.title}>
        Review {breakLine}remember and {breakLine}repeat
      </Text>
      <Text style={styles.description}>
        Your daily companion to smarter,{breakLine} faster learning.
      </Text>
      <View style={styles.action}>
        <Link href="/collections" style={styles.button}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Get started</Text>
        </Link>
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
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 45,
  },
  description: {
    textAlign: "center",
    color: "#A1A1A1",
    fontSize: 13,
    marginTop: 15,
  },
  button: {
    width: 174,
    padding: 15,
    textAlign: "center",
    backgroundColor: "#7C87FF",
    borderRadius: 9,
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
