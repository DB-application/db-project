import {useTranslation} from "react-i18next";
import {useAction, useAtom} from "@reatom/react";
import {loginPageActions, loginPageDataAtom} from "../viewModel/loginPageData";
import styles from "./LoginLayout.module.css";
import {FormField} from "./common/FormField";
import {isValidEmail, isValidPassword} from "./common/validation";
import {getEmailErrorText, getPasswordErrorText} from "./common/getErrorText";
import {Checkbox_WithLabel} from "../../common/checkbox/Checkbox_WithLabel";
import {Button_Text} from "../../common/button/Button_Text";


function GotoRegistrationLabel() {
    const {t} = useTranslation()
    const handleGotoRegistration = useAction(loginPageActions.gotoRegistration)

    return(
        <div className={styles.switchMode}>
            <div>
                {t('LoginForm.DontHaveAccount')}
            </div>
            <div
                onClick={handleGotoRegistration}
                className={styles.switchModeButton}
            >
                {t("LoginForm.Registration")}
            </div>
        </div>
    )
}


function LoginLayout() {
    const {t} = useTranslation()
    const {email,
        password,
        passwordError,
        emailError,
        submitButtonState,
        rememberMe,
    } = useAtom(loginPageDataAtom)
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
                    { t('LoginForm.LoginLabel')}
                </div>
                <FormField
                    type={'text'}
                    onBlur={() => handleSetEmailError(isValidEmail(email))}
                    value={email}
                    onChange={value => handleSetEmail(value)}
                    placeholder={t('LoginForm.LoginPlaceholder')}
                    errorText={emailError && getEmailErrorText(t, emailError)}
                    className={styles.emailField}
                />
                <FormField
                    type={'password'}
                    value={password}
                    onChange={value => handleSetPassword(value)}
                    onBlur={() => handleSetPasswordError(isValidPassword(password))}
                    errorText={passwordError && getPasswordErrorText(t, passwordError)}
                    placeholder={t('LoginForm.PasswordPlaceholder')}
                    className={styles.passwordField}
                />
                <Checkbox_WithLabel
                    checked={rememberMe}
                    onCheckedChange={handleSetRememberMe}
                    label={t('LoginForm.RememberMe')}
                    className={styles.showPasswordCheckbox}
                />
                <Button_Text
                    text={t('LoginForm.Login')}
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