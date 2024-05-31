/* eslint-disable import/prefer-default-export */
export function debounced(callback, delay) {
  let timeoutID;
  return (...args) => {
    window.clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => {
      callback(...args);
    }, Number(delay));
  };
}
