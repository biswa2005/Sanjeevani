import {
  Brain, Bell, Syringe, ShieldCheck, Languages, MapPin, MessageCircle, Wifi,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Brain, Bell, Syringe, ShieldCheck, Languages, MapPin, MessageCircle, Wifi];

export default function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-[#4ade80] uppercase tracking-widest mb-3">{t.featuresLabel}</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#f2f4f1] leading-tight">
            {t.featuresHeading}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.features.map(({ title, desc }, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="flip-card" style={{ height: 180 }}>
                <div className="flip-inner">
                  {/* Front: icon + title */}
                  <div className="flip-front flex flex-col items-start justify-end p-6 bg-[#0d110e] border border-[#4ade80]/10">
                    <div className="w-11 h-11 rounded-lg bg-[#4ade80]/10 flex items-center justify-center mb-4">
                      <Icon size={21} className="text-[#4ade80]" />
                    </div>
                    <h3 className="text-base font-semibold text-[#f2f4f1] leading-snug">{title}</h3>
                  </div>

                  {/* Back: title + desc */}
                  <div className="flip-back flex flex-col justify-center p-6 bg-[#111814] border border-[#4ade80]/25">
                    <h3 className="text-sm font-semibold text-[#4ade80] mb-3 leading-snug">{title}</h3>
                    <p className="text-sm text-[#f2f4f1] leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
