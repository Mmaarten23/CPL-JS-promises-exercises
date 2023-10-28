/**
 *
 * EXERCISE 1
 *
 * @param {*} promise
 * @param {*} transformer
 * @returns {Promise}
 */
function mapPromise(promise, transformer) {
    return new Promise((resolve, reject) => {
        promise
            .catch(reject)
            .then((value) => {
                let transformed;
                try {
                    transformed = transformer(value);
                } catch (e) {
                    reject(e);
                }
                resolve(transformed);
            })
    });
}

/**
 *
 * EXERCISE 2
 *
 * @param {Promise<number | string>} numberPromise
 * @returns {Promise<number>}
 */
function squarePromise(numberPromise) {
    return numberPromise
        .then((value) => {
            if (typeof value === "number") {
                return Math.pow(value, 2);
            }
            let integer = parseInt(value);
            if (isNaN(integer)) {
                throw `Cannot convert '${value}' to a number!`;
            }
            return Math.pow(integer, 2);
        });
}

/**
 * EXERCISE 3
 *
 * @param {Promise<number | string>} numberPromise
 * @returns {Promise<number>}
 */
function squarePromiseOrZero(numberPromise) {
    return squarePromise(numberPromise)
        .catch(() => {
            return 0;
        });
}

/**
 * EXERCISE 4
 *
 * @param {Promise} promise
 * @returns {Promise}
 */
function switcheroo(promise) {
    return promise.then((value) => {
        throw value;
    }, (error) => {
        return error;
    });
}

/**
 * @callback consumer
 * @param {*} value
 */

/**
 * @callback handler
 * @param {*} error
 */

module.exports = {
    mapPromise,
    squarePromise,
    squarePromiseOrZero,
    switcheroo,
};