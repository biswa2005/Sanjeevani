import { Brain, ShieldCheck, Bell, Syringe, MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Brain, ShieldCheck, Bell, Syringe, MapPin];

const journeyEn = [
  { label: "Symptoms", sub: "Describe what you feel" },
  { label: "AI Guidance", sub: "Understand your condition" },
  { label: "Precautions", sub: "Steps to feel better" },
  { label: "Reminders", sub: "Medicine & vaccinations" },
  { label: "Healthcare", sub: "Find a facility" },
];

const services = [
  "Symptom Guidance",
  "Medicine Management",
  "Vaccination Tracking",
  "Preventive Care",
  "Healthcare Locator",
];

export default function HealthcareJourney() {
  const { t } = useLanguage();

  return (
    <section className="py-14 relative overflow-hidden border-t border-[#4ade80]/6">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(74,222,128,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-[#4ade80] uppercase tracking-widest mb-3">{t.journeyLabel}</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#f2f4f1] mb-4 leading-tight">
            {t.journeyHeading}
          </h2>
          <p className="text-lg text-[#7a8e7a] leading-relaxed">{t.journeySubtitle}</p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-start justify-center gap-2 mb-10">
          {journeyEn.map(({ label, sub }, i) => {
            const Icon = icons[i];
            return (
              <div key={label} className="flex items-start gap-2">
                {/* Step card */}
                <div className="flex flex-col items-center text-center w-[90px] flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#0d110e] border border-[#4ade80]/15 flex items-center justify-center mb-2 hover:border-[#4ade80]/35 transition-colors">
                    <Icon size={22} className="text-[#4ade80]" />
                  </div>
                  <span className="text-sm font-medium text-[#f2f4f1] leading-tight">{label}</span>
                  <span className="text-xs text-[#3d503d] mt-0.5 leading-tight">{sub}</span>
                </div>
                {/* Arrow between steps */}
                {i < journeyEn.length - 1 && (
                  <ArrowRight size={15} className="text-[#3d503d] flex-shrink-0 mt-5" />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {services.map((service) => (
            <div
              key={service}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0d110e] border border-[#4ade80]/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
              <span className="text-sm font-medium text-[#7a8e7a]">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
