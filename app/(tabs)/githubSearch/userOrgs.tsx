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

export default function UserOrgs() {
  const router = useRouter();
  const { orgsUrl } = useLocalSearchParams();
  const [orgs, setOrgs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orgsUrl) {
      fetch(`${orgsUrl}`)
        .then((response) => response.json())
        .then((data) => {
          setOrgs(data);
        })
        .catch((error) => {
          setError(`Erro ao buscar organizações. ${error.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [orgsUrl]);

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
          <Text style={styles.title}>Organizações do usuário</Text>
        </View>
        <View style={styles.card}>
          {loading ? (
            <Text style={styles.loadingText}>Carregando organizações...</Text>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : orgs.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* {orgs.map((org) => (
                <View key={org.id} style={styles.orgItem}>
                  <Text style={styles.orgName}>{org.login}</Text>
                </View>
              ))} */}
            </ScrollView>
          ) : (
            <Text style={styles.orgsNotFound}>
              O usuário não possui organizações
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
  },

  orgsNotFound: {
    fontSize: 20,
    textAlign: "center",
  },
});
