import { Tabs } from "expo-router";
import { Home, Users, Library, User } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0D0D0D",
          borderTopColor: "rgba(255,255,255,0.08)",
          borderTopWidth: 1,
          paddingTop: 6,
          paddingBottom: 2,
        },
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "rgba(255,255,255,0.3)",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          letterSpacing: 0.2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Now Playing",
          tabBarIcon: ({ color }) => <Home color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="agents"
        options={{
          title: "Agents",
          tabBarIcon: ({ color }) => <Users color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => <Library color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}
