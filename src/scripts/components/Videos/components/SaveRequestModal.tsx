import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles.module.sass'

export default function SaveRequestModal() {
    const navigate = useNavigate()

    const handleNavigateClick = useCallback(() => {
        navigate('/favorites')
    }, [])

    return (
        <div className={styles.saveModal}>
            <div className={styles.saveModal__arrayLeft} />
            <div className={styles.saveModal__arrayRight} />
            <div className={styles.saveModal__body}>Поиск сохранён в разделе «Избранное»</div>
            <div onClick={handleNavigateClick} className={styles.saveModal__navigate}>
                <span>Перейти в избранное</span>
            </div>
        </div>
    )
}
