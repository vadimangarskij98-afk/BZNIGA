import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Repeat,
  Shuffle,
  ChevronUp,
  Send,
  Zap,
} from "lucide-react-native";
import { StatusBar } from "expo-status-bar";

const { width: SCREEN_W } = Dimensions.get("window");

const TRACKS = [
  {
    title: "Solar",
    artist: "Luke Alessi",
    bpm: 128,
    key: "Am",
    duration: "7:24",
    color: "#3B82F6",
  },
  {
    title: "Phantom",
    artist: "Agents of Time",
    bpm: 130,
    key: "Dm",
    duration: "8:02",
    color: "#8B5CF6",
  },
  {
    title: "Devotion",
    artist: "Âme",
    bpm: 124,
    key: "Gm",
    duration: "9:15",
    color: "#10B981",
  },
];

const CHAT_MESSAGES = [
  {
    sender: "ai",
    name: "Agent Alpha",
    text: "Beatmatching locked at 128 BPM. Ready to mix.",
    time: "10:32",
  },
  {
    sender: "ai",
    name: "Agent Nova",
    text: "Deck B loaded with Phantom. EQ set for smooth transition.",
    time: "10:33",
  },
];

function MiniWaveform({ color, progress }) {
  const bars = Array.from({ length: 32 }, (_, i) => ({
    height: 4 + Math.abs(Math.sin(i * 0.5) * 12 + Math.sin(i * 1.2) * 6),
  }));

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        height: 32,
        position: "relative",
      }}
    >
      {bars.map((bar, i) => {
        const isPlayed = i / bars.length < progress;
        return (
          <View
            key={i}
            style={{
              width: (SCREEN_W - 60) / 32 - 2,
              height: Math.max(3, bar.height),
              borderRadius: 2,
              backgroundColor: isPlayed ? color : `${color}33`,
            }}
          />
        );
      })}
      {/* Playhead */}
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 2,
          backgroundColor: "#fff",
          left: `${progress * 100}%`,
          borderRadius: 1,
        }}
      />
    </View>
  );
}

function AgentOrb({ name, color, action, active }) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!active) return;
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.15,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [active]);

  return (
    <View style={{ alignItems: "center", gap: 5 }}>
      <Animated.View
        style={{
          transform: [{ scale: pulse }],
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: active ? `${color}25` : "rgba(255,255,255,0.05)",
          borderWidth: 2,
          borderColor: active ? color : "rgba(255,255,255,0.1)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: active ? color : "rgba(255,255,255,0.3)",
            fontSize: 14,
            fontWeight: "800",
          }}
        >
          {name[0]}
        </Text>
      </Animated.View>
      <Text
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: 9,
          fontWeight: "600",
        }}
      >
        {name}
      </Text>
      {active && (
        <View
          style={{
            backgroundColor: `${color}20`,
            borderRadius: 6,
            paddingHorizontal: 5,
            paddingVertical: 2,
          }}
        >
          <Text style={{ color: color, fontSize: 8, fontWeight: "700" }}>
            {action}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [progress, setProgress] = useState(0.35);
  const [crossfader, setCrossfader] = useState(50);
  const [volume, setVolume] = useState(80);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const progressAnim = useRef(new Animated.Value(0.35)).current;
  const chatHeight = useRef(new Animated.Value(0)).current;
  const jogAnim = useRef(new Animated.Value(0)).current;

  const track = TRACKS[trackIdx];

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p >= 1 ? 0 : p + 0.002;
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const anim = Animated.loop(
      Animated.timing(jogAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [playing]);

  const jogRotate = jogAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const toggleChat = () => {
    const toValue = chatExpanded ? 0 : 220;
    setChatExpanded(!chatExpanded);
    Animated.spring(chatHeight, {
      toValue,
      useNativeDriver: false,
      tension: 80,
      friction: 12,
    }).start();
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const msg = { sender: "user", text: chatInput, time: "now" };
    setMessages((prev) => [...prev, msg]);
    setChatInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          name: "Agent Alpha",
          text: "Command received. Adjusting the mix...",
          time: "now",
        },
      ]);
    }, 800);
  };

  const nextTrack = () => setTrackIdx((i) => (i + 1) % TRACKS.length);
  const prevTrack = () =>
    setTrackIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length);

  const progressSecs = Math.floor(progress * 7 * 60);
  const minStr = String(Math.floor(progressSecs / 60)).padStart(2, "0");
  const secStr = String(progressSecs % 60).padStart(2, "0");

  return (
    <View style={{ flex: 1, backgroundColor: "#0A0A0A" }}>
      <StatusBar style="light" />

      {/* Top gradient bg based on track color */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 300,
          backgroundColor: `${track.color}12`,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 10,
          paddingBottom: insets.bottom + 90,
        }}
      >
        {/* Top Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <View>
            <Text
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 10,
                letterSpacing: 2,
                fontWeight: "600",
              }}
            >
              NOW PLAYING
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginTop: 1,
              }}
            >
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#22C55E",
                }}
              />
              <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
                Live Session · Deep House Night
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 6,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "800",
                fontFamily: "monospace",
              }}
            >
              {track.bpm}
            </Text>
            <Text
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: 9,
                textAlign: "center",
              }}
            >
              BPM
            </Text>
          </View>
        </View>

        {/* Active Agents */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingHorizontal: 30,
            marginBottom: 28,
          }}
        >
          <AgentOrb
            name="Alpha"
            color="#3B82F6"
            action="MIXING"
            active={true}
          />
          <AgentOrb name="Nova" color="#8B5CF6" action="EQ" active={playing} />
          <AgentOrb name="Echo" color="#10B981" action="FX" active={false} />
          <AgentOrb
            name="Pulse"
            color="#F59E0B"
            action="SYNC"
            active={playing}
          />
        </View>

        {/* Album Art + Jog Wheel */}
        <View style={{ alignItems: "center", marginBottom: 28 }}>
          <View style={{ position: "relative", width: 200, height: 200 }}>
            {/* Outer jog ring */}
            <Animated.View
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 100,
                borderWidth: 6,
                borderColor: "rgba(255,255,255,0.06)",
                transform: [{ rotate: jogRotate }],
              }}
            >
              {[0, 90, 180, 270].map((deg, i) => (
                <View
                  key={i}
                  style={{
                    position: "absolute",
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: `${track.color}80`,
                    top: "50%",
                    left: "50%",
                    marginTop: -4,
                    marginLeft: -4,
                    transform: [{ rotate: `${deg}deg` }, { translateY: -91 }],
                  }}
                />
              ))}
            </Animated.View>
            {/* Album art */}
            <View
              style={{
                position: "absolute",
                inset: 12,
                borderRadius: 88,
                backgroundColor: `${track.color}20`,
                borderWidth: 2,
                borderColor: `${track.color}30`,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 56 }}>🎧</Text>
            </View>
            {/* Center dot */}
            <View
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: "#0A0A0A",
                marginTop: -8,
                marginLeft: -8,
                borderWidth: 2,
                borderColor: "rgba(255,255,255,0.15)",
              }}
            />
          </View>
        </View>

        {/* Track Info */}
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: "800",
              marginBottom: 4,
            }}
          >
            {track.title}
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>
            {track.artist}
          </Text>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 11,
                  fontWeight: "600",
                }}
              >
                {track.key}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: `${track.color}15`,
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderColor: `${track.color}30`,
              }}
            >
              <Text
                style={{ color: track.color, fontSize: 11, fontWeight: "700" }}
              >
                Deep House
              </Text>
            </View>
          </View>
        </View>

        {/* Waveform */}
        <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
          <MiniWaveform color={track.color} progress={progress} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 11,
              fontFamily: "monospace",
            }}
          >
            {minStr}:{secStr}
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: 11,
              fontFamily: "monospace",
            }}
          >
            {track.duration}
          </Text>
        </View>

        {/* Controls */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 28,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={() => setShuffle(!shuffle)}>
            <Shuffle
              size={20}
              color={shuffle ? track.color : "rgba(255,255,255,0.25)"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={prevTrack}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "rgba(255,255,255,0.06)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SkipBack size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPlaying(!playing)}
            style={{
              width: 68,
              height: 68,
              borderRadius: 34,
              backgroundColor: track.color,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: track.color,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 12,
              elevation: 12,
            }}
          >
            {playing ? (
              <Pause size={30} color="#fff" />
            ) : (
              <Play size={30} color="#fff" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={nextTrack}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "rgba(255,255,255,0.06)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SkipForward size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLoop(!loop)}>
            <Repeat
              size={20}
              color={loop ? track.color : "rgba(255,255,255,0.25)"}
            />
          </TouchableOpacity>
        </View>

        {/* Mixer Controls */}
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 16,
            backgroundColor: "#111",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.08)",
            padding: 16,
          }}
        >
          <Text
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 10,
              letterSpacing: 1.5,
              fontWeight: "600",
              marginBottom: 14,
            }}
          >
            MIXER
          </Text>

          {/* Crossfader */}
          <View style={{ marginBottom: 14 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 11,
                  fontWeight: "600",
                }}
              >
                A
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.2)", fontSize: 10 }}>
                CROSSFADER
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 11,
                  fontWeight: "600",
                }}
              >
                B
              </Text>
            </View>
            <View
              style={{
                height: 6,
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: 3,
                position: "relative",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: `${crossfader}%`,
                  backgroundColor: track.color,
                  borderRadius: 3,
                }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: "50%",
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: "#fff",
                  marginTop: -11,
                  marginLeft: -11,
                  left: `${crossfader}%`,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                }}
                onPress={() => setCrossfader(50)}
              />
            </View>
          </View>

          {/* EQ Row */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            {[
              { label: "HI", value: 75, color: "#3B82F6" },
              { label: "MID", value: 68, color: "#8B5CF6" },
              { label: "LO", value: 80, color: "#EC4899" },
              {
                label: "VOL",
                value: volume,
                color: track.color,
                setVal: setVolume,
              },
            ].map((eq, i) => (
              <View key={i} style={{ flex: 1, alignItems: "center", gap: 4 }}>
                <View
                  style={{
                    width: "100%",
                    height: 4,
                    backgroundColor: "rgba(255,255,255,0.06)",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      width: `${eq.value}%`,
                      height: "100%",
                      backgroundColor: eq.color,
                      borderRadius: 2,
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    fontSize: 9,
                    fontWeight: "600",
                  }}
                >
                  {eq.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Effects Row */}
        <View style={{ marginHorizontal: 20, marginBottom: 16 }}>
          <Text
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 10,
              letterSpacing: 1.5,
              fontWeight: "600",
              marginBottom: 10,
            }}
          >
            EFFECTS
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {[
              { name: "Reverb", active: true, color: "#3B82F6" },
              { name: "Delay", active: false, color: "#8B5CF6" },
              { name: "Filter", active: true, color: "#EC4899" },
              { name: "Flanger", active: false, color: "#F59E0B" },
            ].map((fx, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  borderRadius: 12,
                  backgroundColor: fx.active
                    ? `${fx.color}15`
                    : "rgba(255,255,255,0.04)",
                  borderWidth: 1,
                  borderColor: fx.active
                    ? `${fx.color}40`
                    : "rgba(255,255,255,0.06)",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {fx.active && <Zap size={12} color={fx.color} />}
                <Text
                  style={{
                    color: fx.active ? fx.color : "rgba(255,255,255,0.25)",
                    fontSize: 10,
                    fontWeight: "700",
                  }}
                >
                  {fx.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Agent Chat Panel */}
        <TouchableOpacity
          onPress={toggleChat}
          style={{
            marginHorizontal: 20,
            marginBottom: 0,
            backgroundColor: "#111",
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.08)",
            padding: 14,
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
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              fontWeight: "600",
              flex: 1,
            }}
          >
            Agent Chat
          </Text>
          <ChevronUp
            size={16}
            color="rgba(255,255,255,0.3)"
            style={{
              transform: [{ rotate: chatExpanded ? "0deg" : "180deg" }],
            }}
          />
        </TouchableOpacity>

        <Animated.View
          style={{
            marginHorizontal: 20,
            overflow: "hidden",
            height: chatHeight,
            backgroundColor: "#111",
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
            borderWidth: 1,
            borderTopWidth: 0,
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <ScrollView
            style={{ flex: 1, padding: 12 }}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg, idx) => (
              <View
                key={idx}
                style={{
                  marginBottom: 10,
                  alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.sender === "ai" && (
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.25)",
                      fontSize: 9,
                      marginBottom: 3,
                      fontWeight: "600",
                    }}
                  >
                    {msg.name}
                  </Text>
                )}
                <View
                  style={{
                    maxWidth: "80%",
                    backgroundColor:
                      msg.sender === "user"
                        ? track.color
                        : "rgba(255,255,255,0.06)",
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 12, lineHeight: 17 }}>
                    {msg.text}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              padding: 10,
              borderTopWidth: 1,
              borderTopColor: "rgba(255,255,255,0.06)",
            }}
          >
            <TextInput
              value={chatInput}
              onChangeText={setChatInput}
              placeholder="Command agents..."
              placeholderTextColor="rgba(255,255,255,0.2)"
              style={{
                flex: 1,
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 8,
                color: "#fff",
                fontSize: 13,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
              }}
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                backgroundColor: track.color,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Send size={15} color="#fff" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
