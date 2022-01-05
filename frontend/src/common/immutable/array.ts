

function pushToArray<T>(target: Array<T>, values: Array<T>) {
    return [...target, ...values]
}

function removeFromArray<T>(target: Array<T>, callback: (value: T) => boolean) {
    return target.filter(callback)
}

export {
    pushToArray,
    removeFromArray,
}