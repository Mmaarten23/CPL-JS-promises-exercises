/**
 *
 * EXERCISE 1
 *
 * @returns {Promise<3>}
 */
async function makePromiseResolveWith3() {
    return Promise.resolve(3);
}

/**
 *
 * EXERCISE 2
 *
 * @returns {Promise<,"Boo!">}
 */
async function makePromiseRejectWithBoo() {
    return Promise.reject("Boo!")
}

/**
 *
 * EXERCISE 3
 *
 * @param {Promise} firstPromise
 * @param {function} slowAsyncProcess
 */
async function chainTwoAsyncProcesses(firstPromise, slowAsyncProcess) {
    let firstValue = await firstPromise;
    return await slowAsyncProcess(firstValue);
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
        let user = await getUserById(userId);
        if (!user) {
            return undefined;
        }
        let org = await getOrganizationById(user.organizationId);
        if (!org) {
            return undefined;
        }
        user.organization = org;
        return user;
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
        let userPromise = getUserById(userId);
        let orgPromise = getOrganizationById(organizationId);

        let user = await userPromise;
        let org = await orgPromise;
        if (!user || !org) {
            return undefined;
        }
        user.organization = org;
        return user;
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
        let userPromises = [];
        for (let i = 0; i < userIds.length; i++) {
            userPromises[i] = getUserById(userIds[i]);
        }
        let users = await Promise.all(userPromises);
        let orgPromises = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i]) {
                orgPromises[i] = getOrganizationById(users[i].organizationId);
            }
        }
        let organizations = await Promise.all(orgPromises);
        for (let i = 0; i < users.length; i++) {
            if (users[i]) {
                users[i].organization = organizations[i];
            }
        }
        return users;
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