import axios from 'axios';
import * as cheerio from 'cheerio';
import cron from 'node-cron';

const URL = "https://www.iroads.co.il/";

// מבנה הנתונים של דיווח תנועה
class TrafficReport {
    constructor(title, location, description, timestamp) {
        this.title = title;
        this.location = location;
        this.description = description;
        this.timestamp = timestamp;
    }
}

// פונקציה לניתוח פריט דיווח בודד
function parseReportItem($item) {
    try {
        const title = $item.find('.areaName').text().trim();
        const location = $item.find('.report-location').text().trim();
        const description = $item.find('.description').text().trim();
        const timestamp = $item.find('.report-time').text().trim();

        return new TrafficReport(title, location, description, timestamp);
    } catch (error) {
        console.error('שגיאה בניתוח פריט:', error);
        return null;
    }
}

async function fetchData() {
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);
        const reports = [];

        // שליפת כל הדיווחים
        $('.reportsList__item').each((index, element) => {
            const report = parseReportItem($(element));
            if (report) {
                reports.push(report);
            }
        });

        console.log('נאספו', reports.length, 'דיווחים');
        return reports;

    } catch (error) {
        console.error('שגיאה בשליפת נתונים:', error);
        return [];
    }
}
export default fetchData;

// קביעת משימה מחזורית לריצת הקוד כל כמה דקות (למשל, כל 5 דקות)
// cron.schedule('*/5 * * * *', fetchData);

// הפעלת הקוד בפעם הראשונה מיד עם העלאת הסקריפט
// fetchData();
