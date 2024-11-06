import { ExpandableInfoSection } from "@/components/ExpandableInfoSection";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function GithubSearch() {
  const [error, setError] = useState("");
  const [isReseted, setIsReseted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");

  const [userData, setUserData] = useState({
    avatar: "",
    bio: "",
    login: "",
    name: "",
    organizations: [],
    repositories: [],
    followers: [],
    location: "",
  });

  const handleReset = () => {
    setUserData({
      avatar: "",
      bio: "",
      login: "",
      name: "",
      organizations: [],
      repositories: [],
      followers: [],
      location: "",
    });
    setIsReseted(true);
  };

  const handleSearch = () => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Not Found") {
          setError("Usuário não encontrado, tente novamente.");
        } else {
          setUserData({
            avatar: data.avatar_url,
            bio: data.bio,
            login: data.login,
            name: data.name,
            organizations: [],
            repositories: [],
            followers: [],
            location: data.location,
          });

          fetch(data.organizations_url)
            .then((res) => res.json())
            .then((orgs) => {
              setUserData((prevData) => ({
                ...prevData,
                organizations: orgs,
              }));
            });

          fetch(data.repos_url)
            .then((res) => res.json())
            .then((repos) => {
              setUserData((prevData) => ({
                ...prevData,
                repositories: repos,
              }));
            });

          fetch(data.followers_url)
            .then((res) => res.json())
            .then((followersData) => {
              setUserData((prevData) => ({
                ...prevData,
                followers: followersData,
              }));
            });

          setShowModal(false);
          setError("");
          setUsername("");
        }
      })
      .catch(() => {
        setError("Erro ao buscar usuário. Tente novamente.");
      });
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
            <View style={{ width: "100%" }}>
              <Text style={styles.inputLabel}>
                Insira o nome de usuário do GitHub
              </Text>
            </View>
            <View style={styles.searchView}>
              <TextInput
                style={styles.modalInput}
                value={username}
                onChangeText={setUsername}
                placeholder="Nome de usuário"
              />
              <TouchableOpacity onPress={handleSearch}>
                <FontAwesome name="search" color="black" size={20} />
              </TouchableOpacity>
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
                userData?.avatar
                  ? { uri: userData?.avatar }
                  : require("../../assets/images/profile-placeholder.png")
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
          {userData?.name ? (
            <Text style={styles.userName}>{userData?.name}</Text>
          ) : (
            <Text style={styles.usernamePlaceholder}>
              Faça a busca pelo usuário
            </Text>
          )}
          {userData?.login && (
            <Text style={styles.userLogin}>{`@${userData?.login}`}</Text>
          )}
        </View>
        <View style={styles.userInfoView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ExpandableInfoSection
              iconName="user-o"
              title="Bio"
              description="Um pouco sobre o usuário"
              userData={userData}
              isReseted={isReseted}
              setIsReseted={setIsReseted}
            />
            <ExpandableInfoSection
              iconName="globe"
              title="Orgs"
              description="Organizações que o usuário faz parte"
              userData={userData}
              isReseted={isReseted}
              setIsReseted={setIsReseted}
            />
            <ExpandableInfoSection
              iconName="book"
              title="Repositórios"
              description="Lista contendo todos os repositórios"
              userData={userData}
              isReseted={isReseted}
              setIsReseted={setIsReseted}
            />
            <ExpandableInfoSection
              iconName="star-o"
              title="Seguidores"
              description="Lista de seguidores"
              userData={userData}
              isReseted={isReseted}
              setIsReseted={setIsReseted}
            />
            <ExpandableInfoSection
              iconName="map-marker"
              title="Localização"
              description="País de origem"
              userData={userData}
              isReseted={isReseted}
              setIsReseted={setIsReseted}
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
    alignItems: "center",
    elevation: 7,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  closeModalView: {
    alignItems: "flex-end",
    width: "100%",
    marginBottom: 20,
  },

  inputLabel: { fontSize: 16, marginLeft: 16 },

  searchView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },

  modalInput: {
    height: "70%",
    width: "80%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 16,
  },

  errorText: {
    color: "red",
    marginTop: 10,
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
    height: "48%",
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
