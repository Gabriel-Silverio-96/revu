import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";

interface IScrollViewContainer extends ScrollViewProps {
  children: React.ReactNode;
  paddingTop?: 0 | 1 | 2 | 3 | 4 | 5;
}

const paddingTopStyles = {
  0: { paddingTop: 0 },
  1: { paddingTop: 10 },
  2: { paddingTop: 20 },
  3: { paddingTop: 30 },
  4: { paddingTop: 40 },
  5: { paddingTop: 50 },
} as const;

export function ScrollViewContainer({
  children,
  paddingTop = 1,
  ...rest
}: IScrollViewContainer) {
  const paddingTopStyle = paddingTopStyles[paddingTop];

  return (
    <ScrollView
      scrollEventThrottle={16}
      decelerationRate="fast" // or 'normal', try also 0 if needed
      overScrollMode="never" // removes glow effect on Android
      bounces={false} // iOS only
      contentContainerStyle={[styles.container, paddingTopStyle]}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    paddingHorizontal: 24,
  },
});
