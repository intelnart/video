import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './scripts/routes/AppRoutes'
import Header from './scripts/components/Header/Header'
import styles from './styles/styles.module.sass'
import { useAppSelector } from './scripts/store/hooks/redux'

export default function AppSearch() {
    const { token } = useAppSelector(state => state.userReducer) || { token: '' }
    return (
        <BrowserRouter>
            {token && <Header />}
            <div className={styles.appContainer}>
                <AppRouter />
            </div>
        </BrowserRouter>
    )
}
