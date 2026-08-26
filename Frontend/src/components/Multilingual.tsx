import { Mic, MessageSquare, Volume2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const languagePills = ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada"];

export default function Multilingual() {
  const { t } = useLanguage();

  return (
    <section className="py-14 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 0% 50%, rgba(74,222,128,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <div>
              <p className="text-sm font-semibold text-[#4ade80] uppercase tracking-widest mb-3">{t.mlLabel}</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#f2f4f1] mb-4 leading-tight">
                {t.mlHeading}
              </h2>
              <p className="text-lg text-[#7a8e7a] leading-relaxed">{t.mlSubtitle}</p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {languagePills.map((lang) => (
                <span
                  key={lang}
                  className="px-4 py-2 text-sm font-medium text-[#7a8e7a] bg-[#0d110e] border border-[#4ade80]/12 rounded-full"
                >
                  {lang}
                </span>
              ))}
              <span className="px-4 py-2 text-sm font-medium text-[#4ade80] bg-[#4ade80]/8 border border-[#4ade80]/20 rounded-full">
                + More
              </span>
            </div>

            <div className="flex items-center gap-3">
              {[
                { icon: MessageSquare, label: "Text" },
                { icon: Mic, label: "Voice" },
                { icon: Volume2, label: "Response" },
              ].map(({ icon: Icon, label }, i) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-[#0d110e] border border-[#4ade80]/15 flex items-center justify-center">
                      <Icon size={18} className="text-[#4ade80]" />
                    </div>
                    <span className="text-sm text-[#7a8e7a]">{label}</span>
                  </div>
                  {i < 2 && <div className="w-8 h-px bg-[#4ade80]/20 mb-5" />}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="p-6 rounded-2xl bg-[#0d110e] border border-[#4ade80]/12 space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
                <span className="text-sm text-[#4ade80] font-medium">Multilingual Interface Active</span>
              </div>

              {[
                { lang: "Hindi", text: "मेरे सिर में दर्द हो रहा है।", role: "user" },
                { lang: "AI", text: "I understand you have a headache. Can you tell me how long it has been and its severity?", role: "ai" },
                { lang: "Tamil", text: "தலைவலி எவ்வளவு நேரமாக இருக்கிறது?", role: "user" },
                { lang: "AI", text: "Symptoms detected in Tamil. Providing guidance in your preferred language.", role: "ai" },
              ].map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "ai" && (
                    <span className="text-[10px] text-[#4ade80] font-bold px-1.5 py-0.5 rounded bg-[#4ade80]/10 self-start mt-1 flex-shrink-0">
                      AI
                    </span>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#4ade80]/10 border border-[#4ade80]/15 text-[#f2f4f1] rounded-tr-sm"
                        : "bg-[#192019] text-[#f2f4f1] rounded-tl-sm"
                    }`}
                  >
                    <p className="text-xs text-[#3d503d] mb-1">{msg.lang}</p>
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <span className="text-[10px] text-[#7a8e7a] font-bold px-1.5 py-0.5 rounded bg-[#111814] self-start mt-1 flex-shrink-0">
                      {msg.lang.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
