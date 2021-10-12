import {useAction} from "@reatom/react";
import {loginPageActions, loginPageDataAtom} from "../viewModel/loginPageData";
import styles from "./LoginLayout.module.css";
import {FormField} from "./common/FormField";
import {isValidEmail, isValidNickname, isValidPassword} from "./common/validation";
import {getEmailErrorText, getNicknameErrorText, getPasswordErrorText} from "./common/getErrorText";
import {Button_Text} from "../../common/button/Button_Text";
import {I18n_get} from "../../i18n/i18n_get";
import {useAtomWithSelector} from "../../core/reatom/useAtomWithSelector";

function GotoLoginLabel() {
    const handleGotoLogin = useAction(loginPageActions.gotoLogin)

    return(
        <div className={styles.switchMode}>
            <div>
                {I18n_get('LoginForm.HaveAccount')}
            </div>
            <div
                onClick={handleGotoLogin}
                className={styles.switchModeButton}
            >
                {I18n_get("LoginForm.Login")}
            </div>
        </div>
    )
}

function RegistrationLayout() {
    const nicknameError = useAtomWithSelector(loginPageDataAtom, x => x.nicknameError)
    const nickname = useAtomWithSelector(loginPageDataAtom, x => x.nickname)
    const email = useAtomWithSelector(loginPageDataAtom, x => x.email)
    const password = useAtomWithSelector(loginPageDataAtom, x => x.password)
    const passwordError = useAtomWithSelector(loginPageDataAtom, x => x.passwordError)
    const emailError = useAtomWithSelector(loginPageDataAtom, x => x.emailError)
    const submitButtonState = useAtomWithSelector(loginPageDataAtom, x => x.submitButtonState)

    const handleSetEmail = useAction(loginPageActions.setEmail)
    const handleSetPassword = useAction(loginPageActions.setPassword)
    const handleSetEmailError = useAction(loginPageActions.setEmailError)
    const handleSetPasswordError = useAction(loginPageActions.setPasswordError)
    const handleSetNickname= useAction(loginPageActions.setNickName)
    const handleSetNicknameError = useAction(loginPageActions.setNicknameError)
    const handleSubmitForm = useAction(loginPageActions.submitRegistrationForm)

    return (
        <div className={styles.loginLayout}>
            <div className={styles.formContainer}>
                <div className={styles.label}>
                    {I18n_get('LoginForm.RegistrationLabel')}
                </div>
                <FormField
                    type={'text'}
                    value={nickname}
                    onChange={handleSetNickname}
                    onBlur={() => handleSetNicknameError(isValidNickname(nickname))}
                    errorText={nicknameError && getNicknameErrorText(nicknameError)}
                    placeholder={I18n_get('LoginForm.NicknamePlaceholder')}
                    className={styles.nickNameField}
                />
                <FormField
                    type={'text'}
                    onBlur={() => handleSetEmailError(isValidEmail(email))}
                    value={email}
                    onChange={value => handleSetEmail(value)}
                    placeholder={I18n_get('LoginForm.EmailPlaceholder')}
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
                <Button_Text
                    text={I18n_get('LoginForm.Registration')}
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