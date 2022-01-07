import {useAction} from "@reatom/react";
import styles from "./LoginLayout.module.css";
import {FormField} from "./common/FormField";
import {isValidEmail, isValidNickname, isValidPassword} from "./common/validation";
import {getEmailErrorText, getNicknameErrorText, getPasswordErrorText} from "./common/getErrorText";
import {Button_Text} from "../../common/button/Button_Text";
import {I18n_get} from "../../i18n/i18n_get";
import {useAtomWithSelector} from "../../core/reatom/useAtomWithSelector";
import {registrationPageAction, registrationPageAtom} from "../viewModel/registrationPageData";
import {loginFormActions} from "../viewModel/loginFormMode";

function GotoLoginLabel() {
    const handleGotoLogin = useAction(loginFormActions.gotoLogin)

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
    const nicknameError = useAtomWithSelector(registrationPageAtom, x => x.nicknameError)
    const nickname = useAtomWithSelector(registrationPageAtom, x => x.nickname)
    const email = useAtomWithSelector(registrationPageAtom, x => x.email)
    const password = useAtomWithSelector(registrationPageAtom, x => x.password)
    const passwordError = useAtomWithSelector(registrationPageAtom, x => x.passwordError)
    const emailError = useAtomWithSelector(registrationPageAtom, x => x.emailError)
    const submitButtonState = useAtomWithSelector(registrationPageAtom, x => x.submitButtonState)

    const handleSetEmail = useAction(registrationPageAction.setEmail)
    const handleSetPassword = useAction(registrationPageAction.setPassword)
    const handleSetEmailError = useAction(registrationPageAction.setEmailError)
    const handleSetPasswordError = useAction(registrationPageAction.setPasswordError)
    const handleSetNickname= useAction(registrationPageAction.setNickName)
    const handleSetNicknameError = useAction(registrationPageAction.setNicknameError)
    const handleSubmitForm = useAction(registrationPageAction.submitRegistrationForm)

    const onSubmit = () => {
        handleSetEmailError(isValidEmail(email))
        handleSetPasswordError(isValidPassword(password))
        handleSetNicknameError(isValidNickname(nickname))
        handleSubmitForm()
    }

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
                    onEnter={onSubmit}
                />
                <FormField
                    type={'text'}
                    onBlur={() => handleSetEmailError(isValidEmail(email))}
                    value={email}
                    onChange={value => handleSetEmail(value)}
                    placeholder={I18n_get('LoginForm.EmailPlaceholder')}
                    errorText={emailError && getEmailErrorText(emailError)}
                    className={styles.emailField}
                    onEnter={onSubmit}
                />
                <FormField
                    type={'password'}
                    value={password}
                    onChange={value => handleSetPassword(value)}
                    onBlur={() => handleSetPasswordError(isValidPassword(password))}
                    errorText={passwordError && getPasswordErrorText(passwordError)}
                    placeholder={I18n_get('LoginForm.PasswordPlaceholder')}
                    className={styles.passwordField}
                    onEnter={onSubmit}
                />
                <Button_Text
                    text={I18n_get('LoginForm.Registration')}
                    onClick={onSubmit}
                    className={styles.submitButton}
                    size={'large'}
                    state={submitButtonState}
                    style={'primary'}
                />
                <GotoLoginLabel />
            </div>
        </div>
    )
}

export {
    RegistrationLayout,
}