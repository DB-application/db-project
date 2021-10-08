import {useTranslation} from "react-i18next";
import {useAction, useAtom} from "@reatom/react";
import {loginPageActions, loginPageDataAtom} from "../viewModel/loginPageData";
import styles from "./LoginLayout.module.css";
import {FormField} from "./common/FormField";
import {isValidEmail, isValidNickname, isValidPassword} from "./common/validation";
import {getEmailErrorText, getNicknameErrorText, getPasswordErrorText} from "./common/getErrorText";
import {Button_Text} from "../../common/button/Button_Text";

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

function RegistrationLayout() {
    const {t} = useTranslation()
    const {email,
        password,
        passwordError,
        emailError,
        showPassword,
        nicknameError,
        nickname,
        submitButtonState,
    } = useAtom(loginPageDataAtom)
    const handleSetEmail = useAction(loginPageActions.setEmail)
    const handleSetPassword = useAction(loginPageActions.setPassword)
    const handleSetEmailError = useAction(loginPageActions.setEmailError)
    const handleSetPasswordError = useAction(loginPageActions.setPasswordError)
    const handleSetShowPassword = useAction(loginPageActions.setShowPassword)
    const handleSetNickname= useAction(loginPageActions.setNickName)
    const handleSetNicknameError = useAction(loginPageActions.setNicknameError)
    const handleSubmitForm = useAction(loginPageActions.submitRegistrationForm)

    return (
        <div className={styles.loginLayout}>
            <div className={styles.formContainer}>
                <div className={styles.label}>
                    {t('LoginForm.RegistrationLabel')}
                </div>
                <FormField
                    type={'text'}
                    value={nickname}
                    onChange={handleSetNickname}
                    onBlur={() => handleSetNicknameError(isValidNickname(nickname))}
                    errorText={nicknameError && getNicknameErrorText(t, nicknameError)}
                    placeholder={t('LoginForm.NicknamePlaceholder')}
                    className={styles.nickNameField}
                />
                <FormField
                    type={'text'}
                    onBlur={() => handleSetEmailError(isValidEmail(email))}
                    value={email}
                    onChange={value => handleSetEmail(value)}
                    placeholder={t('LoginForm.EmailPlaceholder')}
                    errorText={emailError && getEmailErrorText(t, emailError)}
                    className={styles.emailField}
                />
                <FormField
                    type={'password'}
                    showPassword={showPassword}
                    onChangeShowPassword={handleSetShowPassword}
                    value={password}
                    onChange={value => handleSetPassword(value)}
                    onBlur={() => handleSetPasswordError(isValidPassword(password))}
                    errorText={passwordError && getPasswordErrorText(t, passwordError)}
                    placeholder={t('LoginForm.PasswordPlaceholder')}
                    className={styles.passwordField}
                />
                <Button_Text
                    text={t('LoginForm.Registration')}
                    onClick={() => {
                        handleSetEmailError(isValidEmail(email))
                        handleSetPasswordError(isValidPassword(password))
                        handleSetNicknameError(isValidNickname(nickname))
                        handleSubmitForm()
                    }}
                    className={styles.submitButton}
                    size={'large'}
                    state={submitButtonState}
                />
                <GotoLoginLabel />
            </div>
        </div>
    )
}

export {
    RegistrationLayout,
}