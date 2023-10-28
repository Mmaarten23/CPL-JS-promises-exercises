/* eslint-env mocha */
const assert = require('assert');
const {
    makePromiseResolveWith3,
    makePromiseRejectWithBoo,
    chainTwoAsyncProcesses,
    makeAsyncGetUserByIdWithOrganization,
    makeAsyncGetUserAndOrganizationById,
    makeAsyncGetUsersByIdWithOrganizations,
} = require('./answers');

describe('Async function that returns a Promise to be fufilled', () => {
    describe('EX1: #makePromiseResolveWith3:() => Promise<number>', () => {
        it('is an async function', () => {
            assert(makePromiseResolveWith3.constructor.name === 'AsyncFunction');
        });
        it('creates a resolving promise', () => {
            return makePromiseResolveWith3()
                .then((val) => {
                    assert.equal(val, 3);
                });
        });
    });
});

describe('Async function that returns a Promise to be rejected', () => {
    describe('EX2: #makePromiseRejectWithBoo:() => Promise<,string>', () => {
        it('is an async function', () => {
            assert(makePromiseRejectWithBoo.constructor.name === 'AsyncFunction');
        });
        it('creates a rejecting promise', () => {
            return makePromiseRejectWithBoo()
                .then(() => {
                    assert.fail('This promise should have rejected, not resolved');
                }, (err) => {
                    assert.equal(err, 'Boo!');
                });
        });
    });
});

describe('Async function that chains two async processes', () => {
    describe('EX3: #chainTwoAsyncProcesses(firstPromise, slowAsyncProcess)', () => {
        it('is an async function', () => {
            assert(chainTwoAsyncProcesses.constructor.name === 'AsyncFunction');
        });

        it('runs a slow process on the result of the numberPromise', () => {
            const time = new Date();
            const numberPromise = Promise.resolve(31);

            function slowSquarer(num) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(num * num);
                    }, 1000);
                });
            }

            return chainTwoAsyncProcesses(numberPromise, slowSquarer)
                .then((val) => {

                    assert.equal(val, 961);

                    const timeElapsed = new Date() - time;

                    assert(timeElapsed >= 975, 'Process too quick.  Are you sure that you chained the two processes?');

                    assert(timeElapsed <= 1025, 'Process too slow.');
                });
        });
    });
});

describe('Use async functions to fetch user data from a database', () => {
    describe('EX4: #makeAsyncGetUserByIdWithOrganization(getUserById, getOrganizationById) => async (id) => Promise', () => {
        const users = {
            'u001': {id: 'u001', name: 'Jeff', email: 'jeff@jeff.jeff', organizationId: 'o001'},
            'u002': {id: 'u002', name: 'Joan', email: 'joan@joan.joan', organizationId: 'o002'},
        };
        const organizations = {
            'o001': {id: 'o001', name: 'Operations'},
            'o002': {id: 'o002', name: 'Marketing'},
        };

        function getUserById(id) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(users[id]);
                }, 500);
            });
        }

        function getOrganizationById(id) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(organizations[id]);
                }, 500);
            });
        }

        const getUserByIdWithOrganization = makeAsyncGetUserByIdWithOrganization(getUserById, getOrganizationById);

        it('is an async function', () => {
            assert(getUserByIdWithOrganization.constructor.name === 'AsyncFunction');
        });

        it('gets a user and their organization if the user and organization exist', () => {
            const start = new Date();
            return getUserByIdWithOrganization('u001')
                .then((userWithOrganization) => {
                    const correctUser = users['u001'];
                    const correctOrganization = organizations[correctUser.organizationId];

                    assert.deepEqual(userWithOrganization, {
                        ...correctUser,
                        organization: correctOrganization,
                    });
                    const elapsed = new Date() - start;
                    assert(elapsed >= 1000 && elapsed < 1030, `Elapsed time wrong ${elapsed}`);
                });
        });
        it('resolves with undefined if the user is not found', () => {
            const start = new Date();
            return getUserByIdWithOrganization('u003')
                .then(userWithOrganization => {
                    assert.equal(userWithOrganization, undefined);
                    const elapsed = new Date() - start;
                    assert(elapsed >= 500 && elapsed < 530, `Elapsed time wrong ${elapsed}`);
                });
        });
    });

    describe('EX5: #makeAsyncGetUserAndOrganizationById(getUserById, getOrganizationById) => async (userId, organizationId) => Promise', () => {
        const users = {
            'u001': {id: 'u001', name: 'Jeff', email: 'jeff@jeff.jeff', organizationId: 'o001'},
            'u002': {id: 'u002', name: 'Joan', email: 'joan@joan.joan', organizationId: 'o002'},
        };
        const organizations = {
            'o001': {id: 'o001', name: 'Operations'},
            'o002': {id: 'o002', name: 'Marketing'},
        };

        function getUserById(id) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(users[id]);
                }, 500);
            });
        }

        function getOrganizationById(id) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(organizations[id]);
                }, 500);
            });
        }

        const getUserAndOrganizationById = makeAsyncGetUserAndOrganizationById(getUserById, getOrganizationById);

        it('is an async function', () => {
            assert(getUserAndOrganizationById.constructor.name === 'AsyncFunction');
        });

        it('gets a user and their organization if the user and organization exist', () => {
            const start = new Date();
            return getUserAndOrganizationById('u001', 'o001')
                .then((userWithOrganization) => {
                    const correctUser = users['u001'];
                    const correctOrganization = organizations[correctUser.organizationId];

                    assert.deepEqual(userWithOrganization, {
                        ...correctUser,
                        organization: correctOrganization,
                    });
                    const elapsed = new Date() - start;
                    assert(elapsed >= 500 && elapsed < 530, `Elapsed time wrong ${elapsed} (did you do the calls in parallel?)`);
                });
        });
        it('resolves with undefined if the user is not found', () => {
            const start = new Date();
            return getUserAndOrganizationById('u003', 'o002')
                .then(userWithOrganization => {
                    assert.equal(userWithOrganization, undefined);
                    const elapsed = new Date() - start;
                    assert(elapsed >= 500 && elapsed < 530, `Elapsed time wrong ${elapsed} (did you do the calls in parallel?)`);
                });
        });
        it('resolves with undefined if the organization is not found', () => {
            const start = new Date();
            return getUserAndOrganizationById('u002', 'o003')
                .then(userWithOrganization => {
                    assert.equal(userWithOrganization, undefined);
                    const elapsed = new Date() - start;
                    assert(elapsed >= 500 && elapsed < 530, `Elapsed time wrong ${elapsed} (did you do the calls in parallel?)`);
                });
        });
    });

    describe('EX6: #makeAsyncGetUsersByIdWithOrganizations(getUserById, getOrganizationById) => async (ids) => Promise', () => {
        const users = {
            'u001': {id: 'u001', name: 'Jeff', email: 'jeff@jeff.jeff', organizationId: 'o001'},
            'u002': {id: 'u002', name: 'Joan', email: 'joan@joan.joan', organizationId: 'o002'},
        };
        const organizations = {
            'o001': {id: 'o001', name: 'Operations'},
            'o002': {id: 'o002', name: 'Marketing'},
        };

        function getUserById(id) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(users[id]);
                }, 500);
            });
        }

        function getOrganizationById(id) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(organizations[id]);
                }, 500);
            });
        }

        const getUsersByIdWithOrganizations = makeAsyncGetUsersByIdWithOrganizations(getUserById, getOrganizationById);

        it('is an async function', () => {
            assert(getUsersByIdWithOrganizations.constructor.name === 'AsyncFunction');
        });

        it('gets users and their organizations if the user and organization exist', () => {
            const start = new Date();
            return getUsersByIdWithOrganizations(['u001', 'u002'])
                .then((usersWithOrganization) => {
                    assert.deepEqual(usersWithOrganization, [
                        {...users['u001'], organization: organizations['o001']},
                        {...users['u002'], organization: organizations['o002']},
                    ]);
                    const elapsed = new Date() - start;
                    assert(elapsed >= 1000 && elapsed < 1090, `Elapsed time wrong ${elapsed}`);
                });
        });
        it('leaves entries undefined if one of the users is not found', () => {
            const start = new Date();
            return getUsersByIdWithOrganizations(['u001', 'u003', 'u002'])
                .then(usersWithOrganization => {
                    assert.deepEqual(usersWithOrganization, [
                        {...users['u001'], organization: organizations['o001']},
                        undefined,
                        {...users['u002'], organization: organizations['o002']},
                    ]);
                    const elapsed = new Date() - start;
                    assert(elapsed >= 1000 && elapsed < 2090, `Elapsed time wrong ${elapsed}`);
                });
        });
    });
});