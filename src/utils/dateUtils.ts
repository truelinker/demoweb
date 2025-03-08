/**
 * Format a date string into a more readable format
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
} 