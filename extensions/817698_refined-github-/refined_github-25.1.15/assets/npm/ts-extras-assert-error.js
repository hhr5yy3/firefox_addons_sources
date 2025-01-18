const { toString } = Object.prototype;
function assertError(value) {
    if (!(value instanceof Error || toString.call(value) === '[object Error]')) {
        throw new TypeError(`Expected an \`Error\`, got \`${JSON.stringify(value)}\` (${typeof value})`);
    }
}

export { assertError };
