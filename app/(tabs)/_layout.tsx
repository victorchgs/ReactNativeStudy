import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="flexboxStudy"
        options={{
          title: "Flexbox study",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "react" : "react"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="flexboxChallenge"
        options={{
          title: "Flexbox challenge",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "react" : "react"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="githubSearch"
        options={{
          title: "GitHub search",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "github" : "github"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="weatherView"
        options={{
          title: "Weather View",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "weather-cloudy" : "weather-cloudy"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
