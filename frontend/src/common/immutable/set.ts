function addToSet<T>(target: Set<T>, values: Array<T>) {
    const newSet = new Set<T>(target)
    values.forEach(value => newSet.add(value))
    return newSet
}

function removeFromSet<T>(target: Set<T>, values: Array<T>) {
    const newSet = new Set<T>(target)
    values.forEach(value => newSet.delete(value))
    return newSet
}

export {
    addToSet,
    removeFromSet,
}