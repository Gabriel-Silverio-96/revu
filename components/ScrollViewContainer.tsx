import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";

interface IScrollViewContainer extends ScrollViewProps {
  children: React.ReactNode;
  paddingTop?: number;
}

export function ScrollViewContainer({
  children,
  paddingTop = 10,
  ...rest
}: IScrollViewContainer) {
  const paddingTopStyle = { paddingTop };

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
