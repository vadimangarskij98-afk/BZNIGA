"use client";
import { useState } from "react";
import {
  Radio,
  Globe,
  Building2,
  Music2,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState("ru");
  const [venueType, setVenueType] = useState("");
  const [animating, setAnimating] = useState(false);

  const completeOnboarding = async () => {
    setAnimating(true);

    try {
      await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: 1, language, venue_type: venueType }),
      });

      setTimeout(() => {
        window.location.href = "/workspace";
      }, 3000);
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  if (animating) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div
            className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-600/40"
            style={{
              animation:
                "pulse 1.5s ease-in-out infinite, scale 3s ease-in-out forwards",
            }}
          >
            <Radio className="w-16 h-16 text-white" />
          </div>
          <p
            className="text-white/50 text-lg"
            style={{ animation: "fadeIn 2s ease-in" }}
          >
            Загружаем ваш воркспейс...
          </p>
        </div>

        <style jsx>{`
          @keyframes scale {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 font-['Inter'] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Step 1: Welcome */}
        {step === 1 && (
          <div
            className="text-center"
            style={{ animation: "slideUp 0.6s ease-out" }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-600/30">
              <Radio className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
              BEZNIGGATIVA
            </h1>

            <p className="text-2xl text-white/70 mb-3">Добро пожаловать!</p>
            <p className="text-lg text-white/50 mb-12 max-w-xl mx-auto">
              Это современный AI-диджей, который работает вместе с вами. Давайте
              начнём настройку.
            </p>

            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white text-lg font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/30"
            >
              Начать <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Step 2: Language */}
        {step === 2 && (
          <div style={{ animation: "slideUp 0.6s ease-out" }}>
            <div className="text-center mb-12">
              <Globe className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-white mb-2">
                Выберите язык
              </h2>
              <p className="text-white/50">Основной язык интерфейса</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { code: "ru", name: "Русский", flag: "🇷🇺" },
                { code: "en", name: "English", flag: "🇬🇧" },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`p-8 rounded-2xl border-2 transition-all ${
                    language === lang.code
                      ? "border-blue-600 bg-blue-600/10 scale-105"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="text-6xl mb-4">{lang.flag}</div>
                  <div className="text-xl font-bold text-white">
                    {lang.name}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!language}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-bold rounded-2xl transition-all"
            >
              Далее
            </button>
          </div>
        )}

        {/* Step 3: Venue Type */}
        {step === 3 && (
          <div style={{ animation: "slideUp 0.6s ease-out" }}>
            <div className="text-center mb-12">
              <Building2 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-white mb-2">
                Где вы будете играть?
              </h2>
              <p className="text-white/50">
                Это поможет AI настроить стиль под ваше заведение
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                {
                  id: "club",
                  name: "Клуб",
                  icon: "🎉",
                  desc: "Танцевальная музыка, энергия",
                },
                {
                  id: "bar",
                  name: "Бар",
                  icon: "🍸",
                  desc: "Спокойная атмосфера, фон",
                },
                {
                  id: "festival",
                  name: "Фестиваль",
                  icon: "🎪",
                  desc: "Открытая площадка, массовость",
                },
                {
                  id: "private",
                  name: "Частные мероприятия",
                  icon: "🎊",
                  desc: "Свадьбы, корпоративы",
                },
              ].map((venue) => (
                <button
                  key={venue.id}
                  onClick={() => setVenueType(venue.id)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    venueType === venue.id
                      ? "border-blue-600 bg-blue-600/10 scale-105"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="text-5xl mb-3">{venue.icon}</div>
                  <div className="text-lg font-bold text-white mb-1">
                    {venue.name}
                  </div>
                  <div className="text-xs text-white/40">{venue.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={completeOnboarding}
              disabled={!venueType}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-bold rounded-2xl transition-all inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Начать работу
            </button>
          </div>
        )}

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i <= step ? "w-8 bg-blue-600" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.2); }
        }
      `}</style>
    </div>
  );
}
