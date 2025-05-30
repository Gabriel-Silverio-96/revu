import {
  StyleSheet,
  type TextInputProps,
  TextInput as TextInputReactNative,
} from "react-native";

import { Colors } from "@/constants/Colors";

export function TextInput({ style, multiline, ...rest }: TextInputProps) {
  const stylesMultiline = multiline && styles.mutiline;

  return (
    <TextInputReactNative
      multiline={multiline}
      style={[styles.input, stylesMultiline, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: Colors.light.text,
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 5,
    padding: 10,
  },

  mutiline: {
    height: 150,
    textAlignVertical: "top",
  },
});
