"use client";
import { useState, useEffect, useRef } from "react";
import {
  Radio,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  MessageSquare,
  Users,
  Music,
  X,
  Send,
  Shuffle,
  Repeat,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const TRACKS = [
  {
    title: "Solar",
    artist: "Luke Alessi",
    bpm: 128,
    key: "Am",
    duration: "7:24",
    genre: "Deep House",
  },
  {
    title: "Phantom",
    artist: "Agents of Time",
    bpm: 130,
    key: "Dm",
    duration: "8:02",
    genre: "Techno",
  },
  {
    title: "Devotion",
    artist: "Âme",
    bpm: 124,
    key: "Gm",
    duration: "9:15",
    genre: "Deep House",
  },
  {
    title: "The Tunnel",
    artist: "Jackmaster",
    bpm: 132,
    key: "Fm",
    duration: "6:48",
    genre: "Tech House",
  },
  {
    title: "Journey",
    artist: "Innellea",
    bpm: 126,
    key: "Cm",
    duration: "8:33",
    genre: "Melodic Techno",
  },
  {
    title: "Northern Soul",
    artist: "Dixon",
    bpm: 120,
    key: "Bm",
    duration: "10:20",
    genre: "Minimal",
  },
  {
    title: "Drift",
    artist: "Ben Böhmer",
    bpm: 118,
    key: "Em",
    duration: "7:55",
    genre: "Melodic House",
  },
  {
    title: "Cascade",
    artist: "Stephan Bodzin",
    bpm: 133,
    key: "Am",
    duration: "9:42",
    genre: "Techno",
  },
];

const AGENTS = [
  {
    id: "alpha",
    name: "Agent Alpha",
    specialty: "House & Techno",
    color: "#3B82F6",
    action: "Beatmatching",
    online: true,
  },
  {
    id: "nova",
    name: "Agent Nova",
    specialty: "Deep House",
    color: "#8B5CF6",
    action: "EQ mixing",
    online: true,
  },
  {
    id: "echo",
    name: "Agent Echo",
    specialty: "Ambient",
    color: "#10B981",
    action: "Idle",
    online: false,
  },
  {
    id: "pulse",
    name: "Agent Pulse",
    specialty: "Drum & Bass",
    color: "#F59E0B",
    action: "Syncing BPM",
    online: true,
  },
];

function Waveform({ color, progress = 0.4, playing }) {
  const bars = Array.from({ length: 60 }, (_, i) => ({
    height:
      10 +
      Math.abs(
        Math.sin(i * 0.4) * 20 + Math.sin(i * 0.7) * 12 + Math.sin(i * 1.3) * 8,
      ),
  }));

  return (
    <div className="relative h-16 flex items-center overflow-hidden rounded-md bg-black/40">
      <div
        className="flex items-center gap-px px-2 w-full h-full"
        style={{ alignItems: "center" }}
      >
        {bars.map((bar, i) => {
          const isPlayed = i / bars.length < progress;
          return (
            <div
              key={i}
              className="flex-1 rounded-sm transition-all duration-100"
              style={{
                height: `${bar.height * (playing && isPlayed ? 1.2 : 1)}px`,
                maxHeight: "52px",
                minHeight: "4px",
                backgroundColor: isPlayed ? color : `${color}44`,
              }}
            />
          );
        })}
      </div>
      {/* Playhead */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 pointer-events-none"
        style={{ left: `${progress * 100}%` }}
      />
    </div>
  );
}

function Knob({ label, value, onChange, min = 0, max = 100 }) {
  const angle = ((value - min) / (max - min)) * 270 - 135;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-10 h-10">
        <svg viewBox="0 0 40 40" className="w-full h-full -rotate-[135deg]">
          <circle
            cx="20"
            cy="20"
            r="14"
            fill="none"
            stroke="#1f2937"
            strokeWidth="3"
            strokeDasharray="66 88"
            strokeLinecap="round"
          />
          <circle
            cx="20"
            cy="20"
            r="14"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeDasharray={`${((value - min) / (max - min)) * 66} 88`}
            strokeLinecap="round"
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `rotate(${angle + 135}deg)` }}
        >
          <div
            className="w-1 h-3 bg-white rounded-full"
            style={{
              transformOrigin: "bottom center",
              transform: "translateY(-6px)",
            }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <span className="text-[9px] text-white/40 font-mono uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

function Fader({ value, onChange, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[9px] text-white/40 font-mono uppercase tracking-widest">
        {label}
      </span>
      <div className="relative h-24 w-6 flex items-center justify-center">
        <div className="w-1.5 h-full bg-white/10 rounded-full">
          <div
            className="w-full bg-blue-500 rounded-full transition-all"
            style={{ height: `${value}%`, marginTop: `${100 - value}%` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-pointer"
          style={{ writingMode: "vertical-lr", direction: "rtl" }}
        />
      </div>
      <span className="text-[9px] text-white/60 font-mono">{value}</span>
    </div>
  );
}

function Deck({ side, color, agent }) {
  const [track, setTrack] = useState(side === "A" ? TRACKS[0] : TRACKS[1]);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(side === "A" ? 0.35 : 0.12);
  const [pitch, setPitch] = useState(50);
  const [hi, setHi] = useState(75);
  const [mid, setMid] = useState(75);
  const [lo, setLo] = useState(75);
  const [vol, setVol] = useState(85);
  const [loop, setLoop] = useState(false);
  const [sync, setSync] = useState(false);
  const jogRef = useRef(null);
  const [jogAngle, setJogAngle] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 1 ? 0 : p + 0.001));
      setJogAngle((a) => (a + 2) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, [playing]);

  const pitchVal = (((pitch - 50) / 50) * 8).toFixed(1);

  return (
    <div className="flex flex-col gap-3 bg-[#111] rounded-xl border border-white/10 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: color }}
          >
            {side}
          </div>
          <span className="text-xs text-white/40 font-mono">DECK {side}</span>
          {agent && (
            <div className="flex items-center gap-1 bg-white/5 rounded-full px-2 py-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
              <span className="text-[10px] text-white/60">{agent.name}</span>
            </div>
          )}
        </div>
        <div
          className={`text-xs font-mono px-2 py-0.5 rounded-full border ${playing ? "text-green-400 border-green-400/30 bg-green-400/10" : "text-white/30 border-white/10"}`}
        >
          {playing ? "▶ PLAY" : "■ STOP"}
        </div>
      </div>

      {/* Track Info */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-lg flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${color}88, ${color}22)`,
          }}
        >
          <div className="w-full h-full rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-white/30" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white truncate">
            {track.title}
          </div>
          <div className="text-xs text-white/50 truncate">{track.artist}</div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[10px] font-mono text-white/40">
              {track.bpm} BPM
            </span>
            <span className="text-[10px] font-mono text-white/40">
              {track.key}
            </span>
            <span className="text-[10px] font-mono text-white/40">
              {track.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Waveform */}
      <Waveform color={color} progress={progress} playing={playing} />

      {/* Time */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-white/60">
          {Math.floor((progress * 7 * 60) / 60)}:
          {String(Math.floor(progress * 7 * 60) % 60).padStart(2, "0")}
        </span>
        <span className="text-xs font-mono text-white/30">
          -{Math.floor(((1 - progress) * 7 * 60) / 60)}:
          {String(Math.floor((1 - progress) * 7 * 60) % 60).padStart(2, "0")}
        </span>
      </div>

      {/* Jog Wheel */}
      <div className="flex items-center justify-center py-1">
        <div className="relative w-28 h-28" ref={jogRef}>
          <div
            className="w-full h-full rounded-full border-4 border-white/10 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center cursor-pointer select-none"
            style={{
              transform: `rotate(${jogAngle}deg)`,
              transition: playing ? "none" : "transform 0.1s",
            }}
          >
            <div className="w-3/4 h-3/4 rounded-full border-2 border-white/5 bg-[#0A0A0A] flex items-center justify-center">
              <div className="w-1/2 h-1/2 rounded-full bg-white/5 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>
            </div>
          </div>
          {/* Notch */}
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white/60 rounded-full"
            style={{
              transform: `rotate(${jogAngle}deg)`,
              transformOrigin: "50% calc(100% + 52px)",
            }}
          />
        </div>
      </div>

      {/* Transport Controls */}
      <div className="flex items-center justify-center gap-2">
        <button className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-white/50 transition-colors">
          <SkipBack className="w-4 h-4" />
        </button>
        <button
          onClick={() => setPlaying(!playing)}
          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-colors text-white"
          style={{ background: playing ? "#EF4444" : color }}
        >
          {playing ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
        <button className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-white/50 transition-colors">
          <SkipForward className="w-4 h-4" />
        </button>
        <button
          onClick={() => setSync(!sync)}
          className={`px-3 h-8 rounded-lg text-xs font-bold font-mono transition-colors ${sync ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-white/5 text-white/30 hover:bg-white/10"}`}
        >
          SYNC
        </button>
        <button
          onClick={() => setLoop(!loop)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${loop ? "text-blue-400 bg-blue-400/10 border border-blue-400/30" : "bg-white/5 text-white/30 hover:bg-white/10"}`}
        >
          <Repeat className="w-4 h-4" />
        </button>
      </div>

      {/* EQ Knobs */}
      <div className="flex items-center justify-around bg-black/30 rounded-lg p-3 border border-white/5">
        <Knob label="HI" value={hi} onChange={setHi} />
        <Knob label="MID" value={mid} onChange={setMid} />
        <Knob label="LO" value={lo} onChange={setLo} />
        <Fader label="VOL" value={vol} onChange={setVol} />
      </div>

      {/* Pitch */}
      <div className="flex items-center gap-3 bg-black/20 rounded-lg px-3 py-2">
        <span className="text-[10px] text-white/40 font-mono uppercase">
          PITCH
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={pitch}
          onChange={(e) => setPitch(Number(e.target.value))}
          className="flex-1 h-1 accent-blue-500 cursor-pointer"
        />
        <span
          className={`text-xs font-mono min-w-[40px] text-right ${parseFloat(pitchVal) > 0 ? "text-green-400" : parseFloat(pitchVal) < 0 ? "text-red-400" : "text-white/40"}`}
        >
          {pitchVal > 0 ? "+" : ""}
          {pitchVal}%
        </span>
      </div>
    </div>
  );
}

function FXUnit({ name, color }) {
  const [active, setActive] = useState(false);
  const [intensity, setIntensity] = useState(40);

  return (
    <div
      className={`flex flex-col gap-2 bg-[#111] rounded-xl border p-3 transition-all ${active ? "border-opacity-100" : "border-white/10"}`}
      style={{
        borderColor: active ? `${color}60` : undefined,
        background: active ? `${color}08` : undefined,
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
          {name}
        </span>
        <button
          onClick={() => setActive(!active)}
          className={`w-7 h-4 rounded-full transition-colors relative ${active ? "bg-blue-500" : "bg-white/10"}`}
        >
          <div
            className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${active ? "right-0.5" : "left-0.5"}`}
          />
        </button>
      </div>
      <Knob
        label="DRY/WET"
        value={intensity}
        onChange={setIntensity}
        min={0}
        max={100}
      />
    </div>
  );
}

export default function WorkspacePage() {
  const [chatOpen, setChatOpen] = useState(true);
  const [browserOpen, setBrowserOpen] = useState(false);
  const [crossfader, setCrossfader] = useState(50);
  const [masterVol, setMasterVol] = useState(85);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      name: "Agent Alpha",
      text: "Session started. I've loaded a Deep House set — starting with Solar by Luke Alessi. BPM locked at 128.",
      time: "10:32",
    },
    {
      sender: "ai",
      name: "Agent Nova",
      text: "Joined the session. I'll handle Deck B transitions. Next track ready: Phantom at 130 BPM.",
      time: "10:32",
    },
    { sender: "user", text: "Blend them together slowly", time: "10:33" },
    {
      sender: "ai",
      name: "Agent Alpha",
      text: "Moving crossfader gradually to center. EQ cut on low end of Deck A to smooth the transition.",
      time: "10:33",
    },
  ]);
  const [inputVal, setInputVal] = useState("");

  const sendMessage = () => {
    if (!inputVal.trim()) return;
    const newMessages = [
      ...messages,
      { sender: "user", text: inputVal, time: "10:35" },
    ];
    setMessages(newMessages);
    setInputVal("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          name: "Agent Alpha",
          text: "Got it! Adjusting the mix based on your command...",
          time: "10:35",
        },
      ]);
    }, 800);
  };

  return (
    <div className="h-screen bg-[#0A0A0A] font-['Inter'] flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0 bg-[#0D0D0D]">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">AgentDJ</span>
          </a>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-xs text-white/40 font-mono">
            SESSION — Deep House Night
          </span>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2 py-1">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[10px] text-white/60">LIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Master BPM */}
          <div className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-center">
            <div className="text-[10px] text-white/30 font-mono">
              MASTER BPM
            </div>
            <div className="text-base font-bold text-white font-mono">
              128.0
            </div>
          </div>

          {/* Master Vol */}
          <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5">
            <Volume2 className="w-3 h-3 text-white/40" />
            <input
              type="range"
              min={0}
              max={100}
              value={masterVol}
              onChange={(e) => setMasterVol(Number(e.target.value))}
              className="w-16 h-1 accent-blue-500 cursor-pointer"
            />
            <span className="text-[10px] font-mono text-white/40 w-6">
              {masterVol}
            </span>
          </div>

          {/* Active agents */}
          <div className="flex items-center">
            {AGENTS.filter((a) => a.online)
              .slice(0, 3)
              .map((agent, i) => (
                <div
                  key={agent.id}
                  className="w-7 h-7 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center text-white text-xs font-bold"
                  style={{
                    backgroundColor: agent.color,
                    marginLeft: i > 0 ? "-8px" : 0,
                    zIndex: 10 - i,
                  }}
                  title={agent.name}
                >
                  {agent.name.split(" ")[1][0]}
                </div>
              ))}
            <span className="text-xs text-white/40 ml-2 font-mono">
              3 agents
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setBrowserOpen(!browserOpen);
                if (chatOpen) setChatOpen(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${browserOpen ? "bg-blue-600 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}
            >
              <Music className="w-3.5 h-3.5" /> Library
            </button>
            <button
              onClick={() => {
                setChatOpen(!chatOpen);
                if (browserOpen) setBrowserOpen(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${chatOpen ? "bg-blue-600 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chat
            </button>
            <a
              href="/dashboard"
              className="px-3 py-1.5 bg-white/5 text-white/60 hover:bg-white/10 rounded-lg text-xs font-medium transition-colors"
            >
              Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Workspace */}
        <div className="flex-1 flex flex-col overflow-hidden p-3 gap-3">
          {/* Decks + Mixer */}
          <div className="flex gap-3 flex-1 min-h-0">
            {/* Deck A */}
            <div className="flex-1 overflow-y-auto custom-scroll">
              <Deck side="A" color="#3B82F6" agent={AGENTS[0]} />
            </div>

            {/* Center Mixer */}
            <div className="w-44 flex-shrink-0 flex flex-col gap-2 bg-[#111] rounded-xl border border-white/10 p-3">
              <div className="text-center text-[10px] text-white/30 font-mono uppercase tracking-widest">
                MIXER
              </div>

              {/* Agent status pills */}
              <div className="space-y-1">
                {AGENTS.filter((a) => a.online).map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center gap-1.5 bg-white/5 rounded-lg px-2 py-1"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: agent.color }}
                    />
                    <span className="text-[9px] text-white/50 truncate">
                      {agent.action}
                    </span>
                  </div>
                ))}
              </div>

              {/* Crossfader */}
              <div className="mt-auto space-y-2">
                <div className="text-center text-[10px] text-white/30 font-mono">
                  CROSSFADER
                </div>
                <div className="relative h-5 flex items-center">
                  <div className="w-full h-1 bg-white/10 rounded-full">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${crossfader}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={crossfader}
                    onChange={(e) => setCrossfader(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg pointer-events-none"
                    style={{ left: `calc(${crossfader}% - 8px)` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-white/20">
                  <span>A</span>
                  <span>B</span>
                </div>
              </div>

              {/* Channel meters */}
              <div className="flex justify-around mt-2">
                {["A", "B"].map((ch) => (
                  <div key={ch} className="flex flex-col items-center gap-1">
                    <div className="flex gap-0.5 h-16 items-end">
                      {[0.9, 0.7, 0.5, 0.3].map((h, i) => (
                        <div
                          key={i}
                          className="w-2 rounded-sm"
                          style={{
                            height: `${h * 64}px`,
                            background:
                              h > 0.8
                                ? "#EF4444"
                                : h > 0.6
                                  ? "#F59E0B"
                                  : "#22C55E",
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] text-white/30 font-mono">
                      {ch}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deck B */}
            <div className="flex-1 overflow-y-auto custom-scroll">
              <Deck side="B" color="#8B5CF6" agent={AGENTS[1]} />
            </div>
          </div>

          {/* Effects Row */}
          <div className="flex gap-3 flex-shrink-0">
            <div className="flex-1 grid grid-cols-4 gap-2">
              <FXUnit name="Reverb" color="#3B82F6" />
              <FXUnit name="Delay" color="#8B5CF6" />
              <FXUnit name="Filter" color="#EC4899" />
              <FXUnit name="Flanger" color="#F59E0B" />
            </div>
            {/* Loop Controls */}
            <div className="flex items-center gap-2 bg-[#111] rounded-xl border border-white/10 px-4">
              {["1/4", "1/2", "1", "2", "4", "8"].map((loop) => (
                <button
                  key={loop}
                  className="w-9 h-8 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-mono text-white/50 hover:text-white transition-colors"
                >
                  {loop}
                </button>
              ))}
              <div className="w-px h-6 bg-white/10" />
              <button className="px-3 h-8 bg-blue-600/20 border border-blue-600/30 text-blue-400 rounded-lg text-[10px] font-mono hover:bg-blue-600/30 transition-colors">
                LOOP IN
              </button>
              <button className="px-3 h-8 bg-blue-600/20 border border-blue-600/30 text-blue-400 rounded-lg text-[10px] font-mono hover:bg-blue-600/30 transition-colors">
                LOOP OUT
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel — Chat or Browser */}
        {(chatOpen || browserOpen) && (
          <div className="w-72 flex-shrink-0 border-l border-white/10 flex flex-col bg-[#0D0D0D]">
            {chatOpen && (
              <>
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <span className="text-xs font-semibold text-white/80">
                    Agent Chat
                  </span>
                  <button
                    onClick={() => setChatOpen(false)}
                    className="text-white/30 hover:text-white/60"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`${msg.sender === "user" ? "flex flex-row-reverse" : ""}`}
                    >
                      {msg.sender === "ai" && (
                        <div className="text-[10px] text-white/30 mb-1 font-mono">
                          {msg.name}
                        </div>
                      )}
                      <div
                        className={`rounded-xl px-3 py-2 text-xs ${msg.sender === "user" ? "bg-blue-600 text-white ml-8" : "bg-white/5 border border-white/10 text-white/80 mr-8"}`}
                      >
                        {msg.text}
                        <div
                          className={`text-[9px] mt-1 font-mono ${msg.sender === "user" ? "text-blue-200/60" : "text-white/20"}`}
                        >
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-white/10">
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {["Mix out", "Add reverb", "Slow down", "Next track"].map(
                      (cmd) => (
                        <button
                          key={cmd}
                          onClick={() => setInputVal(cmd)}
                          className="bg-white/5 border border-white/10 rounded-full px-2 py-0.5 text-[10px] text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors"
                        >
                          {cmd}
                        </button>
                      ),
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Command agents..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={sendMessage}
                      className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Send className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {browserOpen && (
              <>
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <span className="text-xs font-semibold text-white/80">
                    Track Library
                  </span>
                  <button
                    onClick={() => setBrowserOpen(false)}
                    className="text-white/30 hover:text-white/60"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                  {TRACKS.map((track, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/5 cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-purple-600 flex-shrink-0 flex items-center justify-center">
                        <Music className="w-3.5 h-3.5 text-white/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-white/80 truncate">
                          {track.title}
                        </div>
                        <div className="text-[10px] text-white/40 truncate">
                          {track.artist}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-[10px] font-mono text-white/30">
                          {track.bpm}
                        </div>
                        <div className="text-[10px] text-white/20">
                          {track.key}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
    </div>
  );
}
