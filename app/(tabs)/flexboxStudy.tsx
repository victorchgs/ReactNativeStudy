import { StyleSheet, Text, View } from "react-native";

export default function FlexboxStudy() {
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
    backgroundColor: "#5271ff",
  },

  color2: {
    backgroundColor: "#38b6ff",
  },

  color3: {
    backgroundColor: "#8f6be5",
  },

  color4: {
    backgroundColor: "#612cc5",
  },

  color5: {
    backgroundColor: "#38b6ff",
  },

  color6: {
    backgroundColor: "#93c7ff",
  },

  view: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
  },

  container: {
    width: "80%",
    height: "20%",
    maxWidth: 400,
    maxHeight: 800,
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "#443f3f",
  },

  flex: {
    height: "50%",
    flexDirection: "row",
  },

  block1: {
    flex: 2.5,
  },

  block2: {
    flex: 1,
  },

  block3: {
    flex: 1,
  },

  block4: {
    flex: 1,
  },

  block5: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2.5,
  },

  block6: {
    flex: 1,
  },

  border: {
    borderWidth: 4,
    borderStyle: "solid",
    borderColor: "#443f3f",
  },

  word: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 10,
  },
});
