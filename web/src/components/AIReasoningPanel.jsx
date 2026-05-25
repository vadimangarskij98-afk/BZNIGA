"use client";
import { useState, useEffect } from "react";
import {
  Brain,
  Clock,
  Music,
  Zap,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

export default function AIReasoningPanel({ sessionId, agents }) {
  const [events, setEvents] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    fetchEvents();
    const interval = setInterval(fetchEvents, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, [sessionId]);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/events`);
      const data = await res.json();
      if (data.success) {
        setEvents(data.events.slice(0, 10));

        // Extract latest planning from events
        const latestAction = data.events.find(
          (e) => e.event_type === "dj_action" && e.payload?.planning,
        );
        if (latestAction) {
          setCurrentPlan(latestAction.payload.planning);
        }
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case "load_track":
        return <Music className="w-4 h-4" />;
      case "apply_effect":
        return <Zap className="w-4 h-4" />;
      case "adjust_eq":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Brain className="w-4 h-4" />;
    }
  };

  const getEventColor = (agentColor) => agentColor || "#3B82F6";

  return (
    <div className="w-80 flex-shrink-0 border-l border-white/10 flex flex-col bg-[#0D0D0D] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <Brain className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-white/80">
            AI Рассуждения
          </span>
        </div>
        <p className="text-xs text-white/30">Мыслительный процесс агентов</p>
      </div>

      {/* Current Planning */}
      {currentPlan && (
        <div className="px-4 py-3 border-b border-white/10 bg-blue-600/5">
          <div className="text-xs text-blue-400 font-semibold mb-2 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Планирование
          </div>
          <div className="space-y-2">
            <div className="text-xs">
              <div className="text-white/40 mb-0.5">Через 30 сек:</div>
              <div className="text-white/70">{currentPlan.in_30_sec}</div>
            </div>
            <div className="text-xs">
              <div className="text-white/40 mb-0.5">Через 1 мин:</div>
              <div className="text-white/70">{currentPlan.in_1_min}</div>
            </div>
            <div className="text-xs">
              <div className="text-white/40 mb-0.5">Через 5 мин:</div>
              <div className="text-white/70">{currentPlan.in_5_min}</div>
            </div>
          </div>
        </div>
      )}

      {/* Event Timeline */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-xs text-white/40 font-semibold mb-3">
          ЛЕНТА ДЕЙСТВИЙ
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-xs text-white/30">Загрузка...</div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-xs text-white/30 text-center py-8">
            Агенты ещё не начали работу
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event, idx) => {
              const agentColor = event.agent_color || "#3B82F6";
              const isAction = event.event_type === "dj_action";

              return (
                <div
                  key={event.id}
                  className="relative pl-6 pb-3 border-l-2"
                  style={{ borderColor: `${agentColor}30` }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-[-5px] top-1 w-2 h-2 rounded-full"
                    style={{ backgroundColor: agentColor }}
                  />

                  {/* Agent name */}
                  <div
                    className="text-xs font-semibold mb-1"
                    style={{ color: agentColor }}
                  >
                    {event.agent_name}
                  </div>

                  {/* Event type */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="flex items-center gap-1 text-xs text-white/50">
                      {getEventIcon(event.payload?.action || event.event_type)}
                      <span className="capitalize">
                        {event.payload?.action ||
                          event.event_type.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  {/* Reasoning */}
                  {isAction && event.payload?.reasoning && (
                    <div className="text-xs text-white/60 leading-relaxed mb-2 bg-white/5 rounded-lg p-2">
                      {event.payload.reasoning}
                    </div>
                  )}

                  {/* Track suggestion */}
                  {isAction && event.payload?.next_track_suggestion && (
                    <div className="text-xs bg-white/5 rounded-lg p-2 border border-white/10">
                      <div className="text-white/40 mb-1">Предлагает:</div>
                      <div className="text-white/80 font-medium">
                        {event.payload.next_track_suggestion.track_title}
                      </div>
                      <div className="text-white/50 text-[10px] mt-1">
                        {event.payload.next_track_suggestion.reason}
                      </div>
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="text-[10px] text-white/20 mt-1">
                    {new Date(event.timestamp).toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Ask AI button */}
      <div className="px-4 py-3 border-t border-white/10">
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
          <Brain className="w-4 h-4" />
          Спросить AI
        </button>
      </div>
    </div>
  );
}
