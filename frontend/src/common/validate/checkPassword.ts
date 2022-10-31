
const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;

function checkPasswordFormat(password: string): boolean {
    return !!password.match(lowerCaseLetters)
        && !!password.match(upperCaseLetters)
        && !!password.match(numbers)
}

function checkPasswordComplexity(password: string): boolean {
    let s_letters = "qwertyuiopasdfghjklzxcvbnm"
    let b_letters = "QWERTYUIOPLKJHGFDSAZXCVBNM"
    let digits = "0123456789"
    let is_s = false
    let is_b = false
    let is_d = false
    for (let i = 0; i < password.length; i++) {
        if (!is_s && s_letters.indexOf(password[i]) !== -1) is_s = true
        else if (!is_b && b_letters.indexOf(password[i]) !== -1) is_b = true
        else if (!is_d && digits.indexOf(password[i]) !== -1) is_d = true
    }
    let rating = 0
    if (is_s) rating++
    if (is_b) rating++
    if (is_d) rating++
    return password.length > 6 && rating >= 3
}

export {
    checkPasswordFormat,
    checkPasswordComplexity,
}