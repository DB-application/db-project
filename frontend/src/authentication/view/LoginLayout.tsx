import {useAction} from "@reatom/react";
import {loginPageActions, loginPageDataAtom} from "../viewModel/loginPageData";
import styles from "./LoginLayout.module.css";
import {FormField} from "./common/FormField";
import {isValidLogin, isValidPassword} from "./common/validation";
import {getLoginErrorText, getPasswordErrorText} from "./common/getErrorText";
import {Checkbox_WithLabel} from "../../common/checkbox/Checkbox_WithLabel";
import {Button_Text} from "../../common/button/Button_Text";
import {I18n_get} from "../../i18n/i18n_get";
import {useAtomWithSelector} from "../../core/reatom/useAtomWithSelector";
import {loginFormActions} from "../viewModel/loginFormMode";


function GotoRegistrationLabel() {
    const handleGotoRegistration = useAction(loginFormActions.gotoRegistration)

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
    const login = useAtomWithSelector(loginPageDataAtom, x => x.login)
    const password = useAtomWithSelector(loginPageDataAtom, x => x.password)
    const passwordError = useAtomWithSelector(loginPageDataAtom, x => x.passwordError)
    const loginError = useAtomWithSelector(loginPageDataAtom, x => x.loginError)
    const submitButtonState = useAtomWithSelector(loginPageDataAtom, x => x.submitButtonState)
    const rememberMe = useAtomWithSelector(loginPageDataAtom, x => x.rememberMe)

    const handleSetLogin = useAction(loginPageActions.setLogin)
    const handleSetPassword = useAction(loginPageActions.setPassword)
    const handleSetLoginError = useAction(loginPageActions.setLoginError)
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
                    onBlur={() => handleSetLoginError(isValidLogin(login))}
                    value={login}
                    onChange={value => handleSetLogin(value)}
                    placeholder={I18n_get('LoginForm.LoginPlaceholder')}
                    errorText={loginError && getLoginErrorText(loginError)}
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
                        handleSetLoginError(isValidLogin(login))
                        handleSetPasswordError(isValidPassword(password))
                        handleSubmitForm()
                    }}
                    className={styles.submitButton}
                    size={'large'}
                    state={submitButtonState}
                    style={'primary'}
                />
                <GotoRegistrationLabel />
            </div>
        </div>
    )
}

export {
    LoginLayout,
}