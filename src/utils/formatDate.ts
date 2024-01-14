/**
 * Formats a given date or timestamp into a human-readable string.
 * The format used is "01 April 2022" (day in two digits, full month name, and four-digit year).
 *
 * @param date - A date object or timestamp to be formatted.
 * @returns A string representing the formatted date.
 * @example
 *  const currentDoc: DocumentType = {
    name: name,
    createdAt: formatDate(Date.now()),
    content: markdown,
  };
 */
export default function formatDate(date: Date | number): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
}
