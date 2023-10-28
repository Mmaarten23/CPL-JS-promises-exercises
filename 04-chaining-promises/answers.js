/**
 *
 * EXERCISE 1
 *
 * @param {Promise} promise
 * @param {function} asyncTransformer
 */
function flatMapPromise(promise, asyncTransformer) {
    return new Promise((resolve, reject) => {
        promise.then(
            (value) => resolve(asyncTransformer(value)),
            (err) => reject(err)
        );
    });
}

/**
 *
 * EXERCISE 2
 *
 * @param {Promise} firstPromise
 * @param {function} slowAsyncProcess
 */
function chainTwoAsyncProcesses(firstPromise, slowAsyncProcess) {
    return firstPromise.then(
        (value) => {
            return slowAsyncProcess(value);
        },
        (err) => {
            throw err;
        }
    );
}

/**
 *
 * EXERCISE 3
 *
 * @param {function} getUserById
 * @param {function} getOrganizationById
 */
function makeGetUserByIdWithOrganization(getUserById, getOrganizationById) {
    return function getUserByIdWithOrganization(userId) {
        return getUserById(userId).then(
            (user) => {
                if (!user) {
                    return user;
                }
                let organizationId = user.organizationId
                return getOrganizationById(organizationId).then(
                    (org) => {
                        user.organization = org;
                        return user;
                    }
                )
            }
        )
    };
}

/**
 *
 * EXERCISE 4
 *
 * @param {function} getUserById
 * @param {function} getOrganizationById
 */
function makeGetUserAndOrganizationById(getUserById, getOrganizationById) {
    /**
     * @param {string} userId
     * @param {string} organizationId
     */
    return function getUserByIdWithOrganization(userId, organizationId) {
        let userPromise = getUserById(userId);
        let organizationPromise = getOrganizationById(organizationId);

        return Promise.all([userPromise, organizationPromise]).then((values) => {
            if (!values[0] || !values[1]) {
                return undefined;
            }
            values[0].organization = values[1];
            return values[0];
        })
    };
}

/**
 *
 * EXERCISE 5
 *
 * @param {function} getUserById
 * @param {function} getOrganizationById
 */
function makeGetUsersByIdWithOrganizations(getUserById, getOrganizationById) {
    /**
     * @param {Array<string>} userIds
     */
    return function getUserByIdWithOrganization(userIds) {
        let promises = [];
        for (let i = 0; i < userIds.length; i++) {
            promises[i] = getUserById(userIds[i]).then(
                (user) => {
                    if (!user) {
                        return user;
                    }
                    let organizationId = user.organizationId
                    return getOrganizationById(organizationId).then(
                        (org) => {
                            user.organization = org;
                            return user;
                        }
                    )
                }
            )
        }
        return Promise.all(promises);
    };
}

module.exports = {
    flatMapPromise,
    chainTwoAsyncProcesses,
    makeGetUserByIdWithOrganization,
    makeGetUserAndOrganizationById,
    makeGetUsersByIdWithOrganizations,
};