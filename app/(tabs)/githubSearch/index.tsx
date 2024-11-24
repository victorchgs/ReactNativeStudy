import { UserInfoSection } from "@/components/UserInfoSection";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export default function GithubSearch() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [bio, setBio] = useState("");
  const [orgsUrl, setOrgsUrl] = useState("");
  const [reposUrl, setReposUrl] = useState("");
  const [followersUrl, setFollowersUrl] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Not Found") {
          setError("Usuário não encontrado, tente novamente.");
        } else {
          setAvatar(data.avatar_url);
          setName(data.name);
          setLogin(data.login);
          setBio(data.bio);
          setOrgsUrl(data.organizations_url);
          setReposUrl(data.repos_url);
          setFollowersUrl(data.followers_url);

          setShowModal(false);
          setUsername("");
          setError("");
        }
      })
      .catch(() => {
        setError("Erro ao buscar usuário. Tente novamente.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const showToast = (message: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      console.warn(message); // Pode ser substituído por uma biblioteca de toast para iOS, como `react-native-root-toast`
    }
  };

  const handleNavigation = (sectionTitle: string) => {
    if (login) {
      switch (sectionTitle) {
        case "Bio":
          router.push({ pathname: "./githubSearch/userBio", params: { bio } });
          break;

        case "Orgs":
          router.push({
            pathname: "./githubSearch/userOrgs",
            params: { orgsUrl },
          });
          break;

        case "Repositórios":
          router.push({
            pathname: "./githubSearch/userRepos",
            params: { reposUrl },
          });
          break;

        case "Seguidores":
          router.push({
            pathname: "./githubSearch/userFollowers",
            params: { followersUrl },
          });
          break;

        default:
          showToast("Rota não encontrada.");
          break;
      }
    } else {
      showToast("Por favor, primeiro realize a busca pelo usuário.");
    }
  };

  const handleReset = () => {
    setUsername("");
    setAvatar("");
    setName("");
    setLogin("");
    setBio("");
    setOrgsUrl("");
    setReposUrl("");
    setFollowersUrl("");
  };

  return (
    <View style={styles.view}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
          setUsername("");
          setError("");
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View style={styles.closeModalView}>
              <Text style={styles.modalLabel}>
                Insira o nome de usuário do GitHub
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  setUsername("");
                  setError("");
                }}
              >
                <FontAwesome name="close" color="black" size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.searchView}>
              <TextInput
                style={styles.modalInput}
                value={username}
                onChangeText={setUsername}
                placeholder="Nome de usuário"
              />
              {loading ? (
                <FontAwesome name="ellipsis-h" color="black" size={24} />
              ) : (
                <TouchableOpacity onPress={handleSearch}>
                  <FontAwesome name="search" color="black" size={20} />
                </TouchableOpacity>
              )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <View>
            <Image
              source={
                login
                  ? { uri: avatar }
                  : require("@/assets/images/profile-placeholder.png")
              }
              style={styles.avatarImage}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                setShowModal(true);
              }}
            >
              <FontAwesome name="search" color="white" size={24} />
            </TouchableOpacity>
          </View>
          {login ? (
            name ? (
              <Text style={styles.userName}>{name}</Text>
            ) : (
              <Text style={styles.userName}>Nome indisponível</Text>
            )
          ) : (
            <Text style={styles.usernamePlaceholder}>
              Faça a busca pelo usuário
            </Text>
          )}
          {login && <Text style={styles.userLogin}>{`@${login}`}</Text>}
        </View>
        <View style={styles.userInfoView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <UserInfoSection
              iconName="user-o"
              title="Bio"
              description="Um pouco sobre o usuário"
              onNavigation={handleNavigation}
            />
            <UserInfoSection
              iconName="globe"
              title="Orgs"
              description="Organizações que o usuário faz parte"
              onNavigation={handleNavigation}
            />
            <UserInfoSection
              iconName="book"
              title="Repositórios"
              description="Lista contendo todos os repositórios"
              onNavigation={handleNavigation}
            />
            <UserInfoSection
              iconName="star-o"
              title="Seguidores"
              description="Lista de seguidores"
              onNavigation={handleNavigation}
              last
            />
          </ScrollView>
        </View>
        <View style={styles.resetView}>
          <TouchableOpacity onPress={handleReset}>
            <View style={styles.resetButton}>
              <FontAwesome name="sign-out" size={20} />
              <Text style={{ fontSize: 20 }}>Resetar</Text>
            </View>
          </TouchableOpacity>
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    width: "85%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 7,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  closeModalView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  modalLabel: { fontSize: 16, marginLeft: 14 },

  searchView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 12,
    width: "100%",
  },

  modalInput: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 16,
  },

  errorText: {
    color: "red",
    marginLeft: 16,
    fontSize: 14,
    alignSelf: "flex-start",
  },

  container: {
    flex: 1,
    backgroundColor: "#F7F8FC",
    alignItems: "center",
    justifyContent: "space-between",
    borderStyle: "solid",
    borderWidth: 8,
    borderColor: "#ECEFFD",
  },

  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 60,
  },

  searchButton: {
    position: "absolute",
    bottom: 5,
    right: -10,
    padding: 12,
    backgroundColor: "black",
    borderRadius: 15,
  },

  usernamePlaceholder: {
    fontSize: 20,
    color: "#8B8C90",
    marginTop: 35,
    marginBottom: 10,
  },

  userName: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },

  userLogin: { fontSize: 20, color: "#8B8C90" },

  userInfoView: {
    maxHeight: "48%",
    width: "90%",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    backgroundColor: "white",
  },

  resetView: {
    height: "15%",
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
  },

  resetButton: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
  },
});
