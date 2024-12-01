import data from "@/assets/data/data.json";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";

type WeatherData = {
  state: string;
  city: string;
  date: string;
  weather: string;
  temperature: string;
  daily_summary: string;
  wind: string;
  humidity: string;
  visibility: string;
};

export default function WeatherView() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const randomEntry = data[Math.floor(Math.random() * data.length)];
    setWeatherData(randomEntry);
  }, []);

  const formatText = (text: string): string => {
    const sentences = text
      .split(".")
      .map((sentence) => sentence.trim())
      .filter(Boolean);

    return sentences.join(".\n");
  };

  if (!weatherData) {
    return (
      <View style={styles.view}>
        <Text style={styles.title}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {weatherData.city} - {weatherData.state}
        </Text>
        <View style={styles.date}>
          <Text style={styles.dateText}>{weatherData.date}</Text>
        </View>
        <Text style={styles.weatherText}>{weatherData.weather}</Text>
      </View>
      <Text style={styles.temperature}>{weatherData.temperature}</Text>
      <View style={styles.dailySummary}>
        <Text style={styles.dailySummaryText}>Resumo Diário</Text>
        <Text style={styles.dailySummaryText}>
          {formatText(weatherData.daily_summary)}
        </Text>
      </View>
      <View style={styles.widget}>
        <View style={styles.widgetItem}>
          <MaterialCommunityIcons
            name="weather-windy"
            size={64}
            color="#F9F93B"
          />
          <Text style={styles.widgetText}>{weatherData.wind}</Text>
          <Text style={styles.widgetSubText}>vento</Text>
        </View>
        <View style={styles.widgetItem}>
          <MaterialCommunityIcons name="waves" size={64} color="#F9F93B" />
          <Text style={styles.widgetText}>{weatherData.humidity}</Text>
          <Text style={styles.widgetSubText}>humidade</Text>
        </View>
        <View style={styles.widgetItem}>
          <MaterialCommunityIcons name="eye-check" size={64} color="#F9F93B" />
          <Text style={styles.widgetText}>{weatherData.visibility}</Text>
          <Text style={styles.widgetSubText}>visibilidade</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#F9F93B",
  },

  header: {
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  date: {
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: "#030006",
  },

  dateText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  weatherText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  temperature: {
    fontSize: 144,
    fontWeight: "bold",
  },

  dailySummary: {
    width: "80%",
    gap: 16,
  },

  dailySummaryText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "justify",
    lineHeight: 32,
  },

  widget: {
    borderRadius: 10,
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: "#030006",
  },

  widgetItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  widgetText: {
    color: "#F9F93B",
    fontSize: 20,
    fontWeight: "bold",
  },

  widgetSubText: {
    color: "#F9F93B",
    fontSize: 16,
  },
});
