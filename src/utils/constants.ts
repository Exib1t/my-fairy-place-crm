/**
 * Application constants
 */

/** Ukrainian day names (short format) */
export const DAY_NAMES = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "НД"] as const;

/** Default locale for date formatting */
export const DEFAULT_LOCALE = "ru-RU";

/** Order statuses */
export const ORDER_STATUS = {
  NEW: "Новий",
  TRANSFERRED_TO_PRODUCTION: "Виробництво",
  MANUFACTURED: "Вироблено",
} as const;

/** Animation delays (in seconds) */
export const ANIMATION = {
  STAGGER_DELAY: 0.03, // Delay between each card animation
  FADE_IN_DURATION: 0.3, // Duration of fade in animation
} as const;

/** Grid configuration */
export const GRID = {
  TODAY_SECTION_COLUMNS: 5, // Number of columns in today section grid
  FUTURE_DAYS_COUNT: 7, // Number of days in future section (Mon-Sun)
} as const;
