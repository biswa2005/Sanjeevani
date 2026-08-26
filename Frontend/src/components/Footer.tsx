import Logo from "./Logo";
import { WHATSAPP_URL, TELEGRAM_URL } from "@/constants";
import { useLanguage } from "@/context/LanguageContext";

const platformLinks = [
  {
    label: "WhatsApp",
    href: WHATSAPP_URL,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: TELEGRAM_URL,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#229ED9]">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

const legalLinks = ["Privacy Policy", "Terms", "Medical Disclaimer"];

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  const footerLinks = {
    Product: [
      { label: t.navFeatures, href: "#features" },
      { label: t.navHowItWorks, href: "#how-it-works" },
      { label: t.navPlatforms, href: "#platforms" },
    ],
    Company: [
      { label: t.navAbout, href: "#about" },
    ],
  };

  return (
    <footer className="border-t border-[#4ade80]/8 bg-[#0d110e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Logo size="sm" />
            <p className="text-sm text-[#3d503d] leading-relaxed max-w-[180px]">
              {t.footerTagline}
            </p>
            <div className="flex gap-2.5">
              {platformLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-[#111814] border border-[#4ade80]/10 flex items-center justify-center hover:border-[#4ade80]/25 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-sm font-semibold text-[#f2f4f1] uppercase tracking-wider mb-4">{section}</p>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <button
                      onClick={() => scrollTo(href)}
                      className="text-sm text-[#3d503d] hover:text-[#7a8e7a] transition-colors cursor-pointer text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect */}
          <div>
            <p className="text-sm font-semibold text-[#f2f4f1] uppercase tracking-wider mb-4">Connect</p>
            <ul className="space-y-2.5">
              {platformLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#3d503d] hover:text-[#7a8e7a] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#4ade80]/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#3d503d]">{t.footerCopyright}</p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-[#3d503d] hover:text-[#7a8e7a] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
