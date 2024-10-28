import { Href, router } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.view}>
      <Button
        title="Começar"
        onPress={() => {
          router.push("/(tabs)/flexboxStudy" as Href);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
  },
});
