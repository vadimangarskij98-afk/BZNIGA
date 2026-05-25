import {
  Play,
  Users,
  Sparkles,
  Zap,
  Music,
  Radio,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] font-['Inter'] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold">AgentDJ</span>
          </div>
          <nav className="flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="/dashboard"
              className="text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              Sign In
            </a>
            <a
              href="/workspace"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Open Workspace
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-full px-3 py-1.5 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" /> Now in Beta
          </div>
          <h1 className="text-6xl font-semibold tracking-tight mb-6 leading-tight">
            AI Agents That DJ <span className="text-blue-400">Together</span>
          </h1>
          <p className="text-xl text-white/50 mb-10 leading-relaxed">
            A professional DJ workstation powered by AI agents. Mix tracks,
            apply effects, and collaborate in real-time with intelligent music
            agents.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="/workspace"
              className="px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <Play className="w-5 h-5" /> Open Workspace
            </a>
            <a
              href="#how-it-works"
              className="px-6 py-3 bg-white/5 border border-white/10 text-white/80 text-base font-medium rounded-lg hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              Learn more <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Workspace preview */}
        <div className="mt-16 rounded-xl border border-white/10 overflow-hidden bg-[#111]">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div>
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-white/30 font-mono">
              AgentDJ Workspace — 3 agents active
            </span>
          </div>
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {[
              {
                label: "DECK A",
                agent: "Agent Alpha",
                track: "Solar — Luke Alessi",
                bpm: "128 BPM",
                color: "#3B82F6",
              },
              {
                label: "MIXER",
                agent: "Crossfader",
                track: "A ◀──●── B",
                bpm: "EQ / FX",
                color: "#8B5CF6",
              },
              {
                label: "DECK B",
                agent: "Agent Nova",
                track: "Phantom — Agents of Time",
                bpm: "130 BPM",
                color: "#8B5CF6",
              },
            ].map((d, i) => (
              <div key={i} className="p-5">
                <div className="text-[10px] text-white/30 font-mono mb-2">
                  {d.label}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: d.color }}
                  >
                    {d.agent[6]}
                  </div>
                  <span className="text-xs text-white/50">{d.agent}</span>
                </div>
                <div className="text-sm font-medium text-white mb-1">
                  {d.track}
                </div>
                <div className="text-[11px] text-white/30 font-mono">
                  {d.bpm}
                </div>
                {i !== 1 && (
                  <div className="mt-3 flex gap-0.5 h-8 items-end">
                    {Array.from({ length: 30 }).map((_, j) => (
                      <div
                        key={j}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${10 + Math.abs(Math.sin(j * 0.7) * 18)}px`,
                          backgroundColor: j < 11 ? d.color : `${d.color}33`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">
              Everything a DJ needs. Powered by AI.
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Professional tools built for multi-agent collaboration
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                icon: Users,
                title: "Multi-Agent Collaboration",
                desc: "Multiple AI DJs work together, each controlling different aspects of the mix",
              },
              {
                icon: Music,
                title: "Professional Mixer",
                desc: "Full EQ, crossfader, gain, and per-channel effects on both decks",
              },
              {
                icon: Zap,
                title: "Real-time Effects",
                desc: "Reverb, delay, filter, flanger — agents apply effects intelligently",
              },
              {
                icon: Radio,
                title: "Live Sessions",
                desc: "Join or create live collaborative sessions with other AI agents and users",
              },
              {
                icon: Sparkles,
                title: "AI Track Selection",
                desc: "Agents analyze tempo, energy, and key to select the perfect next track",
              },
              {
                icon: Play,
                title: "Set Recording",
                desc: "Record full sets with all agent activity logged for review and replay",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mb-3">
                  <f.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold mb-2">{f.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
          </div>
          <div className="grid grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Connect Agents",
                desc: "Choose AI agents with different styles and specialties. Each agent controls part of the mix.",
              },
              {
                step: "02",
                title: "Open Workspace",
                desc: "Launch the professional DJ workspace. Agents start mixing and coordinating automatically.",
              },
              {
                step: "03",
                title: "Control & Command",
                desc: "Guide the session with natural language commands while agents handle the technical work.",
              },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600/20 border border-blue-600/30 text-blue-400 text-lg font-semibold rounded-xl mb-5">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Simple Pricing</h2>
            <p className="text-white/50">Start free, upgrade as you grow</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "$9",
                features: [
                  "2 AI agents",
                  "10h sessions/mo",
                  "Basic effects",
                  "Set recording",
                ],
              },
              {
                name: "Professional",
                price: "$29",
                popular: true,
                features: [
                  "5 AI agents",
                  "Unlimited sessions",
                  "Full effects suite",
                  "HD recording",
                  "Spotify & Apple Music",
                ],
              },
              {
                name: "Studio",
                price: "$79",
                features: [
                  "Unlimited agents",
                  "Custom agent training",
                  "API access",
                  "White-label",
                  "Priority support",
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`rounded-xl border p-6 relative ${plan.popular ? "border-blue-600 bg-blue-600/5" : "border-white/10 bg-white/5"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}
                <h3 className="text-base font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl font-semibold">{plan.price}</span>
                  <span className="text-sm text-white/40">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <li
                      key={j}
                      className="text-sm text-white/60 flex items-start gap-2"
                    >
                      <span className="text-white/30 mt-0.5">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/workspace"
                  className={`block text-center py-2.5 text-sm font-medium rounded-lg transition-colors ${plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white/10 hover:bg-white/15 text-white"}`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-6">Ready to mix with AI?</h2>
          <p className="text-white/50 text-lg mb-10">
            Launch the workspace and let AI agents handle the mixing
          </p>
          <a
            href="/workspace"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Play className="w-5 h-5" /> Launch Workspace
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold">AgentDJ</span>
          </div>
          <p className="text-xs text-white/30">
            © 2026 AgentDJ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
