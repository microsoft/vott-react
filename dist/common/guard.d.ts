export default class Guard {
    /**
     * Validates the string express is not null or empty, otherwise throws an exception
     * @param value - The value to validate
     * @param paramName - The name of the parameter to validate
     * @param message - The error message to return on invalid value
     */
    static emtpy(value: string, paramName?: string, message?: string): void;
    /**
     * Validates the value is not null, otherwise throw an exception
     * @param value - The value to validate
     * @param paramName - The name of the parameter to validate
     * @param message - The error message to return on invalid value
     */
    static null(value: any, paramName?: string, message?: string): void;
    /**
     * Validates the value meets the specified expectation, otherwise throws an exception
     * @param value - The value to validate
     * @param predicate - The predicate used for validation
     * @param paramName - The name of the parameter to validate
     * @param message - The error message to return on invalid value
     */
    static expression<T>(value: T, predicate: (value: T) => boolean, paramName?: string, message?: string): void;
}
