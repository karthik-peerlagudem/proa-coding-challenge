/**
 * Formats an ISO date string to a human-readable format 'DD/MM/YYYY HH:mm:ss'
 *
 * @param {string} isoString - Date string in ISO format (e.g., '2023-08-29T06:00:00.000Z')
 * @returns {string} Formatted date string in 'DD/MM/YYYY HH:mm:ss' format
 *
 * @example
 * // Returns "29/08/2023 06:00:00"
 * formatTimestamp("2023-08-29T06:00:00.000Z")
 *
 * @throws {Error} If the input string is not a valid ISO date format
 *
 */
export function formatTimestamp(isoString: string): string | null {
    try {
        const date = new Date(isoString);
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = date.getUTCFullYear();
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    } catch (error) {
        console.error('Invalid ISO date format', error);
        return null;
    }
}

/**
 * Converts a date string from 'DD/MM/YYYY HH:mm:ss' format to SQLite timestamp format
 * @param {string} dateStr - Date string in format 'DD/MM/YYYY HH:mm:ss'
 * @returns {string} ISO formatted date string
 * @example
 * convertToSQLiteTimestamp('29/08/2023 06:00:00')
 * // returns '2023-08-29T06:00:00.000Z'
 */
export function convertToSQLiteTimestamp(dateStr: string): string {
    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('/');
    return new Date(`${year}-${month}-${day}T${timePart}.000Z`).toISOString();
}
