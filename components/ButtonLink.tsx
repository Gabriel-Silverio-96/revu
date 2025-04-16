import { Href, Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

interface IButtonLink {
  href: Href;
  children: React.ReactNode;
}

export function ButtonLink({ href, children }: IButtonLink) {
  return (
    <Link href={href} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: "#7C87FF",
    borderRadius: 9,
    alignItems: "center",
    textAlign: "center",
  },

  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
