"use client";
import { useState } from "react";
import {
  Radio,
  LayoutDashboard,
  Music,
  Disc,
  Users,
  Settings,
  User,
  CreditCard,
  Play,
  Pause,
  Volume2,
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter']">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">AgentDJ</span>
          </a>

          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 text-sm font-medium hover:bg-blue-100 transition-colors">
              <Play className="w-4 h-4" />
              New Session
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              JD
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-1">
            {[
              { id: "overview", icon: LayoutDashboard, label: "Overview" },
              { id: "chat", icon: Radio, label: "AI Chat" },
              { id: "playlists", icon: Music, label: "Playlists" },
              { id: "sets", icon: Disc, label: "Recorded Sets" },
              { id: "sessions", icon: Users, label: "Live Sessions" },
              { id: "connections", icon: Settings, label: "Connections" },
              { id: "profile", icon: User, label: "Profile" },
              { id: "subscription", icon: CreditCard, label: "Subscription" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === item.id
                    ? "bg-gray-50 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "chat" && <ChatTab />}
          {activeTab === "playlists" && <PlaylistsTab />}
          {activeTab === "sets" && <SetsTab />}
          {activeTab === "sessions" && <SessionsTab />}
          {activeTab === "connections" && <ConnectionsTab />}
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "subscription" && <SubscriptionTab />}
        </main>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Overview</h1>
        <p className="text-sm text-gray-500">Your AI DJ dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Sessions", value: "47", change: "+12 this week" },
          { label: "Hours Mixed", value: "124", change: "+18 this week" },
          { label: "Active Agents", value: "3", change: "2 online now" },
          { label: "Playlists Created", value: "23", change: "5 AI-generated" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-gray-500">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Active Session */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">
            Active Session
          </h2>
          <div className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Live</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg"></div>
          <div className="flex-1">
            <div className="text-lg font-semibold text-gray-900 mb-1">
              Deep House Vibes
            </div>
            <div className="text-sm text-gray-500 mb-2">
              Mixed by Agent Nova & Agent Echo
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Currently playing:</span>
              <span className="text-xs font-medium text-gray-900">
                Solar - Luke Alessi
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700">
              <Pause className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200">
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-blue-600 rounded-full"></div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">2:34</span>
          <span className="text-xs text-gray-500">3:47</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {[
            {
              action: "Session started",
              detail: "Agent Alpha joined collaboration",
              time: "5 min ago",
            },
            {
              action: "Playlist created",
              detail: "Summer Nights Collection (AI)",
              time: "2 hours ago",
            },
            {
              action: "Set recorded",
              detail: "Midnight Mix - 2h 14m",
              time: "1 day ago",
            },
            {
              action: "Agent connected",
              detail: "Agent Nova added to roster",
              time: "2 days ago",
            },
          ].map((activity, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {activity.action}
                </div>
                <div className="text-xs text-gray-500">{activity.detail}</div>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatTab() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hey! Ready to mix some tracks? What vibe are we going for today?",
      time: "10:32 AM",
    },
    {
      sender: "user",
      text: "Something upbeat, maybe house music",
      time: "10:33 AM",
    },
    {
      sender: "ai",
      text: "Perfect! I'll start building a progressive house set. Want me to bring in Agent Nova for some deeper basslines?",
      time: "10:33 AM",
    },
  ]);

  return (
    <div className="max-w-4xl h-[calc(100vh-200px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          AI DJ Chat
        </h1>
        <p className="text-sm text-gray-500">
          Control your DJ session through commands
        </p>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-gray-200 flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-md ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"} rounded-lg px-4 py-3`}
              >
                <p className="text-sm">{msg.text}</p>
                <span
                  className={`text-xs mt-1 block ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a command or question..."
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Send
            </button>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-500">Quick commands:</span>
            {["Mix faster", "Add bass", "Change genre", "Invite agent"].map(
              (cmd) => (
                <button
                  key={cmd}
                  className="bg-white border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
                >
                  {cmd}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaylistsTab() {
  const playlists = [
    {
      name: "Summer Nights",
      tracks: 42,
      duration: "3h 12m",
      type: "AI Generated",
      genre: "Deep House",
    },
    {
      name: "Midnight Drive",
      tracks: 28,
      duration: "2h 04m",
      type: "Manual",
      genre: "Synthwave",
    },
    {
      name: "Workout Energy",
      tracks: 35,
      duration: "2h 45m",
      type: "AI Generated",
      genre: "Tech House",
    },
    {
      name: "Chill Vibes",
      tracks: 51,
      duration: "4h 18m",
      type: "AI Generated",
      genre: "Ambient",
    },
  ];

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Playlists
          </h1>
          <p className="text-sm text-gray-500">
            Your AI-generated and custom playlists
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 text-sm font-medium hover:bg-blue-100">
          <Play className="w-4 h-4" />
          Generate AI Playlist
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {playlists.map((playlist, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {playlist.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-2 py-0.5 text-xs text-gray-700">
                    {playlist.genre}
                  </span>
                  {playlist.type === "AI Generated" && (
                    <span className="bg-blue-50 text-blue-600 rounded-full px-2 py-0.5 text-xs font-medium">
                      AI
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {playlist.tracks} tracks · {playlist.duration}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SetsTab() {
  const sets = [
    {
      name: "Midnight Mix",
      duration: "2h 14m",
      date: "Jan 15, 2026",
      agents: ["Alpha", "Nova"],
      plays: 142,
    },
    {
      name: "Sunday Morning",
      duration: "1h 47m",
      date: "Jan 12, 2026",
      agents: ["Echo"],
      plays: 89,
    },
    {
      name: "Peak Hours",
      duration: "3h 02m",
      date: "Jan 8, 2026",
      agents: ["Alpha", "Nova", "Echo"],
      plays: 267,
    },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Recorded Sets
        </h1>
        <p className="text-sm text-gray-500">Your saved DJ sessions</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">
                Name
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">
                Duration
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">
                Agents
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">
                Date
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">
                Plays
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {sets.map((set, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {set.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {set.duration}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    {set.agents.map((agent) => (
                      <span
                        key={agent}
                        className="bg-white border border-gray-200 rounded-full px-2 py-0.5 text-xs text-gray-700"
                      >
                        {agent}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{set.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{set.plays}</td>
                <td className="px-6 py-4">
                  <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                    Play
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SessionsTab() {
  const agents = [
    {
      name: "Agent Alpha",
      specialty: "House & Techno",
      status: "online",
      sessions: 24,
    },
    {
      name: "Agent Nova",
      specialty: "Deep House",
      status: "online",
      sessions: 18,
    },
    {
      name: "Agent Echo",
      specialty: "Ambient & Chill",
      status: "offline",
      sessions: 15,
    },
    {
      name: "Agent Pulse",
      specialty: "Drum & Bass",
      status: "online",
      sessions: 31,
    },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Live Sessions
        </h1>
        <p className="text-sm text-gray-500">
          Connect and collaborate with AI agents
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {agents.map((agent, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {agent.name.split(" ")[1][0]}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-gray-500">{agent.specialty}</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${agent.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                ></div>
                <span className="text-xs text-gray-700 capitalize">
                  {agent.status}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <span className="text-gray-400 mr-2">-</span>
              {agent.sessions} collaborative sessions
            </div>
            <button
              className={`w-full py-2 text-sm font-medium rounded-lg transition-colors ${
                agent.status === "online"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              disabled={agent.status === "offline"}
            >
              {agent.status === "online" ? "Start Session" : "Offline"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConnectionsTab() {
  const services = [
    { name: "Spotify", connected: true, icon: "🎵" },
    { name: "Apple Music", connected: false, icon: "🎧" },
    { name: "SoundCloud", connected: true, icon: "☁️" },
    { name: "YouTube Music", connected: false, icon: "▶️" },
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Music Connections
        </h1>
        <p className="text-sm text-gray-500">Connect your streaming services</p>
      </div>

      <div className="space-y-3">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                {service.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {service.connected ? "Connected" : "Not connected"}
                </p>
              </div>
            </div>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                service.connected
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {service.connected ? "Disconnect" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Profile</h1>
        <p className="text-sm text-gray-500">
          Your listening statistics and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-3xl">
            JD
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              John Doe
            </h2>
            <p className="text-sm text-gray-500 mb-4">john.doe@email.com</p>
            <div className="flex items-center gap-2">
              <span className="bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-xs font-medium">
                Professional Plan
              </span>
              <span className="bg-white border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-700">
                Member since Jan 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Listening Stats
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <div className="text-2xl font-semibold text-gray-900 mb-1">124</div>
            <div className="text-xs text-gray-500">Hours listened</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-900 mb-1">47</div>
            <div className="text-xs text-gray-500">Sessions completed</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-900 mb-1">23</div>
            <div className="text-xs text-gray-500">Playlists created</div>
          </div>
        </div>
      </div>

      {/* Top Genres */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Top Genres
        </h3>
        <div className="space-y-3">
          {[
            { genre: "Deep House", percentage: 42 },
            { genre: "Techno", percentage: 28 },
            { genre: "Ambient", percentage: 18 },
            { genre: "Tech House", percentage: 12 },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700">{item.genre}</span>
                <span className="text-sm font-medium text-gray-900">
                  {item.percentage}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SubscriptionTab() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Subscription
        </h1>
        <p className="text-sm text-gray-500">Manage your plan and billing</p>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Professional Plan
            </h3>
            <p className="text-sm text-gray-500">
              Up to 5 AI agents, unlimited sessions
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold text-gray-900">$29</div>
            <div className="text-xs text-gray-500">per month</div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Next billing date</span>
            <span className="text-gray-900 font-medium">Feb 15, 2026</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Payment method</span>
            <span className="text-gray-900 font-medium">•••• 4242</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
            Upgrade Plan
          </button>
          <button className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
            Manage Billing
          </button>
        </div>
      </div>

      {/* Available Plans */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Available Plans
        </h3>
        <div className="space-y-4">
          {[
            { name: "Starter", price: "$9", current: false },
            { name: "Professional", price: "$29", current: true },
            { name: "Studio", price: "$79", current: false },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${plan.current ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {plan.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {plan.price}/month
                  </div>
                </div>
                {plan.current ? (
                  <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Current Plan
                  </span>
                ) : (
                  <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                    Select
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
