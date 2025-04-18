import { Href, Link, LinkProps } from "expo-router";
import { StyleSheet, Text } from "react-native";

interface IButtonLink extends LinkProps {
  href: Href;
  children: React.ReactNode;
}

export function ButtonLink({ href, children, style, ...rest }: IButtonLink) {
  return (
    <Link href={href} style={[styles.button, style]} {...rest}>
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
