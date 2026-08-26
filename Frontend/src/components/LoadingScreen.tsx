import { useEffect, useState } from "react";
import logoSrc from "@/imports/WhatsApp_Image_2026-08-26_at_1.28.23_PM__1_-2.jpeg";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"visible" | "fading">("visible");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), 1800);
    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#070907",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: phase === "fading" ? "none" : "all",
      }}
    >
      {/* Logo image */}
      <img
        src={logoSrc}
        alt="SANJEEVANI"
        style={{
          width: "min(220px, 52vw)",
          height: "auto",
          display: "block",
          animation: "sj-pulse 2s ease-in-out infinite",
        }}
      />

      {/* Progress bar */}
      <div
        style={{
          marginTop: 40,
          width: "min(160px, 40vw)",
          height: 2,
          borderRadius: 99,
          background: "rgba(74,222,128,0.12)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 99,
            background: "#4ade80",
            animation: "sj-fill 1.8s ease-out forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes sj-pulse {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.035); }
        }
        @keyframes sj-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
