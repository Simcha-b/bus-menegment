import React, { useEffect, useState } from "react";
export function TrafficReports() {
  const [trafficReports, setTrafficReports] = useState([]);
  const fetchReports = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/orders/traffic-reports`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("שגיאה בבקשת הנתונים");
      }
      const data = await response.json();
      setTrafficReports(data);
    } catch (error) {
      console.error("שגיאה בקריאת הדיווחים:", error);
      alert("אירעה שגיאה בקריאת הדיווחים");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div style={{
      height: '150px',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid #ccc',
      borderRadius: '4px',
    }}>
      <div style={{
        animation: 'moveUp 30s linear infinite',
        position: 'relative',
        transform: 'translateY(0)'  // התחלה מלמעלה
      }}>
        {trafficReports.map((report, index) => (
          <div key={index} style={{
            padding: '10px',
            borderBottom: '1px solid #eee'
          }}>
            <h3>{report.roadNumber}</h3>
            <p>{report.description}</p>
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes moveUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
        `}
      </style>
    </div>
  );
}

