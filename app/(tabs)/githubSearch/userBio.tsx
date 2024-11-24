import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function UserBio() {
  const router = useRouter();
  const { bio } = useLocalSearchParams();

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <FontAwesome name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Bio do usuário</Text>
        </View>
        <View style={styles.card}>
          {bio ? (
            <Text style={styles.userBio}>{bio}</Text>
          ) : (
            <Text style={styles.bioNotFound}>O usuário não possui bio</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "white",
  },

  container: {
    padding: 20,
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 12,
  },

  card: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#EBEBEB",
    maxHeight: "90%",
    padding: 20,
  },

  userBio: {
    fontSize: 20,
    textAlign: "justify",
  },

  bioNotFound: {
    fontSize: 20,
    textAlign: "center",
  },
});
