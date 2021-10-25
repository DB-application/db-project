
function parsePickerValue(value: string) {
    const regex = /^(\d{2}):(\d{2})$/
    const matches = value.match(regex)
    if (!matches)
        return null
    const hours = Number(matches[1])
    const minutes = Number(matches[2])
    if (hours < 24 && minutes < 60) {
        return {
            hours,
            minutes
        }
    }
    return null
}

function validTimePickerValue(value: string): {hours: number, minutes: number}|null {
    return parsePickerValue(value)
}

export {
    validTimePickerValue,
    parsePickerValue,
}