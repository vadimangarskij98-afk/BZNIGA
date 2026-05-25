"use client";
import { useEffect, useState, useRef } from "react";
import {
  Play,
  Users,
  Sparkles,
  Zap,
  Music,
  Radio,
  ArrowRight,
  Globe,
} from "lucide-react";
import { useTranslation } from "@/i18n";

function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
    }));

    const bars = Array.from({ length: 80 }, (_, i) => ({
      x: i,
      height: 0,
      targetHeight: Math.random() * 120 + 30,
    }));

    let frame = 0;
    function animate() {
      ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.2 + Math.sin(frame * 0.015 + p.x * 0.01) * 0.15})`;
        ctx.fill();
      });

      const barWidth = canvas.width / bars.length;
      bars.forEach((bar, i) => {
        bar.height += (bar.targetHeight - bar.height) * 0.08;
        if (Math.random() < 0.015) {
          bar.targetHeight = Math.random() * 120 + 30;
        }

        const x = i * barWidth;
        const gradient = ctx.createLinearGradient(
          x,
          canvas.height,
          x,
          canvas.height - bar.height,
        );
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.12)");
        gradient.addColorStop(1, "rgba(139, 92, 246, 0.06)");

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - bar.height, barWidth - 1, bar.height);
      });

      frame++;
      requestAnimationFrame(animate);
    }
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

function ScrollReveal({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
      }}
    >
      {children}
    </div>
  );
}

function LiveStat({ value, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = parseInt(value);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
        {count.toLocaleString()}+
      </div>
      <div className="text-sm text-white/40">{label}</div>
    </div>
  );
}

export default function LandingPage() {
  const { language, setLanguage, t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-['Inter'] text-white relative overflow-hidden">
      <AnimatedBackground />

      <header className="border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">AgentDJ</span>
          </div>
          <nav className="flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {t("nav.features")}
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {t("nav.howItWorks")}
            </a>
            <a
              href="#pricing"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {t("nav.pricing")}
            </a>

            <button
              onClick={() => setLanguage(language === "ru" ? "en" : "ru")}
              className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors px-3 py-1.5 bg-white/5 rounded-lg"
            >
              <Globe className="w-4 h-4" />
              <span className="font-mono uppercase font-semibold">
                {language}
              </span>
            </button>

            <a
              href="/dashboard"
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              {t("nav.signIn")}
            </a>
            <a
              href="/workspace"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all shadow-lg shadow-blue-600/20"
            >
              {t("nav.openWorkspace")}
            </a>
          </nav>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/15 to-purple-600/15 text-blue-300 border border-blue-600/20 rounded-full px-4 py-2 text-sm font-medium mb-8 backdrop-blur-md">
              <Sparkles className="w-4 h-4" /> {t("hero.badge")}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-8xl font-extrabold tracking-tight mb-8 leading-tight">
              {t("hero.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
                {t("hero.titleHighlight")}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-2xl text-white/60 mb-12 leading-relaxed max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex items-center justify-center gap-5">
              <a
                href="/workspace"
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-2xl hover:shadow-2xl hover:shadow-blue-600/40 transition-all inline-flex items-center gap-3 transform hover:scale-105"
              >
                <Play className="w-6 h-6" /> {t("hero.cta")}
              </a>
              <a
                href="#how-it-works"
                className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white/90 text-lg font-bold rounded-2xl hover:bg-white/10 transition-all inline-flex items-center gap-3"
              >
                {t("hero.learnMore")} <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={400}>
          <div className="mt-32 grid grid-cols-3 gap-12 max-w-4xl mx-auto">
            <LiveStat
              value="3247"
              label={
                language === "ru" ? "Активные пользователи" : "Active users"
              }
            />
            <LiveStat
              value="15842"
              label={language === "ru" ? "Живых сессий" : "Live sessions"}
            />
            <LiveStat
              value="247"
              label={language === "ru" ? "AI-агентов" : "AI agents"}
            />
          </div>
        </ScrollReveal>
      </section>

      <ScrollReveal>
        <section
          id="features"
          className="py-32 border-t border-white/10 relative z-10"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold mb-6">
                {t("features.title")}
              </h2>
              <p className="text-white/50 text-xl max-w-3xl mx-auto">
                {t("features.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: t("features.multiAgent.title"),
                  desc: t("features.multiAgent.desc"),
                  color: "from-blue-600 to-blue-400",
                },
                {
                  icon: Music,
                  title: t("features.mixer.title"),
                  desc: t("features.mixer.desc"),
                  color: "from-purple-600 to-purple-400",
                },
                {
                  icon: Zap,
                  title: t("features.effects.title"),
                  desc: t("features.effects.desc"),
                  color: "from-pink-600 to-pink-400",
                },
                {
                  icon: Radio,
                  title: t("features.sessions.title"),
                  desc: t("features.sessions.desc"),
                  color: "from-green-600 to-green-400",
                },
                {
                  icon: Sparkles,
                  title: t("features.aiSelection.title"),
                  desc: t("features.aiSelection.desc"),
                  color: "from-amber-600 to-amber-400",
                },
                {
                  icon: Play,
                  title: t("features.recording.title"),
                  desc: t("features.recording.desc"),
                  color: "from-cyan-600 to-cyan-400",
                },
              ].map((f, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm group">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <f.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <footer className="border-t border-white/10 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold">AgentDJ</span>
          </div>
          <p className="text-xs text-white/30">{t("footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
}
