import { StyleSheet, Text, View } from "react-native";

export default function FlexboxChallenge() {
  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.flex}>
          <View style={[styles.block1, styles.border, styles.color1]} />
          <View style={[styles.block2, styles.border, styles.color2]} />
          <View style={[styles.block3, styles.border, styles.color3]} />
        </View>
        <View style={styles.flex}>
          <View style={[styles.block4, styles.border, styles.color4]} />
          <View style={[styles.block5, styles.border, styles.color5]}>
            <Text style={styles.word}>FLEXBOX</Text>
          </View>
          <View style={[styles.block6, styles.border, styles.color6]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  color1: {
    backgroundColor: "#8f6be5",
  },

  color2: {
    backgroundColor: "#38b6ff",
  },

  color3: {
    backgroundColor: "#5271ff",
  },

  color4: {
    backgroundColor: "#93c7ff",
  },

  color5: {
    backgroundColor: "#38b6ff",
  },

  color6: {
    backgroundColor: "#612cc5",
  },

  view: {
    backgroundColor: "white",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    height: "100%",
    width: "100%",
    maxWidth: 800,
    maxHeight: 900,
    flexDirection: "row",
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "#443f3f",
  },

  flex: {
    height: "100%",
    width: "50%",
    flexDirection: "column",
  },

  block1: {
    flex: 1,
  },

  block2: {
    flex: 1,
  },

  block3: {
    flex: 2.5,
  },

  block4: {
    flex: 1,
  },

  block5: {
    flex: 3.3,
    justifyContent: "center",
    alignItems: "center",
  },

  block6: {
    flex: 0.2,
  },

  border: {
    borderWidth: 4,
    borderStyle: "solid",
    borderColor: "#443f3f",
  },

  word: {
    transform: [{ rotate: "-90deg" }],
    width: 500,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 80,
    fontWeight: "bold",
    letterSpacing: 30,
  },
});
