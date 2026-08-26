import React, { useRef, useState, useCallback } from "react";

const C = "#4ade80";
const SW = 3.8;

function draw(dashLen: number, delaySec: number, duration = 0.75): React.CSSProperties {
  return {
    strokeDasharray: dashLen,
    strokeDashoffset: dashLen,
    animation: `draw-in ${duration}s cubic-bezier(0.4,0,0.2,1) ${delaySec}s forwards`,
  };
}

export default function AnimatedLogo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, active: false });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() =>
      setTilt({ rx: -ny * 16, ry: nx * 16, active: true })
    );
  }, []);

  const onMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setTilt({ rx: 0, ry: 0, active: false });
  }, []);

  const { rx, ry, active } = tilt;

  // Stacked dark-green drop-shadows create visible extrusion / thickness
  const extrudeFilter = [
    "drop-shadow(1.5px 2px 0px rgba(16,84,36,0.95))",
    "drop-shadow(3px 4px 0px rgba(10,60,26,0.75))",
    "drop-shadow(5px 6.5px 0px rgba(6,40,17,0.55))",
    "drop-shadow(7px 9px 0px rgba(3,22,9,0.35))",
    "drop-shadow(0 0 10px rgba(74,222,128,0.55))",
    "drop-shadow(0 0 28px rgba(74,222,128,0.18))",
  ].join(" ");

  // Specular highlight position moves opposite to where cursor pushes the tilt
  const specX = 50 - ry * 4;
  const specY = 50 + rx * 4;

  // Cast-shadow ellipse stretches as the logo tilts away
  const castScaleX = 1 + Math.abs(ry) * 0.015;
  const castOpacity = active ? 0.55 : 0.3;

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex items-center justify-center w-full select-none cursor-default"
      style={{ perspective: "900px" }}
    >
      {/* Ambient pulsing rings */}
      <div
        className="absolute rounded-full border border-[#4ade80]/15 w-80 h-80 pointer-events-none"
        style={{ animation: "logo-ring-pulse 3.5s ease-in-out infinite" }}
      />
      <div
        className="absolute rounded-full border border-[#4ade80]/8 w-96 h-96 pointer-events-none"
        style={{ animation: "logo-ring-pulse 3.5s ease-in-out 0.7s infinite" }}
      />

      {/* Specular highlight — shifts toward where the logo "faces" */}
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${specX}% ${specY}%, rgba(74,222,128,${active ? 0.14 : 0.07}) 0%, transparent 60%)`,
          transition: "background 0.08s linear",
          zIndex: 5,
        }}
      />

      {/* 3-D tilt wrapper */}
      <div
        className="relative z-10"
        style={{
          transform: `rotateX(${rx}deg) rotateY(${ry}deg) scale(${active ? 1.05 : 1})`,
          transition: active
            ? "transform 0.10s ease-out"
            : "transform 0.65s cubic-bezier(0.34,1.56,0.64,1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Identical logo SVG — paths unchanged from the original */}
        <svg
          viewBox="0 0 220 282"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[300px] lg:max-w-[360px]"
          style={{
            animation: "logo-float 5.5s ease-in-out infinite",
            filter: extrudeFilter,
            transition: "filter 0.08s linear",
          }}
        >
          {/* ── Left earpiece ── */}
          <circle
            cx="66" cy="28" r="9"
            stroke={C} strokeWidth={SW}
            style={draw(57, 0.05)}
          />

          {/* ── Right earpiece ── */}
          <circle
            cx="150" cy="20" r="9"
            stroke={C} strokeWidth={SW}
            style={draw(57, 0.35)}
          />

          {/* ── Left tube: earpiece → heart notch ── */}
          <path
            d="M66 37 C66 56 87 62 105 63"
            stroke={C} strokeWidth={SW} strokeLinecap="round"
            style={draw(68, 0.8)}
          />

          {/* ── Right tube: earpiece → heart notch ── */}
          <path
            d="M150 29 C150 50 130 60 115 63"
            stroke={C} strokeWidth={SW} strokeLinecap="round"
            style={draw(68, 0.92)}
          />

          {/* ── Bridge connecting the two tubes ── */}
          <path
            d="M105 63 Q110 63 115 63"
            stroke={C} strokeWidth={SW} strokeLinecap="round"
            style={draw(12, 1.28, 0.25)}
          />

          {/* ── Heart body ── */}
          <path
            d="
              M110 158
              C83 136 36 116 36 80
              C36 52 60 36 84 36
              C97 36 107 44 110 54
              C113 44 123 36 136 36
              C160 36 184 52 184 80
              C184 116 137 136 110 158
              Z
            "
            stroke={C} strokeWidth={SW} strokeLinejoin="round"
            style={draw(680, 1.35, 1.35)}
          />

          {/* ── ECG / heartbeat notch at the bottom tip ── */}
          <path
            d="M110 158 L103 176 L114 197 L105 210 L110 218"
            stroke={C} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round"
            style={draw(88, 2.65, 0.65)}
          />

          {/* ── Stethoscope chest piece ── */}
          <circle
            cx="110" cy="229" r="12"
            stroke={C} strokeWidth={SW}
            style={draw(75, 3.2, 0.55)}
          />

          {/* ── "SANJEEVANI" wordmark ── */}
          <text
            x="110" y="270"
            textAnchor="middle"
            fill={C}
            fontSize="17"
            fontFamily="'Inter', system-ui, sans-serif"
            fontWeight="600"
            letterSpacing="5.5"
            style={{ opacity: 0, animation: "fade-in 0.7s ease-out 3.6s forwards" }}
          >
            SANJEEVANI
          </text>
        </svg>
      </div>

      {/* Cast shadow below — grows when tilting, reinforces floating 3-D depth */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-6%",
          left: "20%",
          right: "20%",
          height: "14px",
          background: "radial-gradient(ellipse, rgba(74,222,128,0.22) 0%, transparent 72%)",
          filter: "blur(9px)",
          transform: `scaleX(${castScaleX})`,
          opacity: castOpacity,
          transition: "opacity 0.35s ease, transform 0.1s ease-out",
        }}
      />
    </div>
  );
}
