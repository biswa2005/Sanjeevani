import { Heart, Users, Globe, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const pillars = [
  { icon: Heart, label: "Mission", desc: "Democratise healthcare guidance for every Indian" },
  { icon: Users, label: "Reach", desc: "Built for rural and urban communities alike" },
  { icon: Globe, label: "Languages", desc: "13 Indian regional languages supported" },
  { icon: Zap, label: "Access", desc: "Works on low-bandwidth and basic devices" },
];

export default function AboutUs() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 relative overflow-hidden border-t border-[#4ade80]/6">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 55% 50% at 80% 50%, rgba(74,222,128,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div>
            <p className="text-sm font-semibold text-[#4ade80] uppercase tracking-widest mb-3">{t.aboutLabel}</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#f2f4f1] mb-5 leading-tight">
              {t.aboutHeading}
            </h2>
            <p className="text-lg text-[#7a8e7a] leading-relaxed">{t.aboutText}</p>
          </div>

          {/* Pillars grid */}
          <div className="grid grid-cols-2 gap-4">
            {pillars.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="p-5 rounded-2xl bg-[#0d110e] border border-[#4ade80]/10 hover:border-[#4ade80]/25 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#4ade80]/10 flex items-center justify-center mb-4 group-hover:bg-[#4ade80]/16 transition-colors duration-300">
                  <Icon size={18} className="text-[#4ade80]" />
                </div>
                <h3 className="text-base font-semibold text-[#f2f4f1] mb-1.5">{label}</h3>
                <p className="text-sm text-[#7a8e7a] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
