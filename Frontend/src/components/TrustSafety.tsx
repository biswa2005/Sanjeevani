import { Lock, Bot, BookCheck, Globe, Server } from "lucide-react";

const trustItems = [
  {
    icon: Lock,
    title: "Privacy",
    description:
      "Sensitive healthcare information is handled with strict data protection practices. Your health data is yours.",
  },
  {
    icon: Bot,
    title: "Responsible AI",
    description:
      "SANJEEVANI provides guidance without presenting AI responses as definitive medical diagnoses. Ethical AI by design.",
  },
  {
    icon: BookCheck,
    title: "Verified Information",
    description:
      "Health guidance is grounded in reliable datasets and validated healthcare information sources.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description:
      "Designed for different languages, literacy levels, devices, and connectivity conditions across all demographics.",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description:
      "Architecture built for scalable and secure healthcare applications with encrypted data handling.",
  },
];

export default function TrustSafety() {
  return (
    <section id="safety" className="py-24 relative">
      {/* Top border accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#4ade80]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold text-[#4ade80] uppercase tracking-widest mb-4">Trust & Safety</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f2f4f1] mb-5 leading-tight">
            Built with safety in mind.
          </h2>
          <p className="text-base text-[#7a8e7a] leading-relaxed">
            Healthcare requires trust. Every aspect of SANJEEVANI is designed around responsible, safe, and accessible AI delivery.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustItems.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-6 rounded-xl bg-[#0d110e] border border-[#4ade80]/8 hover:border-[#4ade80]/22 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-[#4ade80]/10 flex items-center justify-center group-hover:bg-[#4ade80]/18 transition-colors">
                  <Icon size={17} className="text-[#4ade80]" />
                </div>
                <h3 className="text-sm font-semibold text-[#f2f4f1]">{title}</h3>
              </div>
              <p className="text-sm text-[#7a8e7a] leading-relaxed">{description}</p>
            </div>
          ))}

          {/* Medical disclaimer card */}
          <div className="sm:col-span-2 lg:col-span-2 p-6 rounded-xl bg-[#0d110e] border border-amber-500/12 group">
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <BookCheck size={17} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#f2f4f1] mb-2">Medical Disclaimer</h3>
                <p className="text-sm text-[#7a8e7a] leading-relaxed">
                  SANJEEVANI provides informational and preliminary health guidance only. It does not replace
                  professional medical diagnosis, advice, or treatment. Always consult a qualified healthcare
                  professional for medical concerns. For emergencies, contact your local emergency services
                  or seek immediate medical attention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
