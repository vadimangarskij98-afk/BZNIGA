import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  User,
  Music,
  Clock,
  Disc,
  Star,
  ChevronRight,
  Settings,
  CreditCard,
  Bell,
  Shield,
} from "lucide-react-native";
import { StatusBar } from "expo-status-bar";

const GENRE_STATS = [
  { genre: "Deep House", pct: 42, color: "#3B82F6" },
  { genre: "Techno", pct: 28, color: "#8B5CF6" },
  { genre: "Ambient", pct: 18, color: "#10B981" },
  { genre: "Tech House", pct: 12, color: "#F59E0B" },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ flex: 1, backgroundColor: "#0A0A0A", paddingTop: insets.top }}
    >
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 24,
            alignItems: "center",
          }}
        >
          {/* Avatar */}
          <View
            style={{
              width: 84,
              height: 84,
              borderRadius: 42,
              backgroundColor: "#1a1a2e",
              borderWidth: 3,
              borderColor: "#3B82F6",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 30, fontWeight: "800" }}>
              JD
            </Text>
          </View>

          <Text
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: "800",
              marginBottom: 4,
            }}
          >
            John Doe
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 13,
              marginBottom: 12,
            }}
          >
            john.doe@email.com
          </Text>

          <View
            style={{
              backgroundColor: "rgba(59,130,246,0.15)",
              borderRadius: 20,
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderWidth: 1,
              borderColor: "rgba(59,130,246,0.3)",
            }}
          >
            <Text style={{ color: "#3B82F6", fontSize: 12, fontWeight: "700" }}>
              ✦ Professional Plan
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            gap: 10,
            marginBottom: 24,
          }}
        >
          {[
            { value: "124", label: "Hours", icon: Clock, color: "#3B82F6" },
            { value: "47", label: "Sessions", icon: Disc, color: "#8B5CF6" },
            { value: "23", label: "Playlists", icon: Music, color: "#10B981" },
          ].map((stat, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                backgroundColor: "#111",
                borderRadius: 14,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
                padding: 14,
                alignItems: "center",
              }}
            >
              <stat.icon
                size={18}
                color={stat.color}
                style={{ marginBottom: 6 }}
              />
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>
                {stat.value}
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 10,
                  marginTop: 2,
                }}
              >
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Genre Stats */}
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 24,
            backgroundColor: "#111",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.08)",
            padding: 16,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 15,
              fontWeight: "700",
              marginBottom: 16,
            }}
          >
            Top Genres
          </Text>
          {GENRE_STATS.map((item, i) => (
            <View
              key={i}
              style={{ marginBottom: i < GENRE_STATS.length - 1 ? 12 : 0 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                >
                  {item.genre}
                </Text>
                <Text
                  style={{ color: item.color, fontSize: 12, fontWeight: "700" }}
                >
                  {item.pct}%
                </Text>
              </View>
              <View
                style={{
                  height: 4,
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderRadius: 2,
                }}
              >
                <View
                  style={{
                    height: 4,
                    width: `${item.pct}%`,
                    backgroundColor: item.color,
                    borderRadius: 2,
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Menu items */}
        <View style={{ marginHorizontal: 20, marginBottom: 16 }}>
          <Text
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 11,
              letterSpacing: 1.5,
              fontWeight: "600",
              marginBottom: 10,
              paddingHorizontal: 4,
            }}
          >
            ACCOUNT
          </Text>
          <View
            style={{
              backgroundColor: "#111",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            {[
              {
                icon: CreditCard,
                label: "Subscription",
                sub: "Professional · $29/mo",
                color: "#3B82F6",
              },
              {
                icon: Bell,
                label: "Notifications",
                sub: "Session alerts, agent updates",
                color: "#8B5CF6",
              },
              {
                icon: Shield,
                label: "Privacy",
                sub: "Data and permissions",
                color: "#10B981",
              },
              {
                icon: Settings,
                label: "Settings",
                sub: "App preferences",
                color: "#F59E0B",
              },
            ].map((item, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderBottomWidth: i < 3 ? 1 : 0,
                  borderBottomColor: "rgba(255,255,255,0.06)",
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: `${item.color}15`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <item.icon size={17} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      fontSize: 11,
                      marginTop: 1,
                    }}
                  >
                    {item.sub}
                  </Text>
                </View>
                <ChevronRight size={16} color="rgba(255,255,255,0.2)" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sign out */}
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
            padding: 14,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "rgba(239,68,68,0.3)",
            backgroundColor: "rgba(239,68,68,0.05)",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#EF4444", fontSize: 14, fontWeight: "600" }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
