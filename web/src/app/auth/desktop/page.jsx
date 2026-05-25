"use client";
import { useState } from "react";
import { Radio, CheckCircle, X } from "lucide-react";

export default function DesktopAuthPage() {
  const [approved, setApproved] = useState(false);
  const [denied, setDenied] = useState(false);

  const handleApprove = () => {
    setApproved(true);
    // В реальности здесь был бы редирект с токеном
    setTimeout(() => {
      window.location.href = "agentdj://auth?token=mock_token_123&success=true";
    }, 1500);
  };

  const handleDeny = () => {
    setDenied(true);
    setTimeout(() => {
      window.close();
    }, 1500);
  };

  if (approved) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center font-['Inter']">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Вход подтверждён!
          </h1>
          <p className="text-white/50">Возвращаемся в приложение...</p>
        </div>
      </div>
    );
  }

  if (denied) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center font-['Inter']">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Вход отклонён</h1>
          <p className="text-white/50">Окно закроется автоматически</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 font-['Inter']">
      <div className="max-w-md w-full">
        {/* App Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/20">
            <Radio className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-[#111] rounded-2xl border border-white/10 p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Подтвердите вход
          </h1>
          <p className="text-sm text-white/50 text-center mb-8">
            BEZNIGGATIVA запрашивает доступ к вашему аккаунту
          </p>

          {/* User Info */}
          <div className="bg-white/5 rounded-xl p-4 mb-8 flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              БН
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                Администратор
              </div>
              <div className="text-xs text-white/40">admin@agentdj.com</div>
            </div>
          </div>

          {/* Permissions */}
          <div className="mb-8">
            <div className="text-xs font-semibold text-white/70 mb-3">
              Приложение получит доступ к:
            </div>
            <div className="space-y-2">
              {[
                "Вашему профилю и настройкам",
                "Библиотеке треков",
                "Истории сессий",
                "Настройкам агентов",
              ].map((permission, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-xs text-white/60">{permission}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleApprove}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-semibold rounded-xl transition-all"
            >
              Разрешить вход
            </button>
            <button
              onClick={handleDeny}
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-white/70 font-medium rounded-xl transition-all"
            >
              Отклонить
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-white/30 text-center mt-6">
          Вход через безопасное соединение с вашим аккаунтом BEZNIGGATIVA
        </p>
      </div>
    </div>
  );
}
