"use client";
import { useState, useEffect } from "react";
import {
  Users,
  Bot,
  CreditCard,
  BarChart3,
  Settings,
  Music,
  Activity,
  TrendingUp,
} from "lucide-react";
import { useTranslation } from "@/i18n";

export default function AdminPage() {
  const { t } = useTranslation();
  const [tab, setTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    if (tab === "users") fetchUsers();
    if (tab === "agents") fetchAgents();
  }, [tab]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    if (data.success) setUsers(data.users);
  };

  const fetchAgents = async () => {
    const res = await fetch("/api/agents");
    const data = await res.json();
    if (data.success) setAgents(data.agents);
  };

  const updateUserPlan = async (userId, newPlan) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, plan: newPlan }),
    });
    if (res.ok) fetchUsers();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-['Inter'] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0D0D0D]">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Админ-панель AgentDJ</h1>
              <p className="text-xs text-white/40">Управление платформой</p>
            </div>
          </div>
          <a href="/" className="text-sm text-white/50 hover:text-white">
            ← На главную
          </a>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 min-h-[calc(100vh-73px)] bg-[#0D0D0D]">
          <nav className="p-4 space-y-1">
            {[
              { id: "dashboard", icon: BarChart3, label: "Панель управления" },
              { id: "users", icon: Users, label: "Пользователи" },
              { id: "agents", icon: Bot, label: "AI-агенты" },
              { id: "subscriptions", icon: CreditCard, label: "Подписки" },
              { id: "sessions", icon: Activity, label: "Сессии" },
              { id: "tracks", icon: Music, label: "Треки" },
              { id: "analytics", icon: TrendingUp, label: "Аналитика" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  tab === item.id
                    ? "bg-blue-600 text-white"
                    : "text-white/60 hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {tab === "dashboard" && stats && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Обзор платформы</h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-[#111] rounded-xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-blue-400" />
                    <span className="text-xs text-white/30">
                      +{stats.stats.new_users_30d} за 30д
                    </span>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {stats.stats.total_users}
                  </div>
                  <div className="text-sm text-white/40">
                    Всего пользователей
                  </div>
                </div>

                <div className="bg-[#111] rounded-xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="w-8 h-8 text-green-400" />
                    <span className="text-xs text-white/30">
                      {stats.stats.active_sessions} активных
                    </span>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {stats.stats.total_sessions}
                  </div>
                  <div className="text-sm text-white/40">Всего сессий</div>
                </div>

                <div className="bg-[#111] rounded-xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Music className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {stats.stats.total_tracks}
                  </div>
                  <div className="text-sm text-white/40">
                    Треков в библиотеке
                  </div>
                </div>

                <div className="bg-[#111] rounded-xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Bot className="w-8 h-8 text-amber-400" />
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {stats.stats.global_agents}
                  </div>
                  <div className="text-sm text-white/40">AI-агентов</div>
                </div>
              </div>

              {/* Plans distribution */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111] rounded-xl border border-white/10 p-6">
                  <h3 className="text-lg font-bold mb-4">
                    Распределение по тарифам
                  </h3>
                  <div className="space-y-3">
                    {stats.plans.map((plan) => (
                      <div
                        key={plan.plan}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-white/70 capitalize">
                          {plan.plan}
                        </span>
                        <span className="text-sm font-mono text-white">
                          {plan.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#111] rounded-xl border border-white/10 p-6">
                  <h3 className="text-lg font-bold mb-4">Популярные жанры</h3>
                  <div className="space-y-3">
                    {stats.genres.slice(0, 5).map((genre) => (
                      <div
                        key={genre.genre}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-white/70">
                          {genre.genre}
                        </span>
                        <span className="text-sm font-mono text-white">
                          {genre.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent sessions */}
              <div className="bg-[#111] rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-bold mb-4">Последние сессии</h3>
                <div className="space-y-2">
                  {stats.recentSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                    >
                      <div>
                        <div className="text-sm font-medium">
                          {session.name}
                        </div>
                        <div className="text-xs text-white/30">
                          {session.user_name} · {session.agent_count} агентов
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          session.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-white/5 text-white/40"
                        }`}
                      >
                        {session.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "users" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Пользователи</h2>
              <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-white/40">
                        Email
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-white/40">
                        Имя
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-white/40">
                        План
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-white/40">
                        Сессий
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-white/40">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="px-6 py-4 text-sm">{user.email}</td>
                        <td className="px-6 py-4 text-sm">{user.name}</td>
                        <td className="px-6 py-4">
                          <select
                            value={user.plan}
                            onChange={(e) =>
                              updateUserPlan(user.id, e.target.value)
                            }
                            className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm"
                          >
                            <option value="starter">Старт</option>
                            <option value="professional">Профессионал</option>
                            <option value="studio">Студия</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/60">
                          {user.session_count}
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-xs text-blue-400 hover:text-blue-300">
                            Детали
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "agents" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">AI-агенты</h2>
              <div className="grid grid-cols-2 gap-6">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-[#111] rounded-xl border border-white/10 p-6"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                        style={{
                          backgroundColor: `${agent.color}20`,
                          color: agent.color,
                        }}
                      >
                        {agent.name[6]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{agent.name}</h3>
                        <p className="text-sm text-white/50">
                          {agent.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/40">BPM диапазон:</span>
                        <span className="font-mono">
                          {agent.bpm_min} - {agent.bpm_max}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">Навыки:</span>
                        <span className="text-xs">
                          {agent.skills?.length || 0} навыков
                        </span>
                      </div>
                    </div>
                    <button className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">
                      Настроить агента
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
