import { Home, User, Activity, Baby, Heart, Users } from "lucide-react";

const audiences = [
  {
    icon: Home,
    title: "Rural Communities",
    description: "Bringing quality health guidance to areas with limited clinic access.",
  },
  {
    icon: User,
    title: "Elderly Users",
    description: "Simple interface and voice support designed for older adults.",
  },
  {
    icon: Activity,
    title: "Chronic Disease Patients",
    description: "Consistent reminders and monitoring support for long-term conditions.",
  },
  {
    icon: Baby,
    title: "Parents",
    description: "Vaccination tracking and child health guidance for growing families.",
  },
  {
    icon: Heart,
    title: "Pregnant Women",
    description: "Prenatal care reminders and maternal health information.",
  },
  {
    icon: Users,
    title: "Low-Income Families",
    description: "Free access to healthcare guidance through familiar messaging apps.",
  },
];

export default function ForEveryone() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold text-[#4ade80] uppercase tracking-widest mb-4">For Everyone</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f2f4f1] mb-5 leading-tight">
            Designed for people, not just devices.
          </h2>
          <p className="text-base text-[#7a8e7a] leading-relaxed">
            SANJEEVANI serves communities that need healthcare access most — bridging the gap between
            underserved populations and quality health information.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiences.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-4 p-5 rounded-xl bg-[#0d110e] border border-[#4ade80]/8 hover:border-[#4ade80]/22 transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#4ade80]/8 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4ade80]/16 transition-colors">
                <Icon size={16} className="text-[#4ade80]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#f2f4f1] mb-1.5">{title}</h3>
                <p className="text-xs text-[#7a8e7a] leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
