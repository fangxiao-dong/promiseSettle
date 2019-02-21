// If you have questions about the Promise API, you can reference MDN
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

/**
 * promiseSettle
 *
 * returns a `Promise` that is fulfilled when all promises in `input`
 * are settled (meaning, either resolved or rejected).
 *
 * The fulfillment value will be an array of objects,
 * each having the following signature:
 *
 * @typedef {Object} Settlement
 * @property {boolean} isFulfilled - whether the promise resolved
 * @property {boolean} isRejected - whether the promise rejected
 * @property {*=} value - the value (if any) with which the promise
 *     was resolved
 * @property {*=} reason - the reason (if any) with which the promise
 *     was rejected
 *
 * @param {Array.<Promise.<*>>} input - an array of Promises
 * @return {Promise.<Array.<Settlement>>}
 */

function promiseSettle(input) {
    const mappedPromises = input.map(prom => {
            return new Promise(resolve => {
                prom.then(
                    value => {
                        resolve(
                            {                           
                                isFulfilled: true,
                                isRejected: false,
                                value: value,
                                reason: null                          
                            }
                        );
                    },
                    reason => {
                        resolve(
                            {
                                isFulfilled: false,
                                isRejected: true,
                                value: null,
                                reason: reason  
                            }
                        );
                    }
                );
            });
        });
    
    return Promise.all(mappedPromises);
}

module.exports = promiseSettle;