import axios from 'axios';

/**
 * Generic get request to a specific URL that resolves with the response data
 * @param {string} url
 * @returns {T} Response data
 */
export const fetcher = async <T>(url: string): Promise<T> =>
  await axios.get(url).then((res) => res.data);

/**
 * Returns a date with the specified number of days subtracted
 * @param {number} numberOfDays
 * @param {date} date Defaults to todays date
 * @returns {string} Date in 'yyyy-mm-dd' format
 */
export const subtractDaysFromADate = (numberOfDays: number, date: Date = new Date()): string => {
  date.setDate(date.getDate() - numberOfDays);

  return date.toLocaleDateString('en-CA');
};

/**
 * Returns a Wikimedia URL for the top articles of a specific date
 * @param {string} selectedDate 'yyyy-mm-dd' format
 * @returns {string} The assembled Wikimedia URL
 */
export const getWikimediaUrl = (selectedDate: string): string =>
  `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${selectedDate.replaceAll('-', '/')}`;
