import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
} from "react-native";

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
    backgroundColor: "#7C87FF",
  },

  outlined: {
    backgroundColor: "transparent",
    borderColor: "#7C87FF",
    borderWidth: 2,
  },

  textContained: {
    color: "#FFF",
  },

  textOutlined: {
    color: "#7C87FF",
  },

  text: {
    fontWeight: "bold",
  },

  disabled: {
    opacity: 0.3,
  },
});
