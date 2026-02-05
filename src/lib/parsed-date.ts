import moment, { Moment } from "moment";
import "moment/locale/id";

type Language = "id" | "en";
type TimeFormat = "12h" | "24h";

// Types
export interface EventDate {
    start: string;
    end: string;
}

export interface DateFormat {
    full: string;
    day: string;
    dayShort: string;
    dateMonth: string;
    year: string;
    month: string;
    date: string;
    time: string;
    raw: Moment;
}

export interface TimeRange {
    start: string;
    end: string;
    range: string;
    duration: {
        hours: number;
        minutes: number;
        formatted: string;
    };
}

export interface DateCompare {
    isSameDay: boolean;
    isSameMonth: boolean;
    isSameYear: boolean;
    diffDays: number;
    diffHours: number;
    isPast: boolean;
    isUpcoming: boolean;
    isOngoing: boolean;
}

export interface ParsedEventDate {
    start: DateFormat;
    end: DateFormat;
    time: TimeRange;
    compare: DateCompare;
}

export interface ParseOptions {
    lang?: Language;
    timeFormat?: TimeFormat;
}

// Function
export function parseEventDate(
    eventDate: EventDate,
    options: ParseOptions = {},
): ParsedEventDate {
    const { lang = "id", timeFormat = "12h" } = options;

    const start = moment(eventDate.start).locale(lang);
    const end = moment(eventDate.end).locale(lang);
    const now = moment();

    // Time format based on option
    const timePattern = timeFormat === "12h" ? "h:mm A" : "HH:mm";
    const timePatternShort = timeFormat === "12h" ? "h A" : "HH:mm";

    const formatDate = (date: Moment): DateFormat => ({
        full: date.format("YYYY-MM-DD"),
        day: date.format("dddd"),
        dayShort: date.format("ddd"),
        dateMonth: date.format("DD MMM"),
        year: date.format("YYYY"),
        month: date.format("MM"),
        date: date.format("DD"),
        time: date.format(timePattern),
        raw: date,
    });

    const formatTimeRange = (): TimeRange => {
        const startTime = start.format(timePatternShort);
        const endTime = end.format(timePatternShort);

        const diffMinutes = end.diff(start, "minutes");
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;

        let formatted = "";
        if (hours > 0)
            formatted += `${hours} ${lang === "id" ? "jam" : "hour"}${hours > 1 && lang === "en" ? "s" : ""}`;
        if (minutes > 0) {
            if (formatted) formatted += " ";
            formatted += `${minutes} ${lang === "id" ? "menit" : "minute"}${minutes > 1 && lang === "en" ? "s" : ""}`;
        }

        return {
            start: startTime,
            end: endTime,
            range: `${startTime} - ${endTime}`,
            duration: {
                hours,
                minutes,
                formatted:
                    formatted || (lang === "id" ? "0 menit" : "0 minutes"),
            },
        };
    };

    return {
        start: formatDate(start),
        end: formatDate(end),
        time: formatTimeRange(),
        compare: {
            isSameDay: start.isSame(end, "day"),
            isSameMonth: start.isSame(end, "month"),
            isSameYear: start.isSame(end, "year"),
            diffDays: end.diff(start, "days"),
            diffHours: end.diff(start, "hours"),
            isPast: end.isBefore(now),
            isUpcoming: start.isAfter(now),
            isOngoing: now.isBetween(start, end, null, "[]"),
        },
    };
}
