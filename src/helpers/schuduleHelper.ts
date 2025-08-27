import { isSameDay, isAfter, isBefore, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Schedule } from "./interafaces";

export const getIsSame = (date: string, start: string, finish: string): boolean => {
    return isSameDay(date, start) || isSameDay(date, finish);
};

export const getIsAfter = (date: string, start: string): boolean => {
    return isAfter(date, start);
};

export const getIsBefore = (date: string, finish: string): boolean => {
    return isBefore(date, finish);
};

export const resolveDate = (date: string, start: string, finish: string): boolean => {
    let times = 0;

    if (getIsSame(date, start, finish)) times++;
    if (getIsAfter(date, start)) times++;
    if (getIsBefore(date, finish)) times++;

    return times === 2;
};

export const getPrettyDate = (date: string): string => {
    return format(date, 'd MMMM yyyy', { locale: es });
};

export const getShiftPretty = (shiftId: string): string => {
    switch (shiftId) {
        case '1':
            return 'mañana';
        case '2':
            return 'tarde';
        case '3':
            return 'noche';
        default:
            return '';
    }
};

// function getShiftObject(date) {
//     // return schedules.find((s) => resolve(date, s.start, s.finish));
// }
// export const getShiftObject = (): Schedule {

// }
