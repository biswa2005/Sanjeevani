import axios from "axios";

// Backup Server 1 (France)
// const OVERPASS_URL = "https://overpass.kumi.systems/api/interpreter";

// Backup Server 2 (Russia)
const OVERPASS_URL = "https://maps.mail.ru/osm/tools/overpass/api/interpreter";

async function getNearbyHealthcareCenters(lat, lng, radiusMeters = 5000) {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"~"hospital|clinic|pharmacy|doctors|nursing_home"](around:${radiusMeters},${lat},${lng});
      node["healthcare"](around:${radiusMeters},${lat},${lng});
      way["amenity"~"hospital|clinic|pharmacy|doctors|nursing_home"](around:${radiusMeters},${lat},${lng});
      way["healthcare"](around:${radiusMeters},${lat},${lng});
    );
    out center;
  `;

  try {
    const response = await axios.post(
      OVERPASS_URL,
      `data=${encodeURIComponent(query)}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json", // Force the server to accept JSON
          // IMPORTANT: Replace these with your actual bot name, email, or GitHub link
          "User-Agent": "MyHealthcareBot/1.0 (contact: your_actual_email@gmail.com)",
          "Referer": "https://github.com/yourusername", // The firewall now requires a Referer
        },
        timeout: 10000, 
      }
    );

    const elements = response.data?.elements || [];

    const places = elements
      .map((el) => {
        const placeLat = el.lat || el.center?.lat;
        const placeLng = el.lon || el.center?.lon;
        const name = el.tags?.name;

        if (!name || !placeLat || !placeLng) return null;

        const category =
          el.tags?.amenity || el.tags?.healthcare || "Healthcare Facility";

        return {
          name,
          category: category.replace(/_/g, " ").toUpperCase(),
          mapLink: `https://www.google.com/maps/search/?api=1&query=${placeLat},${placeLng}`,
        };
      })
      .filter(Boolean);

    // Deduplicate by name
    return Array.from(
      new Map(places.map((place) => [place.name, place])).values()
    );
    
  } catch (error) {
    // If it fails, log the exact server rejection reason (e.g., 429 Too Many Requests)
    console.error("Overpass API Error Status:", error.response?.status);
    console.error("Overpass API Error Data:", error.response?.data || error.message);
    throw error; // Re-throw so bot.js can catch it and tell the user
  }
}

export default getNearbyHealthcareCenters;