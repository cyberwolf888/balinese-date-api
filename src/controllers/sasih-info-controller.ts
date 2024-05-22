import { BalineseDate } from "balinese-date-js-lib";

export const getCurrent = async (date: Date) => {
    const currentDateTime = date || new Date();

    const now = new BalineseDate(currentDateTime);
    const isNowPurnama = now.sasihDayInfo.name === "Purnama";
    const isNowTilem = now.sasihDayInfo.name === "Tilem";

    return isNowPurnama || isNowTilem;
}

export const getFullMonth = async (date: Date) => {
    const currentDateTime = date || new Date();
    // console.log(currentDateTime.toISOString());
    //foreach day in month
    const days: object[] = [];
    const totalDays = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), 0).getDate();
    // console.log(totalDays);
    for (let i = 1; i <= totalDays; i++) {
        const day = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), i);
        // console.log(day.toISOString());
        const balineseDate = new BalineseDate(day);
        const isNowPurnama = balineseDate.sasihDayInfo.name === "Purnama";
        const isNowTilem = balineseDate.sasihDayInfo.name === "Tilem";

        if(isNowPurnama || isNowTilem){
            const formattedDate = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
            days.push({
                date: formattedDate,
                isPurnama: isNowPurnama,
                isTilem: isNowTilem
            });
        }

    }

    return days;

}


export const getFullYear = async (year: number) => {
    const currentYear:number = year || new Date().getFullYear();
    const months: object[] = [];
    for (let i = 0; i < 12; i++) {
        const date = new Date(currentYear, i, 1);
        const data = await getFullMonth(date);
        data.forEach((day: object) => months.push(day));
    }

    return months;
}

