import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Typography } from "@/components/Typography";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Typography variant="h1">This screen doesn't exist.</Typography>
        <Link href="/collections" style={styles.link}>
          <Typography variant="description">Go to home screen!</Typography>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
