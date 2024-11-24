import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

type Repo = {
  id: number;
  name: string;
  description: string | null;
};

export default function UserRepos() {
  const router = useRouter();
  const { reposUrl } = useLocalSearchParams();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (reposUrl) {
      fetch(`${reposUrl}`)
        .then((response) => response.json())
        .then((data) => {
          setRepos(data);
        })
        .catch((error) => {
          setError(`Erro ao buscar repositórios. ${error.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [reposUrl]);

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
          <Text style={styles.title}>Repositórios do usuário</Text>
        </View>
        <View style={styles.card}>
          {loading ? (
            <Text style={styles.loadingText}>Carregando repositórios...</Text>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : repos.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {repos.map((repo) => (
                <View key={repo.id} style={styles.repoItem}>
                  <Text style={styles.repoName}>{repo.name}</Text>
                  {repo.description ? (
                    <Text style={styles.repoDescription}>
                      {repo.description}
                    </Text>
                  ) : (
                    <Text style={styles.repoDescription}>
                      Descrição indisponível
                    </Text>
                  )}
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.reposNotFound}>
              O usuário não possui repositórios
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

  reposNotFound: {
    fontSize: 20,
    textAlign: "center",
  },

  repoItem: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#EBEBEB",
    padding: 16,
    marginVertical: 6,
  },

  repoName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  repoDescription: {
    fontSize: 14,
    color: "gray",
  },
});
