"use client";
import { useState, useEffect } from "react";
import { Download, Apple, Monitor, CheckCircle, Info } from "lucide-react";

export default function DownloadPage() {
  const [latestVersion, setLatestVersion] = useState(null);

  useEffect(() => {
    fetch("/api/updates/latest")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setLatestVersion(data.latest_version);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-['Inter'] text-white">
      {/* Header */}
      <header className="bg-[#0D0D0D] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">BEZNIGGATIVA</span>
          </a>

          <a
            href="/dashboard"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            ← Назад в личный кабинет
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-600/30 rounded-full px-4 py-2 text-sm font-medium mb-6">
            {latestVersion && (
              <>
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400">Версия {latestVersion}</span>
              </>
            )}
          </div>

          <h1 className="text-5xl font-bold mb-4">Скачать BEZNIGGATIVA</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Профессиональная DJ-станция на базе AI для macOS и Windows
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {/* macOS */}
          <div className="bg-[#111] rounded-2xl border border-white/10 p-8 hover:border-blue-600/50 transition-all group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Apple className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-2">macOS</h3>
            <p className="text-sm text-white/50 mb-6">
              Для Mac с Apple Silicon и Intel
            </p>

            <div className="space-y-2 mb-6 text-xs text-white/40">
              <div>• macOS 12.0 или новее</div>
              <div>• Apple Silicon (M1/M2/M3) или Intel</div>
              <div>• 4 ГБ RAM минимум</div>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Скачать для Mac
            </button>

            <div className="mt-3 text-center">
              <span className="text-xs text-white/30">~85 МБ</span>
            </div>
          </div>

          {/* Windows */}
          <div className="bg-[#111] rounded-2xl border border-white/10 p-8 hover:border-blue-600/50 transition-all group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Monitor className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-2">Windows</h3>
            <p className="text-sm text-white/50 mb-6">Для ПК на Windows</p>

            <div className="space-y-2 mb-6 text-xs text-white/40">
              <div>• Windows 10/11 (64-bit)</div>
              <div>• Intel или AMD процессор</div>
              <div>• 4 ГБ RAM минимум</div>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Скачать для Windows
            </button>

            <div className="mt-3 text-center">
              <span className="text-xs text-white/30">~92 МБ</span>
            </div>
          </div>
        </div>

        {/* Installation Steps */}
        <div className="bg-[#111] rounded-2xl border border-white/10 p-8 mb-12">
          <h3 className="text-xl font-bold mb-6">Установка и вход</h3>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center text-sm font-bold text-blue-400">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Скачайте приложение</h4>
                <p className="text-sm text-white/50">
                  Выберите версию для вашей операционной системы выше
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center text-sm font-bold text-blue-400">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Установите приложение</h4>
                <p className="text-sm text-white/50">
                  Откройте загруженный файл и следуйте инструкциям установщика
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center text-sm font-bold text-blue-400">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">
                  Авторизуйтесь через браузер
                </h4>
                <p className="text-sm text-white/50 mb-2">
                  Приложение откроет браузер для безопасной авторизации через
                  ваш аккаунт
                </p>
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-blue-300">
                      При первом запуске приложение попросит вас войти в
                      аккаунт. Ваш браузер откроет страницу входа, где вы
                      подтвердите доступ. После этого вы автоматически войдёте в
                      приложение.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center text-sm font-bold text-blue-400">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-1">Начните работу</h4>
                <p className="text-sm text-white/50">
                  Пройдите короткий онбординг и начните миксовать с AI-агентами
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-[#111] rounded-2xl border border-white/10 p-8">
          <h3 className="text-xl font-bold mb-6">Что входит в приложение</h3>

          <div className="grid grid-cols-2 gap-4">
            {[
              "Профессиональный DJ-микшер",
              "Несколько AI-агентов одновременно",
              "Локальная библиотека треков",
              "Анализ BPM и тональности",
              "Полный набор эффектов",
              "Запись сетов",
              "Интеграция с Pioneer DJ",
              "Автоматические обновления",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-sm text-white/70">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Back to dashboard */}
        <div className="text-center mt-12">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
          >
            ← Вернуться в личный кабинет
          </a>
        </div>
      </div>
    </div>
  );
}
