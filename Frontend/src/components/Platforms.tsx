import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { TELEGRAM_URL } from "@/constants";
import { useLanguage } from "@/context/LanguageContext";
import ComingSoonModal from "./ComingSoonModal";

export default function Platforms() {
  const { t } = useLanguage();
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <>
    {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}
    <section id="platforms" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Centred heading */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-sm font-semibold text-[#4ade80] uppercase tracking-widest mb-3">{t.platformsLabel}</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#f2f4f1] mb-4 leading-tight">
            {t.platformsHeading}
          </h2>
          <p className="text-lg text-[#7a8e7a] leading-relaxed">{t.platformsSubtitle}</p>
        </div>

        {/* Equal-width two-column grid */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {/* WhatsApp */}
          <div className="flex flex-col p-8 rounded-2xl bg-[#0d110e] border border-[#25D366]/15 hover:border-[#25D366]/35 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-[#25D366]/10 flex items-center justify-center mb-6 group-hover:bg-[#25D366]/18 transition-colors duration-300">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#f2f4f1] mb-3">{t.waTitle}</h3>
            <p className="text-base text-[#7a8e7a] leading-relaxed flex-1 mb-7">{t.waDesc}</p>
            <button
              onClick={() => setShowComingSoon(true)}
              className="inline-flex items-center gap-2 px-5 py-3 text-base font-medium text-[#25D366] border border-[#25D366]/25 rounded-xl hover:bg-[#25D366]/10 transition-all duration-200 self-start cursor-pointer"
            >
              {t.waCTA}
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Telegram */}
          <div className="flex flex-col p-8 rounded-2xl bg-[#0d110e] border border-[#229ED9]/15 hover:border-[#229ED9]/35 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-[#229ED9]/10 flex items-center justify-center mb-6 group-hover:bg-[#229ED9]/18 transition-colors duration-300">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-[#229ED9]">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#f2f4f1] mb-3">{t.tgTitle}</h3>
            <p className="text-base text-[#7a8e7a] leading-relaxed flex-1 mb-7">{t.tgDesc}</p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-base font-medium text-[#229ED9] border border-[#229ED9]/25 rounded-xl hover:bg-[#229ED9]/10 transition-all duration-200 self-start"
            >
              {t.tgCTA}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
