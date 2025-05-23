import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, type TextProps } from "react-native";

interface ITypography extends TextProps {
  children: React.ReactNode;
  variant: "h1" | "h2" | "description";
}

export function Typography({ children, variant, style, ...rest }: ITypography) {
  const variantStyle = styles[variant];

  return (
    <Text style={[variantStyle, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    fontWeight: "bold",
  },

  h2: {
    fontSize: 24,
    fontWeight: "bold",
  },

  description: {
    color: Colors.light.text,
    fontSize: 13,
    marginTop: 15,
  },
});
