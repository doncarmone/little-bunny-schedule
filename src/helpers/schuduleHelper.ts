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

    if (getIsSame(date, start, finish)) {
        times++;
    }
    if (getIsAfter(date, start)) {
        times++;
    }
    if (getIsBefore(date, finish)) {
        times++;
    }
    if (times === 2) {
        return true;
    }
    return false;
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

export const getShiftObject = (schedules: Schedule[] | undefined, date: string): Schedule | undefined => {
    if (!schedules) return undefined;
    return schedules.find((s) => resolveDate(date, s.start, s.finish));
};
