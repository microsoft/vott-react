/**
 * Generates a random integer in provided range
 * @param min Lower bound of random number generation - INCLUSIVE
 * @param max Upper bound of random number generation - EXCLUSIVE
 */
export declare function randomIntInRange(min: any, max: any): any;
/**
 * Common key codes used throughout application
 */
export declare const KeyCodes: {
    comma: number;
    enter: number;
    backspace: number;
    ctrl: number;
    shift: number;
    tab: number;
};
/**
 * Generates a query string from the key/values of a JSON object
 * @param object The json object
 * @returns A value representing a URL compatible query string
 */
export declare function createQueryString(object: any): string;
