import {useAction} from "@reatom/react";
import {loginPageActions, loginPageDataAtom} from "../viewModel/loginPageData";
import styles from "./LoginLayout.module.css";
import {FormField} from "./common/FormField";
import {isValidEmail, isValidPassword} from "./common/validation";
import {getEmailErrorText, getPasswordErrorText} from "./common/getErrorText";
import {Checkbox_WithLabel} from "../../common/checkbox/Checkbox_WithLabel";
import {Button_Text} from "../../common/button/Button_Text";
import {I18n_get} from "../../i18n/i18n_get";
import {useAtomWithSelector} from "../../core/reatom/useAtomWithSelector";


function GotoRegistrationLabel() {
    const handleGotoRegistration = useAction(loginPageActions.gotoRegistration)

    return(
        <div className={styles.switchMode}>
            <div>
                {I18n_get('LoginForm.DontHaveAccount')}
            </div>
            <div
                onClick={handleGotoRegistration}
                className={styles.switchModeButton}
            >
                {I18n_get("LoginForm.Registration")}
            </div>
        </div>
    )
}


function LoginLayout() {
    const email = useAtomWithSelector(loginPageDataAtom, x => x.email)
    const password = useAtomWithSelector(loginPageDataAtom, x => x.password)
    const passwordError = useAtomWithSelector(loginPageDataAtom, x => x.passwordError)
    const emailError = useAtomWithSelector(loginPageDataAtom, x => x.emailError)
    const submitButtonState = useAtomWithSelector(loginPageDataAtom, x => x.submitButtonState)
    const rememberMe = useAtomWithSelector(loginPageDataAtom, x => x.rememberMe)

    const handleSetEmail = useAction(loginPageActions.setEmail)
    const handleSetPassword = useAction(loginPageActions.setPassword)
    const handleSetEmailError = useAction(loginPageActions.setEmailError)
    const handleSetPasswordError = useAction(loginPageActions.setPasswordError)
    const handleSetRememberMe = useAction(loginPageActions.setRememberMe)
    const handleSubmitForm = useAction(loginPageActions.submitLogin)

    return (
        <div className={styles.loginLayout}>
            <div className={styles.formContainer}>
                <div className={styles.label}>
                    {I18n_get('LoginForm.LoginLabel')}
                </div>
                <FormField
                    type={'text'}
                    onBlur={() => handleSetEmailError(isValidEmail(email))}
                    value={email}
                    onChange={value => handleSetEmail(value)}
                    placeholder={I18n_get('LoginForm.LoginPlaceholder')}
                    errorText={emailError && getEmailErrorText(emailError)}
                    className={styles.emailField}
                />
                <FormField
                    type={'password'}
                    value={password}
                    onChange={value => handleSetPassword(value)}
                    onBlur={() => handleSetPasswordError(isValidPassword(password))}
                    errorText={passwordError && getPasswordErrorText(passwordError)}
                    placeholder={I18n_get('LoginForm.PasswordPlaceholder')}
                    className={styles.passwordField}
                />
                <Checkbox_WithLabel
                    checked={rememberMe}
                    onCheckedChange={handleSetRememberMe}
                    label={I18n_get('LoginForm.RememberMe')}
                    className={styles.showPasswordCheckbox}
                />
                <Button_Text
                    text={I18n_get('LoginForm.Login')}
                    onClick={() => {
                        handleSetEmailError(isValidEmail(email))
                        handleSetPasswordError(isValidPassword(password))
                        handleSubmitForm()
                    }}
                    className={styles.submitButton}
                    size={'large'}
                    state={submitButtonState}
                />
                <GotoRegistrationLabel />
            </div>
        </div>
    )
}

export {
    LoginLayout,
}