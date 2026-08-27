import axios from "axios";

const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
  "https://overpass.freemap.sk/api/interpreter",
];

async function getNearbyHealthcareCenters(lat, lng, radiusMeters = 5000) {
  // 1. Sanitize and validate coordinates
  const parsedLat = parseFloat(lat);
  const parsedLng = parseFloat(lng);

  if (isNaN(parsedLat) || isNaN(parsedLng)) {
    throw new Error(`Invalid coordinates supplied: lat=${lat}, lng=${lng}`);
  }

  // 2. Optimized Overpass QL query (nwr = node, way, relation)

  let lastError = null;

  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      // Use GET request with URI component encoding for maximum server compatibility
      const url = `${endpoint}?data=${encodeURIComponent(query)}`;

      const response = await axios.get(url, {
        timeout: 8000,
        headers: {
          Accept: "application/json",
        },
      });

      // Handle cases where server returns 200 OK but sends an HTML error page
      if (typeof response.data !== "object" || !response.data.elements) {
        throw new Error("Server returned non-JSON response");
      }

      const places = response.data.elements
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

      // Return deduplicated array on first success
      return Array.from(
        new Map(places.map((place) => [place.name, place])).values(),
      );
    } catch (error) {
      console.warn(`[Overpass Mirror Failed] ${endpoint}: ${error.message}`);
      lastError = error;
    }
  }

  throw new Error(
    `All Overpass mirrors failed. Last error: ${lastError?.message}`,
  );
}

export default getNearbyHealthcareCenters;
