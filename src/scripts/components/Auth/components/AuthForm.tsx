import React, { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../styles.module.sass'
import { ReactComponent as EyeImage } from '../../../../images/eye/eye-off.svg'
import { ReactComponent as EyeFocusImage } from '../../../../images/eye/eye.svg'
import cn from 'classnames'

type Props = {
    onUserAuth: (data: Record<string, string>) => void
}

export default function AuthForm({ onUserAuth }: Props) {
    const [focused, setFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit } = useForm()

    const onSubmit: SubmitHandler<Record<string, string>> = data => {
        onUserAuth(data)
    }

    const handleInputFocusClick = useCallback(() => {
        setFocused(true)
    }, [setFocused])

    const handleInputBlurClick = useCallback(() => {
        setFocused(false)
    }, [setFocused])

    const handleIsShowPassChange = useCallback(() => {
        setShowPassword(!showPassword)
    }, [showPassword])

    return (
        <div className={styles.auth__form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.auth__formEmail}>
                    <span className={styles.auth__label}>Логин</span>
                    <input
                        className={styles.auth__input}
                        placeholder={'Введите email'}
                        {...register('email')}
                        onClick={() => setFocused(false)}
                        type="email"
                    />
                </div>
                <div className={styles.auth__formPass}>
                    <span className={styles.auth__label}>Пароль</span>
                    <input
                        className={cn(styles.auth__input, {
                            [styles.auth__input_active]: focused
                        })}
                        {...register('password')}
                        onFocus={handleInputFocusClick}
                        onBlur={handleInputBlurClick}
                        placeholder={'Введите пароль'}
                        type={showPassword ? 'text' : 'password'}
                    />
                    <button onClick={handleIsShowPassChange} type="button">
                        {showPassword ? (
                            <EyeFocusImage
                                onClick={handleInputFocusClick}
                                className={cn(styles.auth__eyeIcon, {
                                    [styles.auth__eyeIcon_active]: focused
                                })}
                            />
                        ) : (
                            <EyeImage
                                onClick={handleInputFocusClick}
                                className={cn(styles.auth__eyeIcon, {
                                    [styles.eye__active]: focused
                                })}
                            />
                        )}
                    </button>
                </div>
                <div className={styles.auth__button}>
                    <button type="submit">Войти</button>
                </div>
            </form>
        </div>
    )
}
