import { FontAwesome } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";

type Props = {
  iconName: keyof typeof FontAwesome.glyphMap;
  title: string;
  description: string;
  last?: boolean;
  userData: {
    avatar: string;
    bio: string;
    login: string;
    name: string;
    organizations: Array<any>;
    repositories: Array<any>;
    followers: Array<any>;
    location: string;
  };
  isReseted: boolean;
  setIsReseted: (value: boolean) => void;
};

export function ExpandableInfoSection({
  iconName,
  title,
  description,
  last,
  userData,
  isReseted,
  setIsReseted,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const toggleExpansion = () => {
    if (!userData?.name) {
      showToast("Por favor, primeiro realize a busca pelo usuário.");
      return;
    }

    Animated.timing(animatedOpacity, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsExpanded((prev) => !prev);
  };

  const getContent = () => {
    switch (title) {
      case "Bio":
        return userData.bio || "Nenhuma bio disponível.";
      case "Orgs":
        return userData.organizations.length > 0
          ? userData.organizations.map((org) => org.login).join(", ")
          : "Nenhuma organização disponível.";
      case "Repositórios":
        return userData.repositories.length > 0
          ? userData.repositories.map((repo) => repo.name).join(", ")
          : "Nenhum repositório disponível.";
      case "Seguidores":
        return userData.followers.length > 0
          ? userData.followers.map((follower) => follower.login).join(", ")
          : "Nenhum seguidor disponível.";
      case "Localização":
        return userData.location || "Localização não especificada.";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (isReseted) {
      setIsExpanded(false);

      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();

      setIsReseted(false);
    }
  }, [isReseted]);

  function showToast(message: string) {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      console.warn(message); // Pode ser substituído por uma biblioteca de toast para iOS, como `react-native-root-toast`
    }
  }

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
        <TouchableOpacity onPress={toggleExpansion}>
          <FontAwesome
            name={isExpanded ? "arrow-down" : "arrow-right"}
            size={16}
          />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[styles.expandedContent, { opacity: animatedOpacity }]}
      >
        {isExpanded && (
          <Text style={{ alignSelf: "center", marginTop: 5 }}>
            {getContent()}
          </Text>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderColor: "#EBEBEB",
    padding: 20,
    paddingBottom: 10,
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

  expandedContent: {
    overflow: "hidden",
    marginTop: 10,
  },
});
