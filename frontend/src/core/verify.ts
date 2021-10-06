function verify<T>(statement: T|null|undefined) {
    console.assert(statement)
    return <T>statement
}

export {
    verify,
}