import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Search,
  Music,
  Sparkles,
  Clock,
  ChevronRight,
  Play,
} from "lucide-react-native";
import { StatusBar } from "expo-status-bar";

const PLAYLISTS = [
  {
    name: "Summer Nights",
    tracks: 42,
    duration: "3h 12m",
    type: "AI",
    genre: "Deep House",
    color: "#3B82F6",
  },
  {
    name: "Midnight Drive",
    tracks: 28,
    duration: "2h 04m",
    type: "Manual",
    genre: "Synthwave",
    color: "#8B5CF6",
  },
  {
    name: "Workout Energy",
    tracks: 35,
    duration: "2h 45m",
    type: "AI",
    genre: "Tech House",
    color: "#EC4899",
  },
  {
    name: "Chill Vibes",
    tracks: 51,
    duration: "4h 18m",
    type: "AI",
    genre: "Ambient",
    color: "#10B981",
  },
  {
    name: "Peak Hour",
    tracks: 22,
    duration: "1h 50m",
    type: "Manual",
    genre: "Techno",
    color: "#F59E0B",
  },
];

const TRACKS = [
  {
    title: "Solar",
    artist: "Luke Alessi",
    bpm: 128,
    key: "Am",
    duration: "7:24",
  },
  {
    title: "Phantom",
    artist: "Agents of Time",
    bpm: 130,
    key: "Dm",
    duration: "8:02",
  },
  { title: "Devotion", artist: "Âme", bpm: 124, key: "Gm", duration: "9:15" },
  {
    title: "The Tunnel",
    artist: "Jackmaster",
    bpm: 132,
    key: "Fm",
    duration: "6:48",
  },
  {
    title: "Journey",
    artist: "Innellea",
    bpm: 126,
    key: "Cm",
    duration: "8:33",
  },
  {
    title: "Northern Soul",
    artist: "Dixon",
    bpm: 120,
    key: "Bm",
    duration: "10:20",
  },
  {
    title: "Drift",
    artist: "Ben Böhmer",
    bpm: 118,
    key: "Em",
    duration: "7:55",
  },
  {
    title: "Cascade",
    artist: "Stephan Bodzin",
    bpm: 133,
    key: "Am",
    duration: "9:42",
  },
];

const COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#84CC16",
];

export default function LibraryScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState("playlists");
  const [search, setSearch] = useState("");

  const filteredTracks = TRACKS.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.artist.toLowerCase().includes(search.toLowerCase()),
  );

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
          YOUR MUSIC
        </Text>
        <Text style={{ color: "#fff", fontSize: 26, fontWeight: "700" }}>
          Library
        </Text>
      </View>

      {/* Search */}
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          backgroundColor: "rgba(255,255,255,0.06)",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.08)",
          paddingHorizontal: 14,
          paddingVertical: 10,
        }}
      >
        <Search size={16} color="rgba(255,255,255,0.3)" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search tracks or artists..."
          placeholderTextColor="rgba(255,255,255,0.2)"
          style={{ flex: 1, color: "#fff", fontSize: 14 }}
        />
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          gap: 8,
          marginBottom: 16,
        }}
      >
        {["playlists", "tracks", "sets"].map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 7,
              borderRadius: 20,
              backgroundColor: tab === t ? "#3B82F6" : "rgba(255,255,255,0.06)",
              borderWidth: 1,
              borderColor: tab === t ? "#3B82F6" : "rgba(255,255,255,0.08)",
            }}
          >
            <Text
              style={{
                color: tab === t ? "#fff" : "rgba(255,255,255,0.4)",
                fontSize: 12,
                fontWeight: "600",
                textTransform: "capitalize",
              }}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        {tab === "playlists" && (
          <View style={{ paddingHorizontal: 20, gap: 10 }}>
            {/* AI Generate button */}
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(59,130,246,0.1)",
                borderRadius: 14,
                borderWidth: 1,
                borderColor: "rgba(59,130,246,0.3)",
                padding: 14,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: "rgba(59,130,246,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles size={20} color="#3B82F6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ color: "#3B82F6", fontSize: 14, fontWeight: "700" }}
                >
                  Generate AI Playlist
                </Text>
                <Text
                  style={{
                    color: "rgba(59,130,246,0.6)",
                    fontSize: 11,
                    marginTop: 1,
                  }}
                >
                  Let agents create the perfect set
                </Text>
              </View>
              <ChevronRight size={16} color="rgba(59,130,246,0.5)" />
            </TouchableOpacity>

            {PLAYLISTS.map((pl, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  backgroundColor: "#111",
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.06)",
                  padding: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    backgroundColor: `${pl.color}20`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Music size={22} color={pl.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 3,
                    }}
                  >
                    <Text
                      style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}
                    >
                      {pl.name}
                    </Text>
                    {pl.type === "AI" && (
                      <View
                        style={{
                          backgroundColor: "rgba(59,130,246,0.15)",
                          borderRadius: 6,
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                        }}
                      >
                        <Text
                          style={{
                            color: "#3B82F6",
                            fontSize: 9,
                            fontWeight: "700",
                          }}
                        >
                          AI
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}
                  >
                    {pl.genre} · {pl.tracks} tracks · {pl.duration}
                  </Text>
                </View>
                <ChevronRight size={16} color="rgba(255,255,255,0.2)" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {tab === "tracks" && (
          <View style={{ paddingHorizontal: 20, gap: 2 }}>
            {filteredTracks.map((track, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  borderRadius: 12,
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    backgroundColor: `${COLORS[idx % COLORS.length]}20`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Music size={18} color={COLORS[idx % COLORS.length]} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}
                  >
                    {track.title}
                  </Text>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 11,
                      marginTop: 1,
                    }}
                  >
                    {track.artist}
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end", gap: 2 }}>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 10,
                      fontFamily: "monospace",
                    }}
                  >
                    {track.bpm} BPM
                  </Text>
                  <Text
                    style={{ color: "rgba(255,255,255,0.2)", fontSize: 10 }}
                  >
                    {track.key} · {track.duration}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {tab === "sets" && (
          <View style={{ paddingHorizontal: 20, gap: 10 }}>
            {[
              {
                name: "Midnight Mix",
                duration: "2h 14m",
                date: "Jan 15",
                agents: ["Alpha", "Nova"],
                plays: 142,
              },
              {
                name: "Sunday Morning",
                duration: "1h 47m",
                date: "Jan 12",
                agents: ["Echo"],
                plays: 89,
              },
              {
                name: "Peak Hours",
                duration: "3h 02m",
                date: "Jan 8",
                agents: ["Alpha", "Nova", "Echo"],
                plays: 267,
              },
            ].map((set, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  backgroundColor: "#111",
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.06)",
                  padding: 14,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 15, fontWeight: "700" }}
                  >
                    {set.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Clock size={12} color="rgba(255,255,255,0.3)" />
                    <Text
                      style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}
                    >
                      {set.duration}
                    </Text>
                  </View>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <View style={{ flexDirection: "row", gap: 4, flex: 1 }}>
                    {set.agents.map((agent, i) => (
                      <View
                        key={i}
                        style={{
                          backgroundColor: "rgba(255,255,255,0.06)",
                          borderRadius: 6,
                          paddingHorizontal: 7,
                          paddingVertical: 3,
                        }}
                      >
                        <Text
                          style={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: 10,
                            fontWeight: "600",
                          }}
                        >
                          {agent}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <Text
                    style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}
                  >
                    {set.plays} plays
                  </Text>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: "#3B82F6",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Play size={14} color="#fff" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
