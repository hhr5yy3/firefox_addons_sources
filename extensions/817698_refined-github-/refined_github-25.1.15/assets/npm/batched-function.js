function createDelay(interval) {
    return async () => new Promise(resolve => {
        setTimeout(resolve, interval);
    });
}
function batchedFunction(function_, { delay = undefined } = {}) {
    if (typeof delay !== 'number' && delay !== undefined) {
        throw new TypeError(`Expected \`interval\` to be of type \`number\` but received type \`${typeof delay}\``);
    }
    const queueCall = delay === undefined ? async () => undefined : createDelay(delay);
    let queue = [];
    return value => {
        queue.push(value);
        if (queue.length === 1) {
            (async () => {
                await queueCall();
                function_(queue);
                queue = [];
            })();
        }
    };
}

export { batchedFunction as default };
