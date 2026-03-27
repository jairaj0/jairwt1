// Realistic dark-theme SVG UI mockups for case study previews

export function DashboardMockup() {
  return (
    <svg
      viewBox="0 0 900 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Background */}
      <rect width="900" height="400" fill="#0a0a0f" />

      {/* Sidebar */}
      <rect width="180" height="400" fill="#111118" />
      {/* Sidebar logo */}
      <rect x="20" y="24" width="60" height="8" rx="4" fill="#6366f1" opacity="0.8" />
      {/* Sidebar nav items */}
      {[72, 100, 128, 156, 184].map((y, i) => (
        <g key={y}>
          <rect x="16" y={y} width="24" height="24" rx="6" fill={i === 0 ? "#6366f1" : "#1e1e2a"} />
          <rect x="48" y={y + 8} width={i === 0 ? 72 : 56} height="8" rx="4" fill={i === 0 ? "#e8e8ed" : "#3f3f52"} />
        </g>
      ))}
      {/* Avatar at bottom */}
      <circle cx="28" cy="372" r="14" fill="#1e1e2a" />
      <circle cx="28" cy="372" r="14" stroke="#6366f1" strokeWidth="1.5" />
      <rect x="50" y="366" width="60" height="7" rx="3.5" fill="#3f3f52" />
      <rect x="50" y="378" width="40" height="6" rx="3" fill="#2a2a38" />

      {/* Main area */}
      {/* Top bar */}
      <rect x="180" y="0" width="720" height="52" fill="#0d0d14" />
      <rect x="200" y="18" width="160" height="16" rx="8" fill="#1a1a24" />
      <rect x="213" y="24" width="8" height="4" rx="2" fill="#3f3f52" />
      <rect x="226" y="24" width="80" height="4" rx="2" fill="#3f3f52" />
      {/* Top bar right: notification + avatar */}
      <circle cx="836" cy="26" r="12" fill="#1a1a24" />
      <circle cx="808" cy="26" r="12" fill="#1a1a24" />
      <circle cx="861" cy="26" r="12" fill="#6366f1" />

      {/* Stats row */}
      {[
        { x: 196, color: "#6366f1", value: "2,847", label: "Total Users", delta: "+12.5%" },
        { x: 382, color: "#10b981", value: "$48.2k", label: "Revenue", delta: "+8.1%" },
        { x: 568, color: "#f59e0b", value: "94.3%", label: "Uptime", delta: "+0.3%" },
        { x: 754, color: "#ec4899", value: "1,204", label: "Active Now", delta: "-2.4%" },
      ].map(({ x, color, value, label, delta }) => (
        <g key={x}>
          <rect x={x} y="68" width="170" height="82" rx="10" fill="#111118" stroke="#1e1e2a" strokeWidth="1" />
          <rect x={x + 12} y="80" width="20" height="20" rx="5" fill={color} opacity="0.15" />
          <rect x={x + 16} y="85" width="12" height="10" rx="2" fill={color} opacity="0.6" />
          <rect x={x + 12} y="108" width={60} height="10" rx="5" fill="#e8e8ed" />
          <rect x={x + 12} y="124" width={80} height="7" rx="3.5" fill="#3f3f52" />
          <rect x={x + 108} y="122" width={42} height="9" rx="4.5" fill={color} opacity="0.15" />
          <rect x={x + 116} y="124" width={26} height="5" rx="2.5" fill={color} opacity="0.7" />
        </g>
      ))}

      {/* Chart area */}
      <rect x="196" y="164" width="368" height="220" rx="10" fill="#111118" stroke="#1e1e2a" strokeWidth="1" />
      <rect x="212" y="180" width="100" height="10" rx="5" fill="#e8e8ed" />
      <rect x="212" y="196" width="70" height="7" rx="3.5" fill="#3f3f52" />
      {/* Chart lines (area chart) */}
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M212 340 L212 290 Q240 270 268 280 Q296 290 324 260 Q352 230 380 240 Q408 250 436 220 Q464 190 492 210 Q520 230 548 200 L548 340 Z"
        fill="url(#chartGrad)"
      />
      <path
        d="M212 290 Q240 270 268 280 Q296 290 324 260 Q352 230 380 240 Q408 250 436 220 Q464 190 492 210 Q520 230 548 200"
        stroke="#6366f1"
        strokeWidth="2"
        fill="none"
      />
      {/* Chart dots */}
      {[[212,290],[268,280],[324,260],[380,240],[436,220],[492,210],[548,200]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#6366f1" />
      ))}
      {/* X-axis labels */}
      {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => (
        <rect key={d} x={212 + i * 56} y="350" width={24} height="5" rx="2.5" fill="#2a2a38" />
      ))}

      {/* Right column: table */}
      <rect x="578" y="164" width="306" height="220" rx="10" fill="#111118" stroke="#1e1e2a" strokeWidth="1" />
      <rect x="594" y="180" width="80" height="10" rx="5" fill="#e8e8ed" />
      {/* Table rows */}
      {[0,1,2,3,4].map((i) => (
        <g key={i}>
          <rect x="594" y={206 + i * 34} width="274" height="28" rx="6" fill={i % 2 === 0 ? "#0d0d14" : "transparent"} />
          <circle cx="608" cy={220 + i * 34} r="8" fill="#1e1e2a" />
          <rect cx="608" cy={220 + i * 34} x="624" y={214 + i * 34} width={50 + (i % 3) * 15} height="7" rx="3.5" fill="#3f3f52" />
          <rect x="624" y={222 + i * 34} width={35 + (i % 2) * 10} height="5" rx="2.5" fill="#2a2a38" />
          <rect x={810 - (i % 3) * 10} y={215 + i * 34} width="40" height="9" rx="4.5" fill={["#6366f1","#10b981","#f59e0b","#6366f1","#10b981"][i]} opacity="0.15" />
          <rect x={816 - (i % 3) * 10} y={217 + i * 34} width="28" height="5" rx="2.5" fill={["#6366f1","#10b981","#f59e0b","#6366f1","#10b981"][i]} opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

export function LandingPageMockup() {
  return (
    <svg
      viewBox="0 0 900 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="900" height="400" fill="#050507" />

      {/* Nav */}
      <rect width="900" height="48" fill="#0a0a0f" opacity="0.9" />
      <rect x="40" y="16" width="60" height="14" rx="7" fill="#6366f1" opacity="0.8" />
      <rect x="600" y="17" width="36" height="14" rx="7" fill="#1a1a24" />
      <rect x="644" y="17" width="36" height="14" rx="7" fill="#1a1a24" />
      <rect x="688" y="17" width="36" height="14" rx="7" fill="#1a1a24" />
      <rect x="748" y="14" width="80" height="20" rx="10" fill="#6366f1" />

      {/* Hero headline */}
      <rect x="200" y="72" width="500" height="28" rx="8" fill="#e8e8ed" opacity="0.9" />
      <rect x="260" y="108" width="380" height="20" rx="6" fill="#6366f1" opacity="0.7" />
      <rect x="240" y="140" width="420" height="10" rx="5" fill="#3f3f52" />
      <rect x="280" y="156" width="340" height="10" rx="5" fill="#3f3f52" />

      {/* CTAs */}
      <rect x="270" y="180" width="140" height="36" rx="18" fill="#6366f1" />
      <rect x="425" y="180" width="140" height="36" rx="18" fill="#1a1a24" stroke="#2a2a38" strokeWidth="1" />
      <rect x="303" y="194" width="74" height="8" rx="4" fill="#fff" opacity="0.9" />
      <rect x="456" y="194" width="78" height="8" rx="4" fill="#e8e8ed" opacity="0.5" />

      {/* Social proof / logos strip */}
      <rect x="40" y="240" width="820" height="1" fill="#1e1e2a" />
      <rect x="140" y="258" width="80" height="12" rx="6" fill="#1e1e2a" />
      <rect x="280" y="258" width="80" height="12" rx="6" fill="#1e1e2a" />
      <rect x="420" y="258" width="80" height="12" rx="6" fill="#1e1e2a" />
      <rect x="560" y="258" width="80" height="12" rx="6" fill="#1e1e2a" />
      <rect x="700" y="258" width="80" height="12" rx="6" fill="#1e1e2a" />

      {/* Feature cards */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={80 + i * 260} y="290" width="220" height="90" rx="12" fill="#111118" stroke="#1e1e2a" strokeWidth="1" />
          <rect x={100 + i * 260} y="308" width="28" height="28" rx="8" fill="#6366f1" opacity="0.15" />
          <rect x={108 + i * 260} y="316" width="12" height="12" rx="3" fill="#6366f1" opacity="0.6" />
          <rect x={100 + i * 260} y="344" width={100 + i * 10} height="8" rx="4" fill="#e8e8ed" opacity="0.7" />
          <rect x={100 + i * 260} y="358" width={140 - i * 10} height="7" rx="3.5" fill="#3f3f52" />
        </g>
      ))}
    </svg>
  );
}

export function AIWritingMockup() {
  return (
    <svg
      viewBox="0 0 900 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="900" height="400" fill="#080810" />

      {/* Left sidebar — document list */}
      <rect width="220" height="400" fill="#0d0d16" />
      <rect x="16" y="16" width="80" height="10" rx="5" fill="#6366f1" opacity="0.7" />
      <rect x="16" y="36" width="100" height="7" rx="3.5" fill="#2a2a38" />
      {/* New doc button */}
      <rect x="16" y="54" width="188" height="32" rx="8" fill="#6366f1" opacity="0.15" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.3" />
      <rect x="60" y="63" width="100" height="14" rx="4" fill="#6366f1" opacity="0.7" />
      {/* Doc items */}
      {[
        { y: 100, active: true, w: 130 },
        { y: 136, active: false, w: 100 },
        { y: 172, active: false, w: 115 },
        { y: 208, active: false, w: 90 },
        { y: 244, active: false, w: 125 },
      ].map(({ y, active, w }) => (
        <g key={y}>
          <rect x="10" y={y} width="200" height="28" rx="7" fill={active ? "#6366f1" : "transparent"} opacity={active ? 0.12 : 1} />
          {active && <rect x="10" y={y} width="200" height="28" rx="7" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.3" />}
          <rect x="22" y={y + 10} width={w} height="7" rx="3.5" fill={active ? "#818cf8" : "#2a2a38"} />
        </g>
      ))}

      {/* Main editor */}
      <rect x="220" y="0" width="680" height="400" fill="#080810" />
      {/* Toolbar */}
      <rect x="220" y="0" width="680" height="44" fill="#0d0d16" />
      {["B","I","U","H1","H2"].map((t, i) => (
        <g key={t}>
          <rect x={240 + i * 44} y="12" width="32" height="20" rx="5" fill={i === 0 ? "#6366f1" : "#1a1a24"} opacity={i === 0 ? 0.3 : 1} />
          <rect x={248 + i * 44} y="18" width="16" height="8" rx="2" fill={i === 0 ? "#818cf8" : "#3f3f52"} />
        </g>
      ))}
      {/* Word count */}
      <rect x="760" y="16" width="60" height="12" rx="6" fill="#1a1a24" />
      <rect x="766" y="20" width="48" height="4" rx="2" fill="#3f3f52" />

      {/* Editor content */}
      {/* Title */}
      <rect x="260" y="68" width="360" height="22" rx="5" fill="#e8e8ed" opacity="0.9" />
      {/* Paragraph lines */}
      {[0,1,2,3].map((i) => (
        <rect key={i} x="260" y={106 + i * 20} width={480 - (i === 3 ? 180 : 0)} height="10" rx="5" fill="#3f3f52" opacity="0.7" />
      ))}

      {/* AI suggestion bubble */}
      <rect x="260" y="186" width="420" height="80" rx="10" fill="#6366f1" fillOpacity="0.06" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.2" />
      <rect x="276" y="200" width="60" height="8" rx="4" fill="#818cf8" opacity="0.5" />
      {/* AI suggestion text lines */}
      <rect x="276" y="216" width="380" height="8" rx="4" fill="#818cf8" opacity="0.25" />
      <rect x="276" y="230" width="340" height="8" rx="4" fill="#818cf8" opacity="0.25" />
      <rect x="276" y="244" width="200" height="8" rx="4" fill="#818cf8" opacity="0.25" />
      {/* Accept/dismiss buttons */}
      <rect x="540" y="246" width="64" height="20" rx="10" fill="#6366f1" opacity="0.8" />
      <rect x="612" y="246" width="52" height="20" rx="10" fill="#1a1a24" />
      <rect x="556" y="252" width="32" height="8" rx="4" fill="#fff" opacity="0.8" />
      <rect x="624" y="252" width="28" height="8" rx="4" fill="#3f3f52" />

      {/* More content lines */}
      {[0,1,2].map((i) => (
        <rect key={i} x="260" y={284 + i * 20} width={460 - (i === 2 ? 220 : 0)} height="10" rx="5" fill="#3f3f52" opacity="0.5" />
      ))}

      {/* AI chat panel on right */}
      <rect x="680" y="44" width="220" height="356" fill="#0d0d16" />
      <rect x="694" y="56" width="60" height="9" rx="4.5" fill="#818cf8" opacity="0.5" />
      {/* Chat bubbles */}
      {[
        { y: 78, w: 140, right: false },
        { y: 114, w: 160, right: true },
        { y: 150, w: 130, right: false },
        { y: 186, w: 150, right: true },
      ].map(({ y, w, right }) => (
        <g key={y}>
          <rect
            x={right ? 844 - w : 694}
            y={y}
            width={w}
            height={30}
            rx="8"
            fill={right ? "#6366f1" : "#1a1a24"}
            opacity={right ? 0.7 : 1}
          />
          <rect
            x={right ? 850 - w : 700}
            y={y + 11}
            width={w - 12}
            height={8}
            rx="4"
            fill={right ? "#fff" : "#3f3f52"}
            opacity={right ? 0.8 : 1}
          />
        </g>
      ))}
      {/* Input */}
      <rect x="688" y="360" width="192" height="32" rx="8" fill="#1a1a24" stroke="#2a2a38" strokeWidth="1" />
      <rect x="700" y="372" width="140" height="8" rx="4" fill="#2a2a38" />
      <rect x="856" y="366" width="20" height="20" rx="5" fill="#6366f1" opacity="0.6" />
    </svg>
  );
}
