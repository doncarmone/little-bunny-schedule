//This file fetches the schedule data from a Gist
//The gist file will serve as the source of truth for the schedule data
//The idea behind this url is to keep updated with the current year
// const SCHEDULE_URL_GIST = `https://gist.githubusercontent.com/doncarmone/14224d2a0b5913f8199aaf2dda5a9e6d/raw/little-bunny-schedule-master-file.json`;
const SCHEDULE_URL_GIST = `https://api.github.com/gists/14224d2a0b5913f8199aaf2dda5a9e6d`;


export const getSchedule = async (year: string) => {
    const schedule = await fetch(`${SCHEDULE_URL_GIST}`)
    const data = await schedule.json();
    const obj = JSON.parse(data.files["little-bunny-schedule-master-file.json"].content);
    return obj[year] || [];
};