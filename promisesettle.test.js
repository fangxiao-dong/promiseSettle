const test = require('ava');
const promiseSettle = require('./index');

test('promiseSettle function returns a Promise', t => {
    t.true(promiseSettle([Promise.resolve(1)]) instanceof Promise); 
});

test('promiseSettle returns array of settlements when resolved with simple Promises', async t => {
    const input = [Promise.resolve(1), Promise.reject('error')];

    t.deepEqual(
        await promiseSettle(input),
        [
            {
                isFulfilled: true,
                isRejected: false,
                value: 1,
                reason: null
            },
            {
                isFulfilled: false,
                isRejected: true,
                reason: 'error',
                value: null
            }
        ]
    );
});

test('promiseSettle returns array of settlements when resolved with Promises using setTimeout', async t => {
    const p1 = new Promise(resolve => setTimeout(resolve, 1000, 1)); 
    const p2 = new Promise((resolve, reject) => setTimeout(reject, 2000, 'No Tesla!'));
    const p3 = Promise.resolve('Tesla');

    const input = [p1, p2, p3];

    t.deepEqual(
        await promiseSettle(input),
        [
            {
                isFulfilled: true,
                isRejected: false,
                value: 1,
                reason: null
            },
            {
                isFulfilled: false,
                isRejected: true,
                value: null,
                reason: 'No Tesla!'
            },
            {
                isFulfilled: true,
                isRejected: false,
                value: 'Tesla',
                reason: null
            },
        ]
    );
});
