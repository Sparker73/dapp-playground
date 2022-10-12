import bs58 from "bs58";
import BigNumber from "bignumber.js";
import moment from "moment";
import dateFormat from "dateformat";
import BN from "bn.js";
import { BIGNUMBER_FORMAT, SIMPLE_DATE_FORMAT, SIMPLE_DATE_TIME_FORMAT, VERBOSE_DATE_FORMAT, VERBOSE_DATE_TIME_FORMAT } from "constants/common";

export function consoleOut(msg: any, value?: any, color = 'black') {
    if (msg) {
        if (value === undefined) {
            console.log(`%c${msg}`, `color: ${color}`);
        } else {
            console.log(`%c${msg}`, `color: ${color}`, value);
        }
    }
}

export const friendlyDisplayDecimalPlaces = (amount: number | string, decimals?: number) => {
    if (!decimals) { return undefined; }

    if (typeof amount === "string") {

        const baseConvert = new BigNumber(10 ** decimals);
        const bigNumberAmount = new BigNumber(amount);
        const value = bigNumberAmount.div(baseConvert);
        if (value.isLessThan(10)) {
            return decimals || undefined;
        } else if (value.isGreaterThanOrEqualTo(10) && value.isLessThan(1000)) {
            return 4;
        } else if (value.isGreaterThanOrEqualTo(1000) && value.isLessThan(100000)) {
            return 3;
        } else {
            return 2;
        }
    } else {
        const value = Math.abs(amount);
        if (value < 10) {
            return decimals || undefined;
        } else if (value >= 10 && value < 1000) {
            return 4;
        } else if (value >= 1000 && value < 100000) {
            return 3;
        } else {
            return 2;
        }
    }
}

export const formatThousands = (val: number, maxDecimals?: number, minDecimals = 0) => {
    let convertedVlue: Intl.NumberFormat;

    if (maxDecimals) {
        convertedVlue = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: minDecimals,
            maximumFractionDigits: maxDecimals
        });
    } else {
        convertedVlue = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: minDecimals,
            maximumFractionDigits: 0
        });
    }

    return convertedVlue.format(val);
}

export function isValidAddress(value: any): boolean {
    if (typeof value === 'string') {
        try {
            // assume base 58 encoding by default
            const decoded = bs58.decode(value);
            if (decoded.length === 32) {
                return true;
            }
        } catch (error) {
            return false;
        }
    }
    return false;
}

export const getIntervalFromSeconds = (seconds: number, slash = false, trans?: any): string => {
    switch (seconds) {
        case 60:
            if (trans) {
                return slash ? ` / ${trans('general.minute')}` : trans('transactions.rate-and-frequency.payment-rates.per-minute');
            } else {
                return slash ? ' / minute' : 'per minute';
            }
        case 3600:
            if (trans) {
                return slash ? ` / ${trans('general.hour')}` : trans('transactions.rate-and-frequency.payment-rates.per-hour');
            } else {
                return slash ? ' / hour' : 'per hour';
            }
        case 86400:
            if (trans) {
                return slash ? ` / ${trans('general.day')}` : trans('transactions.rate-and-frequency.payment-rates.per-day');
            } else {
                return slash ? ' / day' : 'per day';
            }
        case 604800:
            if (trans) {
                return slash ? ` / ${trans('general.week')}` : trans('transactions.rate-and-frequency.payment-rates.per-week');
            } else {
                return slash ? ' / week' : 'per week';
            }
        case 2629750:
            if (trans) {
                return slash ? ` / ${trans('general.month')}` : trans('transactions.rate-and-frequency.payment-rates.per-month');
            } else {
                return slash ? ' / month' : 'per month';
            }
        case 31557000:
            if (trans) {
                return slash ? ` / ${trans('general.year')}` : trans('transactions.rate-and-frequency.payment-rates.per-year');
            } else {
                return slash ? ' / year' : 'per year';
            }
        default:
            return '';
    }
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get a percentual value that partialValue represents in total
export const percentual = (partialValue: number, total: number): number => {
    return (100 * partialValue) / total;
}

export const percentualBn = (partialValue: string | BN, total: string | BN, asNumber = false): number | BN => {
    let partialBn;
    let totalBn;
    if (!partialValue) {
        return asNumber ? new BN(partialValue).toNumber() : new BN(partialValue)
    }
    if (typeof partialValue === "string") {
        partialBn = new BigNumber(partialValue);
    } else {
        partialBn = new BigNumber(partialValue.toString());
    }
    if (typeof total === "string") {
        totalBn = new BigNumber(total);
    } else {
        totalBn = new BigNumber(total.toString());
    }
    if (asNumber) {
        return partialBn.multipliedBy(100).dividedBy(totalBn).toNumber();
    }
    return new BN(partialBn.multipliedBy(100).dividedBy(totalBn).toString());
}

/**
 * Get the given percent of total
 * @param {number} percent - The percentual value to obtain from the total amount
 * @param {number} total - The total amount to calculate a given percent of
 * @returns {number} - The resulting fraction of the total
 */
export const percentage = (percent: number, total: number): number => {
    return percent * total / 100;
}

export const percentageBn = (percent: number, total: string | BN, asNumber = false): number | BN => {
    if (!percent) {
        return asNumber ? 0 : new BN(0);
    }
    let totalBn;
    if (typeof total === "string") {
        totalBn = new BigNumber(total);
    } else {
        totalBn = new BigNumber(total.toString());
    }
    if (asNumber) {
        return totalBn.multipliedBy(percent).dividedBy(100).toNumber();
    }
    return new BN(totalBn.multipliedBy(percent).dividedToIntegerBy(100).toString());
}

export const toUsCurrency = (value: any) => {
    if (!value) { return '$0.00'; }
    const converted = parseFloat(value.toString());
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(converted);
    return formatted || '';
}

export const getShortDate = (date: string, includeTime = false, isUtc = false): string => {
    if (!date) { return ''; }

    const localDate = new Date(date);
    if (isUtc) {
        const dateWithoutOffset = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));
        const displayDate = dateWithoutOffset.toUTCString();
        return dateFormat(
            displayDate,
            includeTime ? SIMPLE_DATE_TIME_FORMAT : SIMPLE_DATE_FORMAT
        );
    } else {
        return dateFormat(
            localDate,
            includeTime ? SIMPLE_DATE_TIME_FORMAT : SIMPLE_DATE_FORMAT
        );
    }
}

export const getReadableDate = (date: string, includeTime = false, isUtc = false): string => {
    if (!date) { return ''; }

    const localDate = new Date(date);
    if (isUtc) {
        const dateWithoutOffset = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));
        const displayDate = dateWithoutOffset.toUTCString();
        return dateFormat(
            displayDate,
            includeTime ? VERBOSE_DATE_TIME_FORMAT : VERBOSE_DATE_FORMAT
        );
    } else {
        return dateFormat(
            localDate,
            includeTime ? VERBOSE_DATE_TIME_FORMAT : VERBOSE_DATE_FORMAT
        );
    }
}

const units: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
    { unit: "year", ms: 31536000000 },
    { unit: "month", ms: 2628000000 },
    { unit: "day", ms: 86400000 },
    { unit: "hour", ms: 3600000 },
    { unit: "minute", ms: 60000 },
    { unit: "second", ms: 1000 },
];

export const isToday = (someDate: string): boolean => {
    if (!someDate) { return false; }
    const inputDate = new Date(someDate);
    const today = new Date();
    return inputDate.getDate() === today.getDate() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getFullYear() === today.getFullYear()
}

/**
 * Get timestamp in seconds from a date string
 * @param {string} date  - A parseable date string using Date.parse()
 * @returns {number} - The number of seconds for a timestamp
 */
export const toTimestamp = (date?: string): number => {
    const dt = date
        ? Date.parse(date)
        : Date.now();
    return Math.floor(dt / 1000);
}

export function displayTimestamp(
    unixTimestamp: number,
    shortTimeZoneName = false
): string {
    const expireDate = new Date(unixTimestamp);
    const dateString = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(expireDate);
    const timeString = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hourCycle: "h23",
        timeZoneName: shortTimeZoneName ? "short" : "long",
    }).format(expireDate);

    return `${dateString} at ${timeString}`;
}

/**
 * Should I use this format?
 * console.log(moment().endOf('day').fromNow());                // in 9 hours
 * console.log(moment("2020-04-04 11:45:26.123").fromNow());    // 6 minutes ago
 * console.log(moment().startOf('hour').fromNow());             // an hour ago
 * console.log(moment().startOf('day').fromNow());              // 15 hours ago
 * console.log(moment("20111031", "YYYYMMDD").fromNow());       // 10 years ago
 */

export const getTimeFromNow = (date: string, withoutSuffix = false): string => {
    const parsedDate = Date.parse(date);
    return moment(parsedDate).fromNow(withoutSuffix);
}

export const getTimeToNow = (date: string): string => {
    const parsedDate = Date.parse(date);
    return moment(parsedDate).toNow(true);
}

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/**
 * Get language-sensitive relative time message from Dates.
 * @param relative  - the relative dateTime, generally is in the past or future
 * @param pivot     - the dateTime of reference, generally is the current time
 */
export function relativeTimeFromDates(relative: Date | null, pivot: Date = new Date()): string {
    if (!relative) return "";
    const elapsed = relative.getTime() - pivot.getTime();
    return relativeTimeFromElapsed(elapsed);
}

/**
 * Get language-sensitive relative time message from elapsed time.
 * @param elapsed   - the elapsed time in milliseconds
 */
export function relativeTimeFromElapsed(elapsed: number): string {
    for (const { unit, ms } of units) {
        if (Math.abs(elapsed) >= ms || unit === "second") {
            const difference = elapsed / ms;
            return rtf.format(difference ? Math.round(difference) : 0, unit);
        }
    }
    return "";
}

export const getRelativeDate = (timestamp: number) => {
    const reference = new Date(timestamp);
    return relativeTimeFromDates(reference);
}

export function stringNumberFormat(value: string, dec = 0, decimalsSeparator = '.', thowsendsSeparator = ',') {
    if (!value) {
        return '0';
    }
    let fixed = '';
    const valueBn = new BigNumber(value);
    if (dec > 0) {
        BigNumber.config({
            CRYPTO: true,
            FORMAT: BIGNUMBER_FORMAT,
            DECIMAL_PLACES: dec
        });
        fixed = valueBn.toFormat(dec);
    } else {
        BigNumber.config({
            CRYPTO: true,
            FORMAT: BIGNUMBER_FORMAT,
            DECIMAL_PLACES: 0
        });
        fixed = valueBn.toFormat(0);
    }
    return fixed;
}

export function kFormatter(value: number, decimals = 0) {
    const num = value.toString().replace(/[^0-9.]/g, '');
    if (value < 1000) {
        return num;
    }
    const si = [
        { v: 1E3, s: "k" },
        { v: 1E6, s: "M" },
        { v: 1E9, s: "B" },
        { v: 1E12, s: "T" },
        { v: 1E15, s: "P" },
        { v: 1E18, s: "E" }
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (value >= si[index].v) {
            break;
        }
    }
    return (value / si[index].v).toFixed(decimals).replace(/\.0+$|(\.\d*[1-9])0+$/, "$1") + si[index].s;
}
