/**
 * Debounces a function to limit the rate at which it gets called.
 * @param {Function} func The function to debounce.
 * @param {number} delay The debounce delay in milliseconds.
 * @returns {Function} The debounced function with a `cancel` method.
 */
export function debounce(func, delay) {
    let timeoutId;

    const debounced = function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };

    /**
     * Cancels the pending debounced function call.
     */
    debounced.cancel = () => {
        clearTimeout(timeoutId);
    };

    return debounced;
}
