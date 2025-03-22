// Add this to your lib/utils.ts file

/**
 * Format a date to display in a friendly format (e.g., "Mon, 23 Feb 2025")
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  })
}
