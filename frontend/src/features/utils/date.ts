import { i18n } from "@/boot/i18n";

const I18n = i18n;

type Datelike = Date | string | number;

const TIME_SPANS: readonly [number, Intl.RelativeTimeFormatUnit][] = [
  [60, "seconds"],
  [60, "minutes"],
  [24, "hours"],
  [7, "days"],
  [4, "weeks"],
  [12, "months"],
];

/**
 * Create date object from date-like object. i.e; string, timestamp or a real date.
 */
export const parseDate = (date?: Datelike | null): Date => {
  if (!date) {
    return new Date();
  }
  if (!(date instanceof Date)) {
    return new Date(date);
  }
  return date;
};

/**
 * Format a date-like object as an ISO timestamp without milliseconds.
 */
export const formatDateTimeForBackend = (date?: Datelike | null): string | null => {
  if (!date) {
    return null;
  }
  return parseDate(date)
    .toISOString()
    .replace(/\.[0-9]{3}/, "");
};

/**
 * Format a date object as localized time
 */
export const formatTime = (date: Datelike, withSeconds = false): string => {
  const { d } = I18n.global;
  return d(parseDate(date), { timeStyle: withSeconds ? "medium" : "short" });
};

/**
 * Format a date object as a short ISO string (YYYY-MM-DD)
 */
export const formatDate = (date: Datelike): string => {
  return parseDate(date).toISOString().substring(0, 10);
};

/**
 * Format a date and time ISO-style string (YYYY-MM-DD HH:mm(:ss))
 */
export const formatDateTime = (date: Datelike, withSeconds = false): string => {
  const dateObj = parseDate(date); // avoid parsing multiple times if need be
  return `${formatDate(dateObj)} ${formatTime(dateObj, withSeconds)}`;
};

/**
 * Format a time interval in a humanized manner
 */
export const formatTimeSince = (date: Datelike): string => {
  const timeFormatter = new Intl.RelativeTimeFormat(I18n.global.locale.value || "en", { numeric: "auto" });
  const dateObj = parseDate(date);
  let duration = (dateObj.getTime() - new Date().getTime()) / 1000;
  for (const [amount, span] of TIME_SPANS) {
    if (Math.abs(duration) < amount) {
      return timeFormatter.format(Math.round(duration), span);
    }
    duration = duration / amount;
  }
  return timeFormatter.format(Math.round(duration), "years");
};

/**
 * Check if one date is after another date
 */
export const dateIsAfter = (date: Date, otherDate: Date) => {
  return date > otherDate;
};

/**
 * Get diff between two dates in seconds.
 */
export const dateDiff = (date: Date, otherDate: Date): number => {
  return (date.getTime() - otherDate.getTime()) / 1000;
};

/**
 * Format an interval of minutes for display
 */
export const formatTimeInterval = (intervalMinutes: number): string => {
  if (!intervalMinutes) {
    return "";
  }
  let output = "";
  const totalHours = Math.floor(intervalMinutes / 60);
  if (totalHours) {
    output += `${totalHours}h`;
  }
  const totalMinutes = Math.floor(intervalMinutes % 60);
  if (totalMinutes) {
    output += `${totalMinutes}m`;
  }
  return output;
};

/**
 * Get current Time Zone
 */
export const getTimeZone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Get the number of minutes between two timezones
 */
export const getTimeZoneOffset = (
  timeZone: string,
  currentTimezone: string | undefined = undefined,
): number => {
  const sourceTimezone = currentTimezone || getTimeZone();
  const date = new Date();
  const utcDate = new Date(date.toLocaleString("en-US", { timeZone: sourceTimezone }));
  const tzDate = new Date(date.toLocaleString("en-US", { timeZone }));
  return (tzDate.getTime() - utcDate.getTime()) / 60 / 1000;
};

/**
 * Rounds time to nearest specified number of minutes
 */
export const roundTimeToNearest = (time: string, roundToMinutes = 5) => {
  const coefficient = 1000 * 60 * roundToMinutes;

  const date = new Date(`1970-01-01T${time}:00Z`);

  const rounded = new Date(Math.round(date.getTime() / coefficient) * coefficient);

  return rounded.toISOString().substring(11, 16);
};
