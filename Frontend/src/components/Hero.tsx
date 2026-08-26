import { ArrowRight } from "lucide-react";
import { WHATSAPP_URL, TELEGRAM_URL } from "@/constants";
import { useLanguage } from "@/context/LanguageContext";
import HeroLogo3D from "./HeroLogo3D";
export default function Hero() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-[68px]">
      {/* Background grid */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(74,222,128,0.07) 0%, transparent 60%)",
        }}
      />
      {/* Right-side radial that highlights the logo column */}
      <div
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{
          background: "radial-gradient(ellipse 40% 50% at 78% 52%, rgba(74,222,128,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          <div className="space-y-7">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-[#f2f4f1] leading-[1.08] tracking-tight">
              {t.heroLine1}
              <br />
              <span className="text-[#4ade80]">{t.heroLine2}</span>
            </h1>

            <p className="text-base sm:text-lg text-[#7a8e7a] leading-relaxed max-w-xl">
              {t.heroSubtitle.includes("SANJEEVANI") ? (
                <>
                  {t.heroSubtitle.split("SANJEEVANI").map((part, i, arr) => (
                    i < arr.length - 1 ? (
                      <span key={i}>{part}<strong className="font-bold text-[#f2f4f1]">SANJEEVANI</strong></span>
                    ) : <span key={i}>{part}</span>
                  ))}
                </>
              ) : t.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("#platforms")}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#070907] bg-[#4ade80] rounded-xl hover:bg-[#22c55e] transition-all duration-200 shadow-lg shadow-[#4ade80]/20 cursor-pointer"
              >
                {t.heroCTA}
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Available through */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-[#3d503d] uppercase tracking-widest mb-4">
                {t.availableThrough}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {/* Web */}
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0d110e] border border-[#4ade80]/12">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#4ade80]">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span className="text-sm font-medium text-[#7a8e7a]">Web</span>
                </div>

                {/* WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0d110e] border border-[#4ade80]/12 hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all duration-200 cursor-pointer group"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="text-sm font-medium text-[#7a8e7a] group-hover:text-[#25D366] transition-colors">WhatsApp</span>
                </a>

                {/* Telegram */}
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0d110e] border border-[#4ade80]/12 hover:border-[#229ED9]/40 hover:bg-[#229ED9]/5 transition-all duration-200 cursor-pointer group"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#229ED9]">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  <span className="text-sm font-medium text-[#7a8e7a] group-hover:text-[#229ED9] transition-colors">Telegram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: 3D logo (desktop only) */}
          <div className="hidden lg:flex items-center justify-center py-4">
            <HeroLogo3D />
          </div>
        </div>
      </div>
    </section>
  );
}
