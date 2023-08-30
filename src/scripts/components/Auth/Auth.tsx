import React, { useCallback } from 'react'
import { doSingIn } from '../../api/authApi'
import AuthForm from './components/AuthForm'
import styles from './styles.module.sass'
import sibDevLogo from '../../../images/sibdev-logo.svg'
import { setUser } from '../../store/slices/userSlice'
import { useAppDispatch } from '../../store/hooks/redux'
import { useNavigate } from 'react-router-dom'
import { UserCredential } from 'firebase/auth'

export default function Auth() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleUserAuth = useCallback(
        (data: Record<string, string>) => {
            doSingIn(data.email, data.password).then((userCredential: UserCredential) => {
                const user = userCredential.user
                user.getIdToken().then(token => {
                    dispatch(setUser({ email: user.email, id: user.uid, token: token }))
                    navigate('/search')
                })
            })
        },
        [doSingIn, dispatch, navigate]
    )

    return (
        <div className={styles.auth__wrapper}>
            <div className={styles.auth__container}>
                <div className={styles.auth__sibLogo}>
                    <img src={sibDevLogo} alt="logo" />
                </div>
                <div className={styles.auth__title}>Вход</div>
                <AuthForm onUserAuth={handleUserAuth} />
            </div>
        </div>
    )
}
