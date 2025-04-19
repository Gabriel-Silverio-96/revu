import { Colors } from "@/constants/Colors";
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
  <Ionicons name="create-outline" size={20} color={Colors.light.text} />
);

export function LinkFlashcard({
  id,
  children,
  icon = initialIcon,
}: ILinkFlashcard) {
  return (
    <View style={styles.linkFlashcard}>
      <Link
        href={{ pathname: "/flashcards/[id]", params: { id } }}
        style={styles.link}
      >
        {children}
      </Link>

      <Link
        href={{ pathname: "/edit-collection/[id]", params: { id } }}
        style={styles.link}
      >
        {icon}
      </Link>
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
    color: Colors.light.primary,
  },
});
