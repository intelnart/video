import React, { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
import styles from './styles.module.sass'
import { removeVideoInfo } from '../../store/slices/videosSlice'
import sibDevLogo from '../../../images/sibdev-logo.svg'
import cn from 'classnames'
import { removeUserInfo } from '../../store/slices/userSlice'

export function Header() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const location = useLocation()
    const { token } = useAppSelector(state => state.userReducer) || { token: '' }

    const handleNavigateClick = useCallback(() => {
        dispatch(removeVideoInfo())
        navigate('/search')
    }, [navigate])

    const handleNavigateFavoriteClick = useCallback(() => {
        navigate('/favorites')
    }, [navigate])

    const handleUserExitAuthClick = useCallback(() => {
        dispatch(removeVideoInfo())
        dispatch(removeUserInfo())
        navigate('/authorization')
    }, [navigate])

    const handleGetCurrentUrlChange = useCallback(() => {
        if (location.pathname === '/search' || location.pathname === '/search/videos') {
            return 'search'
        }
        if (location.pathname === '/favorites') {
            return 'favorites'
        }
    }, [location.pathname])

    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <div className={styles.header__navigate}>
                    <div onClick={handleNavigateClick} className={styles.header__logo}>
                        <img src={sibDevLogo} alt="" />
                    </div>
                    <div className={styles.header__linkGroup}>
                        <div
                            className={cn(styles.header__searchLinkContainer, {
                                [styles.header__searchLinkContainer_active]: handleGetCurrentUrlChange() === 'search'
                            })}
                        >
                            <button
                                className={cn(styles.header__searchLink, {
                                    [styles.header__searchLink_active]: handleGetCurrentUrlChange() === 'search'
                                })}
                                onClick={handleNavigateClick}
                            >
                                Поиск
                            </button>
                        </div>
                        <div
                            className={cn(styles.header__searchLinkContainer, {
                                [styles.header__searchLinkContainer_active]: handleGetCurrentUrlChange() === 'favorites'
                            })}
                        >
                            <button
                                className={cn(styles.header__searchLink, {
                                    [styles.header__searchLink_active]: handleGetCurrentUrlChange() === 'favorites'
                                })}
                                onClick={handleNavigateFavoriteClick}
                            >
                                Избранное
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.header__signOut}>
                    <button onClick={handleUserExitAuthClick} className={styles.header__signOutButton}>
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header
