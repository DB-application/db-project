import styles from './LoginLayout.module.css'
import {useTranslation} from "react-i18next";
import {useAction, useAtom} from "@reatom/react";
import {loginPageActions, loginPageDataAtom} from "../viewModel/loginPageData";
import {FormField} from "./common/FormField";
import {isValidEmail, isValidNickname, isValidPassword} from "./common/validation";
import {Checkbox_WithLabel} from "../../common/checkbox/Checkbox_WithLabel";
import {Button_Text} from "../../common/button/Button_Text";
import {getEmailErrorText, getNicknameErrorText, getPasswordErrorText } from './common/getErrorText';


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

function GotoLoginLabel() {
    const {t} = useTranslation()
    const handleGotoLogin = useAction(loginPageActions.gotoLogin)

    return(
        <div className={styles.switchMode}>
            <div>
                {t('LoginForm.HaveAccount')}
            </div>
            <div
                onClick={handleGotoLogin}
                className={styles.switchModeButton}
            >
                {t("LoginForm.Login")}
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
        showPassword,
        mode,
        nicknameError,
        nickname,
        submitButtonState
    } = useAtom(loginPageDataAtom)
    const handleSetEmail = useAction(loginPageActions.setEmail)
    const handleSetPassword = useAction(loginPageActions.setPassword)
    const handleSetEmailError = useAction(loginPageActions.setEmailError)
    const handleSetPasswordError = useAction(loginPageActions.setPasswordError)
    const handleSetShowPassword = useAction(loginPageActions.setShowPassword)
    const handleSetNickname= useAction(loginPageActions.setNickName)
    const handleSetNicknameError = useAction(loginPageActions.setNicknameError)
    const handleSubmitForm = useAction(loginPageActions.submitForm)

    return (
        <div className={styles.loginLayout}>
            <div className={styles.formContainer}>
                <div className={styles.label}>
                    {mode === 'login'
                        ? t('LoginForm.LoginLabel')
                        : t('LoginForm.RegistrationLabel')}
                </div>
                {mode === 'registration' && <FormField
                    value={nickname}
                    onChange={handleSetNickname}
                    onBlur={() => handleSetNicknameError(isValidNickname(nickname))}
                    errorText={nicknameError && getNicknameErrorText(t, nicknameError)}
                    placeholder={t('LoginForm.NicknamePlaceholder')}
                    className={styles.nickNameField}
                />}
                <FormField
                    onBlur={() => handleSetEmailError(isValidEmail(email))}
                    value={email}
                    onChange={value => handleSetEmail(value)}
                    placeholder={t('LoginForm.EmailPlaceholder')}
                    errorText={emailError && getEmailErrorText(t, emailError)}
                    className={styles.emailField}
                />
                <FormField
                    value={password}
                    onChange={value => handleSetPassword(value)}
                    onBlur={() => handleSetPasswordError(isValidPassword(password))}
                    errorText={passwordError && getPasswordErrorText(t, passwordError)}
                    placeholder={t('LoginForm.PasswordPlaceholder')}
                    type={showPassword ? 'text' : 'password'}
                    className={styles.passwordField}
                />
                <Checkbox_WithLabel
                    checked={showPassword}
                    onCheckedChange={handleSetShowPassword}
                    label={t('LoginForm.ShowPassword')}
                    className={styles.showPasswordCheckbox}
                />
                <Button_Text
                    text={ mode === 'login'
                        ? t('LoginForm.Login')
                        : t('LoginForm.Registration')
                    }
                    onClick={() => {
                        handleSetEmailError(isValidEmail(email))
                        handleSetPasswordError(isValidPassword(password))
                        mode === 'registration' && handleSetPasswordError(isValidPassword(password))
                        handleSubmitForm()
                    }}
                    className={styles.submitButton}
                    size={'large'}
                    state={submitButtonState}
                />
                {mode === 'login' && <GotoRegistrationLabel />}
                {mode === 'registration' && <GotoLoginLabel />}
            </div>
        </div>
    )
}

export {
    LoginLayout,
}