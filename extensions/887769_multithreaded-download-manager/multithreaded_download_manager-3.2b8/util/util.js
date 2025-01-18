export function mergeInitData(Base, initData) {
    class C extends Base {
        constructor(...args) {
            super(...args);
            Object.assign(this, initData);
        }
    }
    return C;
}
export function mapInsert(map, key, fn) {
    if (map.has(key))
        return map.get(key);
    const value = fn();
    map.set(key, value);
    return value;
}
export function typedArrayToBuffer(ta) {
    return (ta.byteOffset === 0 && ta.byteLength === ta.buffer.byteLength ?
        ta : ta.slice()).buffer;
}
// may share buffers
export function concatTypedArray(list) {
    if (!list.length)
        return undefined;
    if (list.length === 1)
        return list[0];
    let length = 0;
    for (const a of list)
        length += a.length;
    const result = new list[0].constructor(length);
    let offset = 0;
    for (const a of list) {
        result.set(a, offset);
        offset += a.length;
    }
    return result;
}
