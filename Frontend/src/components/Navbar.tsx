import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import navMark from "@/imports/sanjeevani_logo_no_background__1_-1.png";
import { useLanguage } from "@/context/LanguageContext";
import { Language, languageNames } from "@/i18n/translations";

const langList = Object.entries(languageNames) as [Language, string][];

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: t.navHome, href: "#home" },
    { label: t.navFeatures, href: "#features" },
    { label: t.navHowItWorks, href: "#how-it-works" },
    { label: t.navPlatforms, href: "#platforms" },
    { label: t.navAbout, href: "#about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070907]/96 backdrop-blur-md border-b border-[#4ade80]/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => handleNav("#home")}
          className="flex items-center gap-1.5 cursor-pointer flex-shrink-0 group"
          aria-label="SANJEEVANI — go to home"
        >
          <img
            src={navMark}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="h-9 sm:h-14 w-auto block flex-shrink-0"
          />
          <span
            className="text-[0.95rem] sm:text-[1.15rem]"
            style={{
              fontFamily: "'Comfortaa', system-ui, sans-serif",
              fontWeight: 800,
              letterSpacing: "0.06em",
              color: "#4ade80",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            SANJEEVANI
          </span>
        </button>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="px-3 py-2 text-sm text-[#7a8e7a] hover:text-[#f2f4f1] transition-colors duration-200 rounded-md hover:bg-[#4ade80]/5 cursor-pointer whitespace-nowrap"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop right: lang picker + CTA */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
          {/* Language dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-[#7a8e7a] hover:text-[#f2f4f1] border border-[#4ade80]/15 hover:border-[#4ade80]/35 rounded-lg transition-all duration-200 cursor-pointer"
            >
              <span className="text-xs">{languageNames[lang]}</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-[#0d110e] border border-[#4ade80]/15 rounded-xl shadow-xl shadow-black/40 overflow-hidden z-50">
                <div className="max-h-72 overflow-y-auto py-1">
                  {langList.map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                        lang === code
                          ? "bg-[#4ade80]/12 text-[#4ade80]"
                          : "text-[#7a8e7a] hover:bg-[#4ade80]/6 hover:text-[#f2f4f1]"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNav("#platforms")}
            className="px-4 py-2 text-sm font-medium text-[#070907] bg-[#4ade80] rounded-lg hover:bg-[#22c55e] transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            {t.getStarted}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-[#7a8e7a] hover:text-[#f2f4f1] transition-colors flex-shrink-0"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0d110e]/98 backdrop-blur-md border-b border-[#4ade80]/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="block w-full text-left px-4 py-3 text-base text-[#7a8e7a] hover:text-[#f2f4f1] hover:bg-[#4ade80]/5 rounded-lg transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            {/* Mobile language picker */}
            <div className="pt-2 pb-1">
              <p className="px-4 text-xs text-[#3d503d] mb-2 uppercase tracking-wider">Language</p>
              <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto px-1">
                {langList.map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => { setLang(code); }}
                    className={`text-left px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                      lang === code
                        ? "bg-[#4ade80]/15 text-[#4ade80]"
                        : "text-[#7a8e7a] hover:bg-[#4ade80]/6"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#4ade80]/10">
              <button
                onClick={() => handleNav("#platforms")}
                className="w-full px-4 py-3 text-base font-medium text-[#070907] bg-[#4ade80] rounded-lg cursor-pointer"
              >
                {t.getStarted}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
