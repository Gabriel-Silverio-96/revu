import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

interface ILinkFlashcard {
  id: string | number;
  children: React.ReactNode;
  icon?: React.ReactElement;
}

const initialIcon = (
  <Ionicons name="create-outline" size={20} color="#A1A1A1" />
);

export function LinkFlashcard({
  id,
  children,
  icon = initialIcon,
}: ILinkFlashcard) {
  const href = `/collection`; // flashcards?id=1

  return (
    <View style={styles.linkFlashcard}>
      <Link href={href} style={styles.link}>
        {children}
      </Link>
      {icon}
    </View>
  );
}

const styles = StyleSheet.create({
  linkFlashcard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 16,
  },

  link: {
    fontSize: 14,
    color: "#7C87FF",
  },
});
