import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks/redux'
import styles from './styles.module.sass'

export function Error() {
    const navigate = useNavigate()
    const [counter, setCounter] = useState(3)
    const { token } = useAppSelector(state => state.userReducer)

    useEffect(() => {
        if (counter > 0) {
            setTimeout(() => {
                setCounter(counter - 1)
            }, 1000)
        }
        if (counter < 1) {
            if (!token) {
                navigate('/authorization')
            } else {
                navigate('/search')
            }
        }
    }, [counter])

    return (
        <div className={styles.error}>
            Вы перешли на несуществующую страницу. Вы будете перенаправлены на
            {token ? ' главную страницу ' : ' страницу авторизации '}
            через {counter}
        </div>
    )
}
