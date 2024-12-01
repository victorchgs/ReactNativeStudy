import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  iconName: keyof typeof FontAwesome.glyphMap;
  title: string;
  description: string;
  onNavigation: (info: string) => void;
  last?: boolean;
};

export function UserInfoSection({
  iconName,
  title,
  description,
  onNavigation,
  last,
}: Props) {
  return (
    <View style={[styles.container, { borderBottomWidth: !last ? 1 : 0 }]}>
      <View style={styles.sectionContent}>
        <View style={styles.sectionIcon}>
          <FontAwesome name={iconName} size={20} />
        </View>
        <View style={{ width: "70%" }}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text>{description}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onNavigation(title);
          }}
        >
          <FontAwesome name={"arrow-right"} size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderColor: "#EBEBEB",
    padding: 20,
  },

  sectionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  sectionIcon: {
    borderWidth: 1,
    borderColor: "#EBEBEB",
    padding: 10,
    borderRadius: 10,
  },

  sectionTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
