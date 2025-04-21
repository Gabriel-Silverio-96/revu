import {
  StyleSheet,
  Text,
  TouchableHighlight,
  type TouchableHighlightProps,
} from "react-native";

import { Colors } from "@/constants/Colors";

interface IButton extends TouchableHighlightProps {
  variant?: "contained" | "outlined";
}

export function Button({
  style,
  children,
  variant = "contained",
  disabled,
  ...rest
}: IButton) {
  const colorText =
    variant === "contained" ? styles.textContained : styles.textOutlined;
  const colorDisabled = disabled ? styles.disabled : "";

  return (
    <TouchableHighlight
      style={[styles.button, styles[variant], colorDisabled, style]}
      disabled={disabled}
      {...rest}
    >
      <Text style={[styles.text, colorText]}>{children}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 9,
    alignItems: "center",
    textAlign: "center",
  },

  contained: {
    backgroundColor: Colors.light.primary,
  },

  outlined: {
    backgroundColor: "transparent",
    borderColor: Colors.light.primary,
    borderWidth: 2,
  },

  textContained: {
    color: Colors.common.white,
  },

  textOutlined: {
    color: Colors.light.primary,
  },

  text: {
    fontWeight: "bold",
  },

  disabled: {
    opacity: 0.3,
  },
});
