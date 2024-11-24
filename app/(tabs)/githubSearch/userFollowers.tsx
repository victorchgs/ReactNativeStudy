import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

type Follower = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export default function UserFollowers() {
  const router = useRouter();
  const { followersUrl } = useLocalSearchParams();
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (followersUrl) {
      fetch(`${followersUrl}`)
        .then((response) => response.json())
        .then((data) => {
          setFollowers(data);
        })
        .catch((error) => {
          setError(`Erro ao buscar seguidores. ${error.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [followersUrl]);

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
          <Text style={styles.title}>Seguidores</Text>
        </View>
        <View style={styles.card}>
          {loading ? (
            <Text style={styles.loadingText}>Carregando seguidores...</Text>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : followers.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {followers.map((follower) => (
                <View key={follower.id} style={styles.followerItem}>
                  <Image
                    source={{ uri: follower.avatar_url }}
                    style={styles.avatar}
                  />
                  <View style={styles.followerInfo}>
                    <Text style={styles.followerName}>@{follower.login}</Text>
                    <Text style={styles.profileLink}>{follower.html_url}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.followersNotFound}>
              O usuário não possui seguidores
            </Text>
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

  loadingText: {
    fontSize: 20,
    textAlign: "center",
  },

  errorText: {
    fontSize: 20,
    textAlign: "center",
    color: "red",
  },

  followersNotFound: {
    fontSize: 20,
    textAlign: "center",
  },

  followerItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#EBEBEB",
    padding: 16,
    marginVertical: 6,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },

  followerInfo: {
    flex: 1,
  },

  followerName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  profileLink: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },
});
