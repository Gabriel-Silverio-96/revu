import {
  StyleSheet,
  TextInputProps,
  TextInput as TextInputReactNative,
} from "react-native";

export function TextInput({ style, multiline, ...rest }: TextInputProps) {
  const stylesMultiline = multiline && styles.mutiline;

  return (
    <TextInputReactNative
      style={[styles.input, stylesMultiline, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#A1A1A1",
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
