import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function calculateDistance(origin, destination) {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(
    destination
  )}&key=${API_KEY}&language=he`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("שגיאה בבקשת הנתונים");
    }
    const data = await response.json();

    if (data.rows[0].elements[0].status === "OK") {
      const distanceText = await data.rows[0].elements[0].distance.text;
      return distanceText.replace("km", "ק''מ").replace("m", "מטר");
    } else {
      throw new Error("לא ניתן לחשב את המרחק, נסה כתובת אחרת.");
    }
  } catch (error) {
    console.error("שגיאה בחישוב המרחק:", error.message);
    throw error;
  }
}
