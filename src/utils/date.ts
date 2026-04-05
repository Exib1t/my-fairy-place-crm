/**
 * Date utility functions for order management
 */

/**
 * Format date string to locale format
 * @param dateString - ISO date string or null
 * @param locale - Locale string (default: 'ru-RU')
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string or null
 */
export const formatDate = (
  dateString: string | null,
  locale: string = "ru-RU",
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
): string | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, options);
};

/**
 * Format date string to short format (dd/mm)
 * @param dateString - ISO date string or null
 * @param locale - Locale string (default: 'ru-RU')
 * @returns Formatted date string or null
 */
export const formatDateShort = (
  dateString: string | null,
  locale: string = "ru-RU",
): string | null => {
  return formatDate(dateString, locale, {
    day: "2-digit",
    month: "2-digit",
  });
};

/**
 * Check if shipping date is overdue (before today)
 * @param shippingDate - ISO date string or null
 * @returns true if date is in the past, false otherwise
 */
export const isOverdue = (shippingDate: string | null): boolean => {
  if (!shippingDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const shipping = new Date(shippingDate);
  shipping.setHours(0, 0, 0, 0);

  return shipping < today;
};

/**
 * Check if shipping date is today
 * @param shippingDate - ISO date string or null
 * @returns true if date is today, false otherwise
 */
export const isToday = (shippingDate: string | null): boolean => {
  if (!shippingDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const shipping = new Date(shippingDate);
  shipping.setHours(0, 0, 0, 0);

  return shipping.getTime() === today.getTime();
};

/**
 * Get day of week from date string (1-7, Monday to Sunday)
 * @param dateString - ISO date string or null
 * @returns Day number (1-7) or -1 if invalid
 */
export const getDayOfWeek = (dateString: string | null): number => {
  if (!dateString) return -1;

  const date = new Date(dateString);
  const day = date.getDay();

  // Convert Sunday (0) to 7, keep Monday-Saturday (1-6)
  return day === 0 ? 7 : day;
};

/**
 * Get date for specific day of week relative to current week
 * @param dayOfWeek - Day number (1-7, Monday to Sunday)
 * @param locale - Locale string (default: 'ru-RU')
 * @returns Formatted date string (dd/mm)
 */
export const getDateForDayOfWeek = (
  dayOfWeek: number,
  locale: string = "ru-RU",
): string => {
  const today = new Date();
  const currentDay = today.getDay() === 0 ? 7 : today.getDay();
  const diff = dayOfWeek - currentDay;

  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + diff);

  return targetDate.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
  });
};

/**
 * Check if given day of week is today
 * @param dayOfWeek - Day number (1-7, Monday to Sunday)
 * @returns true if day is today, false otherwise
 */
export const isTodayColumn = (dayOfWeek: number): boolean => {
  const today = new Date();
  const currentDay = today.getDay() === 0 ? 7 : today.getDay();
  return dayOfWeek === currentDay;
};

/**
 * Reset time part of date to midnight
 * @param date - Date object
 * @returns Date with time set to 00:00:00.000
 */
export const resetTime = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

/**
 * Parse date string to Date object with time reset
 * @param dateString - ISO date string
 * @returns Date object or null if invalid
 */
export const parseDate = (dateString: string | null): Date | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return resetTime(date);
};

/**
 * Get date for specific number of days from today
 * @param daysFromToday - Number of days from today (0 = today, 1 = tomorrow, etc.)
 * @param locale - Locale string (default: 'ru-RU')
 * @returns Formatted date string (dd/mm)
 */
export const getDateFromToday = (
  daysFromToday: number,
  locale: string = "ru-RU",
): string => {
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + daysFromToday);

  return targetDate.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
  });
};

/**
 * Get day name for specific number of days from today
 * @param daysFromToday - Number of days from today (0 = today, 1 = tomorrow, etc.)
 * @returns Day name in short Ukrainian format (ПН, ВТ, СР, ЧТ, ПТ, СБ, НД)
 */
export const getDayNameFromToday = (daysFromToday: number): string => {
  const dayNames = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "НД"];
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + daysFromToday);

  const dayOfWeek = targetDate.getDay();
  const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.

  return dayNames[adjustedDay];
};

/**
 * Check if given number of days from today is today
 * @param daysFromToday - Number of days from today
 * @returns true if daysFromToday is 0, false otherwise
 */
export const isTodayByDaysOffset = (daysFromToday: number): boolean => {
  return daysFromToday === 0;
};
