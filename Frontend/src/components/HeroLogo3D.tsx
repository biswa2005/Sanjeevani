import { useRef, useState, useCallback } from "react";
import logoSrc from "@/imports/WhatsApp_Image_2026-08-26_at_1.28.23_PM__1_-removebg-preview-1.png";

export default function HeroLogo3D() {
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
      setTilt({ rx: -ny * 12, ry: nx * 12, active: true })
    );
  }, []);

  const onMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setTilt({ rx: 0, ry: 0, active: false });
  }, []);

  const { rx, ry, active } = tilt;

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex items-center justify-center w-full select-none"
      style={{ perspective: "900px" }}
    >
      {/* Ambient glow behind the logo */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "70%",
          paddingBottom: "70%",
          background: "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 3D tilt card */}
      <div
        className="relative"
        style={{
          transform: `rotateX(${rx}deg) rotateY(${ry}deg) scale(${active ? 1.04 : 1})`,
          transition: active
            ? "transform 0.10s ease-out"
            : "transform 0.65s cubic-bezier(0.34,1.56,0.64,1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* The actual PNG logo — screen blend dissolves any residual light bg */}
        <img
          src={logoSrc}
          alt="SANJEEVANI"
          draggable={false}
          className="relative block"
          style={{
            width: "100%",
            maxWidth: "480px",
            height: "auto",
            mixBlendMode: "screen",
            filter: [
              "drop-shadow(1px 2px 0px rgba(34,160,70,0.85))",
              "drop-shadow(2px 4px 0px rgba(22,120,50,0.65))",
              "drop-shadow(3px 6px 0px rgba(14,80,32,0.45))",
              "drop-shadow(4px 8px 0px rgba(7,44,17,0.28))",
              "drop-shadow(0 0 18px rgba(74,222,128,0.35))",
              "drop-shadow(0 0 40px rgba(74,222,128,0.12))",
            ].join(" "),
            transition: "filter 0.1s ease",
          }}
        />
      </div>

      {/* Cast shadow below — stretches with tilt angle */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-5%",
          left: "15%",
          right: "15%",
          height: "20px",
          background: "radial-gradient(ellipse, rgba(74,222,128,0.18) 0%, transparent 72%)",
          filter: "blur(10px)",
          transform: `scaleX(${1 + Math.abs(ry) * 0.018})`,
          opacity: active ? 0.6 : 0.35,
          transition: "opacity 0.4s ease, transform 0.1s ease-out",
        }}
      />
    </div>
  );
}
