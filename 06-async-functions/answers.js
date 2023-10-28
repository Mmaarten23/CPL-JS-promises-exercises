/**
 *
 * EXERCISE 1
 *
 * @returns {Promise<3>}
 */
async function makePromiseResolveWith3() {
    /* IMPLEMENT ME! */
}

/**
 *
 * EXERCISE 2
 *
 * @returns {Promise<,"Boo!">}
 */
async function makePromiseRejectWithBoo() {
    /* IMPLEMENT ME! */
}

/**
 *
 * EXERCISE 3
 *
 * @param {Promise} firstPromise
 * @param {function} slowAsyncProcess
 */
async function chainTwoAsyncProcesses(firstPromise, slowAsyncProcess) {
    /* IMPLEMENT ME! */
}

/**
 *
 * EXERCISE 4
 *
 * @param {function} getUserById
 * @param {function} getOrganizationById
 */
function makeAsyncGetUserByIdWithOrganization(getUserById, getOrganizationById) {
    /**
     * @param {string} userId
     */
    return async function getUserByIdWithOrganization(userId) {
        /* IMPLEMENT ME! */
    };
}

/**
 *
 * EXERCISE 5
 *
 * @param {function} getUserById
 * @param {function} getOrganizationById
 */
function makeAsyncGetUserAndOrganizationById(getUserById, getOrganizationById) {
    /**
     * @param {string} userId
     * @param {string} organizationId
     */
    return async function getUserByIdWithOrganization(userId, organizationId) {
        /* IMPLEMENT ME! */
    };
}

/**
 *
 * EXERCISE 6
 *
 * @param {function} getUserById
 * @param {function} getOrganizationById
 */
function makeAsyncGetUsersByIdWithOrganizations(getUserById, getOrganizationById) {
    /**
     * @param {Array<string>} userIds
     */
    return async function getUserByIdWithOrganization(userIds) {
        /* IMPLEMENT ME! */
    };
}


module.exports = {
    makePromiseResolveWith3,
    makePromiseRejectWithBoo,
    chainTwoAsyncProcesses,
    makeAsyncGetUserByIdWithOrganization,
    makeAsyncGetUserAndOrganizationById,
    makeAsyncGetUsersByIdWithOrganizations,
};