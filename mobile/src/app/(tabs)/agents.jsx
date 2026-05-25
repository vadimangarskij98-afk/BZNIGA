import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Users, Zap, Music, Activity, ChevronRight } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";

const AGENTS = [
  {
    id: "alpha",
    name: "Agent Alpha",
    specialty: "House & Techno",
    color: "#3B82F6",
    online: true,
    action: "Beatmatching",
    sessions: 24,
    bpm: 128,
    description:
      "Expert in House and Techno transitions. Specialized in BPM-accurate mixing.",
  },
  {
    id: "nova",
    name: "Agent Nova",
    specialty: "Deep House",
    color: "#8B5CF6",
    online: true,
    action: "EQ Mixing",
    sessions: 18,
    bpm: 124,
    description:
      "Deep House specialist. Masters frequency separation and smooth blends.",
  },
  {
    id: "echo",
    name: "Agent Echo",
    specialty: "Ambient & Chill",
    color: "#10B981",
    online: false,
    action: "Idle",
    sessions: 15,
    bpm: 110,
    description:
      "Perfect for ambient and chillout sets. Slow building layered textures.",
  },
  {
    id: "pulse",
    name: "Agent Pulse",
    specialty: "Drum & Bass",
    color: "#F59E0B",
    online: true,
    action: "Syncing BPM",
    sessions: 31,
    bpm: 174,
    description:
      "High-energy Drum & Bass specialist. Rapid fire drops and breakbeats.",
  },
  {
    id: "volt",
    name: "Agent Volt",
    specialty: "Trance",
    color: "#EC4899",
    online: false,
    action: "Idle",
    sessions: 9,
    bpm: 138,
    description:
      "Euphoric trance and progressive builds. Peak time energy specialist.",
  },
];

export default function AgentsScreen() {
  const insets = useSafeAreaInsets();
  const [connected, setConnected] = useState({
    alpha: true,
    nova: true,
    echo: false,
    pulse: true,
    volt: false,
  });

  return (
    <View
      style={{ flex: 1, backgroundColor: "#0A0A0A", paddingTop: insets.top }}
    >
      <StatusBar style="light" />

      {/* Header */}
      <View
        style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}
      >
        <Text
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 11,
            letterSpacing: 2,
            fontWeight: "600",
            marginBottom: 4,
          }}
        >
          AGENT ROSTER
        </Text>
        <Text style={{ color: "#fff", fontSize: 26, fontWeight: "700" }}>
          AI Agents
        </Text>
      </View>

      {/* Session bar */}
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 16,
          backgroundColor: "rgba(59,130,246,0.1)",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "rgba(59,130,246,0.3)",
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#22C55E",
          }}
        />
        <Text
          style={{ color: "#3B82F6", fontSize: 12, fontWeight: "600", flex: 1 }}
        >
          Active Session — Deep House Night
        </Text>
        <Activity size={16} color="#3B82F6" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 80,
          gap: 12,
        }}
      >
        {AGENTS.map((agent) => (
          <View
            key={agent.id}
            style={{
              backgroundColor: "#111",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: connected[agent.id]
                ? `${agent.color}40`
                : "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Top colored stripe */}
            {connected[agent.id] && (
              <View style={{ height: 2, backgroundColor: agent.color }} />
            )}

            <View style={{ padding: 16 }}>
              {/* Agent Header */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: `${agent.color}20`,
                    borderWidth: 2,
                    borderColor: `${agent.color}40`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: agent.color,
                      fontSize: 18,
                      fontWeight: "800",
                    }}
                  >
                    {agent.name.split(" ")[1][0]}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: "#fff", fontSize: 15, fontWeight: "700" }}
                  >
                    {agent.name}
                  </Text>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 12,
                      marginTop: 1,
                    }}
                  >
                    {agent.specialty}
                  </Text>
                </View>

                <Switch
                  value={connected[agent.id]}
                  onValueChange={(v) =>
                    setConnected((prev) => ({ ...prev, [agent.id]: v }))
                  }
                  trackColor={{
                    false: "rgba(255,255,255,0.1)",
                    true: agent.color,
                  }}
                  thumbColor="#fff"
                />
              </View>

              {/* Description */}
              <Text
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 12,
                  lineHeight: 18,
                  marginBottom: 14,
                }}
              >
                {agent.description}
              </Text>

              {/* Stats row */}
              <View style={{ flexDirection: "row", gap: 8 }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderRadius: 10,
                    padding: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}
                  >
                    {agent.bpm}
                  </Text>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      fontSize: 10,
                      marginTop: 2,
                    }}
                  >
                    BPM
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderRadius: 10,
                    padding: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}
                  >
                    {agent.sessions}
                  </Text>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      fontSize: 10,
                      marginTop: 2,
                    }}
                  >
                    Sessions
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: agent.online
                      ? "rgba(34,197,94,0.1)"
                      : "rgba(255,255,255,0.04)",
                    borderRadius: 10,
                    padding: 10,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: agent.online
                        ? "#22C55E"
                        : "rgba(255,255,255,0.2)",
                      marginBottom: 2,
                    }}
                  />
                  <Text
                    style={{
                      color: agent.online ? "#22C55E" : "rgba(255,255,255,0.3)",
                      fontSize: 10,
                    }}
                  >
                    {agent.online ? "Online" : "Offline"}
                  </Text>
                </View>
              </View>

              {/* Action indicator */}
              {agent.online && connected[agent.id] && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 12,
                    backgroundColor: `${agent.color}10`,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                  }}
                >
                  <Zap size={12} color={agent.color} />
                  <Text
                    style={{
                      color: agent.color,
                      fontSize: 11,
                      fontWeight: "600",
                    }}
                  >
                    {agent.action}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
