import { useState } from "react";
import { MessageSquareHeart, ArrowRight } from "lucide-react";
import { TELEGRAM_URL } from "@/constants";
import { useLanguage } from "@/context/LanguageContext";
import ComingSoonModal from "./ComingSoonModal";

export default function CTASection() {
  const { t } = useLanguage();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
    {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(74,222,128,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#f2f4f1] mb-5 leading-tight">
          {t.ctaHeading}
        </h2>
        <p className="text-lg sm:text-xl text-[#7a8e7a] mb-10 leading-relaxed">
          {t.ctaSubtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => scrollTo("#features")}
            className="flex items-center gap-2 px-7 py-4 text-base font-semibold text-[#070907] bg-[#4ade80] rounded-xl hover:bg-[#22c55e] transition-all duration-200 shadow-lg shadow-[#4ade80]/20 cursor-pointer"
          >
            <MessageSquareHeart size={18} />
            {t.ctaButton}
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => setShowComingSoon(true)}
            className="flex items-center gap-2 px-6 py-4 text-base font-medium text-[#25D366] border border-[#25D366]/25 rounded-xl hover:bg-[#25D366]/8 transition-all duration-200 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </button>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-4 text-base font-medium text-[#229ED9] border border-[#229ED9]/25 rounded-xl hover:bg-[#229ED9]/8 transition-all duration-200 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            Telegram
          </a>
        </div>
      </div>
    </section>
    </>
  );
}
