/**
 * Format time display (24-hour format with minutes)
 */
export function formatTime(hour, minute) {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
} 