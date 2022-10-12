// Intervals
export const ONE_MINUTE_REFRESH_TIMEOUT = 60 * 1000;
export const HALF_MINUTE_REFRESH_TIMEOUT = 30 * 1000;
export const FORTY_SECONDS_REFRESH_TIMEOUT = 40 * 1000;
export const FIVETY_SECONDS_REFRESH_TIMEOUT = 50 * 1000;
export const SEVENTY_SECONDS_REFRESH_TIMEOUT = 70 * 1000;
export const THREE_MINUTES_REFRESH_TIMEOUT = 3 * 60 * 1000;
export const FIVE_MINUTES_REFRESH_TIMEOUT = 5 * 60 * 1000;
export const TEN_MINUTES_REFRESH_TIMEOUT = 10 * 60 * 1000;
export const THIRTY_MINUTES_REFRESH_TIMEOUT = 30 * 60 * 1000;
export const INPUT_DEBOUNCE_TIME = 400;
export const MIN_SOL_BALANCE_REQUIRED = 0.05;
export const TRANSACTIONS_PER_PAGE = 15;
export const ACCOUNTS_LOW_BALANCE_LIMIT = 0.01; // Minimum balance to start showing user account tokens in accounts page
export const MAX_TOKEN_LIST_ITEMS = 100;
export const CUSTOM_TOKEN_NAME = 'Custom token';
export const INPUT_AMOUNT_PATTERN = /^\d*[.,]?\d*$/;
export const INTEGER_INPUT_AMOUNT_PATTERN = /^[1-9]\d*$/;
export const DATEPICKER_FORMAT = 'MM/DD/YYYY';
export const TIMEPICKER_FORMAT = 'h:mm a';
export const SIMPLE_DATE_FORMAT = 'mm/dd/yyyy';
export const SIMPLE_DATE_TIME_FORMAT = 'mm/dd/yyyy HH:MM';
export const SIMPLE_DATE_TIME_FORMAT_WITH_SECONDS = 'mm/dd/yyyy HH:MM:ss';
export const UTC_DATE_TIME_FORMAT = "UTC:ddd, dd mmm HH:MM:ss";
export const UTC_DATE_TIME_FORMAT2 = "UTC:ddd, dd mmm HH:MM:ss Z";
export const UTC_FULL_DATE_TIME_FORMAT = "UTC:dddd, mmm dS 'at' HH:MM Z";
export const VERBOSE_DATE_FORMAT = 'ddd mmm dd yyyy';
export const VERBOSE_DATE_TIME_FORMAT = 'ddd mmm dd yyyy HH:MM';
export const SOLANA_EXPLORER_URI_INSPECT_ADDRESS = 'https://solana.fm/account/';
export const SOLANA_EXPLORER_URI_INSPECT_TRANSACTION = 'https://solana.fm/tx/';
export const SOLANA_STATUS_PAGE = 'https://status.solana.com/';
export const WRAPPED_SOL_MINT_ADDRESS = 'So11111111111111111111111111111111111111112';

export const meanFiHeaders = new Headers();
meanFiHeaders.append('X-Api-Version', '1.0');
meanFiHeaders.append('content-type', 'application/json;charset=UTF-8');
export const requestOptions: RequestInit = {
    headers: meanFiHeaders
}

export const WHITELISTED_ADDRESSES = [
    'GFefRR6EASXvnphnJApp2PRH1wF1B5pJijKBZGFzq1x1', // YAF
    'FkRtTexEwLtYerHRKUku7ZZJx1VuTqxwGF636nAuer3B', // YAF
    'DG6nJknzbAq8xitEjMEqUbc77PTzPDpzLjknEXn3vdXZ', // YAF
];

export const BIGNUMBER_FORMAT = {
    prefix: '',
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
    suffix: ''
}
