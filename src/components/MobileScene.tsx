"use client";

/**
 * Animated SVG mountain scene for mobile.
 * Pure CSS — no Three.js, no GSAP, no Canvas. ~5KB.
 * Same warm-dawn mood as the desktop 3D scene.
 */

const STARS = [
  { x: "8%",  y: "6%",  r: 1.2, opacity: 0.8, delay: "0s"   },
  { x: "22%", y: "10%", r: 0.9, opacity: 0.5, delay: "0.6s" },
  { x: "38%", y: "5%",  r: 1.4, opacity: 0.7, delay: "1.2s" },
  { x: "56%", y: "12%", r: 0.8, opacity: 0.4, delay: "0.4s" },
  { x: "72%", y: "7%",  r: 1.3, opacity: 0.7, delay: "1.5s" },
  { x: "86%", y: "14%", r: 0.9, opacity: 0.5, delay: "0.8s" },
  { x: "14%", y: "18%", r: 0.7, opacity: 0.3, delay: "1.8s" },
  { x: "48%", y: "16%", r: 0.7, opacity: 0.3, delay: "1.0s" },
  { x: "64%", y: "20%", r: 0.9, opacity: 0.5, delay: "2.1s" },
  { x: "92%", y: "22%", r: 0.7, opacity: 0.4, delay: "0.2s" },
];

export default function MobileScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#0c1a2e_0%,#1e3a5a_38%,#3a5a78_68%,#c8956b_92%,#e3b076_100%)]">
      {/* Twinkling stars */}
      <svg
        className="absolute inset-x-0 top-0 h-1/2 w-full"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#ffffff"
            opacity={s.opacity}
            style={{
              animation: `mobile-twinkle 3.5s ease-in-out ${s.delay} infinite`,
              transformOrigin: "center",
            }}
          />
        ))}
      </svg>

      {/* Sun — golden glow, gentle pulse */}
      <div
        className="absolute right-[12%] top-[22%] h-28 w-28 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,220,140,0.95) 0%, rgba(245,200,90,0.55) 35%, rgba(245,180,90,0.15) 65%, transparent 80%)",
          animation: "mobile-sun 5s ease-in-out infinite",
          filter: "blur(2px)",
        }}
      />

      {/* Drifting clouds */}
      <svg
        className="absolute inset-x-0 top-[32%] h-24 w-full"
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g style={{ animation: "mobile-cloud-1 32s linear infinite" }}>
          <ellipse cx="80"  cy="40" rx="44" ry="9"  fill="#ffffff" opacity="0.18" />
          <ellipse cx="220" cy="32" rx="56" ry="10" fill="#ffffff" opacity="0.14" />
          <ellipse cx="360" cy="46" rx="40" ry="8"  fill="#ffffff" opacity="0.16" />
        </g>
        <g style={{ animation: "mobile-cloud-2 48s linear infinite" }}>
          <ellipse cx="40"  cy="60" rx="50" ry="7" fill="#ffe4a0" opacity="0.10" />
          <ellipse cx="280" cy="55" rx="60" ry="8" fill="#ffe4a0" opacity="0.10" />
        </g>
      </svg>

      {/* Mountain layers — back to front for depth */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full"
        viewBox="0 0 400 220"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ height: "55%" }}
      >
        {/* Back ridge — distant, hazy */}
        <g
          style={{
            animation: "mobile-drift-back 24s ease-in-out infinite",
            transformOrigin: "center",
          }}
        >
          <polygon points="0,180 50,120 110,150 170,90 240,140 310,100 380,150 400,130 400,220 0,220" fill="#3a4d6a" opacity="0.7" />
        </g>

        {/* Mid ridge */}
        <g
          style={{
            animation: "mobile-drift-mid 18s ease-in-out infinite",
            transformOrigin: "center",
          }}
        >
          <polygon points="0,200 60,150 130,180 200,100 270,160 340,130 400,170 400,220 0,220" fill="#283c5a" opacity="0.92" />
          {/* Snow caps */}
          <polygon points="200,100 212,124 188,124" fill="#cfe0f0" opacity="0.55" />
          <polygon points="340,130 350,148 330,148" fill="#cfe0f0" opacity="0.45" />
        </g>

        {/* Front ridge — closest */}
        <g
          style={{
            animation: "mobile-drift-front 12s ease-in-out infinite",
            transformOrigin: "center",
          }}
        >
          <polygon points="0,220 40,200 100,210 160,170 240,200 320,180 400,210 400,220" fill="#1a2940" />
          {/* Front warm rim light */}
          <polygon points="160,170 180,200 140,200" fill="#3a4866" opacity="0.6" />
        </g>

        {/* Divine star above peak */}
        <circle
          cx="200"
          cy="92"
          r="2.2"
          fill="#F5C842"
          style={{ animation: "mobile-twinkle 2.5s ease-in-out infinite" }}
        />
      </svg>

      {/* Warm ambient orbs — like distant lanterns */}
      <div
        className="absolute left-[18%] bottom-[28%] h-2 w-2 rounded-full bg-amber-200/60 blur-sm"
        style={{ animation: "mobile-orb 6s ease-in-out infinite" }}
      />
      <div
        className="absolute left-[62%] bottom-[22%] h-1.5 w-1.5 rounded-full bg-amber-100/50 blur-sm"
        style={{ animation: "mobile-orb 7.5s ease-in-out 1.5s infinite" }}
      />
      <div
        className="absolute left-[82%] bottom-[34%] h-2 w-2 rounded-full bg-amber-200/55 blur-sm"
        style={{ animation: "mobile-orb 5.5s ease-in-out 0.8s infinite" }}
      />

      <style>{`
        @keyframes mobile-twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.9); }
          50%      { opacity: 1;    transform: scale(1.15); }
        }
        @keyframes mobile-sun {
          0%, 100% { transform: scale(1);    opacity: 0.95; }
          50%      { transform: scale(1.05); opacity: 1; }
        }
        @keyframes mobile-cloud-1 {
          from { transform: translateX(-15%); }
          to   { transform: translateX(15%); }
        }
        @keyframes mobile-cloud-2 {
          from { transform: translateX(20%); }
          to   { transform: translateX(-20%); }
        }
        @keyframes mobile-drift-back {
          0%, 100% { transform: translateX(0)    translateY(0); }
          50%      { transform: translateX(0.4%) translateY(-0.3%); }
        }
        @keyframes mobile-drift-mid {
          0%, 100% { transform: translateX(0)    translateY(0); }
          50%      { transform: translateX(-0.6%) translateY(-0.4%); }
        }
        @keyframes mobile-drift-front {
          0%, 100% { transform: translateX(0)   translateY(0); }
          50%      { transform: translateX(0.8%) translateY(0.2%); }
        }
        @keyframes mobile-orb {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50%      { opacity: 0.9; transform: translateY(-6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
