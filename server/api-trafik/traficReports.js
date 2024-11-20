import axios from "axios";
import * as cheerio from "cheerio";

const URL = "https://www.iroads.co.il/";
async function fetchTrafficReports() {
  try {
    // שליפת התוכן של הדף
    const { data } = await axios.get(URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    
    const $ = cheerio.load(data);
    // שמירת כל סוגי הדיווחים
    const reportCategories = [
      { id: "#allReports", category: "הכל" },
      // { id: '#roadConstruction', category: 'עבודות' },
      // { id: '#loads', category: 'עומסים' }
    ];

    const reports = [];

    reportCategories.forEach(({ id, category }) => {
      // חיפוש דיווחים תחת כל קטגוריה
      $(`${id} .reportsList__item`).each((index, element) => {
        const roadNumber = $(element)
          .find(".roadNumber")
          .text()
          .trim()
          .replace(/\s+/g, " ");
        const description = $(element)
          .find(".description")
          .text()
          .trim()
          .replace(/\s+/g, " ");

        // חיפוש זמן דיווח, אם קיים
        //   const timeReport = $(element).find('.timeReport').text().trim(); // צריך לוודא ש-HTML כולל שעת דיווח

        reports.push({
          roadNumber,
          description,
          category,
        });
      });
    });
    return reports;
  } catch (error) {
    console.error("Error fetching traffic reports:", error);
  }
}

async function fetchAndCompareReports() {
  const currentReports = await fetchTrafficReports();
  if (JSON.stringify(currentReports) !== JSON.stringify(previousReports)) {
    console.log("עודכנו דיווחים חדשים:", currentReports);
    previousReports = currentReports;
  } else {
    console.log("אין שינויים בדיווחים.");
  }
}

export default fetchTrafficReports;
