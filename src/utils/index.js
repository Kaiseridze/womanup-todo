import * as dayjs from "dayjs";

/**
 * Open attachment in new tab
 * @type Function that triggered on click
 * @param {string} url - Accepts the URL to open in a new window
 */
export const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

/**
 * Sets interval if expire time existing
 * @param {number} expires - Accepts the expiration time in seconds
 * @param {function} setState - Takes as a parameter of the setState function from the useState tuple
 * @returns {boolean} If "seconds" greater than "expires" setState will be true. This function is required to manage "isExpired" state in TodoItem
 */
export const expiresInterval = (expires, setState) =>
  setInterval(() => {
    const seconds = new Date().getTime() / 1000;
    seconds > expires && setState(true);
  }, 0);

/**
 * Formats object a Date object into a string
 * @param {object} date - Accepts new Date() object
 * @returns {string} converted object new Date() to string
 */
export const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY in HH:mm");
};

/**
 * Formats unix seconds into a string
 * @param {number} seconds expire time in second
 * @returns {string} converted .unix to string
 */
export const formatDateFromSeconds = (seconds) => {
  return dayjs.unix(seconds).format("DD/MM/YYYY in HH:mm");
};
