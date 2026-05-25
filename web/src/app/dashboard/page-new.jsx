"use client";
import { useState, useEffect } from "react";
import {
  Radio,
  Download,
  Users,
  Clock,
  Disc,
  TrendingUp,
  HelpCircle,
  Bell,
  Settings,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardPage() {
  const [trialStatus, setTrialStatus] = useState(null);
  const [stats, setStats] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [updates, setUpdates] = useState(null);
  const [ticketForm, setTicketForm] = useState({ subject: "", message: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [trialRes, ticketsRes, updatesRes] = await Promise.all([
        fetch("/api/trial/status?user_id=1"),
        fetch("/api/support?user_id=1"),
        fetch("/api/updates/latest"),
      ]);

      const trialData = await trialRes.json();
      const ticketsData = await ticketsRes.json();
      const updatesData = await updatesRes.json();

      if (trialData.success) setTrialStatus(trialData);
      if (ticketsData.success) setTickets(ticketsData.tickets);
      if (updatesData.success) setUpdates(updatesData);

      // Mock stats for demo
      setStats({
        sessions_this_week: 12,
        hours_this_week: 24.5,
        tracks_played: 342,
        active_agents: 3,
        activity: [
          { day: "Пн", sessions: 2 },
          { day: "Вт", sessions: 3 },
          { day: "Ср", sessions: 1 },
          { day: "Чт", sessions: 4 },
          { day: "Пт", sessions: 2 },
          { day: "Сб", sessions: 0 },
          { day: "Вс", sessions: 0 },
        ],
        genres: [
          { name: "Deep House", value: 45 },
          { name: "Techno", value: 30 },
          { name: "Melodic", value: 15 },
          { name: "Other", value: 10 },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitTicket = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: 1, ...ticketForm }),
      });
      if (res.ok) {
        setTicketForm({ subject: "", message: "" });
        fetchAllData();
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
  };

  const COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B"];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-white/50">Загрузка...</div>
      </div>
    );
  }

  const quotaPercent = trialStatus?.user
    ? (trialStatus.user.sessions_used / trialStatus.user.sessions_quota) * 100
    : 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-['Inter'] text-white">
      {/* Header */}
      <header className="bg-[#0D0D0D] border-b border-white/10 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">BEZNIGGATIVA</span>
          </a>

          <div className="flex items-center gap-4">
            <a
              href="/workspace"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white rounded-lg px-5 py-2.5 text-sm font-semibold transition-all"
            >
              <Radio className="w-4 h-4" />
              Открыть воркспейс
            </a>
            <button className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5 text-white/60" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              БН
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Добро пожаловать, Администратор!
          </h1>
          <p className="text-white/50">
            Управляйте своими AI-диджеями и сессиями
          </p>
        </div>

        {/* Trial Banner */}
        {trialStatus?.trial.active && (
          <div className="mb-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-sm font-semibold text-blue-300">
                  Триальный период активен
                </div>
                <div className="text-xs text-white/50">
                  Осталось {trialStatus.trial.days_remaining} дней
                </div>
              </div>
            </div>
            <a
              href="#subscription"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
            >
              Оформить подписку
            </a>
          </div>
        )}

        {/* Plan & Quota Card */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 bg-[#111] rounded-xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white/70">
                Текущий тариф
              </h3>
              <CreditCard className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold mb-1 capitalize">
              {trialStatus?.user.plan || "Starter"}
            </div>
            <div className="text-xs text-white/40 mb-4">
              {trialStatus?.trial.active
                ? "Триал до " +
                  new Date(trialStatus.trial.expires_at).toLocaleDateString(
                    "ru-RU",
                  )
                : "Активен"}
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/50">Сессии</span>
                  <span className="text-white/70">
                    {trialStatus?.user.sessions_used || 0} /{" "}
                    {trialStatus?.user.sessions_quota || 0}
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${quotaPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/50">Часы</span>
                  <span className="text-white/70">
                    {trialStatus?.user.hours_used || 0} /{" "}
                    {trialStatus?.user.hours_quota || 0}
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{
                      width: `${((trialStatus?.user.hours_used || 0) / (trialStatus?.user.hours_quota || 10)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <button className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
              Изменить тариф
            </button>
          </div>

          {/* Stats Cards */}
          <div className="col-span-2 grid grid-cols-3 gap-4">
            <div className="bg-[#111] rounded-xl border border-white/10 p-5">
              <Users className="w-8 h-8 text-blue-400 mb-3" />
              <div className="text-2xl font-bold mb-1">
                {stats?.sessions_this_week || 0}
              </div>
              <div className="text-xs text-white/40">Сессий на этой неделе</div>
            </div>

            <div className="bg-[#111] rounded-xl border border-white/10 p-5">
              <Clock className="w-8 h-8 text-purple-400 mb-3" />
              <div className="text-2xl font-bold mb-1">
                {stats?.hours_this_week || 0}ч
              </div>
              <div className="text-xs text-white/40">Часов миксования</div>
            </div>

            <div className="bg-[#111] rounded-xl border border-white/10 p-5">
              <Disc className="w-8 h-8 text-pink-400 mb-3" />
              <div className="text-2xl font-bold mb-1">
                {stats?.tracks_played || 0}
              </div>
              <div className="text-xs text-white/40">Треков проиграно</div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-[#111] rounded-xl border border-white/10 p-6">
            <h3 className="text-base font-bold mb-4">Активность за неделю</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats?.activity || []}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="day"
                  stroke="rgba(255,255,255,0.3)"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  style={{ fontSize: "12px" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="sessions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#111] rounded-xl border border-white/10 p-6">
            <h3 className="text-base font-bold mb-4">Жанры</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={stats?.genres || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {stats?.genres.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Download App */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 rounded-xl p-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">
                Скачать десктопное приложение
              </h3>
              <p className="text-sm text-white/50">
                Доступно для macOS и Windows
              </p>
            </div>
          </div>
          <a
            href="/download"
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 rounded-lg font-semibold transition-all"
          >
            Скачать
          </a>
        </div>

        {/* Support Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-[#111] rounded-xl border border-white/10 p-6">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold">Поддержка</h3>
            </div>

            <form onSubmit={submitTicket} className="space-y-3">
              <input
                type="text"
                placeholder="Тема обращения"
                value={ticketForm.subject}
                onChange={(e) =>
                  setTicketForm((prev) => ({
                    ...prev,
                    subject: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-blue-600"
                required
              />
              <textarea
                placeholder="Опишите вашу проблему..."
                value={ticketForm.message}
                onChange={(e) =>
                  setTicketForm((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-blue-600 h-24 resize-none"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
              >
                Отправить обращение
              </button>
            </form>
          </div>

          <div className="bg-[#111] rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-bold mb-4">Ваши обращения</h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {tickets.length === 0 ? (
                <div className="text-xs text-white/30 text-center py-4">
                  Нет обращений
                </div>
              ) : (
                tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="text-sm font-medium">
                        {ticket.subject}
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          ticket.status === "open"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : ticket.status === "in_progress"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <div className="text-xs text-white/40">
                      {new Date(ticket.created_at).toLocaleDateString("ru-RU")}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Updates */}
        {updates && (
          <div className="bg-[#111] rounded-xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Обновления</h3>
              {updates.has_update && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Новое
                </span>
              )}
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-white/50">Текущая версия:</span>
                  <span className="text-sm font-mono font-bold">
                    {updates.current_version}
                  </span>
                </div>

                {updates.has_update && (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-white/50">Доступно:</span>
                      <span className="text-sm font-mono font-bold text-green-400">
                        {updates.latest_version}
                      </span>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 mb-4">
                      <div className="text-xs font-semibold text-white/70 mb-2">
                        Что нового:
                      </div>
                      <div className="text-xs text-white/50 whitespace-pre-line">
                        {updates.update?.changelog}
                      </div>
                    </div>

                    <button className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition-colors">
                      Обновить сейчас
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
