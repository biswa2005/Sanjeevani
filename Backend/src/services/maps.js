import axios from "axios";
import { config } from "dotenv";

config();

const MEDICAL_KEYWORDS = [
  "hospital",
  "clinic",
  "medical",
  "health",
  "nursing",
  "pharmacy",
  "diagnostic",
  "dental",
];


async function getNearbyHealthcareCenters(lat, lng) {
 const response = await axios.get(
   "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
   {
     params: {
       location: `${lat},${lng}`,
       radius: 5000,
       type: "hospital",
       keyword: "hospital|clinic|medical",
       key: process.env.GOOGLE_MAPS_API_KEY,
     },
   },
 );

 return response.data.results
   .filter((place) => {
     const name = place.name.toLowerCase();
     return MEDICAL_KEYWORDS.some((word) => name.includes(word));
   })
   .map((place) => ({
     name: place.name,
     mapLink: `https://www.google.com/maps/place/?q=${encodeURIComponent(place.name)})`,
   }));
}

export default getNearbyHealthcareCenters;
