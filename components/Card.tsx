import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";

interface ICard {
  open: boolean;
  title: string;
  describe: string;
}

export function Card({ open, title, describe }: ICard) {
  const defineCardStyle = open ? [styles.card, styles.open] : [styles.card];

  return (
    <View style={defineCardStyle}>
      <Text style={styles.title}>{title}?</Text>
      {open && <Text style={styles.description}>{describe}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.common.orange,
    padding: 25,
    height: 200,
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 10,
  },

  open: {
    height: 350,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  description: {
    fontSize: 16,
  },
});
