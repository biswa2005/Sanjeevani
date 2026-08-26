import logo from "@/imports/WhatsApp_Image_2026-08-26_at_1.28.23_PM__1_-removebg-preview.png";

interface LogoProps {
  className?: string;
  /** size preset: "sm" = navbar, "md" = default, "lg" = CTA/hero */
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { height: 52 },
  md: { height: 64 },
  lg: { height: 80 },
};

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const { height } = sizes[size];

  return (
    <img
      src={logo}
      alt="SANJEEVANI AI Healthcare Assistant"
      draggable={false}
      className={className}
      style={{
        height,
        width: "auto",
        display: "block",
        userSelect: "none",
      }}
    />
  );
}
