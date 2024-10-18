import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderStyle: "solid",
          borderColor: "#403F47",
          borderWidth: 6,
        }}
      >
        <View style={{ flexDirection: "row", height: 70, width: "70%" }}>
          <View
            style={{
              flex: 2.5,
              borderStyle: "solid",
              borderColor: "#403F47",
              borderWidth: 3,
              backgroundColor: "#5271FF",
            }}
          />
          <View
            style={{
              flex: 1,
              borderStyle: "solid",
              borderColor: "#403F47",
              borderWidth: 3,
              backgroundColor: "#38B6FF",
            }}
          />
          <View
            style={{
              flex: 1,
              borderStyle: "solid",
              borderColor: "#403F47",
              borderWidth: 3,
              backgroundColor: "#8F6BE5",
            }}
          />
        </View>
        <View style={{ flexDirection: "row", height: 70, width: "70%" }}>
          <View
            style={{
              flex: 1,
              borderStyle: "solid",
              borderColor: "#403F47",
              borderWidth: 3,
              backgroundColor: "#612CC5",
            }}
          />
          <View
            style={{
              flex: 2.5,
              justifyContent: "center",
              alignItems: "center",
              borderStyle: "solid",
              borderColor: "#403F47",
              borderWidth: 3,
              backgroundColor: "#38B6FF",
            }}
          >
            <Text
              style={{
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: 30,
                letterSpacing: 4,
              }}
            >
              FLEXBOX
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderStyle: "solid",
              borderColor: "#403F47",
              borderWidth: 3,
              backgroundColor: "#93C7FF",
            }}
          />
        </View>
      </View>
    </View>
  );
}
