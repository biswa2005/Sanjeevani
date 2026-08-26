import { useState } from "react";
import { MapPin, Search, Navigation, Building2, Pill, Stethoscope, Heart, Clock } from "lucide-react";

const categories = [
  { icon: Building2, label: "Hospital" },
  { icon: Stethoscope, label: "Clinic" },
  { icon: Pill, label: "Pharmacy" },
  { icon: Heart, label: "Health Center" },
];

const sampleFacilities = [
  { name: "City General Hospital", type: "Hospital", distance: "1.2 km", open: true, specialty: "Multi-specialty" },
  { name: "Apollo Family Clinic", type: "Clinic", distance: "0.6 km", open: true, specialty: "General Medicine" },
  { name: "MedPlus Pharmacy", type: "Pharmacy", distance: "0.3 km", open: true, specialty: "24-hour" },
  { name: "Primary Health Centre", type: "Health Center", distance: "2.1 km", open: false, specialty: "Government" },
];

export default function HealthcareLocator() {
  const [activeCategory, setActiveCategory] = useState("Hospital");
  const [locationInput, setLocationInput] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (locationInput.trim()) setSearched(true);
  };

  return (
    <section id="healthcare" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold text-[#4ade80] uppercase tracking-widest mb-4">Healthcare Locator</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f2f4f1] mb-5 leading-tight">
            Find healthcare near you.
          </h2>
          <p className="text-base text-[#7a8e7a] leading-relaxed">
            Discover hospitals, clinics, pharmacies, and health centers in your area — even in low-connectivity environments.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Search UI */}
          <div className="space-y-5">
            {/* Location input */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3d503d]" />
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Enter your area or city…"
                  className="w-full bg-[#0d110e] border border-[#4ade80]/12 rounded-xl pl-10 pr-4 py-3 text-sm text-[#f2f4f1] placeholder-[#3d503d] focus:outline-none focus:border-[#4ade80]/35 transition-colors"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-4 py-3 bg-[#4ade80] text-[#070907] rounded-xl hover:bg-[#22c55e] transition-colors text-sm font-medium flex items-center gap-2 cursor-pointer"
              >
                <Search size={15} />
                Search
              </button>
            </div>

            {/* Use location button */}
            <button className="flex items-center gap-2 text-sm text-[#4ade80] hover:text-[#22c55e] transition-colors cursor-pointer">
              <Navigation size={14} />
              Use my current location
            </button>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => setActiveCategory(label)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                    activeCategory === label
                      ? "bg-[#4ade80] text-[#070907]"
                      : "bg-[#0d110e] border border-[#4ade80]/12 text-[#7a8e7a] hover:border-[#4ade80]/35"
                  }`}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              className="relative rounded-xl overflow-hidden border border-[#4ade80]/10 bg-[#0d110e]"
              style={{ height: "220px" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#4ade80]/10 flex items-center justify-center">
                  <MapPin size={20} className="text-[#4ade80]" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#f2f4f1] font-medium">Interactive map</p>
                  <p className="text-xs text-[#3d503d] mt-1">Location services ready for API integration</p>
                </div>
              </div>
              {/* Decorative pins */}
              <div className="absolute top-8 left-1/3 w-3 h-3 rounded-full bg-[#4ade80] opacity-40" />
              <div className="absolute top-16 left-1/2 w-3 h-3 rounded-full bg-[#4ade80] opacity-60" />
              <div className="absolute bottom-12 right-1/3 w-3 h-3 rounded-full bg-[#4ade80] opacity-30" />
            </div>
          </div>

          {/* Right: Results */}
          <div className="space-y-3">
            <p className="text-xs text-[#3d503d] font-medium uppercase tracking-wider mb-4">
              {searched ? `Showing results near "${locationInput}"` : "Sample nearby facilities"}
            </p>
            {sampleFacilities.map((facility) => (
              <div
                key={facility.name}
                className="p-4 rounded-xl bg-[#0d110e] border border-[#4ade80]/8 hover:border-[#4ade80]/22 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-[#f2f4f1] truncate">{facility.name}</h4>
                      <span
                        className={`flex-shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                          facility.open
                            ? "bg-[#4ade80]/12 text-[#4ade80]"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {facility.open ? "Open" : "Closed"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#7a8e7a]">
                      <span className="flex items-center gap-1">
                        <MapPin size={10} className="text-[#3d503d]" />
                        {facility.distance}
                      </span>
                      <span className="text-[#3d503d]">·</span>
                      <span>{facility.specialty}</span>
                      <span className="text-[#3d503d]">·</span>
                      <span>{facility.type}</span>
                    </div>
                  </div>
                  <button className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#4ade80] border border-[#4ade80]/20 rounded-lg hover:bg-[#4ade80]/8 transition-colors cursor-pointer">
                    <Clock size={11} />
                    Details
                  </button>
                </div>
              </div>
            ))}
            <p className="text-xs text-[#3d503d] text-center pt-2">
              Connect Google Maps or OpenStreetMap API for live results
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
