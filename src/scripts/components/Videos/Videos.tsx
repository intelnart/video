// Main
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Styles
import styles from './styles.module.sass'
import cn from 'classnames'

// Redux
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import { removeVideoInfo, setCurrentRequest, setVideo } from '../../store/slices/videosSlice'

// Components
import Video from './components/Video'
import SaveRequestModal from './components/SaveRequestModal'
import EditAddRequestPopUp from '../Common/EditAddRequestPopUp'

// Api
import { getVideosRequestApi } from '../../api/getVideosRequestApi'
import { saveRequestAPI } from '../../api/saveRequestApi'

// Assets
import { ReactComponent as Heart } from '../../../images/heart/heart.svg'
import { ReactComponent as List } from '../../../images/viewSwitcher/listActive.svg'
import { ReactComponent as Grid } from '../../../images/viewSwitcher/gridActive.svg'
import { getFavoritesRequestIdAPI } from '../../api/getFavoritesRequestIdApi'
import { setFavoriteQueriesID } from '../../store/slices/favoriteQueriesIDSlices'

export default function Videos() {
    const { videos, currentRequest } = useAppSelector(state => state.videosReducer)
    const [isSaveFavoriteModal, setIsSaveFavoriteModal] = useState<boolean>(false)
    const [isViewSwitcherGrid, setIsViewSwitcherGrid] = useState<boolean>(true)
    const [isModalActive, setIsModalActive] = useState<boolean>(false)
    const { id } = useAppSelector(state => state.userReducer)
    const { register, handleSubmit } = useForm()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setIsSaveFavoriteModal(false)
    }, [currentRequest])

    useEffect(() => {
        if (isModalActive) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'scroll'
        }
    }, [isModalActive])

    const saveRequest = (requestTitle: string, sliderValue: number, sorting: string, nameRequest: string) => {
        saveRequestAPI(id, requestTitle, sliderValue, sorting, nameRequest).then(() => {
            getFavoritesRequestIdAPI(id).then(docSnap => {
                if (docSnap && docSnap.exists()) {
                    dispatch(setFavoriteQueriesID(docSnap.data()?.saveRequest))
                }
            })
            setIsSaveFavoriteModal(true)
            setIsModalActive(false)
        })
    }

    const onSubmit: SubmitHandler<Record<string, string>> = data => {
        const valueRequest = data.request
        videos.length !== 0 && dispatch(removeVideoInfo())
        getVideosRequestApi(valueRequest).then(response => dispatch(setVideo(response.data.items)))
        navigate('/videos')
        dispatch(setCurrentRequest(valueRequest))
    }

    const handleModalActiveClick = () => {
        setIsModalActive(true)
    }

    const handleViewGridCloseClick = useCallback(() => {
        setIsViewSwitcherGrid(false)
    }, [])

    const handleViewGridOpenClick = useCallback(() => {
        setIsViewSwitcherGrid(true)
    }, [])

    return (
        <div className={styles.search__videosContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.search__title}>Поиск видео</div>
                <div className={styles.search__inputContainer}>
                    <input
                        className={styles.search__input}
                        defaultValue={currentRequest ?? ''}
                        placeholder="Что хотите посмотреть?"
                        type="text"
                        {...register('request')}
                    />
                    <div className={styles.search__buttonFavorite}>
                        <button onClick={handleModalActiveClick} type={'button'}>
                            <Heart
                                className={cn(styles.search__favoriteButton, {
                                    [styles.search__favoriteButton_active]: isSaveFavoriteModal
                                })}
                            />
                        </button>
                        <div className={styles.search__savedModalWrapper}>
                            {isSaveFavoriteModal && <SaveRequestModal />}
                        </div>
                    </div>
                    <button className={styles.search__button} type="submit">
                        Найти
                    </button>
                </div>
            </form>
            {isModalActive && (
                <div className={styles.search__modalRequestPopUp}>
                    <EditAddRequestPopUp
                        setIsModalActive={setIsModalActive}
                        inputValue={currentRequest}
                        saveRequest={saveRequest}
                    />
                </div>
            )}
            <div className={styles.search__info}>
                <div className={styles.search__subtitle}>
                    Видео по запросу «<span className={styles.search__currentRequestText}>{currentRequest}</span>»
                </div>
                <div className={styles.search__viewSwitcher}>
                    <button onClick={handleViewGridCloseClick} className={styles.search__viewSwitcherList}>
                        <List
                            className={cn(styles.search__switcherList, {
                                [styles.search__switcherList_active]: !isViewSwitcherGrid
                            })}
                        />
                    </button>
                    <button onClick={handleViewGridOpenClick}>
                        <Grid
                            className={cn(styles.search__switcherGrid, {
                                [styles.search__switcherGrid_active]: isViewSwitcherGrid
                            })}
                        />
                    </button>
                </div>
            </div>
            <div className={isViewSwitcherGrid ? styles.search__viewGrid : styles.videosList}>
                {videos.map(i => (
                    <Video
                        titleVideo={i.snippet.title}
                        thumbnails={i.snippet.thumbnails.medium.url}
                        channelTitle={i.snippet.channelTitle}
                        key={i.id.videoId}
                        viewSwitcherGrid={isViewSwitcherGrid}
                    />
                ))}
            </div>
        </div>
    )
}
