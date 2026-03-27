"use client";

import { motion } from "framer-motion";

// ─── Shared animation helpers ──────────────────────────────
const breathe = (delay = 0) => ({
  animate: { opacity: [0.92, 1, 0.92] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay },
});

const shimmer = (delay = 0) => ({
  animate: { opacity: [0.6, 1, 0.6] },
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const, delay },
});

// ─────────────────────────────────────────────────────────────
// 1. DASHBOARD PREVIEW
// ─────────────────────────────────────────────────────────────

const chartPoints = [
  [0, 70], [48, 55], [96, 62], [144, 42], [192, 48],
  [240, 30], [288, 35], [336, 18], [384, 25], [432, 12],
];
const chartLine = chartPoints.map(([x, y]) => `${x},${y}`).join(" ");
const chartArea = `0,80 ${chartLine} 432,80`;

const stats = [
  { label: "Total Users", value: "2,847", color: "#6366f1", delta: "+12.5%" },
  { label: "Revenue", value: "$48.2k", color: "#10b981", delta: "+8.1%" },
  { label: "Uptime", value: "94.3%", color: "#f59e0b", delta: "+0.3%" },
  { label: "Active", value: "1,204", color: "#ec4899", delta: "-2.4%" },
];

const activityItems = [
  { name: "Sarah K.", action: "signed up", color: "#10b981" },
  { name: "Alex R.", action: "upgraded plan", color: "#6366f1" },
  { name: "Mia T.", action: "exported data", color: "#f59e0b" },
  { name: "James L.", action: "invited team", color: "#ec4899" },
  { name: "Nora W.", action: "connected API", color: "#6366f1" },
];

export function DashboardMockup() {
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex text-[10px] font-sans overflow-hidden select-none" aria-hidden="true">
      {/* Sidebar */}
      <div className="w-[120px] shrink-0 bg-[#111118] border-r border-white/[0.04] flex flex-col py-3 px-2.5">
        <div className="h-2 w-10 rounded bg-indigo-500/60 mb-5" />
        {["Dashboard", "Analytics", "Users", "Settings"].map((item, i) => (
          <div
            key={item}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md mb-0.5 ${
              i === 0 ? "bg-indigo-500/15 text-indigo-300" : "text-[#4a4a5a]"
            }`}
          >
            <div className={`w-3 h-3 rounded ${i === 0 ? "bg-indigo-500/40" : "bg-[#1e1e2a]"}`} />
            <span className="text-[8px] truncate">{item}</span>
          </div>
        ))}
        {/* Online indicator — breathes */}
        <div className="mt-auto flex items-center gap-1.5 px-2">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
          />
          <span className="text-[6px] text-[#4a4a5a]">System live</span>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-8 bg-[#0d0d14] border-b border-white/[0.04] flex items-center justify-between px-3 shrink-0">
          <div className="w-20 h-3 rounded bg-[#1a1a24]" />
          <div className="flex gap-1.5 items-center">
            {/* Notification dot — pulses */}
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-[#1a1a24]" />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.4, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-400"
              />
            </div>
            <div className="w-4 h-4 rounded-full bg-indigo-500/50" />
          </div>
        </div>

        <div className="flex-1 p-3 overflow-hidden">
          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="bg-[#111118] border border-white/[0.04] rounded-lg p-2 relative overflow-hidden"
              >
                {/* Subtle shimmer overlay on card */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
                  className="absolute inset-y-0 w-[40%] pointer-events-none"
                  style={{ background: `linear-gradient(90deg, transparent, ${stat.color}06, transparent)` }}
                />
                <div className="relative">
                  <div className="flex items-center gap-1 mb-1">
                    {/* Icon breathes */}
                    <motion.div
                      {...breathe(i * 0.8)}
                      className="w-2.5 h-2.5 rounded"
                      style={{ background: stat.color, opacity: 0.2 }}
                    />
                    <span className="text-[7px] text-[#5c5c6b]">{stat.label}</span>
                  </div>
                  <div className="text-[13px] font-bold text-[#e8e8ed] leading-none mb-0.5 tabular-nums">
                    {stat.value}
                  </div>
                  {/* Delta pulses subtly */}
                  <motion.div
                    {...shimmer(1 + i * 0.5)}
                    className="text-[7px] font-medium"
                    style={{ color: stat.color }}
                  >
                    {stat.delta}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart + Activity */}
          <div className="grid grid-cols-5 gap-2">
            {/* Chart panel */}
            <motion.div
              {...breathe(0)}
              className="col-span-3 bg-[#111118] border border-white/[0.04] rounded-lg p-2.5"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="text-[9px] font-semibold text-[#e8e8ed]">Revenue Overview</div>
                  <div className="text-[7px] text-[#5c5c6b]">Last 30 days</div>
                </div>
                <div className="flex gap-1">
                  {["1W", "1M", "3M"].map((t, i) => (
                    <div key={t} className={`text-[6px] px-1.5 py-0.5 rounded ${i === 1 ? "bg-indigo-500/20 text-indigo-300" : "text-[#4a4a5a]"}`}>{t}</div>
                  ))}
                </div>
              </div>

              <svg viewBox="0 0 432 85" className="w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="liveChartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[20, 40, 60].map(y => (
                  <line key={y} x1="0" y1={y} x2="432" y2={y} stroke="#1e1e2a" strokeWidth="0.5" />
                ))}
                {/* Area — breathes */}
                <motion.polygon
                  points={chartArea}
                  fill="url(#liveChartFill)"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Line — draws in then glows */}
                <motion.polyline
                  points={chartLine}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ filter: "drop-shadow(0 0 3px rgba(99,102,241,0.5))" }}
                />
                {/* Data dots — pulse continuously */}
                {chartPoints.map(([x, y], i) => (
                  <motion.circle
                    key={i}
                    cx={x} cy={y} r="2.5"
                    fill="#6366f1"
                    stroke="#0a0a0f"
                    strokeWidth="1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: [1, 1.3, 1] }}
                    transition={{
                      opacity: { duration: 0.3, delay: 0.5 + i * 0.08 },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
                    }}
                  />
                ))}
                {/* Scanning line — moves across chart */}
                <motion.line
                  x1="0" y1="0" x2="0" y2="80"
                  stroke="#6366f1"
                  strokeWidth="0.5"
                  strokeOpacity="0.15"
                  animate={{ x1: [0, 432], x2: [0, 432] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </motion.div>

            {/* Activity feed */}
            <div className="col-span-2 bg-[#111118] border border-white/[0.04] rounded-lg p-2.5 overflow-hidden">
              <div className="text-[9px] font-semibold text-[#e8e8ed] mb-2">Recent Activity</div>
              <div className="space-y-1.5">
                {activityItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: [0.7, 1, 0.7], x: 0 }}
                    transition={{
                      x: { duration: 0.4, delay: 0.6 + i * 0.12 },
                      opacity: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 },
                    }}
                    className="flex items-center gap-1.5"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                      className="w-3.5 h-3.5 rounded-full shrink-0 flex items-center justify-center text-[5px] font-bold"
                      style={{ background: item.color + "30", color: item.color }}
                    >
                      {item.name[0]}
                    </motion.div>
                    <div className="min-w-0">
                      <span className="text-[7px] text-[#c8c8d0] font-medium">{item.name} </span>
                      <span className="text-[7px] text-[#5c5c6b]">{item.action}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Progress bars — shimmer */}
              <div className="mt-2 pt-2 border-t border-white/[0.04]">
                <div className="text-[7px] text-[#5c5c6b] mb-1">Goal Progress</div>
                {[
                  { label: "MRR", pct: 78, color: "#6366f1" },
                  { label: "Users", pct: 62, color: "#10b981" },
                ].map((bar, i) => (
                  <div key={bar.label} className="flex items-center gap-1.5 mb-1">
                    <span className="text-[6px] text-[#5c5c6b] w-6">{bar.label}</span>
                    <div className="flex-1 h-1 rounded-full bg-white/[0.04] overflow-hidden relative">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: bar.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${bar.pct}%` }}
                        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                      />
                      {/* Shimmer on bar */}
                      <motion.div
                        className="absolute inset-y-0 w-[30%]"
                        style={{ background: `linear-gradient(90deg, transparent, ${bar.color}40, transparent)` }}
                        animate={{ left: ["-30%", "130%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 + i * 1.5 }}
                      />
                    </div>
                    <motion.span
                      {...shimmer(i * 1.2)}
                      className="text-[6px] font-medium"
                      style={{ color: bar.color }}
                    >
                      {bar.pct}%
                    </motion.span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. LANDING PAGE PREVIEW
// ─────────────────────────────────────────────────────────────

export function LandingPageMockup() {
  return (
    <div className="w-full h-full bg-[#050507] text-[10px] font-sans overflow-hidden select-none relative" aria-hidden="true">
      {/* Nav */}
      <div className="h-8 bg-[#0a0a0f]/90 flex items-center justify-between px-6 border-b border-white/[0.03]">
        <div className="w-10 h-2.5 rounded bg-indigo-500/60" />
        <div className="flex items-center gap-3">
          {["Features", "Pricing", "Docs"].map(t => (
            <div key={t} className="text-[7px] text-[#5c5c6b]">{t}</div>
          ))}
          <motion.div
            {...breathe(0)}
            className="bg-indigo-500 text-white text-[7px] px-2 py-0.5 rounded-full font-medium"
          >
            Get Started
          </motion.div>
        </div>
      </div>

      {/* Hero area */}
      <div className="flex flex-col items-center pt-6 px-4">
        {/* Badge — breathes */}
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-[6px] text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full mb-3"
        >
          Now in public beta
        </motion.div>

        {/* Headline with typing cursor */}
        <div className="text-center mb-2">
          <div className="text-[16px] font-bold text-[#e8e8ed] leading-tight">
            Ship faster with AI
          </div>
          <div className="text-[16px] font-bold leading-tight flex items-center justify-center gap-0.5">
            <span className="text-indigo-400">powered analytics</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-[1px] h-[14px] bg-indigo-400 ml-0.5"
            />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-[7px] text-[#5c5c6b] text-center max-w-[220px] leading-relaxed mb-3">
          Understand your users, predict churn, and grow revenue — all from one dashboard.
        </p>

        {/* CTAs */}
        <div className="flex gap-2 mb-4">
          <div className="relative">
            <div className="bg-indigo-500 text-white text-[7px] px-3 py-1 rounded-full font-medium relative z-10">
              Start Free Trial
            </div>
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-indigo-500/30"
            />
          </div>
          <motion.div
            {...breathe(1)}
            className="border border-white/10 text-[#c8c8d0] text-[7px] px-3 py-1 rounded-full"
          >
            Watch Demo
          </motion.div>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex -space-x-1">
            {["#6366f1", "#10b981", "#f59e0b", "#ec4899"].map((c, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                className="w-3 h-3 rounded-full border border-[#050507]"
                style={{ background: c + "40" }}
              />
            ))}
          </div>
          <span className="text-[6px] text-[#5c5c6b]">2,400+ teams trust us</span>
        </div>

        {/* Feature cards — icons breathe */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-[360px]">
          {[
            { title: "Real-time Analytics", desc: "Track every metric" },
            { title: "AI Predictions", desc: "Know what happens next" },
            { title: "Enterprise Ready", desc: "SOC2, GDPR, HIPAA" },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
              className="bg-[#111118] border border-white/[0.04] rounded-lg p-2"
            >
              <motion.div
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 1.3 }}
                className="w-4 h-4 rounded bg-indigo-500/15 flex items-center justify-center mb-1.5"
              >
                <div className="w-2 h-2 rounded-sm bg-indigo-500/50" />
              </motion.div>
              <div className="text-[7px] font-semibold text-[#e8e8ed] mb-0.5">{card.title}</div>
              <div className="text-[6px] text-[#5c5c6b] leading-relaxed">{card.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. AI WRITING TOOL
// ─────────────────────────────────────────────────────────────

const chatMessages = [
  { role: "user" as const, text: "Make this paragraph more engaging" },
  { role: "ai" as const, text: "Here's a revised version with stronger hooks..." },
  { role: "user" as const, text: "Add a call to action at the end" },
  { role: "ai" as const, text: "Done! I've added a compelling CTA..." },
];

export function AIWritingMockup() {
  return (
    <div className="w-full h-full bg-[#080810] text-[10px] font-sans overflow-hidden select-none flex" aria-hidden="true">
      {/* Sidebar — document list */}
      <div className="w-[130px] shrink-0 bg-[#0d0d16] border-r border-white/[0.04] p-2.5 flex flex-col">
        <div className="text-[8px] font-semibold text-indigo-400/70 mb-1">WriteAI</div>
        <div className="text-[6px] text-[#3f3f52] mb-2">3 documents</div>

        {/* New doc button — breathes */}
        <motion.div
          {...breathe(0)}
          className="border border-indigo-500/25 bg-indigo-500/8 rounded-md px-2 py-1.5 text-[7px] text-indigo-300 text-center mb-3 font-medium"
        >
          + New Document
        </motion.div>

        {/* Doc list */}
        {[
          { title: "Product Launch Blog", active: true },
          { title: "Email Campaign", active: false },
          { title: "Landing Page Copy", active: false },
        ].map((doc, i) => (
          <div
            key={doc.title}
            className={`px-2 py-1.5 rounded-md mb-0.5 ${
              doc.active ? "bg-indigo-500/10 border border-indigo-500/20" : ""
            }`}
          >
            <div className={`text-[7px] truncate ${doc.active ? "text-indigo-300" : "text-[#3f3f52]"}`}>
              {doc.title}
            </div>
          </div>
        ))}

        {/* Saving indicator */}
        <div className="mt-auto flex items-center gap-1 px-2">
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-emerald-400"
          />
          <span className="text-[6px] text-[#3f3f52]">Auto-saved</span>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="h-7 bg-[#0d0d16] border-b border-white/[0.04] flex items-center px-3 gap-1.5 shrink-0">
          {["B", "I", "U", "H1", "H2"].map((t, i) => (
            <div key={t} className={`text-[7px] w-4 h-4 flex items-center justify-center rounded ${i === 0 ? "bg-indigo-500/25 text-indigo-300" : "text-[#3f3f52]"}`}>
              {t}
            </div>
          ))}
          <motion.div
            {...shimmer(0)}
            className="ml-auto text-[6px] text-[#3f3f52]"
          >
            1,247 words
          </motion.div>
        </div>

        {/* Content area */}
        <div className="flex-1 p-4 overflow-hidden">
          {/* Title */}
          <div className="text-[14px] font-bold text-[#e8e8ed] mb-3">
            How AI is Transforming Content Creation
          </div>

          {/* Paragraph lines */}
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="h-1.5 rounded bg-[#3f3f52]/60 mb-1.5"
              style={{ width: `${85 - i * 12}%` }}
            />
          ))}

          {/* AI suggestion bubble */}
          <motion.div
            {...breathe(0.5)}
            className="mt-3 border border-indigo-500/20 bg-indigo-500/[0.04] rounded-lg p-2.5"
          >
            <div className="flex items-center gap-1 mb-1.5">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-2.5 h-2.5 rounded bg-indigo-500/30 flex items-center justify-center"
              >
                <div className="w-1 h-1 rounded-full bg-indigo-400" />
              </motion.div>
              <span className="text-[7px] text-indigo-300/60 font-medium">AI Suggestion</span>
            </div>
            {/* Suggestion text — shimmer */}
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                className="h-1 rounded bg-indigo-400/30 mb-1"
                style={{ width: `${90 - i * 20}%` }}
              />
            ))}
            {/* Accept / dismiss */}
            <div className="flex gap-1.5 mt-2">
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="bg-indigo-500/70 text-white text-[6px] px-2 py-0.5 rounded-full font-medium"
              >
                Accept
              </motion.div>
              <div className="bg-[#1a1a24] text-[#5c5c6b] text-[6px] px-2 py-0.5 rounded-full">Dismiss</div>
            </div>
          </motion.div>

          {/* More text lines */}
          <div className="mt-3 space-y-1.5">
            {[0, 1].map(i => (
              <div
                key={i}
                className="h-1.5 rounded bg-[#3f3f52]/40"
                style={{ width: `${75 - i * 25}%` }}
              />
            ))}
            {/* Typing cursor */}
            <div className="flex items-center">
              <div className="h-1.5 rounded bg-[#3f3f52]/40 w-[30%]" />
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-[1px] h-3 bg-indigo-400 ml-0.5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat panel */}
      <div className="w-[140px] shrink-0 bg-[#0d0d16] border-l border-white/[0.04] flex flex-col">
        <div className="px-2.5 py-2 border-b border-white/[0.04]">
          <div className="text-[8px] font-semibold text-indigo-300/60">AI Assistant</div>
        </div>

        <div className="flex-1 p-2 overflow-hidden space-y-1.5">
          {chatMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.25, duration: 0.4 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[110px] px-2 py-1 rounded-lg text-[6px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-indigo-500/60 text-white/90"
                    : "bg-[#1a1a24] text-[#8a8a9a]"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* AI typing indicator — 3 dots bouncing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.4 }}
            className="flex justify-start"
          >
            <div className="bg-[#1a1a24] px-2 py-1.5 rounded-lg flex gap-0.5 items-center">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                  className="w-[3px] h-[3px] rounded-full bg-indigo-400/50"
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Input */}
        <div className="p-2 border-t border-white/[0.04]">
          <div className="flex items-center bg-[#1a1a24] border border-white/[0.06] rounded-md px-2 py-1">
            <span className="text-[6px] text-[#3f3f52] flex-1">Ask AI anything...</span>
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 rounded bg-indigo-500/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
