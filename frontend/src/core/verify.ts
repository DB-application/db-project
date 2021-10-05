function verify<T>(statement: T|null|undefined) {
    return <T>statement;
}

export {
    verify,
}