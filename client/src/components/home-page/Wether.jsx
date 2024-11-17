import React, { useEffect, useState } from "react";

function Wether() {
  const [wether, setWether] = useState({});
  const [error, setError] = useState(null);

  const fetchWether = async () => {
    try {
      const response = await fetch(
        "http://api.weatherstack.com/current?access_key=0390621ab2c2ef5b8ed65d3fc4fecffd&query=Beit-Shemesh",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("שגיאה בבקשת הנתונים");
      }
      const data = await response.json();
      console.log(data);
      setWether(data);
    } catch (error) {
      console.error("שגיאה בקריאת הדיווחים:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchWether();
  }, []);

  return (
    <div>
      {error ? (
        <div>שגיאה: {error}</div>
      ) : (
        <div>
          {/* הצגת הנתונים */}
          {wether.current && (
            <div>
              <p>{wether.location.name}</p>
              <p>טמפרטורה: {wether.current.temperature}°C</p>
              <img src={wether.current.weather_icons[0]} alt="weather icon"  />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Wether;
