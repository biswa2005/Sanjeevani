import { MessageSquare, Cpu, HeartPulse, ClipboardList, Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import screenshot from "@/imports/ChatGPT_Image_Aug_26__2026__08_11_21_PM.png";

const icons = [MessageSquare, Cpu, HeartPulse, ClipboardList, Building2];
const nums = ["01", "02", "03", "04", "05"];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-16 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 100% 50%, rgba(74,222,128,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* ── Left: heading + steps ── */}
          <div>
            <div className="mb-10">
              <p className="text-sm font-semibold text-[#4ade80] uppercase tracking-widest mb-3">{t.howLabel}</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#f2f4f1] mb-4 leading-tight">
                {t.howHeading}
              </h2>
              <p className="text-lg text-[#7a8e7a] leading-relaxed">{t.howSubtitle}</p>
            </div>

            <div className="relative">
              {/* Vertical connector line */}
              <div className="hidden sm:block absolute left-[39px] top-8 bottom-8 w-px bg-gradient-to-b from-[#4ade80]/30 via-[#4ade80]/15 to-transparent" />

              <div className="space-y-3">
                {t.steps.map(({ title, desc }, i) => {
                  const Icon = icons[i];
                  return (
                    <div key={i} className="flex gap-6 group">
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 rounded-2xl bg-[#0d110e] border border-[#4ade80]/15 group-hover:border-[#4ade80]/35 flex flex-col items-center justify-center gap-1 transition-all duration-300">
                          <span className="text-xs font-bold text-[#3d503d]">{nums[i]}</span>
                          <Icon size={20} className="text-[#4ade80]" />
                        </div>
                      </div>
                      <div className="flex-1 pt-4 pb-4 border-b border-[#4ade80]/6 last:border-0">
                        <h3 className="text-lg font-semibold text-[#f2f4f1] mb-2">{title}</h3>
                        <p className="text-base text-[#7a8e7a] leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: app image ── */}
          <div className="hidden lg:flex items-center justify-center py-4">
            <div className="relative w-full max-w-[460px]">
              {/* Ambient glow */}
              <div
                className="absolute -inset-8 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(74,222,128,0.09) 0%, transparent 70%)",
                }}
              />
              <img
                src={screenshot}
                alt="SANJEEVANI app interface"
                draggable={false}
                className="relative w-full h-auto block rounded-2xl"
                style={{
                  boxShadow: "0 0 0 1px rgba(74,222,128,0.08), 0 8px 48px rgba(0,0,0,0.55), 0 0 40px rgba(74,222,128,0.12)",
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
